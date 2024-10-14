from bs4 import BeautifulSoup
from data import EU_ALLERGENS,  REEF_HARM, NON_VEGAN, FUNGAL_ACNE
import re
import requests

inci_dec = "https://incidecoder.com/ingredients/stearic-acid"
ewg = "https://www.ewg.org/skindeep/ingredients/706311-STEARIC_ACID/"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

result1 = requests.get(inci_dec)
result2 = requests.get(ewg, headers=headers)

doc = BeautifulSoup(result1.text, "html.parser")
doc2 = BeautifulSoup(result2.text, "html.parser")

# Get the name of the product
name = doc.find(class_='detailpage').find('h1').text.strip()
print(name)

# Get the irritancy of the ingredient
irritancy = doc.find_all(string="Irritancy: ")
parent = irritancy[0].parent
child = irritancy[0].find_next("span")
print(child.string.strip())

# Get the comedogenicity of the ingredient
comedogenicity = doc.find_all(string="Comedogenicity: ")
parent = comedogenicity[0].parent
child = comedogenicity[0].find_next("span")
print(child.string.strip())

# Get the description of the ingredient
details_div = doc.find("div", id="details")
p_tag = details_div.find("p")
description = p_tag.text.strip()
print(description)

# Get the safety rating of the ingredient
safety = doc2.find_all('p', class_='data-level')
if safety:
    safety_text = safety[0].text.strip()  # Get the text content
    data_level = safety_text.split(': ')[1]  # Split and get the second part
    print(data_level)
else:
    print("Safety data not found")

# Perform the ingredient verifications
def is_alc_free(name):
    match = re.search(r'(?i)alcohol', name)
    if not match:
        return("Alcohol Free")

def is_silicone_free(name):
    match = re.search(r'(?i)cone', name)
    if not match:
        return("Silicone Free")

def is_fragrance_free(name):
    match = re.search(r'(?i)parfum', name)
    if not match:
        return("Fragrance Free")

def is_sulfate_free(name):
    match = re.search(r'(?i)ate', name)
    if not match:
        return("Sulfate Free")

def is_paraben_free(name):
    match = re.search(r'(?i)paraben', name)
    if not match:
        return("Paraben Free")

def is_oil_free(name):
    match = re.search(r'(?i)oil', name)
    if not match:
        return("Oil Free")
    
# print("NOTES:")
print(is_alc_free(name))
print(is_silicone_free(name))
print(is_fragrance_free(name))
print(is_sulfate_free(name))
print(is_paraben_free(name))
print(is_oil_free(name))
if name.upper() not in EU_ALLERGENS:
    print("EU Allergen Free")
if name.upper() not in REEF_HARM:
    print("Reef Safe")
if name.upper() not in NON_VEGAN:
    print("Vegan")
if name.upper() not in FUNGAL_ACNE:
    print("Fungal Acne Safe")
