import sqlite3

def setup_db():
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS usage_data (
            id INTEGER PRIMARY KEY,
            timestamp TEXT,
            usage REAL
        )
    """)
    con.commit()
    con.close()

if __name__ == '__main__':
    setup_db()
