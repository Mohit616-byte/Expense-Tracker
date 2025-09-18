// Navigation functionality
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all nav items and views
        navItems.forEach(navItem => navItem.classList.remove('active'));
        views.forEach(view => view.classList.remove('active'));
        
        // Add active class to clicked nav item
        item.classList.add('active');
        
        // Show corresponding view
        const viewId = item.getAttribute('data-view');
        document.getElementById(viewId).classList.add('active');
    });
});

// Add expense functionality
const addExpenseBtn = document.getElementById('add-expense-btn');

addExpenseBtn.addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (!description.trim()) {
        alert('Please enter a description');
        return;
    }
    
    if (!category) {
        alert('Please select a category');
        return;
    }
    
    // In a real app, you would save the expense to a database
    // For this frontend example, we'll just show a success message
    alert(`Expense added successfully!\nAmount: $${amount}\nDescription: ${description}\nCategory: ${category}`);
    
    // Reset form
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').selectedIndex = 0;
});

// Set current date (for demo purposes)
const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('date').value = now.toLocaleDateString('en-US', options);