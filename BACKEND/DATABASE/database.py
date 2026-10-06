import sqlite3
from pathlib import Path

DATABASE_PATH = Path(__file__).parent / "ats.db"

def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    return connection 