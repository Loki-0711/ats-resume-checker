import csv
from pathlib import Path
from BACKEND.DATABASE.database import get_connection

connection = get_connection()
cursor = connection.cursor()

cursor.execute(""" 
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    skill_name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    suggestion TEXT NOT NULL)
""")

csv_path = Path(__file__).parent.parent / "DATA" / "skills.csv"

print("csv path", csv_path)
print("Exists:", csv_path.exists())

with open(csv_path, "r", encoding="utf-8") as file:

    reader = csv.DictReader(file)

    for row in reader:
        cursor.execute(
            """
            INSERT OR IGNORE INTO skills(skill_name, category, suggestion)
            VALUES(?, ?, ?)
            """,
            (row["skill_name"], row["category"], row["suggestion"])

        )
connection.commit()
connection.close()

print("skills imported successfully")
