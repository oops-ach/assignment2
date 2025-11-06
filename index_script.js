
const STORAGE_KEYS = {
    THEME: 'demonSlayerTheme',
    CART: 'demonSlayerCart',
    SEARCH_HISTORY: 'demonSlayerSearchHistory'
};


const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function loadThemePreference() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme === 'night') {
        body.classList.add('night-theme');
        body.classList.remove('day-theme');
        themeToggleBtn.textContent = 'Day';
    } else {
        body.classList.add('day-theme');
        body.classList.remove('night-theme');
        themeToggleBtn.textContent = 'Night';
    }
}


function saveThemePreference(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

// Function to toggle theme
function toggleTheme() {
    const isDayTheme = body.classList.contains('day-theme');
    
    if (isDayTheme) {
        body.classList.remove('day-theme');
        body.classList.add('night-theme');
        themeToggleBtn.textContent = 'Day';
        saveThemePreference('night');
    } else {
        body.classList.remove('night-theme');
        body.classList.add('day-theme');
        themeToggleBtn.textContent = 'Night';
        saveThemePreference('day');
    }
}

// Add event listener for theme toggle
themeToggleBtn.addEventListener('click', toggleTheme);

// ============================================
// CART FUNCTIONALITY WITH LOCAL STORAGE
// ============================================
const cartBtn = document.getElementById('cart-btn');
const cartPanel = document.getElementById('cart-panel');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.querySelector('.cart-count');
const cartContent = document.getElementById('cart-content');
const cartTotalPrice = document.getElementById('cart-total-price');

// Cart array
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Calculate total price
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Update cart content
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
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
            </div>
        `).join('');
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// Add item to cart (will be used in other pages)
function addToCart(item) {
    cart.push(item);
    saveCart();
    updateCartUI();
}

// Function to open cart
function openCart() {
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close cart
function closeCart() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Checkout function - requires login
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Check if user is logged in (you can implement this check)
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        alert('Please login to checkout');
        window.location.href = 'account.html';
    } else {
        // Proceed with checkout
        alert('Proceeding to checkout...');
        // Add your checkout logic here
    }
}

// Event listeners for cart
cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ============================================
// SEARCH BAR WITH SUGGESTIONS AND HISTORY
// ============================================
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');

// Search history
let searchHistory = [];

// Load search history
function loadSearchHistory() {
    const saved = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    if (saved) {
        searchHistory = JSON.parse(saved);
    }
}

// Save search to history
function saveToSearchHistory(query) {
    if (!searchHistory.includes(query)) {
        searchHistory.unshift(query);
        searchHistory = searchHistory.slice(0, 10); // Keep only last 10 searches
        localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchHistory));
    }
}

// All searchable items with their categories and pages
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

// Function to filter search results
function getSearchResults(query) {
    if (!query) return [];
    
    query = query.toLowerCase();
    return searchableItems.filter(item => 
        item.name.toLowerCase().includes(query)
    ).slice(0, 8); // Limit to 8 results
}

// Function to display search suggestions
function displaySuggestions(results) {
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

// Function to handle search selection
function handleSearchSelection(result) {
    searchInput.value = result.name;
    searchSuggestions.classList.remove('active');
    
    // Save to search history
    saveToSearchHistory(result.name);
    
    // Handle different types of results
    if (result.page) {
        // Navigate to page
        window.location.href = result.page;
    } else if (result.element) {
        // Filter and scroll to element
        const element = document.querySelector(`[data-name="${result.element}"]`);
        if (element) {
            // Apply filter first
            const category = element.getAttribute('data-category');
            filterProducts(category);
            
            // Update active filter button
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`[data-filter="${category}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            
            // Scroll to gallery section
            setTimeout(() => {
                const galleryContainer = document.querySelector('.gallery_container');
                galleryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Highlight the selected item
                element.style.border = '3px solid #eb3636';
                setTimeout(() => {
                    element.style.border = '';
                }, 2000);
            }, 300);
        }
    } else if (result.filter) {
        // Apply filter
        filterProducts(result.filter);
        
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-filter="${result.filter}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Scroll to gallery
        setTimeout(() => {
            const galleryContainer = document.querySelector('.gallery_container');
            galleryContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
    
    searchInput.value = '';
}

// Event listener for search input
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    const results = getSearchResults(query);
    displaySuggestions(results);
});

// Handle Enter key in search
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value;
        const results = getSearchResults(query);
        if (results.length > 0) {
            handleSearchSelection(results[0]);
        }
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.classList.remove('active');
    }
});

// ============================================
// READ MORE BUTTON
// ============================================
// Function to toggle read more/less
function toggleReadMore() {
    const readMoreBtn = document.getElementById('read-more-btn');
    const fullContent = document.querySelector('.full-content');
    
    if (readMoreBtn && fullContent) {
        if (fullContent.style.display === 'none' || fullContent.style.display === '') {
            fullContent.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
            readMoreBtn.style.backgroundColor = '#555';
        } else {
            fullContent.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.style.backgroundColor = '#eb3636';
        }
    }
}

// ============================================
// DISCOUNT BOX
// ============================================
const discountBox = document.getElementById('discount-box');
const closeDiscountBtn = document.getElementById('close-discount');

