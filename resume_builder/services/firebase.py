import os
import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore

load_dotenv()

def validate_env_var(env_var_name):
    if env_var_name not in os.environ:
        raise ValueError(f"Environment variable {env_var_name} is missing.")
    return True

validate_env_var('API_KEY')
validate_env_var('AUTH_DOMAIN')
validate_env_var('PROJECT_ID')
validate_env_var('STORAGE_BUCKET')
validate_env_var('MESSAGING_SENDER_ID')
validate_env_var('APP_ID')

firebase_config = {
    'apiKey': os.getenv('API_KEY'),
    'authDomain': os.getenv('AUTH_DOMAIN'),
    'projectId': os.getenv('PROJECT_ID'),
    'storageBucket': os.getenv('STORAGE_BUCKET'),
    'messagingSenderId': os.getenv('MESSAGING_SENDER_ID'),
    'appId': os.getenv('APP_ID'),
    'measurementId': os.getenv('MEASUREMENT_ID')
}

cred = credentials.Certificate(firebase_config)
firebase_admin.initialize_app(cred)
db = firestore.client()
