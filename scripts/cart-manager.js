export class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateCartUI();
  }

  // Set up event listeners for cart interactions
  setupEventListeners() {
    const cart = document.querySelector("#cart");
    const cartButton = document.querySelector(".cart-button");

    // Cart button behavior
    document.querySelector(".cart-button").addEventListener("click", () => {
      cart.classList.add("active");
      document.querySelector(".cart-header").focus();
    });

    document.querySelector(".close-cart").addEventListener("click", (e) => {
      cart.classList.remove("active");

      if (!cart.contains(e.target) && !cartButton.contains(e.target)) {
        cart.classList.remove("active");
      }
    });

    // Handle adding, removing, and updating item quantities in the cart
    document.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart")) {
        const productId = parseInt(e.target.dataset.id);
        this.addToCart(productId);
      }

      if (e.target.closest(".remove-item")) {
        const productId = parseInt(e.target.dataset.id);
        this.removeFromCart(productId);
      }

      if (e.target.closest(".quantity-button")) {
        const productId = parseInt(e.target.closest("li").dataset.id);
        const action = e.target.classList.contains("increase")
          ? "increase"
          : "decrease";
        this.updateQuantity(productId, action);
      }
    });

    // Update item quantity based on input changes
    document.addEventListener("input", (e) => {
      if (e.target.matches(".quantity-input")) {
        const productId = parseInt(e.target.closest("li").dataset.id);
        const newQuantity = parseInt(e.target.value) || 1;
        this.updateQuantity(productId, "set", newQuantity);
      }
    });
  }

  // Find a product by its ID in the product catalog
  findProduct(id) {
    return window.productCatalog.products.find((product) => product.id === id);
  }

  // Add a product to the cart
  addToCart(productId) {
    const product = this.findProduct(productId);
    if (!product) return;

    const existingItem = this.cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      });
    }

    this.saveCart();
    this.showAddedFeedback(product);
  }

  // Remove a product from the cart
  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
  }

  // Update the quantity of a product in the cart
  updateQuantity(productId, action, value) {
    const item = this.cart.find((item) => item.id === productId);
    if (!item) return;

    switch (action) {
      case "increase":
        item.quantity++;
        break;
      case "decrease":
        item.quantity = Math.max(1, item.quantity - 1);
        break;
      case "set":
        item.quantity = Math.max(1, value);
    }

    this.saveCart();
  }

  // Save the cart to local storage and update the UI
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCartUI();
  }

  // Update the cart UI elements
  updateCartUI() {
    this.updateCartCounter();
    this.renderCartItems();
    this.updateTotalPrice();
    this.toggleCheckoutButton();
  }

  // Update the cart item counter display
  updateCartCounter() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector("#cart-counter").textContent = totalItems;
  }

  // Render the cart items in the UI
  renderCartItems() {
    const cartItems = document.querySelector("#cart-items");
    const emptyState = document.querySelector("#cart-empty");

    cartItems.innerHTML = "";

    if (this.cart.length === 0) {
      emptyState.style.display = "block";
      return;
    }

    emptyState.style.display = "none";

    this.cart.forEach((item) => {
      const li = document.createElement("li");
      li.dataset.id = item.id;
      li.innerHTML = `
        <div class="cart-item-container">
          <img src="${item.image}" alt="${item.alt}" class="cart-item-image" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-quantity">
            <div class="quantity-control">
            <button class="quantity-button decrease" aria-label="Reducir cantidad">
                  -
                </button>
                <input
                  type="number"
                  class="quantity-input"
                  value="${item.quantity}"
                  min="1"
                  aria-label="Cantidad"
                  debounce
                />
                <button class="quantity-button increase" aria-label="Aumentar cantidad">
                  +
                </button>
              </div>
              <p class="cart-item-price">$${(item.price*item.quantity).toFixed(2)}</p>
              <button
                class="remove-item"
                data-id="${item.id}"
                aria-label="Eliminar producto"
              >
                &times;
              </button>
            </div>
          </div>
        </div>

            `;
      cartItems.appendChild(li);
    });
  }

  // Update the total price display in the cart
  updateTotalPrice() {
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    document.querySelector("#total-price").textContent = total.toFixed(2);
  }

  // Enable or disable the checkout button based on cart contents
  toggleCheckoutButton() {
    const checkoutButton = document.querySelector(".checkout-button");
    checkoutButton.disabled = this.cart.length === 0;
  }

  // Show feedback when a product is added to the cart
  showAddedFeedback(product) {
    const feedback = document.createElement("div");
    feedback.className = "cart-feedback";
    feedback.textContent = `✅ ${product.name} agregado`;
    document.body.appendChild(feedback);

    setTimeout(() => feedback.remove(), 2000);
  }
}
