from pymongo import MongoClient
import os

MONGO_URL = os.environ.get("DATABASE_URL", "")
MONGO_DB = os.environ.get("DB_NAME", "")

client = MongoClient(MONGO_URL)
db = client[MONGO_DB]


class MongoQueries:
    @property
    def collection(self):
        return db[self.collection_name]