// Function to close discount box
function closeDiscountBox() {
    discountBox.style.display = 'none';
    discountBox.classList.add('hidden');
}

// Add event listener for close button
closeDiscountBtn.addEventListener('click', closeDiscountBox);

// ============================================
// KEYBOARD NAVIGATION
// ============================================
const menuItems = document.querySelectorAll('.menu-item');
let currentMenuIndex = 0;

// Function to focus menu item
function focusMenuItem(index) {
    menuItems[index].focus();
    currentMenuIndex = index;
}

// Handle keyboard navigation
document.addEventListener('keydown', (event) => {
    // Only handle arrow keys when no input is focused
    if (document.activeElement.tagName === 'INPUT') {
        return;
    }
    
    switch (event.key) {
        case 'ArrowRight':
            event.preventDefault();
            currentMenuIndex = (currentMenuIndex + 1) % menuItems.length;
            focusMenuItem(currentMenuIndex);
            break;
            
        case 'ArrowLeft':
            event.preventDefault();
            currentMenuIndex = (currentMenuIndex - 1 + menuItems.length) % menuItems.length;
            focusMenuItem(currentMenuIndex);
            break;
            
        case 'ArrowDown':
            event.preventDefault();
            currentMenuIndex = Math.min(currentMenuIndex + 1, menuItems.length - 1);
            focusMenuItem(currentMenuIndex);
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            currentMenuIndex = Math.max(currentMenuIndex - 1, 0);
            focusMenuItem(currentMenuIndex);
            break;
    }
});

// ============================================
// PRODUCT FILTERING
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryGrid = document.getElementById('gallery-grid');
const galleryTitle = document.getElementById('gallery_id');

// Function to filter products using switch statement
function filterProducts(category) {
    const items = document.querySelectorAll('.gallery_img');
    let visibleCount = 0;
    
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        switch (category) {
            case 'all':
                item.classList.remove('hidden');
                item.style.display = 'block';
                visibleCount++;
                break;
                
            case 'clothes':
                if (itemCategory === 'clothes') {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
                break;
                
            case 'shoes':
                if (itemCategory === 'shoes') {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
                break;
                
            case 'new':
                if (itemCategory === 'new') {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
                break;
                
            default:
                item.classList.remove('hidden');
                item.style.display = 'block';
                visibleCount++;
        }
    });
    
    // Update gallery title with filtered count
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    galleryTitle.textContent = `Demon Slayer Best Selling Categories - ${categoryName} (${visibleCount} Items)`;
    
    // Add animation to gallery items
    animateGalleryItems();
}

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter category
        const category = button.getAttribute('data-filter');
        
        // Filter products
        filterProducts(category);
    });
});

// ============================================
// OBJECTS AND DATA
// ============================================
const productData = {
    totalProducts: 9,
    categories: ['clothes', 'shoes', 'new'],
    
    getProductCount: function(category) {
        if (category === 'all') return this.totalProducts;
        const items = document.querySelectorAll(`[data-category="${category}"]`);
        return items.length;
    },
    
    displayInfo: function() {
        console.log(`Total Products: ${this.totalProducts}`);
        console.log(`Categories: ${this.categories.join(', ')}`);
    }
};

// Arrays and Loops
const products = [
    { name: 'Hoodies', category: 'clothes', price: 50 },
    { name: 'T-Shirt', category: 'clothes', price: 25 },
    { name: 'Shoes', category: 'shoes', price: 80 },
    { name: 'Kimonos', category: 'clothes', price: 120 },
    { name: 'Decors', category: 'new', price: 15 },
    { name: 'Phone-Cases', category: 'new', price: 20 },
    { name: 'Mugs', category: 'new', price: 12 },
    { name: 'Figures', category: 'new', price: 35 },
    { name: 'Masks', category: 'new', price: 18 }
];

// Loop through products and log information
function displayProductInfo() {
    for (let i = 0; i < products.length; i++) {
        console.log(`Product ${i + 1}: ${products[i].name} - $${products[i].price}`);
    }
}

// Higher-Order Functions
// Using map to create product names array
const productNames = products.map(product => product.name);

// Using filter to get products by category
const clothesProducts = products.filter(product => product.category === 'clothes');

// Using forEach to add hover effect
const galleryItems = document.querySelectorAll('.gallery_img');
galleryItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05) rotate(2deg)';
        item.style.boxShadow = '0 8px 20px rgba(235, 54, 54, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.05)';
    });
});

// ============================================
// ANIMATIONS
// ============================================
function animateGalleryItems() {
    const visibleItems = document.querySelectorAll('.gallery_img:not(.hidden)');
    
    visibleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Demon Slayer Shop Loaded!');
    console.log('Product Data:', productData);
    productData.displayInfo();
    displayProductInfo();
    
    // Load user preferences
    loadThemePreference();
    loadCart();
    loadSearchHistory();
    
    // Update gallery title on page load
    let itemCount = galleryItems.length;
    galleryTitle.textContent = `Demon Slayer Best Selling Categories (${itemCount} Items)`;
    
    // Add checkout event listener
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Initial animation for gallery items
    setTimeout(() => {
        animateGalleryItems();
    }, 500);
    
    // Log higher-order function results
    console.log('Product Names:', productNames);
    console.log('Clothes Products:', clothesProducts);
});