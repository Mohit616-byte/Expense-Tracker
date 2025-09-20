function $(id) { return document.getElementById(id); }

// NAVIGATION
const sections = ["section-add", "section-view", "section-analytics", "section-categories"];
const navs = ["nav-add", "nav-view", "nav-analytics", "nav-categories"];
function show(section) {
    sections.forEach(s => $(s).style.display = "none");
    navs.forEach((n, i) => $(n).classList.toggle("active", section === sections[i]));
    $(section).style.display = "block";
    if (section === "section-add") loadCategories();
    if (section === "section-view") loadExpenses();
    if (section === "section-analytics") loadAnalytics();
    if (section === "section-categories") loadCategoriesList();
}
navs.forEach((n, i) => $(n).onclick = () => show(sections[i]));
show("section-add");

// ADD EXPENSE
$("form-add").onsubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/expenses", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            amount: $("amount").value,
            category: $("category").value,
            description: $("description").value,
            date: $("date").value
        })
    });
    $("form-add").reset();
    show("section-view");
};

// LOAD CATEGORIES INTO DROPDOWN
async function loadCategories() {
    const res = await fetch("/api/categories");
    const cats = await res.json();
    $("category").innerHTML = cats.map(c => `<option>${c}</option>`).join("");
}

// LOAD ALL EXPENSES
async function loadExpenses() {
    const res = await fetch("/api/expenses");
    const data = await res.json();
    $("expenses-list").innerHTML = data.length === 0
      ? "<div>No expenses yet</div>"
      : data.map(e => `
        <div>
          ₹${e.amount.toFixed(2)} • <b>${e.category}</b>
          <small>${e.date}</small><br>
          <small>${e.description}</small>
        </div>`
      ).join("");
}

// CATEGORY MANAGER
$("form-category").onsubmit = async e => {
    e.preventDefault();
    await fetch("/api/categories", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: $("cat-name").value})
    });
    $("cat-name").value = "";
    loadCategoriesList();
    loadCategories();
};

async function loadCategoriesList() {
    const res = await fetch("/api/categories");
    const cats = await res.json();
    $("cat-list").innerHTML = cats.map(c =>
      `<li>${c} <button onclick="delCat('${c}')">🗑️</button></li>`).join("");
}

async function delCat(name) {
    await fetch("/api/categories/" + encodeURIComponent(name), {method: "DELETE"});
    loadCategoriesList();
    loadCategories();
}

// ANALYTICS
async function loadAnalytics() {
    const res = await fetch("/api/analytics");
    const a = await res.json();
    $("analytics-content").innerHTML = `
      <div class="analytics-box">
        <b>This Month:</b> ₹${a.this_month_total.toFixed(2)}<br>
        <b>Total Expenses:</b> ${a.this_month_count}<br>
        <b>Daily Average:</b> ₹${a.this_month_avg.toFixed(2)}<br>
        <b>Top Category:</b> ${a.top_category || "None"}
      </div>
      <div class="analytics-box">
        <b>Spending by Category (This Month):</b><br>
        ${(a.by_category.length ? a.by_category.map(c => `${c[0]}: ₹${c[1].toFixed(2)}`).join("<br>") : "No data")}
      </div>
      <div class="analytics-box">
        <b>Daily Spending (Last 7 days):</b><br>
        ${(a.by_day.length ? a.by_day.map(d => `${d[0]}: ₹${d[1].toFixed(2)}`).join("<br>") : "No data")}
      </div>
    `;
<<<<<<< HEAD
}
=======
}
>>>>>>> 178ef2385fc94a0e6f200d09846a1d1e2238b006
