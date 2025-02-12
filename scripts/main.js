import { ProductCatalog } from "./product-catalog.js";
import { CartManager } from "./cart-manager.js";

// Hamburger Menu

// Toggles the hamburger menu and navigation list visibility
document.addEventListener("click", (e) => {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  if (e.target.closest(".hamburger")) {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    navList.classList.toggle("active");
    hamburger.classList.toggle("open");

    if (!isExpanded) {
      navList.querySelector("a").focus();
    }
  }

  // Closes the hamburger menu if clicking outside of it
  if (!e.target.closest(".nav") && !e.target.closest(".hamburger")) {
    hamburger.setAttribute("aria-expanded", "false");
    navList.classList.remove("active");
    hamburger.classList.remove("open");
  }

});



// Initializes the product catalog and cart manager on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  window.productCatalog = new ProductCatalog();
  window.cartManager = new CartManager();
});
