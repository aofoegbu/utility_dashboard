from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_PATH = 'database.db'

@app.route('/api/water-usage')
def get_water_usage():
    con = sqlite3.connect(DB_PATH)
    cur = con.cursor()
    cur.execute("SELECT timestamp, usage FROM usage_data ORDER BY timestamp")
    data = cur.fetchall()
    con.close()
    return jsonify([{"timestamp": t, "usage": u} for t, u in data])

@app.route('/api/leaks')
def get_leaks():
    # Sample alert
    return jsonify([{"zone": "North Reno", "alert": "Possible leak detected"}])

if __name__ == '__main__':
    app.run(debug=True)
