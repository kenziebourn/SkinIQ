import json, os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_DB_URI = os.getenv("MONGO_DB_URI")
DB_NAME = os.getenv("DB_NAME")
DB_COLLECTION = os.getenv("DB_COLLECTION")

# Connect to MongoDB
client = MongoClient(MONGO_DB_URI)
print("Connected to MongoDB!")
# print(client.list_database_names())

# Connect to the SkinIQ database
db = client[DB_NAME]
Collection = db[DB_COLLECTION]

# Adapted from https://www.geeksforgeeks.org/how-to-import-json-file-in-mongodb-using-python/
# Load the JSON data
with open('output4.json', encoding='utf-8') as file:
    file_data = json.load(file)
     
# Inserting the loaded data in the Collection
# if JSON contains data more than one entry
# insert_many is used else insert_one is used
if isinstance(file_data, list):
    Collection.insert_many(file_data)
    print("Data inserted successfully!")  
else:
    Collection.insert_one(file_data)