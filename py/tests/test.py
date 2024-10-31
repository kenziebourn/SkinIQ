import re 
filtered_lines = []
def process_ingredients_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        for line in file:
            # Check if the length of the line is less than or equal to the max length
            if len(line.strip()) <= 45:
                filtered_lines.append(line)


    with open(output_file, 'w', encoding='utf-8') as file:
        file.writelines(filtered_lines)

# Example usage
input_file = 'processed_ingredients.txt'  # Replace with the path to your input file
output_file = 'processed_ingredients1.txt'  # Replace with the path to your output file
process_ingredients_file(input_file, output_file)

print(f"Processed content has been written to {output_file}")