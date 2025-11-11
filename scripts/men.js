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
// PRODUCT DATA
// ============================================
const productData = [
    { id: 1, name: 'Demon Slayer Shoes', price: 120.00, category: 'shoes', image: 'photos/demon_slayer.png', description: 'Rivalry Low Demon Slayer' },
    { id: 2, name: 'Ken Kaneki Hoodie', price: 109.00, category: 'hoodies', image: 'photos/Ken_Kaneki_Hoodie.png', description: 'Zip-Up Active Top' },
    { id: 3, name: 'Attack on Titan Shoes', price: 184.00, category: 'shoes', image: 'photos/attack_on_titan.png', description: 'Levi Ackerman High Top' },
    { id: 4, name: 'One Piece Sneakers', price: 120.00, category: 'shoes', image: 'photos/one_piece.png', description: 'Zoro Low Top Sneakers' },
    { id: 5, name: 'Naruto Sneakers', price: 135.00, category: 'shoes', image: 'photos/naruto_shoes.png', description: 'Nara Shikamaru AF1 Shoes' },
    { id: 6, name: 'Bleach Sneakers', price: 113.00, category: 'shoes', image: 'photos/bleach.png', description: 'BLEACH x ASICS Sneaker Collaboration' },
    { id: 7, name: 'Tokyo Ghoul Sneakers', price: 140.00, category: 'shoes', image: 'photos/tokyo.png', description: 'Ken Kaneki High Top Shoes' },
    { id: 8, name: 'Itachi Naruto Shoes', price: 105.00, category: 'shoes', image: 'photos/naruto_itachi.png', description: 'Akatsuki Itachi Shoes' },
    { id: 9, name: 'Hinata Sneakers', price: 185.00, category: 'shoes', image: 'photos/hinata_sneakers.jpg', description: 'Premium Hinata Sneakers' }
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

    // Menu items configuration for different screen sizes
    const menuConfig = {
        // Condition 1: All items in hamburger (handled by CSS)
        // Condition 2: Home & Account in navbar, others in hamburger (910px-1049px)
        '910-1049': ['New', 'Men', 'Women', 'Kids', 'About', 'Help'],
        // Condition 3: Home, Account, New in navbar; others in hamburger (1050px-1279px)
        '1050-1279': ['Men', 'Women', 'Kids', 'About', 'Help'],
        // Condition 4: Home, Account, New, Men, Women in navbar; Kids, About, Help in hamburger (1280px-1419px)
        '1280-1419': ['Kids', 'About', 'Help'],
        // Condition 5: Home, Account, New, Men, Women, Kids in navbar; About, Help in hamburger (1420px-1519px)
        '1420-1519': ['About', 'Help']
    };

    function getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= 909) return 'mobile';
        if (width >= 910 && width <= 1049) return '910-1049';
        if (width >= 1050 && width <= 1279) return '1050-1279';
        if (width >= 1280 && width <= 1419) return '1280-1419';
        if (width >= 1420 && width <= 1519) return '1420-1519';
        return 'desktop'; // 1520px and above
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
            // Mobile menu behavior
            if (headerMenu) headerMenu.classList.toggle('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = headerMenu && headerMenu.classList.contains('active') ? 'hidden' : '';
        } else {
            // Desktop dropdown behavior
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

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburgerMenu && hamburgerDropdown && 
            !hamburgerMenu.contains(e.target) && 
            !hamburgerDropdown.contains(e.target)) {
            closeAllMenus();
        }
    });

    // Close dropdown when clicking on a dropdown item
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                closeAllMenus();
            }
        });
    }

    // Repopulate dropdown on resize
    window.addEventListener('resize', () => {
        populateDropdown();
        closeAllMenus();
        
        // Update search bar visibility based on screen size
        updateSearchBarVisibility();
    });

    // Function to update search bar visibility
    function updateSearchBarVisibility() {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer) return;
        
        const width = window.innerWidth;
        
        if (width >= 610 && width <= 909) {
            // Show search bar for 610px to 909px
            searchContainer.style.display = 'block';
        } else if (width < 610) {
            // Hide search bar below 610px
            searchContainer.style.display = 'none';
        }
        // For other sizes, CSS handles the display
    }

    // Initial population and setup
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
                
                // Add event listeners to remove buttons
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

    // Make removeFromCart globally available
    window.removeFromCart = removeFromCart;

    function addToCart(item) {
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex > -1) {
            // Update quantity if item exists
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item to cart
            cart.push(item);
        }
        
        saveCart();
        updateCartUI();
    }

    // Make addToCart globally available for product buttons
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

    // Add checkout event listener
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    loadCart();
}

