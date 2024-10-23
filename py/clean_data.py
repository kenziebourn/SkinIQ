
## PART 1 PULLING INGREDIENTS FROM CSV FILE
# import csv, re

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

# print(f"Part 1: Unique ingredients have been written to {output_file}")

# PART 2 CLEANING INGREDIENTS, REMOVING SENTENCES
# import re 
# filtered_lines = []
# def process_ingredients_file(input_file, output_file):
#     with open(input_file, 'r', encoding='utf-8') as file:
#         for line in file:
#             # Check if the length of the line is less than or equal to the max length
#             if len(line.strip()) <= 45:
#                 filtered_lines.append(line)


#     with open(output_file, 'w', encoding='utf-8') as file:
#         file.writelines(filtered_lines)
# input_file = 'processed_ingredients.txt'  # Replace with the path to your input file
# output_file = 'processed_ingredients1.txt'  # Replace with the path to your output file
# process_ingredients_file(input_file, output_file)
# print(f"Part 2: Processed content has been written to {output_file}")

# PART 3 CONVERT TO UPPERCASE, REMOVE REPEATS
import re
def clean_ingredients_file(input_file, output_file):
    cleaned_lines = set()
    with open(input_file, 'r', encoding='utf-8') as file:
        for line in file:
            # Convert the line to uppercase
            cleaned_line = line.upper()
            cleaned_lines.add(cleaned_line)

    with open(output_file, 'w', encoding='utf-8') as file:
        file.writelines(cleaned_lines)
input_file = 'processed_ingredients1.txt'  
output_file = 'processed_ingredients2.txt' 
clean_ingredients_file(input_file, output_file)
print(f"Part 3: Processed content has been written to {output_file}")