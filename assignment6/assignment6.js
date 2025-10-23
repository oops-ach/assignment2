
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
        themeToggle.textContent = '☀️ Day';
        body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            body.style.transform = 'scale(1)';
        }, 200);
    } else {
        body.classList.remove('night-theme');
        body.classList.add('day-theme');
        themeToggle.textContent = '🌙 Night';
        body.style.transform = 'scale(0.98)';
        setTimeout(() => {
            body.style.transform = 'scale(1)';
        }, 200);
    }
});

// User greeting popup
document.getElementById('setNameBtn').addEventListener('click', function() {
    playSound(500, 100);
  const name = document.getElementById('nameInput').value;

  if (name) {
    // hide the popup
    document.querySelector('.popup').style.display = 'none';

    // display the welcome message
    const welcomeMessage = `Hello, ${name}! Welcome to Demon Slayer Shop!`;
    document.getElementById('welcomeMessage').innerText = welcomeMessage;
  }
});

// show current time
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

// "read more" functionality
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', function () {
        playSound(600, 100);
        const productCard = this.closest('.product-card');
        const description = productCard.querySelector('.product-description');
        const readMoreButton = productCard.querySelector('.read-more-btn');
        
        if (description.classList.contains('show')) {
            description.classList.remove('show');
            readMoreButton.textContent = 'Read More';
        } else {
            description.classList.add('show');
            readMoreButton.textContent = 'Read Less';
        }
    });
});

// Handle Add to Cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        playSound(500, 200);
        const productCard = this.closest('.product-card');
        const addedMessage = productCard.querySelector('.added-message');
        const addToCartButton = productCard.querySelector('.add-to-cart-btn');
        
        addToCartButton.textContent = 'Added! ✓';
        addToCartButton.style.backgroundColor = '#4caf50';
        addedMessage.style.display = 'block';
        
        setTimeout(() => {
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.style.backgroundColor = '';
            addedMessage.style.display = 'none';
        }, 2000);
    });
});

// Rating functionality
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function () {
        playSound(800, 130);
        const productCard = this.closest('.product-card');
        const stars = productCard.querySelectorAll('.star');
        const ratingValue = parseInt(this.getAttribute('data-rating'));
        
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-rating')) <= ratingValue) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    });
});


// Function to filter products by category
function filterCategory(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    if (category === 'all') {
        productCards.forEach(card => {
            card.style.display = 'block';
        });
    } else {
        productCards.forEach(card => {
            if (card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

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

document.addEventListener('keydown', function(event){
    if(event === 'Space'){
        alert('worked')
}
});




// Initial render
renderProducts('all');