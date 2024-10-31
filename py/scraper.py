from bs4 import BeautifulSoup
from data import EU_ALLERGENS,  REEF_HARM, NON_VEGAN, FUNGAL_ACNE
# from test_ingredients import INGREDIENTS
from ingredients import INGREDIENTS
import re, requests, random, json, urllib.parse, time

def create_url1(ingredient_name):
    enc_inci = ingredient_name.replace(" ", "-").lower()
    # Define the base URL for INCIDecoder
    inci_dec = "https://incidecoder.com/ingredients/"
    return inci_dec + enc_inci

def create_url2(ingredient_name):
    # Encode the ingredient name for the EWG URL
    encoded_name = urllib.parse.quote_plus(ingredient_name)
    # Define the base URL for EWG
    ewg = f"https://www.ewg.org/skindeep/search/?search={encoded_name}&search_type=ingredients"
    return ewg

user_agents = [ 
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 
	'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36', 
	'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148', 
	'Mozilla/5.0 (Linux; Android 11; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36' 
] 
user_agent = random.choice(user_agents) 
headers = {'User-Agent': user_agent} 

# Query search result for ingredients in Skin EWG
def search_ewg(ingredient):
    url = create_url2(ingredient)
    # Make the request to the URL
    response = requests.get(url, headers=headers)

    print("Response Code:", response.status_code)
    soup = BeautifulSoup(response.content, 'html.parser')
    product_names = soup.find_all('div', class_='product-name')

    # Initialize href to None
    href = None

    # Use regex to match the ingredient name and extract the href attribute
    pattern = re.compile(rf'\b{re.escape(ingredient)}\b', re.IGNORECASE)
    for product in product_names:
        product_text = product.get_text(strip=True)
        if pattern.search(product_text):
            link = product.find('a')
            if link and 'href' in link.attrs:  # Check if 'a' tag exists and has 'href'
                href = link['href']
                break  # Exit the loop after the first match
    
    if href is None:
        return False

    # Create the URL for the matched ingredient
    url = f"https://www.ewg.org{href}"
    # print("ewg url:", url)
    return url

# Ingredient verifications
def is_alc_free(name):
    match = re.search(r'(?i)alcohol', name)
    if not match:
        return True

def is_silicone_free(name):
    match = re.search(r'(?i)cone', name)
    if not match:
        return True

def is_fragrance_free(name):
    match = re.search(r'(?i)parfum', name)
    if not match:
        return True

def is_sulfate_free(name):
    match = re.search(r'(?i)ate', name)
    if not match:
        return True

def is_paraben_free(name):
    match = re.search(r'(?i)paraben', name)
    if not match:
        return True

def is_oil_free(name):
    match = re.search(r'(?i)oil', name)
    if not match:
        return True

def main(batch):
    for ingredient in batch:
        print(f"Processing: {ingredient}")
        link1 = create_url1(ingredient)
        if not link1:
            # If link fails, process next ingredient
            print("Failed to find ingredient in INCIDecoder\n")
            continue
        # print(link1)
        link2 = search_ewg(ingredient)
        if not link2:
            # If link fails, process next ingredient
            print("Failed to find ingredient in EWG\n")
            continue
        # print(link2)

        result1 = requests.get(link1, headers=headers)
        result2 = requests.get(link2, headers=headers)
        # Check result status codes before proceeding
        if result1.status_code != 200:
            print("Failed to fetch data from INCIDecoder")
            exit()
        if result2.status_code != 200:
            print("Failed to fetch data from EWG")
            exit()

        doc = BeautifulSoup(result1.text, "html.parser")
        doc2 = BeautifulSoup(result2.text, "html.parser")

        # Get the name of the product
        name = doc.find(class_='detailpage').find('h1').text.strip()
        if not name:
            print("Name not found")
        # print(name)

        # Get the irritancy of the ingredient
        irritancy = doc.find_all(string="Irritancy: ")
        if irritancy:
            parent = irritancy[0].parent
            child = irritancy[0].find_next("span")
            irritancy_value = child.string.strip()
            # print(f"Irritancy: {irritancy_value}")
        else:
            irritancy_value = None
            # print("Irritancy information not found")

        # Get the comedogenicity of the ingredient
        comedogenicity = doc.find_all(string="Comedogenicity: ")
        if comedogenicity:
            parent = comedogenicity[0].parent
            child = comedogenicity[0].find_next("span")
            comedogenicity_value = child.string.strip()
            # print(f"Comedogenicity: {comedogenicity_value}")
        else:
            comedogenicity_value = None
            # print("Comedogenicity information not found")

        # Get the description of the ingredient
        details_div = doc2.find("section", class_="product-concerns-and-info")
        if details_div is None:
            description = None
            print("Details not found")
        else:
            p_tag = details_div.find("p")
            description = p_tag.text.strip()
            # print(description)

        # Get the safety rating of the ingredient
        safety = doc2.find_all('p', class_='data-level')
        if safety:
            safety_text = safety[0].text.strip()  # Get the text content
            data_level = safety_text.split(': ')[1]  # Split and get the second part
            # print(data_level)
        else:
            data_level = None
            print("Safety data not found")

        ingredient_data = {
            "name": name,
            "irritancy": irritancy_value,
            "comodogenicity" : comedogenicity_value,
            "description": description,
            "safety": data_level,
            "alc_free": is_alc_free(name),
            "silicone_free": is_silicone_free(name),
            "fragrance_free": is_fragrance_free(name),
            "sulfate_free": is_sulfate_free(name),
            "paraben_free": is_paraben_free(name),
            "oil_free": is_oil_free(name),
            "eu_allergen": name.upper() not in EU_ALLERGENS,
            "reef_safe": name.upper() not in REEF_HARM,
            "vegan": name.upper() not in NON_VEGAN,
            "fungal_acne_safe": name.upper() not in FUNGAL_ACNE
        }
        ingredient_json = json.dumps(ingredient_data, indent=4)
        # Write the JSON string to a file
        with open('output.json', 'a') as json_file:
            json_file.write(ingredient_json)
        # print(ingredient_json + "\n")


if __name__=="__main__":
    batch_size = 100

    for i in range(0, len(INGREDIENTS), batch_size):
        print(f"Processing batch {i+1} to {i+batch_size}")
        batch = INGREDIENTS[i:i+batch_size]
        # print(batch)
        main(batch)
        time.sleep(30)

    