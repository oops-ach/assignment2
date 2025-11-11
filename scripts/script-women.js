// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
    THEME: 'demonSlayerTheme',
    CART: 'demonSlayerCart',
    SEARCH_HISTORY: 'demonSlayerSearchHistory',
    RATINGS: 'productRatings'
};

// ============================================
// WOMEN'S PRODUCT DATA
// ============================================
const productData = [
    { id: 1, name: 'Nezuko Kimono', price: 95.00, category: 'kimono', image: 'photos/nezukokimono.jpg', description: 'Custom Nezuko Demon Slayer Kimono' },
    { id: 2, name: 'Anime Hoodie', price: 110.00, category: 'hoodies', image: 'photos/hoodieanime.jpg', description: 'Casual Anime-Inspired Hoodie' },
    { id: 3, name: 'Hinata Sneakers', price: 125.00, category: 'shoes', image: 'photos/hinata_sneakers.jpg', description: 'Naruto Hinata Low Top Sneakers' },
    { id: 4, name: 'Anime Backpack', price: 89.00, category: 'accessories', image: 'photos/backpack_anime.jpeg', description: 'Anime Style Backpack' },
    { id: 5, name: 'Anime Cap', price: 89.00, category: 'accessories', image: 'photos/cap_anime.jpg', description: 'Anime Style Cap' },
    { id: 6, name: 'Anime Scarf', price: 89.00, category: 'accessories', image: 'photos/scarf_anime.jpeg', description: 'Anime Style Scarf' },
    { id: 7, name: 'Anime T-Shirt', price: 89.00, category: 'hoodies', image: 'photos/tshirt_anime.jpeg', description: 'Anime Style T-Shirt' },
    { id: 8, name: 'Anime Custom', price: 89.00, category: 'kimono', image: 'photos/custom_anime.jpg', description: 'Anime Style Custom' }
];

let currentCategory = 'all';
let cart = [];

