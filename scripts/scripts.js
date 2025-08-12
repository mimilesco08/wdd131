const products = [
    { id: "p101", name: "Wireless Headphones" },
    { id: "p102", name: "Bluetooth Speaker" },
    { id: "p103", name: "Smartwatch" },
    { id: "p104", name: "Portable Charger" },
    { id: "p105", name: "Laptop Stand" }
];

const productSelect = document.getElementById("productName");

products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productSelect.appendChild(option);
});
