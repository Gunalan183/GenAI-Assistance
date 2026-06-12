from datetime import datetime
from bson.objectid import ObjectId

def serialize_doc(doc):
    """Convert MongoDB document to JSON serializable dict"""
    if not doc:
        return None
    doc['id'] = str(doc.pop('_id'))
    return doc

def serialize_docs(docs):
    """Convert list of MongoDB documents to JSON serializable list"""
    return [serialize_doc(doc) for doc in docs]

def get_timestamp():
    """Get current UTC timestamp"""
    return datetime.utcnow()

def is_valid_object_id(id_string):
    """Check if string is valid ObjectId"""
    try:
        ObjectId(id_string)
        return True
    except:
        return False
