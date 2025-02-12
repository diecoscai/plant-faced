export class ProductCatalog {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 10;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadProducts();
        this.renderProducts();
    }

    async loadProducts() {
        try {
            this.showLoading(true);
            // Change to API when it's finished
            this.products = await this.fetchMockProducts();
            this.filteredProducts = [...this.products];
            this.renderProducts();
        } catch (error) {
            console.log('Error loading products: ', error);
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

    filterProducts({ search, category }) {
        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'all' || product.category === category;
            return matchesSearch && matchesCategory;
        });
        this.currentPage = 1;
        this.renderProducts();
    }

    renderProducts() {
        const productGrid = document.querySelector('#product-grid');
        productGrid.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToDisplay = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToDisplay.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No se encontraron productos.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.alt}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p class="product-description" style="max-height: 150px; overflow-y: auto;">${product.description}</p>
                    <button class="add-to-cart" data-id="${product.id}" aria-label="Agregar ${product.name} al carrito">
                        Agregar al carrito
                    </button>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        this.renderPagination();
        window.scrollTo({ top: document.querySelector('#products').offsetTop, behavior: 'smooth' });
    }

    renderPagination() {
        const paginationContainer = document.querySelector('#pagination');
        paginationContainer.innerHTML = '';
    
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        const maxVisibleButtons = 5; // Número máximo de botones visibles
        const startPage = Math.max(1, this.currentPage - Math.floor(maxVisibleButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.disabled = this.currentPage === 1;
        prevButton.setAttribute('aria-label', 'Página anterior');
        prevButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                window.scrollTo(0, 0);
                this.renderProducts();
            }
        });
        paginationContainer.appendChild(prevButton);
    
        if (startPage > 1) {
            const firstPageButton = document.createElement('button');
            firstPageButton.textContent = '1';
            firstPageButton.addEventListener('click', () => {
                this.currentPage = 1;
                this.renderProducts();
            });
            paginationContainer.appendChild(firstPageButton);
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
        }
    
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.toggle('active', i === this.currentPage);
            pageButton.setAttribute('aria-label', `Página ${i}`);
            pageButton.addEventListener('click', () => {
                this.currentPage = i;
                window.scrollTo(0, 0);
                this.renderProducts();
            });
            paginationContainer.appendChild(pageButton);
        }
    
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                paginationContainer.appendChild(ellipsis);
            }
            const lastPageButton = document.createElement('button');
            lastPageButton.textContent = totalPages;
            lastPageButton.addEventListener('click', () => {
                this.currentPage = totalPages;
                this.renderProducts();
            });
            paginationContainer.appendChild(lastPageButton);
        }
    
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.disabled = this.currentPage === totalPages;
        nextButton.setAttribute('aria-label', 'Página siguiente');
        nextButton.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderProducts();
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    showLoading(show) {
        const spinner = document.querySelector('#loading-spinner');
        spinner.computedStyleMap.display = show ? 'flex' : 'none';
    }
}
