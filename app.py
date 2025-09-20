from flask import Flask, render_template, request, jsonify
import sqlite3
import os

app = Flask(__name__)

DB_NAME = "expense.db"

def init_db():
    if not os.path.exists(DB_NAME):
        with sqlite3.connect(DB_NAME) as conn:
            c = conn.cursor()
            c.execute('''
                CREATE TABLE IF NOT EXISTS expenses (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    amount REAL,
                    category TEXT,
                    description TEXT,
                    date TEXT
                )
            ''')
            c.execute('''
                CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT
                )
            ''')
            conn.commit()
            c.executemany('INSERT INTO categories (name) VALUES (?)', [
                ('Food & Dining',), ('Transportation',), ('Shopping',), 
                ('Entertainment',), ('Bills & Utilities',), 
                ('Health & Fitness',), ('Travel',), ('Other',)
            ])
            conn.commit()

init_db()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/expenses", methods=["GET"])
def get_expenses():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("SELECT id, amount, category, description, date FROM expenses ORDER BY date DESC")
        results = c.fetchall()
    expenses = [{"id": r[0], "amount": r[1], "category": r[2], "description": r[3], "date": r[4]} for r in results]
    return jsonify(expenses)

@app.route("/api/expenses", methods=["POST"])
def add_expense():
    data = request.get_json()
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute(
            "INSERT INTO expenses (amount, category, description, date) VALUES (?, ?, ?, ?)",
            (data["amount"], data["category"], data["description"], data["date"])
        )
        conn.commit()
    return jsonify({"success": True})

@app.route("/api/categories", methods=["GET"])
def get_categories():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("SELECT name FROM categories")
        categories = [row[0] for row in c.fetchall()]
    return jsonify(categories)

@app.route("/api/categories", methods=["POST"])
def add_category():
    data = request.get_json()
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("INSERT INTO categories (name) VALUES (?)", (data["name"],))
        conn.commit()
    return jsonify({"success": True})

@app.route("/api/categories/<name>", methods=["DELETE"])
def delete_category(name):
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("DELETE FROM categories WHERE name = ?", (name,))
        conn.commit()
    return jsonify({"success": True})

@app.route("/api/analytics", methods=["GET"])
def analytics():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        # Current month analytics
        c.execute("SELECT IFNULL(SUM(amount), 0.0) FROM expenses WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')")
        this_month_total = c.fetchone()[0]
        c.execute("SELECT COUNT(*) FROM expenses WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')")
        this_month_count = c.fetchone()[0]
        c.execute("SELECT IFNULL(AVG(amount), 0.0) FROM expenses WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')")
        this_month_avg = c.fetchone()[0]
        c.execute("""
            SELECT category, IFNULL(SUM(amount),0.0) total 
            FROM expenses 
            WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now') 
            GROUP BY category ORDER BY total DESC LIMIT 1
        """)
        row = c.fetchone()
        top_category = row[0] if row else None

        # by category summary
        c.execute("""
            SELECT category, IFNULL(SUM(amount),0.0) FROM expenses 
            WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')
            GROUP BY category
        """)
        by_category = c.fetchall()
        # last 7 days
        c.execute("""
            SELECT date, IFNULL(SUM(amount),0.0) FROM expenses 
            WHERE date >= date('now', '-6 days')
            GROUP BY date ORDER BY date
        """)
        by_day = c.fetchall()

    return jsonify({
        "this_month_total": this_month_total,
        "this_month_count": this_month_count,
        "this_month_avg": this_month_avg,
        "top_category": top_category,
        "by_category": by_category,
        "by_day": by_day
    })

if __name__ == "__main__":
    app.run(debug=True)
