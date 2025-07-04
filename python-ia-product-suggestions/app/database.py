
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://mvcproducts:hXPNkFuMa9d5lz8J@node-api-rest-mvc-produ.p4df8t7.mongodb.net/?retryWrites=true&w=majority&appName=node-api-rest-mvc-products-cluster"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)