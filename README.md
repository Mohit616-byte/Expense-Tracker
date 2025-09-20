# Expense Tracker

A comprehensive web-based expense tracking application built with Flask and SQLite. This application allows users to manage their personal finances by tracking expenses, categorizing them, and viewing detailed analytics.

## Features

### 🏠 Core Functionality
- **Add Expenses**: Record expenses with amount, category, description, and date
- **View Expenses**: Display all recorded expenses in a clean, organized list
- **Expense Analytics**: View monthly spending summaries and insights
- **Category Management**: Add, view, and delete custom expense categories

### 📊 Analytics Dashboard
- **Monthly Summary**: Total expenses, transaction count, and daily average for the current month
- **Top Category**: Identify your highest spending category
- **Category Breakdown**: Detailed spending by category for the current month
- **Daily Trends**: Track daily spending patterns over the last 7 days

### 🏷️ Category Management
- **Pre-loaded Categories**: Comes with 8 default categories (Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Health & Fitness, Travel, Other)
- **Custom Categories**: Add your own expense categories
- **Category Deletion**: Remove unwanted categories with a simple click

## Technology Stack

- **Backend**: Python Flask framework
- **Database**: SQLite3 for lightweight, serverless database
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Architecture**: RESTful API design with JSON data exchange

## Project Structure

```
Expense-Tracker/
│
├── app.py                 # Main Flask application with API endpoints
├── expense.db            # SQLite database file
├── requirements.txt      # Python dependencies
│
├── static/              # Static frontend assets
│   ├── script.js        # JavaScript functionality
│   └── style.css        # CSS styling
│
└── templates/           # HTML templates
    └── index.html       # Main application interface
```

## Installation

### Prerequisites
- Python 3.6 or higher
- pip (Python package installer)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mohit616-byte/Expense-Tracker.git
   cd Expense-Tracker
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   Or install Flask directly:
   ```bash
   pip install flask
   ```

3. **Initialize the database**
   The database will be automatically created when you first run the application.

## Usage

### Running the Application

1. **Start the Flask server**
   ```bash
   python app.py
   ```

2. **Access the application**
   Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

3. **Begin tracking expenses**
   - Click "Add Expense" to record new expenses
   - Use "Expenses" to view all recorded transactions
   - Check "Analytics" for spending insights
   - Manage "Categories" to customize expense types

### API Endpoints

The application provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Main application interface |
| GET | `/api/expenses` | Retrieve all expenses |
| POST | `/api/expenses` | Add a new expense |
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Add a new category |
| DELETE | `/api/categories/<name>` | Delete a category |
| GET | `/api/analytics` | Get analytics data |

### Database Schema

#### Expenses Table
- `id`: Primary key (INTEGER)
- `amount`: Expense amount (REAL)
- `category`: Expense category (TEXT)
- `description`: Expense description (TEXT)
- `date`: Expense date (TEXT)

#### Categories Table
- `id`: Primary key (INTEGER)
- `name`: Category name (TEXT)

## Development

### Development Mode
The application runs in debug mode by default, which provides:
- Automatic code reloading
- Detailed error messages
- Development server

### Customization
- **Styling**: Modify `static/style.css` for custom appearance
- **Functionality**: Extend `static/script.js` for additional features
- **Backend Logic**: Enhance `app.py` for new API endpoints or database operations

## Contributors

- **[Mohit616-byte](https://github.com/Mohit616-byte)** - Project Owner
- **[developedbyviv (Vivek Singh)](https://github.com/developedbyviv)** - Contributor

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have suggestions for improvements, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Consider contributing to the project

---

**Happy Expense Tracking! 💰📊**
