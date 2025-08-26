
import {products} from "./data.js";

let currentCategory = "all";
let searchTerm = "";
let sortOrder = "none";
let priceFilter = "all";


// DOM elements
const productList = document.getElementById("product-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const priceSelect = document.getElementById("price-filter");

function displayProducts(filteredProducts) {
  productList.innerHTML = "";

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.cname}" />
      <h4>${product.cname}</h4>
      <h5>${product.company}</h5>
      <span>₹${product.price}</span>
    `;

    productList.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...products];

  // Filter by category
  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory);
  }

  // Filter by search
  if (searchTerm !== "") {
    filtered = filtered.filter(p =>
      p.cname.toLowerCase().includes(searchTerm) ||
      p.company.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by price
  if (priceFilter === "under10k") {
    filtered = filtered.filter(p => p.price < 10000);
  } else if (priceFilter === "under20k") {
    filtered = filtered.filter(p => p.price < 20000);
  } else if (priceFilter === "above20k") {
    filtered = filtered.filter(p => p.price >= 20000);
  }

  // Sort
  if (sortOrder === "az") {
    filtered.sort((a, b) => a.cname.localeCompare(b.cname));
  } else if (sortOrder === "za") {
    filtered.sort((a, b) => b.cname.localeCompare(a.cname));
  }

  displayProducts(filtered);
}

// Event listeners
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentCategory = button.dataset.category.toLowerCase();
    applyFilters();
  });
});

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value.toLowerCase();
  applyFilters();
});

sortSelect.addEventListener("change", e => {
  sortOrder = e.target.value;
  applyFilters();
});

priceSelect.addEventListener("change", e => {
  priceFilter = e.target.value;
  applyFilters();
});

// Initial load
applyFilters();

