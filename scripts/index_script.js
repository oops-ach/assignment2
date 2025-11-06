

// Selecting and Manipulating HTML Elements
const galleryItems = document.querySelectorAll('.gallery_img');
const galleryTitle = document.getElementById('gallery_id');

// Modify content dynamically - Update gallery title on page load
window.addEventListener('load', () => {
    let itemCount = galleryItems.length;
    galleryTitle.textContent = `Demon Slayer Best Selling Categories (${itemCount} Items)`;
});

// Dynamic Style Changes - Day/Night Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Object to store theme settings
const themeSettings = {
    day: {
        icon: '🌙',
        class: 'day-theme'
    },
    night: {
        icon: '☀️',
        class: 'night-theme'
    }
};

// Function to toggle theme
function toggleTheme() {
    const isDayTheme = body.classList.contains('day-theme') || !body.classList.contains('night-theme');
    
    if (isDayTheme) {
        body.classList.remove('day-theme');
        body.classList.add('night-theme');
        themeIcon.textContent = themeSettings.night.icon;
        playSound();
    } else {
        body.classList.remove('night-theme');
        body.classList.add('day-theme');
        themeIcon.textContent = themeSettings.day.icon;
        playSound();
    }
}

// Add event listener for theme toggle
themeToggleBtn.addEventListener('click', toggleTheme);

// Manipulating Attributes - Read More Button
const readMoreBtn = document.getElementById('read-more-btn');
const fullContent = document.querySelector('.full-content');

// Function to toggle read more/less
function toggleReadMore() {
    if (fullContent.style.display === 'none' || fullContent.style.display === '') {
        fullContent.style.display = 'block';
        readMoreBtn.textContent = 'Read Less';
        readMoreBtn.style.backgroundColor = '#555';
        playSound();
    } else {
        fullContent.style.display = 'none';
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.style.backgroundColor = '#eb3636';
        playSound();
    }
}

// Add event listener for read more button
readMoreBtn.addEventListener('click', toggleReadMore);


// Event Listeners on Buttons - Close Discount Box
const discountBox = document.getElementById('discount-box');
const closeDiscountBtn = document.getElementById('close-discount');

// Function to close discount box
function closeDiscountBox() {
    discountBox.style.display = 'none';
    discountBox.classList.add('hidden');
    playSound();
    
    // Modify content dynamically

    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Add event listener for close button
closeDiscountBtn.addEventListener('click', closeDiscountBox);

// Keyboard Event Handling - Arrow Key Navigation
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
            playSound();
            break;
            
        case 'ArrowLeft':
            event.preventDefault();
            currentMenuIndex = (currentMenuIndex - 1 + menuItems.length) % menuItems.length;
            focusMenuItem(currentMenuIndex);
            playSound();
            break;
            
        case 'ArrowDown':
            event.preventDefault();
            currentMenuIndex = Math.min(currentMenuIndex + 1, menuItems.length - 1);
            focusMenuItem(currentMenuIndex);
            playSound();
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            currentMenuIndex = Math.max(currentMenuIndex - 1, 0);
            focusMenuItem(currentMenuIndex);
            playSound();
            break;
    }
});

// Switch Statements - Product Filtering System
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryGrid = document.getElementById('gallery-grid');

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
        
        // Play sound
        playSound();
    });
});


// Objects and Methods
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

// Play Sounds
function playSound() {
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}

// Animations
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
// 4. ADDITIONAL FEATURES
// ============================================

// // Animate Counter Numbers
// function animateCounter() {
//     const counters = document.querySelectorAll('.count');
    
//     counters.forEach(counter => {
//         const target = parseInt(counter.getAttribute('data-target'));
//         const duration = 2000; // 2 seconds
//         const increment = target / (duration / 16); // 60 FPS
//         let current = 0;
        
//         const timer = setInterval(() => {
//             current += increment;
//             if (current >= target) {
//                 counter.textContent = target;
//                 clearInterval(timer);
//             } else {
//                 counter.textContent = Math.floor(current);
//             }
//         }, 16);
//     });
// }

// // Trigger counter animation when in viewport
// const statsSection = document.querySelector('.stats');
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             animateCounter();
//             observer.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.5 });

// if (statsSection) {
//     observer.observe(statsSection);
// }

// Subscribe Form Handling
// const subscribeForm = document.getElementById('subscribe-form');

// subscribeForm.addEventListener('submit', (event) => {
//     event.preventDefault();
    
//     const emailInput = subscribeForm.querySelector('input[type="email"]');
//     const email = emailInput.value;
    
//     // Show success message
//     const successMessage = document.createElement('div');
//     successMessage.textContent = `Thank you for subscribing with ${email}!`;
//     successMessage.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #4CAF50; color: white; padding: 20px 40px; border-radius: 10px; z-index: 10000; font-size: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);';
//     document.body.appendChild(successMessage);
    
//     // Play sound
//     playSound();
    
//     // Clear input
//     emailInput.value = '';
    
//     // Remove message after 3 seconds
//     setTimeout(() => {
//         successMessage.style.opacity = '0';
//         successMessage.style.transition = 'opacity 0.5s ease';
//         setTimeout(() => successMessage.remove(), 500);
//     }, 3000);
// });

// ============================================
// 5. INITIALIZATION
// ============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Demon Slayer Shop Loaded!');
    console.log('Product Data:', productData);
    productData.displayInfo();
    displayProductInfo();
    
    // Set initial theme
    body.classList.add('day-theme');
    
    // Initial animation for gallery items
    setTimeout(() => {
        animateGalleryItems();
    }, 500);
    
    // Log higher-order function results
    console.log('Product Names:', productNames);
    console.log('Clothes Products:', clothesProducts);
});

