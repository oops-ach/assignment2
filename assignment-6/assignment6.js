// Product data using objects and arrays
const products = [
    {
        id: 1,
        name: "Tanjiro's Haori Jacket",
        price: "$89.99",
        category: "clothing",
        emoji: "🧥",
        description: "High-quality replica of Tanjiro's iconic green and black checkered haori. Made with premium materials."
    },
    {
        id: 2,
        name: "Nezuko Plushie",
        price: "$34.99",
        category: "collectibles",
        emoji: "🧸",
        description: "Adorable Nezuko plush toy with her signature pink kimono. Perfect for any Demon Slayer fan!"
    },
    {
        id: 3,
        name: "Nichirin Sword Keychain",
        price: "$19.99",
        category: "accessories",
        emoji: "🗝️",
        description: "Miniature Nichirin blade keychain with interchangeable colors. Durable metal construction."
    },
    {
        id: 4,
        name: "Zenitsu Hoodie",
        price: "$79.99",
        category: "clothing",
        emoji: "👕",
        description: "Comfortable yellow hoodie inspired by Zenitsu. Features lightning bolt design and character artwork."
    },
    {
        id: 5,
        name: "Hashira Pins Set",
        price: "$44.99",
        category: "accessories",
        emoji: "📌",
        description: "Complete set of 9 Hashira enamel pins. Collectible quality with detailed designs."
    },
    {
        id: 6,
        name: "Demon Slayer Figure",
        price: "$129.99",
        category: "collectibles",
        emoji: "🎭",
        description: "Premium action figure with multiple accessories and interchangeable parts. Limited edition."
    }
];

// DOM element selection
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const showTimeBtn = document.getElementById('showTimeBtn');
const currentTime = document.getElementById('currentTime');
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const resetBtn = document.getElementById('resetBtn');
const successMessage = document.getElementById('successMessage');

// Sound effects (simple beep sounds using Web Audio API)
function playSound(frequency = 400, duration = 100) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Theme toggle with animation
themeToggle.addEventListener('click', function () {
    playSound(600, 100);

    if (body.classList.contains('day-theme')) {
        body.classList.remove('day-theme');
        body.classList.add('night-theme');
        themeToggle.textContent = '☀️ Day Mode';
        body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            body.style.transform = 'scale(1)';
        }, 200);
    } else {
        body.classList.remove('night-theme');
        body.classList.add('day-theme');
        themeToggle.textContent = '🌙 Night Mode';
        body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            body.style.transform = 'scale(1)';
        }, 200);
    }
});

// Show current time
showTimeBtn.addEventListener('click', function () {
    playSound(700, 100);
    const time = new Date().toLocaleTimeString();
    currentTime.textContent = `Current Time: ${time}`;
    currentTime.classList.remove('hidden');
    currentTime.style.transform = 'scale(0.8)';
    setTimeout(() => {
        currentTime.style.transform = 'scale(1)';
    }, 200);
});

// Render products using arrays and loops
function renderProducts(category = 'all') {
    productsGrid.innerHTML = '';

    // Filter products using higher-order function
    const filteredProducts = products.filter(product => {
        return category === 'all' || product.category === category;
    });

    // Display products using forEach (higher-order function)
    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card slide-in';
        productCard.style.animationDelay = `${index * 0.1}s`;

        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
            <div class="rating" data-product-id="${product.id}">
                <span class="star" data-rating="1">★</span>
                <span class="star" data-rating="2">★</span>
                <span class="star" data-rating="3">★</span>
                <span class="star" data-rating="4">★</span>
                <span class="star" data-rating="5">★</span>
            </div>
            <button class="btn btn-secondary read-more-btn" data-id="${product.id}">Read More</button>
            <div class="product-description" id="desc-${product.id}">${product.description}</div>
            <button class="btn btn-primary">Add to Cart</button>
        `;

        productsGrid.appendChild(productCard);
    });

    // Add event listeners to rating stars
    addRatingListeners();

    // Add event listeners to read more buttons
    addReadMoreListeners();

    // Add event listeners to Add to Cart buttons
    addCartListeners();
}

// Rating system with star selection
function addRatingListeners() {
    const ratingContainers = document.querySelectorAll('.rating');

    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('click', function () {
                playSound(800, 80);
                const rating = parseInt(this.getAttribute('data-rating'));

                // Remove active class from all stars in this container
                stars.forEach(s => s.classList.remove('active'));

                // Add active class to selected stars
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.add('active');
                }
            });
        });
    });
}

// Read More button - toggle visibility
function addReadMoreListeners() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            playSound(450, 120);
            const productId = this.getAttribute('data-id');
            const description = document.getElementById(`desc-${productId}`);

            if (description.classList.contains('show')) {
                description.classList.remove('show');
                this.textContent = 'Read More';
            } else {
                description.classList.add('show');
                this.textContent = 'Read Less';
            }
        });
    });
}

// Add to Cart with animation
function addCartListeners() {
    const cartBtns = document.querySelectorAll('.product-card .btn-primary');

    cartBtns.forEach((btn, index) => {
        if (!btn.classList.contains('read-more-btn')) {
            btn.addEventListener('click', function () {
                playSound(900, 150);
                this.textContent = 'Added! ✓';
                this.style.background = '#4caf50';

                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                    this.style.background = '';
                }, 2000);
            });
        }
    });
}

// Category filter with switch statement
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        playSound(550, 100);
        const category = this.getAttribute('data-category');

        // Use switch to handle different categories
        switch (category) {
            case 'all':
                renderProducts('all');
                break;
            case 'clothing':
                renderProducts('clothing');
                break;
            case 'accessories':
                renderProducts('accessories');
                break;
            case 'collectibles':
                renderProducts('collectibles');
                break;
            default:
                renderProducts('all');
        }

        // Visual feedback
        filterBtns.forEach(b => b.style.opacity = '0.7');
        this.style.opacity = '1';
    });
});

// Contact form submission with callback
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    playSound(1000, 200);

    // Simulate async form submission
    const submitCallback = function () {
        successMessage.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    };

    // Simulate delay
    setTimeout(submitCallback, 500);
});

// Reset button to clear all form inputs
resetBtn.addEventListener('click', function () {
    playSound(400, 100);
    document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
        input.value = '';
    });
});

// Keyboard navigation for filter buttons (arrow keys)
let currentFilterIndex = 0;
const filterBtnsArray = Array.from(filterBtns);

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentFilterIndex = (currentFilterIndex + 1) % filterBtnsArray.length;
        filterBtnsArray[currentFilterIndex].focus();
        playSound(500, 50);
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentFilterIndex = (currentFilterIndex - 1 + filterBtnsArray.length) % filterBtnsArray.length;
        filterBtnsArray[currentFilterIndex].focus();
        playSound(500, 50);
    }
});

// Initial render
renderProducts('all');