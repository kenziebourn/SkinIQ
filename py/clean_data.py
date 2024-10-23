import csv, re

# def extract_ingredients_from_csv(csv_file):
#     ingredients_list = []
#     with open(csv_file, 'r', newline='', encoding='utf-8') as file:
#         reader = csv.reader(file)
#         for row in reader:
#             if len(row) > 5:  # Ensure there are enough columns
#                 ingredients = row[5].strip('"')  # Remove surrounding quotes
#                 ingredients_list.append(ingredients)
#     return ingredients_list

# def get_unique_ingredients(ingredients_list):
#     unique_ingredients = set()
#     for ingredients in ingredients_list:
#         # Split each ingredient string by commas and strip whitespace
#         individual_ingredients = [ingredient.strip() for ingredient in ingredients.split(',')]
#         unique_ingredients.update(individual_ingredients)
#     return list(unique_ingredients)

# csv_file = 'archive/cosmetics.csv' 
# ingredients = extract_ingredients_from_csv(csv_file)
# unique_ingredients = get_unique_ingredients(ingredients)

# # Write the unique ingredients to a separate file
# output_file = 'unique_ingredients.txt'  # Specify the output file name
# with open(output_file, 'w', encoding='utf-8') as file:
#     for ingredient in unique_ingredients:
#         file.write(ingredient + '\n')

# print(f"Unique ingredients have been written to {output_file}")

INGREDIENTS = []
# Read the file and convert it to a list
with open('unique_ingredients.txt', 'r', encoding='utf-8') as file:
    for line in file:
        INGREDIENTS.append(line.strip())

# Print the resulting list
print(INGREDIENTS)


