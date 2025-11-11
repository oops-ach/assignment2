// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
    THEME: 'demonSlayerTheme',
    CART: 'demonSlayerCart',
    REGISTERED_USERS: 'demonSlayerUsers',
    SEARCH_HISTORY: 'demonSlayerSearchHistory'
};

let registeredUsers = [
    { username: 'demo', email: 'demo@demonslayer.com', password: 'demo123', fullname: 'Demo User' }
];

// Load registered users from localStorage
function loadRegisteredUsers() {
    const savedUsers = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    if (savedUsers) {
        registeredUsers = JSON.parse(savedUsers);
    }
}

function saveRegisteredUsers() {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(registeredUsers));
}

// ============================================
// CART MANAGEMENT - FIXED
// ============================================
let cart = [];

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
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
    renderCartItems();
}

function renderCartItems() {
    const cartContent = document.getElementById('cart-content');
    if (!cartContent) return;

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p class="empty-cart-subtitle">Add some items to get started!</p>
            </div>
        `;
        document.getElementById('cart-total-price').textContent = '$0.00';
        return;
    }

    let cartItemsHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItemsHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" width="60" height="60" style="object-fit: cover; border-radius: 5px;">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                    <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            </div>
        `;
    });

    cartContent.innerHTML = cartItemsHTML;
    document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    cartContent.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.getAttribute('data-id');
            removeFromCart(itemId);
        });
    });
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
}

// Function to add item to cart (for other pages to use)
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Show success message
    showMessage(`${product.name} added to cart!`, true);
}

// ============================================
// SIMPLE CHECKOUT - CLEARS CART AFTER LOGIN
// ============================================
function handleCheckout() {
    if (cart.length === 0) {
        showMessage('Your cart is empty!', false);
        return;
    }

    if (!currentUser) {
        showMessage('Please log in first!', false);
        return;
    }

    // User is logged in - clear cart completely
    cart = [];
    saveCart();
    updateCartUI();
    showMessage('Checkout successful! Cart cleared.', true);
    closeCart();
}

// Add event listener to checkout button
document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);

// ============================================
// HAMBURGER MENU MANAGEMENT
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

    function toggleTheme() {
        const isDayTheme = body.classList.contains('day-theme');
        
        if (isDayTheme) {
            body.classList.remove('day-theme');
            body.classList.add('night-theme');
            themeToggleBtn.textContent = 'Day';
            localStorage.setItem(STORAGE_KEYS.THEME, 'night');
        } else {
            body.classList.remove('night-theme');
            body.classList.add('day-theme');
            themeToggleBtn.textContent = 'Night';
            localStorage.setItem(STORAGE_KEYS.THEME, 'day');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    loadThemePreference();
}

// ============================================
// CART PANEL FUNCTIONALITY
// ============================================
function setupCartPanel() {
    const cartBtn = document.getElementById('cart-btn');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');

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

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
}

// ============================================
// SEARCH FUNCTIONALITY
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
        { name: 'Help', page: 'help.html', category: 'page' }
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
// AUTHENTICATION FUNCTIONALITY
// ============================================
function setupAuth() {
    const registerModal = document.getElementById('register-modal');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    const successAudio = document.getElementById('success-sound');
    const failAudio = document.getElementById('fail-sound');

    function playSound(isSuccess) {
        const audio = isSuccess ? successAudio : failAudio;
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    }

    function openModal() {
        registerModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunction() {
        registerModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    function showMessage(message, isSuccess = true) {
        const element = isSuccess ? successMessage : errorMessage;
        element.textContent = message;
        element.className = isSuccess ? 'success-message show' : 'error-message show';
        
        setTimeout(() => {
            element.classList.remove('show');
        }, 4000);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function usernameExists(username) {
        return registeredUsers.some(user => user.username.toLowerCase() === username.toLowerCase());
    }

    function emailExists(email) {
        return registeredUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    if (registerLink) {
        registerLink.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            closeModalFunction();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    registerModal.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            closeModalFunction();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && registerModal.classList.contains('show')) {
            closeModalFunction();
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;
            
            if (!username || !password) {
                showMessage('Please fill in all fields!', false);
                playSound(false);
                return;
            }
            
            const user = registeredUsers.find(u => 
                (u.username.toLowerCase() === username.toLowerCase() || 
                u.email.toLowerCase() === username.toLowerCase()) && 
                u.password === password
            );
            
            if (user) {
                showMessage(`Welcome back, ${user.fullname}! Login successful.`);
                playSound(true);
                loginForm.reset();
            } else {
                showMessage('Invalid username/email or password!', false);
                playSound(false);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const fullname = document.getElementById('register-fullname').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            if (!fullname || !email || !username || !password || !confirmPassword) {
                showMessage('Please fill in all fields!', false);
                playSound(false);
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address!', false);
                playSound(false);
                return;
            }
            
            if (usernameExists(username)) {
                showMessage('Username already exists! Please choose another one.', false);
                playSound(false);
                return;
            }
            
            if (emailExists(email)) {
                showMessage('Email already registered! Please use another email.', false);
                playSound(false);
                return;
            }
            
            if (password.length < 6) {
                showMessage('Password must be at least 6 characters long!', false);
                playSound(false);
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match!', false);
                playSound(false);
                return;
            }
            
            if (!termsAccepted) {
                showMessage('You must agree to the Terms and Conditions!', false);
                playSound(false);
                return;
            }
            
            const newUser = {
                fullname: fullname,
                email: email,
                username: username,
                password: password
            };
            
            registeredUsers.push(newUser);
            saveRegisteredUsers();
            
            showMessage(`Account created successfully! Welcome, ${fullname}!`);
            playSound(true);
            registerForm.reset();
            
            setTimeout(() => {
                closeModalFunction();
            }, 2000);
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Account Page Loaded!');
    
    // Load saved data
    loadRegisteredUsers();
    loadCart();
    
    // Setup all functionality
    setupHamburgerMenu();
    setupThemeToggle();
    setupCartPanel();
    setupSearch();
    setupAuth();
    
    // Add animation to card
    const card = document.querySelector('.card');
    if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }
});




// Make functions available globally for other pages
window.addToCart = addToCart;
window.updateCartUI = updateCartUI;