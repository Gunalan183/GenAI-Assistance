from app import mongo

def get_db():
    return mongo.db

def get_collection(name):
    return mongo.db[name]
