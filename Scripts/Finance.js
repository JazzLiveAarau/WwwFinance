(() => {
  const form = document.getElementById("transaction-form");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const transactionList = document.getElementById("transaction-list");
  const balanceElement = document.getElementById("balance");

  const transactions = [];

  function render() {
    transactionList.innerHTML = "";
    let total = 0;

    transactions.forEach((transaction) => {
      total += transaction.amount;
      const item = document.createElement("li");
      item.className = transaction.amount >= 0 ? "income" : "expense";
      item.textContent = `${transaction.description}: ${transaction.amount.toFixed(2)}`;
      transactionList.appendChild(item);
    });

    balanceElement.textContent = total.toFixed(2);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number.parseFloat(amountInput.value);

    if (!description || Number.isNaN(amount)) {
      return;
    }

    transactions.push({ description, amount });
    form.reset();
    render();
  });

  render();
})();