// ============================================
// SEARCH BAR WITH SUGGESTIONS AND HISTORY
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

    const searchableItems = [
        { name: 'Home', page: 'index.html', category: 'page' },
        { name: 'Account', page: 'account.html', category: 'page' },
        { name: 'New', page: 'new.html', category: 'page' },
        { name: 'Men', page: 'men.html', category: 'page' },
        { name: 'Women', page: 'women.html', category: 'page' },
        { name: 'Kids', page: 'kids.html', category: 'page' },
        { name: 'About', page: 'about.html', category: 'page' },
        { name: 'Help', page: 'help.html', category: 'page' },
        { name: 'Hoodies', category: 'clothes', element: 'hoodies' },
        { name: 'T-Shirt', category: 'clothes', element: 't-shirt' },
        { name: 'Shoes', category: 'shoes', element: 'shoes' },
        { name: 'Kimonos', category: 'clothes', element: 'kimonos' },
        { name: 'Decors', category: 'new', element: 'decors' },
        { name: 'Phone-Cases', category: 'new', element: 'phone-cases' },
        { name: 'Mugs', category: 'new', element: 'mugs' },
        { name: 'Figures', category: 'new', element: 'figures' },
        { name: 'Masks', category: 'new', element: 'masks' },
        { name: 'Clothes', category: 'filter', filter: 'clothes' },
        { name: 'New Items', category: 'filter', filter: 'new' }
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
        }
        // For product search, we'll filter the products
        filterProductsByName(result.name);
        
        if (searchInput) searchInput.value = '';
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

    // Load saved rating for this product
    const savedRating = loadRating(product.id);

    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Product+Image'">
        </div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-desc">${product.description}</div>
        <div class="rating" data-product-id="${product.id}">
            <span class="star" data-rating="1">★</span>
            <span class="star" data-rating="2">★</span>
            <span class="star" data-rating="3">★</span>
            <span class="star" data-rating="4">★</span>
            <span class="star" data-rating="5">★</span>
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

function filterProductsByName(productName) {
    filterProducts(productName);
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
// SEARCH BAR WITH SUGGESTIONS AND HISTORY
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

    // Filtered searchable items - only show men's relevant items
    const searchableItems = [
        // Pages
        { name: 'Home', page: 'index.html', category: 'page' },
        { name: 'Account', page: 'account.html', category: 'page' },
        { name: 'New', page: 'new.html', category: 'page' },
        { name: 'Men', page: 'men.html', category: 'page' },
        { name: 'About', page: 'about.html', category: 'page' },
        { name: 'Help', page: 'help.html', category: 'page' },
        
        // Men's clothing categories
        { name: 'Hoodies', category: 'clothes', element: 'hoodies' },
        { name: 'T-Shirt', category: 'clothes', element: 't-shirt' },
        { name: 'Shoes', category: 'shoes', element: 'shoes' },
        { name: 'Kimonos', category: 'clothes', element: 'kimonos' },
        
        // Men's specific filters
        { name: 'Clothes', category: 'filter', filter: 'clothes' },
        { name: 'Shoes', category: 'filter', filter: 'shoes' }
        
        // Removed non-men items: Decors, Phone-Cases, Mugs, Figures, Masks, Women, Kids
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
            // Handle element selection for men's page
            handleElementSelection(result);
        } else if (result.filter) {
            // Handle filter selection for men's page
            handleFilterSelection(result);
        }
        
        if (searchInput) searchInput.value = '';
    }

    function handleElementSelection(result) {
        // For men's page, we can filter products by category when an element is selected
        const categoryMap = {
            'hoodies': 'hoodies',
            't-shirt': 'hoodies', // Map t-shirt to hoodies category
            'shoes': 'shoes',
            'kimonos': 'hoodies' // Map kimonos to hoodies category
        };
        
        const category = categoryMap[result.element];
        if (category) {
            // Find and click the corresponding category button
            const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);
            if (categoryButton) {
                categoryButton.click();
                
                // Scroll to products section
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
        // Handle filter selection for men's page
        const categoryMap = {
            'clothes': 'hoodies',
            'shoes': 'shoes'
        };
        
        const category = categoryMap[result.filter];
        if (category) {
            const categoryButton = document.querySelector(`.category-btn[data-category="${category}"]`);
            if (categoryButton) {
                categoryButton.click();
                
                // Scroll to products section
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
            
            // Sync with navbar search
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
            
            // Sync with main search
            if (mainSearchInput) {
                mainSearchInput.value = searchTerm;
            }
        });
    }

    // Close autocomplete when clicking outside
    document.addEventListener('click', function(e) {
        if (mainAutocompleteDropdown && !e.target.closest('.search-wrapper')) {
            mainAutocompleteDropdown.style.display = 'none';
        }
    });

    // Clear search with Escape key
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
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Get category and filter products
            const category = this.getAttribute('data-category');
            currentCategory = category;
            
            // Clear search inputs
            const mainSearchInput = document.getElementById('mainSearchInput');
            const navbarSearchInput = document.getElementById('search-input');
            if (mainSearchInput) mainSearchInput.value = '';
            if (navbarSearchInput) navbarSearchInput.value = '';
            
            // Render products for selected category
            renderProducts(category);
        });
    });
}

// ============================================
// RATING SYSTEM - PROPERLY FIXED (No toggle on double click)
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
        // Add active class to stars with rating less than or equal to the current rating
        // Note: index + 1 because stars are 1-indexed
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
// CART FUNCTIONALITY FOR PRODUCTS - FIXED
// ============================================
function addCartListeners() {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');
            
            // Add to cart using the global addToCart function
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
            
            // Visual feedback
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
function initializeMenPage() {
    console.log('Initializing Men\'s Catalog...');
    
    // Setup core functionality
    setupHamburgerMenu();
    setupThemeToggle();
    setupCart();
    setupSearch();
    
    // Setup product-specific functionality
    renderProducts();
    initializeSearch();
    initializeCategoryFilters();
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeMenPage();
});

// Handle page visibility changes (for cart sync)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Reload cart from storage to sync
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

// Handle storage changes (for multi-tab sync)
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