// Select elements
const balance = document.getElementById('balance');
const transactionList = document.getElementById('transactionList');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const addTransactionButton = document.getElementById('addTransaction');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');

// Transactions array to store the data
let transactions = [];

// Function to update the balance and totals
function updateTotals() {
  let income = 0;
  let expenses = 0;

  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      income += transaction.amount;
    } else {
      expenses += Math.abs(transaction.amount);
    }
  });

  const total = income - expenses;

  balance.textContent = `₹${total}`;
  totalIncome.textContent = `₹${income}`;
  totalExpenses.textContent = `₹${expenses}`;

  // Change color based on total balance
  balance.style.color = total >= 0 ? '#28a745' : '#dc3545';
}

// Function to render transactions
function renderTransactions() {
  transactionList.innerHTML = ''; // Clear existing transactions
  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.classList.add(transaction.amount < 0 ? 'expense' : 'income');
    li.innerHTML = `
      ${transaction.description} <span>₹${transaction.amount}</span>
      <button onclick="deleteTransaction(${index})">X</button>
    `;
    transactionList.appendChild(li);
  });
}

// Function to add a transaction
function addTransaction() {
  const descriptionValue = description.value.trim();
  const amountValue = parseFloat(amount.value);

  if (descriptionValue === '' || isNaN(amountValue)) {
    alert('Please enter a valid description and amount.');
    return;
  }

  const transaction = { description: descriptionValue, amount: amountValue };
  transactions.push(transaction);

  description.value = '';
  amount.value = '';

  renderTransactions();
  updateTotals();
}

// Function to delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateTotals();
}

// Add event listener to the button
addTransactionButton.addEventListener('click', addTransaction);

// Initialize
updateTotals();
renderTransactions();