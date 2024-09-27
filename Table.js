let totalQuantity = 100; // إجمالي الكمية المتاحة في المخزن

function consumeProduct() {
  const playerName = document.getElementById("playerName").value;
  const consumedWheat = document.getElementById("consumedWheat").value;
  const consumedWood = document.getElementById("consumedWood").value;
  const reason = document.getElementById("reason").value;

  // Create a data object
  const data = {
    playerName: playerName,
    consumedWheat: consumedWheat,
    consumedWood: consumedWood,
    reason: reason,
  };

  // Get existing data from localStorage, or initialize to an empty array
  let consumedProducts =
    JSON.parse(localStorage.getItem("consumedProducts")) || [];

  // Add new data to the array
  consumedProducts.push(data);

  // Save updated array back to localStorage
  localStorage.setItem("consumedProducts", JSON.stringify(consumedProducts));

  // Create a new row in the table
  addRowToTable(data, consumedProducts.length - 1);

  // Clear the form inputs after submission
  document.getElementById("playerName").value = "";
  document.getElementById("consumedWheat").value = "";
  document.getElementById("consumedWood").value = "";
  document.getElementById("reason").value = "";
}

// Function to load the stored data when the page loads
function loadStoredData() {
  const consumedProducts =
    JSON.parse(localStorage.getItem("consumedProducts")) || [];

  consumedProducts.forEach((item, index) => {
    addRowToTable(item, index);
  });
}

// Function to add a row to the table
function addRowToTable(data, index) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${data.playerName}</td>
    <td>${data.consumedWheat}</td>
    <td>${data.consumedWood}</td>
    <td>${data.reason}</td>
    <td><button onclick="removeProduct(${index})">Delete</button></td>
  `;
  document.getElementById("consumedList").appendChild(row);
}

// Function to remove the row and data from localStorage
function removeProduct(index) {
  // Get the current stored data
  let consumedProducts =
    JSON.parse(localStorage.getItem("consumedProducts")) || [];

  // Remove the selected product
  consumedProducts.splice(index, 1);

  // Update the localStorage with the new array
  localStorage.setItem("consumedProducts", JSON.stringify(consumedProducts));

  // Clear the current table
  document.getElementById("consumedList").innerHTML = "";

  // Reload the table with updated data
  loadStoredData();
}

// Call the load function when the page is loaded
window.onload = loadStoredData;
