// ============================================
// STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
    THEME: 'demonSlayerTheme',
    CART: 'demonSlayerCart',
    SEARCH_HISTORY: 'demonSlayerSearchHistory'
};

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
        if (cartCount) cartCount.textContent = cart.length;
        
        const total = cart.reduce((sum, item) => sum + item.price, 0);
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
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
                    </div>
                `).join('');
            }
        }
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }

    function addToCart(item) {
        cart.push(item);
        saveCart();
        updateCartUI();
    }

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

    loadCart();
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
// KEYBOARD NAVIGATION
// ============================================
function setupKeyboardNavigation() {
    const keyboardMenuItems = document.querySelectorAll('.menu-item');
    let currentMenuIndex = 0;

    function focusMenuItem(index) {
        if (keyboardMenuItems[index]) {
            keyboardMenuItems[index].focus();
            currentMenuIndex = index;
        }
    }

    document.addEventListener('keydown', (event) => {
        if (document.activeElement.tagName === 'INPUT') {
            return;
        }
        
        switch (event.key) {
            case 'ArrowRight':
                event.preventDefault();
                currentMenuIndex = (currentMenuIndex + 1) % keyboardMenuItems.length;
                focusMenuItem(currentMenuIndex);
                break;
                
            case 'ArrowLeft':
                event.preventDefault();
                currentMenuIndex = (currentMenuIndex - 1 + keyboardMenuItems.length) % keyboardMenuItems.length;
                focusMenuItem(currentMenuIndex);
                break;
                
            case 'ArrowDown':
                event.preventDefault();
                currentMenuIndex = Math.min(currentMenuIndex + 1, keyboardMenuItems.length - 1);
                focusMenuItem(currentMenuIndex);
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                currentMenuIndex = Math.max(currentMenuIndex - 1, 0);
                focusMenuItem(currentMenuIndex);
                break;
        }
    });
}


// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Demon Slayer Shop Loaded!');
    
    // Setup all functionality
    setupHamburgerMenu();
    setupThemeToggle();
    setupCart();
    setupSearch();
    setupDiscountBox();
    setupKeyboardNavigation();
    setupProductFiltering();
    
    // Initialize Read More button
    initializeReadMore();
    
    // Update gallery title on page load
    const galleryTitle = document.getElementById('gallery_id');
    const galleryItems = document.querySelectorAll('.gallery_img');
    if (galleryTitle && galleryItems.length > 0) {
        galleryTitle.textContent = `Demon Slayer Best Selling Categories (${galleryItems.length} Items)`;
    }
    
    // Add checkout event listener
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Initial animation for gallery items
    setTimeout(() => {
        animateGalleryItems();
    }, 500);
    
    // Add hover effects to gallery items
    galleryItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(1deg)';
            item.style.boxShadow = '0 8px 20px rgba(235, 54, 54, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            item.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.08)';
        });
    });
});


$(window).on('load', function() {
  setTimeout(function() {
    $('#loader').fadeOut(500);
  }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          formStatus.textContent = "Thank you for your message, we will get back to you soon!";
          formStatus.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          formStatus.textContent = "Something went wrong. Please try again.";
          formStatus.style.color = "red";
        });
    });
  }
});

$('.copy-btn').on('click', function() {
  var $button = $(this);
  var textToCopy = $button.data('clipboard-target');
  var text = $(textToCopy).text();

  var $textarea = $('<textarea>');
  $textarea.val(text).css({position: 'fixed', opacity: 0});
  $('body').append($textarea);
  $textarea.select();

  $(document).one('copy', function() {
    $button.addClass('copied');
    $button.html('✓ Copied');
    $button.attr('title', 'Copied to clipboard!');
    
    setTimeout(function() {
      $button.removeClass('copied');
      $button.html('Copy');
      $button.removeAttr('title');
    }, 2000);
  });

  try {
    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('Copy command failed');
    }
  } catch (err) {
    console.error('Unable to copy', err);
  } finally {
    $textarea.remove();
  }
});


$(document).ready(function () {
  $(".faq-answer").hide();

  $(".faq-question").on("click", function () {
    var answer = $(this).next(".faq-answer");
    answer.slideToggle();

    $(this).toggleClass("highlight");
  });

  $(window).on('load', function () {
    setTimeout(function () {
      $('#loader').fadeOut(500);
    }, 2000);
  });
});
