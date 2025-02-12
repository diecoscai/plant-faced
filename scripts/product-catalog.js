export class ProductCatalog {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadProducts();
        this.renderProducts();
    }

    async loadProducts(){
        try {
            this.showLoading(true);
            // Change to API when it's finished
            this.products = await this.fetchMockProducts();
            this.filteredProducts = [...this.products];
        } catch (error){
            console.log('Error loading procuts: ', error);
        } finally {
            this.showLoading(false);
        }
    }

    async fetchMockProducts() {
        try {
            const response = await fetch('/products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];   
        }
    }

    setupEventListeners() {
        document.querySelector('#search').addEventListener('input', (e) =>{
            this.filterProducts({
                search: e.target.value,
                category: document.querySelector('#category-filter').value
            });
        });

        document.querySelector('#category-filter').addEventListener('change', (e) => {
            this.filterProducts({
                search: document.querySelector('#search').value,
                category: e.target.value
            })
        })
    }

    filterProducts({search, category}) {
        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'all' || product.category === category;
            return matchesSearch && matchesCategory;
        });
        this.renderProducts();
    }

    renderProducts() {
        const productGrid = document.querySelector('#product-grid');
        productGrid.innerHTML = '';

        if (this.filteredProducts.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No se encontraron productos.</p>';
            return;
        }

        this.filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}"
                    alt="${product.alt}"
                    class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-description">${product.description}</p>
                    <button class="add-to-cart"
                        data-id="${product.id}"
                        aria-label="Agregar ${product.name} al carrito">
                        Agregar al carrito
                    </button>
                </div>
             `;
            productGrid.appendChild(productCard);
        });
    }

    showLoading(show) {
        const spinner = document.querySelector('#loading-spinner');
        spinner.computedStyleMap.display = show ? 'flex' : 'none';
    }
}