// ============================================
// HAMBURGER MENU MANAGEMENT - 6 CONDITIONS
// ============================================
function setupHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const hamburgerDropdown = document.getElementById('hamburger-dropdown');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const headerMenu = document.getElementById('main-menu');

    const menuConfig = {
        '910-1049': ['New', 'Men', 'Women', 'Kids', 'About', 'Help'],
        '1050-1279': ['Men', 'Women', 'Kids', 'About', 'Help'],
        '1280-1419': ['Kids', 'About', 'Help'],
        '1420-1519': ['About', 'Help']
    };

    function getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= 909) return 'mobile';
        if (width >= 910 && width <= 1049) return '910-1049';
        if (width >= 1050 && width <= 1279) return '1050-1279';
        if (width >= 1280 && width <= 1419) return '1280-1419';
        if (width >= 1420 && width <= 1519) return '1420-1519';
        return 'desktop';
    }

    function populateDropdown() {
        const breakpoint = getCurrentBreakpoint();
        if (!dropdownMenu) return;
        
        dropdownMenu.innerHTML = '';

        if (menuConfig[breakpoint]) {
            menuConfig[breakpoint].forEach(itemName => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `${itemName.toLowerCase()}.html`;
                link.textContent = itemName;
                listItem.appendChild(link);
                dropdownMenu.appendChild(listItem);
            });
        }
    }

    function toggleDropdown() {
        const breakpoint = getCurrentBreakpoint();
        
        if (breakpoint === 'mobile') {
            if (headerMenu) headerMenu.classList.toggle('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = headerMenu && headerMenu.classList.contains('active') ? 'hidden' : '';
        } else {
            if (hamburgerDropdown) hamburgerDropdown.classList.toggle('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
        }
        
        if (hamburgerMenu) hamburgerMenu.classList.toggle('active');
    }

    function closeAllMenus() {
        if (hamburgerMenu) hamburgerMenu.classList.remove('active');
        if (hamburgerDropdown) hamburgerDropdown.classList.remove('active');
        if (headerMenu) headerMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', toggleDropdown);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeAllMenus);
    }

    document.addEventListener('click', (e) => {
        if (hamburgerMenu && hamburgerDropdown && 
            !hamburgerMenu.contains(e.target) && 
            !hamburgerDropdown.contains(e.target)) {
            closeAllMenus();
        }
    });

    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                closeAllMenus();
            }
        });
    }

    window.addEventListener('resize', () => {
        populateDropdown();
        closeAllMenus();
        updateSearchBarVisibility();
    });

    function updateSearchBarVisibility() {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;
        
        const width = window.innerWidth;
        
        if (width >= 610 && width <= 909) {
            searchContainer.style.display = 'block';
        } else if (width < 610) {
            searchContainer.style.display = 'none';
        }
    }

    populateDropdown();
    updateSearchBarVisibility();
}

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function loadThemePreference() {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme === 'night') {
            body.classList.add('night-theme');
            body.classList.remove('day-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = 'Day';
        } else {
            body.classList.add('day-theme');
            body.classList.remove('night-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = 'Night';
        }
    }

    function saveThemePreference(theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }

    function toggleTheme() {
        const isDayTheme = body.classList.contains('day-theme');
        
        if (isDayTheme) {
            body.classList.remove('day-theme');
            body.classList.add('night-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = 'Day';
            saveThemePreference('night');
        } else {
            body.classList.remove('night-theme');
            body.classList.add('day-theme');
            if (themeToggleBtn) themeToggleBtn.textContent = 'Night';
            saveThemePreference('day');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    loadThemePreference();
}

// ============================================
// CART FUNCTIONALITY WITH LOCAL STORAGE
// ============================================
function setupCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartTotalPrice = document.getElementById('cart-total-price');

    function loadCart() {
        const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
    }

    function saveCart() {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }

    function updateCartUI() {
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotalPrice) cartTotalPrice.textContent = `$${total.toFixed(2)}`;
        
        if (cartContent) {
            if (cart.length === 0) {
                cartContent.innerHTML = `
                    <div class="empty-cart">
                        <p>Your cart is empty</p>
                        <p class="empty-cart-subtitle">Add some items to get started!</p>
                    </div>
                `;
            } else {
                cartContent.innerHTML = cart.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}" width="50" height="50">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                        </div>
                        <button class="remove-item" data-index="${index}">&times;</button>
                    </div>
                `).join('');
                
                cartContent.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        removeFromCart(index);
                    });
                });
            }
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }

    window.removeFromCart = removeFromCart;

    function addToCart(item) {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(item);
        }
        
        saveCart();
        updateCartUI();
    }

    window.addToCart = addToCart;

    function openCart() {
        if (cartPanel) cartPanel.classList.add('active');
        if (cartOverlay) cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        if (cartPanel) cartPanel.classList.remove('active');
        if (cartOverlay) cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function handleCheckout() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            alert('Please login to checkout');
            window.location.href = 'account.html';
        } else {
            alert('Proceeding to checkout...');
        }
    }

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    loadCart();
}

// ============================================
// SEARCH BAR WITH WOMEN-SPECIFIC SUGGESTIONS
// ============================================
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');

    let searchHistory = [];

    function loadSearchHistory() {
        const saved = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
        if (saved) {
            searchHistory = JSON.parse(saved);
        }
    }

    function saveToSearchHistory(query) {
        if (!searchHistory.includes(query)) {
            searchHistory.unshift(query);
            searchHistory = searchHistory.slice(0, 10);
            localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchHistory));
        }
    }

    // WOMEN-SPECIFIC SEARCHABLE ITEMS
    const searchableItems = [
        // Pages
        { name: 'Home', page: 'index.html', category: 'page' },
        { name: 'Account', page: 'account.html', category: 'page' },
        { name: 'New', page: 'new.html', category: 'page' },
        { name: 'Women', page: 'women.html', category: 'page' },
        { name: 'About', page: 'about.html', category: 'page' },
        { name: 'Help', page: 'help.html', category: 'page' },
        
        // Women's clothing categories
        { name: 'Kimono', category: 'kimono', element: 'kimono' },
        { name: 'Hoodies', category: 'hoodies', element: 'hoodies' },
        { name: 'Shoes', category: 'shoes', element: 'shoes' },
        { name: 'Accessories', category: 'accessories', element: 'accessories' },
        { name: 'Backpack', category: 'accessories', element: 'accessories' },
        { name: 'Cap', category: 'accessories', element: 'accessories' },
        { name: 'Scarf', category: 'accessories', element: 'accessories' },
        { name: 'T-Shirt', category: 'hoodies', element: 'hoodies' },
        
        // Women's specific filters
        { name: 'Kimono', category: 'filter', filter: 'kimono' },
        { name: 'Hoodies', category: 'filter', filter: 'hoodies' },
        { name: 'Shoes', category: 'filter', filter: 'shoes' },
        { name: 'Accessories', category: 'filter', filter: 'accessories' }
    ];

    function getSearchResults(query) {
        if (!query) return [];
        
        query = query.toLowerCase();
        return searchableItems.filter(item => 
            item.name.toLowerCase().includes(query)
        ).slice(0, 8);
    }

    function displaySuggestions(results) {
        if (!searchSuggestions) return;
        
        searchSuggestions.innerHTML = '';
        
        if (results.length === 0) {
            searchSuggestions.classList.remove('active');
            return;
        }
        
        results.forEach(result => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `
                ${result.name}
                <span class="suggestion-category">${result.category}</span>
            `;
            
            suggestionItem.addEventListener('click', () => {
                handleSearchSelection(result);
            });
            
            searchSuggestions.appendChild(suggestionItem);
        });
        
        searchSuggestions.classList.add('active');
    }

    function handleSearchSelection(result) {
        if (searchInput) searchInput.value = result.name;
        if (searchSuggestions) searchSuggestions.classList.remove('active');
        
        saveToSearchHistory(result.name);
        
        if (result.page) {
            window.location.href = result.page;
        } else if (result.element) {
            handleElementSelection(result);
        } else if (result.filter) {
            handleFilterSelection(result);
        }
        
        if (searchInput) searchInput.value = '';
    }

    function handleElementSelection(result) {
        const categoryMap = {
            'kimono': 'kimono',
            'hoodies': 'hoodies',
            'shoes': 'shoes',
            'accessories': 'accessories'
        };
        
        const category = categoryMap[result.element];
        if (category) {
            const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);
            if (categoryButton) {
                categoryButton.click();
                
                setTimeout(() => {
                    const productsSection = document.getElementById('productsGrid');
                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        }
    }

    function handleFilterSelection(result) {
        const category = result.filter;
        if (category) {
            const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);
            if (categoryButton) {
                categoryButton.click();
                
                setTimeout(() => {
                    const productsSection = document.getElementById('productsGrid');
                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const results = getSearchResults(query);
            displaySuggestions(results);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                const results = getSearchResults(query);
                if (results.length > 0) {
                    handleSearchSelection(results[0]);
                }
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (searchInput && searchSuggestions && 
            !searchInput.contains(e.target) && 
            !searchSuggestions.contains(e.target)) {
            searchSuggestions.classList.remove('active');
        }
    });

    loadSearchHistory();
}

// ============================================
// PRODUCT RENDERING & FILTERING
// ============================================
function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    const filteredProducts = productData.filter(product =>
        category === 'all' || product.category === category
    );

    if (filteredProducts.length === 0) {
        showNoResultsMessage(true);
    } else {
        filteredProducts.forEach((product, index) => {
            const productCard = createProductCard(product, index);
            productsGrid.appendChild(productCard);
        });

        addRatingListeners();
        addCartListeners();
        showNoResultsMessage(false);
    }
}

function createProductCard(product, index) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card slide-in';
    productCard.style.animationDelay = `${index * 0.1}s`;

    const savedRating = loadRating(product.id);

    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product+Image'">
        </div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-desc">${product.description}</div>
        <div class="rating" data-product-id="${product.id}">
            <span class="star ${savedRating >= 1 ? 'active' : ''}" data-rating="1">★</span>
            <span class="star ${savedRating >= 2 ? 'active' : ''}" data-rating="2">★</span>
            <span class="star ${savedRating >= 3 ? 'active' : ''}" data-rating="3">★</span>
            <span class="star ${savedRating >= 4 ? 'active' : ''}" data-rating="4">★</span>
            <span class="star ${savedRating >= 5 ? 'active' : ''}" data-rating="5">★</span>
        </div>
        <button class="btn btn-primary add-to-cart-btn" 
                data-id="${product.id}" 
                data-name="${product.name}" 
                data-price="${product.price}"
                data-image="${product.image}">
            Add to Cart
        </button>
    `;

    return productCard;
}

function filterProducts(searchTerm) {
    const products = document.querySelectorAll('.product-card');
    let hasVisibleProducts = false;

    products.forEach(product => {
        const searchData = product.querySelector('.product-name').textContent.toLowerCase() + " " + 
                          product.querySelector('.product-desc').textContent.toLowerCase();

        if (searchTerm === '' || searchData.includes(searchTerm.toLowerCase())) {
            product.classList.remove('product-hidden');
            hasVisibleProducts = true;
        } else {
            product.classList.add('product-hidden');
        }
    });

    showNoResultsMessage(!hasVisibleProducts);
}

function showNoResultsMessage(show) {
    let message = document.getElementById('noResultsMessage');
    
    if (show) {
        if (!message) {
            message = document.createElement('div');
            message.id = 'noResultsMessage';
            message.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 40px; font-size: 18px; color: #999;';
            message.textContent = 'No products found matching your search.';
            document.getElementById('productsGrid').appendChild(message);
        }
    } else {
        if (message) {
            message.remove();
        }
    }
}

// ============================================
// SEARCH FUNCTIONALITY FOR PRODUCTS
// ============================================
let autocompleteTimeout;

function initializeSearch() {
    const mainSearchInput = document.getElementById('mainSearchInput');
    const navbarSearchInput = document.getElementById('search-input');
    const mainAutocompleteDropdown = document.getElementById('mainAutocompleteDropdown');

    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', function() {
            const searchTerm = this.value;
            filterProducts(searchTerm);
            showAutocomplete(searchTerm, mainAutocompleteDropdown);
            
            if (navbarSearchInput) {
                navbarSearchInput.value = searchTerm;
            }
        });

        mainSearchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value;
                filterProducts(searchTerm);
                if (mainAutocompleteDropdown) {
                    mainAutocompleteDropdown.style.display = 'none';
                }
            }
        });
    }

    if (navbarSearchInput) {
        navbarSearchInput.addEventListener('input', function() {
            const searchTerm = this.value;
            filterProducts(searchTerm);
            
            if (mainSearchInput) {
                mainSearchInput.value = searchTerm;
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (mainAutocompleteDropdown && !e.target.closest('.search-wrapper')) {
            mainAutocompleteDropdown.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (mainAutocompleteDropdown) mainAutocompleteDropdown.style.display = 'none';
            if (mainSearchInput) mainSearchInput.value = '';
            if (navbarSearchInput) navbarSearchInput.value = '';
            filterProducts('');
        }
    });
}

function showAutocomplete(searchTerm, dropdown) {
    clearTimeout(autocompleteTimeout);

    if (!searchTerm.trim()) {
        if (dropdown) dropdown.style.display = 'none';
        return;
    }

    autocompleteTimeout = setTimeout(() => {
        const matches = productData.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 8);

        if (matches.length > 0 && dropdown) {
            dropdown.innerHTML = '';
            matches.forEach(match => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.textContent = `${match.name} - ${match.description}`;
                item.addEventListener('click', function() {
                    const mainSearchInput = document.getElementById('mainSearchInput');
                    const navbarSearchInput = document.getElementById('search-input');
                    
                    if (mainSearchInput) mainSearchInput.value = `${match.name} ${match.description}`;
                    if (navbarSearchInput) navbarSearchInput.value = `${match.name} ${match.description}`;
                    
                    filterProducts(match.name);
                    dropdown.style.display = 'none';
                });
                dropdown.appendChild(item);
            });
            dropdown.style.display = 'block';
        } else if (dropdown) {
            dropdown.style.display = 'none';
        }
    }, 100);
}

// ============================================
// CATEGORY FILTERS
// ============================================
function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            currentCategory = category;
            
            const mainSearchInput = document.getElementById('mainSearchInput');
            const navbarSearchInput = document.getElementById('search-input');
            if (mainSearchInput) mainSearchInput.value = '';
            if (navbarSearchInput) navbarSearchInput.value = '';
            
            renderProducts(category);
        });
    });
}

// ============================================
// RATING SYSTEM
// ============================================
function addRatingListeners() {
    const ratingContainers = document.querySelectorAll('.rating');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const productId = container.getAttribute('data-product-id');
        
        // Load saved rating for this product
        const savedRating = loadRating(productId);
        
        // Set initial state based on saved rating
        updateStarDisplay(stars, savedRating);
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const clickedRating = parseInt(this.getAttribute('data-rating'));
                const currentRating = loadRating(productId);
                
                // If clicking the same star that's already the current rating, reset to 0
                // This allows toggling off by double-clicking the current highest star
                const newRating = (clickedRating === currentRating) ? 0 : clickedRating;
                
                // Update star display with the new rating
                updateStarDisplay(stars, newRating);
                
                // Save the new rating
                saveRating(productId, newRating);
            });
        });
    });
}

function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index + 1 <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function saveRating(productId, rating) {
    const ratings = JSON.parse(localStorage.getItem(STORAGE_KEYS.RATINGS)) || {};
    ratings[productId] = rating;
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
}

function loadRating(productId) {
    const ratings = JSON.parse(localStorage.getItem(STORAGE_KEYS.RATINGS)) || {};
    return ratings[productId] || 0;
}

// ============================================
// CART FUNCTIONALITY FOR PRODUCTS
// ============================================
function addCartListeners() {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
            
            showAddToCartFeedback(this);
        });
    });
}

function showAddToCartFeedback(button) {
    const originalText = button.textContent;
    const originalBackground = button.style.backgroundColor;
    
    button.textContent = 'Added! ✓';
    button.style.backgroundColor = '#4CAF50';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBackground;
        button.disabled = false;
    }, 2000);
}

// ============================================
// INITIALIZATION
// ============================================
function initializeWomenPage() {
    console.log('Initializing Women\'s Catalog...');
    
    setupHamburgerMenu();
    setupThemeToggle();
    setupCart();
    setupSearch();
    
    renderProducts();
    initializeSearch();
    initializeCategoryFilters();
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeWomenPage();
});

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (savedCart) {
            cart = JSON.parse(savedCart);
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
        }
    }
});

window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEYS.CART) {
        const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (savedCart) {
            cart = JSON.parse(savedCart);
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
        }
    }
});