const productData = [
    { id: 1, name: 'Demon Slayer Shoes', price: '$120.00', category: 'shoes', image: '../photos/demon_slayer.png', description: 'Rivalry Low Demon Slayer' },
    { id: 2, name: 'Ken Kaneki Hoodie', price: '$109.00', category: 'hoodies', image: '../photos/Ken_Kaneki_Hoodie.png', description: 'Zip-Up Active Top' },
    { id: 3, name: 'Attack on Titan Shoes', price: '$184.00', category: 'shoes', image: '../photos/attack_on_titan.png', description: 'Levi Ackerman High Top' },
    { id: 4, name: 'One Piece Sneakers', price: '$120.00', category: 'shoes', image: '../photos/one_piece.png', description: 'Zoro Low Top Sneakers' },
    { id: 5, name: 'Naruto Sneakers', price: '$135.00', category: 'shoes', image: '../photos/naruto_shoes.png', description: 'Nara Shikamaru AF1 Shoes' },
    { id: 6, name: 'Bleach Sneakers', price: '$113.00', category: 'shoes', image: '../photos/bleach.png', description: 'BLEACH x ASICS Sneaker Collaboration' },
    { id: 7, name: 'Tokyo Ghoul Sneakers', price: '$140.00', category: 'shoes', image: '../photos/tokyo.png', description: 'Ken Kaneki High Top Shoes' },
    { id: 8, name: 'Itachi Naruto Shoes', price: '$105.00', category: 'shoes', image: '../photos/naruto_itachi.png', description: 'Akatsuki Itachi Shoes' },
    { id: 9, name: 'Hinata Sneakers', price: '$185.00', category: 'shoes', image: '../photos/hinata_sneakers.jpg', description: 'New new new enw new new new new new new' }
];

let currentCategory = 'all';

// search and filter
function filterProducts(searchTerm) {
    const products = $('.product-card');
    let hasVisibleProducts = false;

    products.each(function () {
        const product = $(this);
        const searchData = product.find('.product-name').text().toLowerCase() + " " + product.find('.product-desc').text().toLowerCase();

        if (searchTerm === '' || searchData.includes(searchTerm.toLowerCase())) {
            product.removeClass('product-hidden');
            hasVisibleProducts = true;
        } else {
            product.addClass('product-hidden');
        }
    });

    showNoResultsMessage(!hasVisibleProducts);
}


function showNoResultsMessage(show) {
    let message = $('#noResultsMessage');

    if (show && message.length === 0) {
        message = $('<div id="noResultsMessage" style="text-align: center; padding: 40px; font-size: 18px; color: #999;">No products found matching your search.</div>');
        $('#productsGrid').append(message);
    } else if (!show) {
        message.remove();
    }
}

// auto show
let autocompleteTimeout;
function showAutocomplete(searchTerm, dropdown) {
    clearTimeout(autocompleteTimeout);

    if (!searchTerm.trim()) {
        dropdown.hide();
        return;
    }

    autocompleteTimeout = setTimeout(() => {
        const matches = productData.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 8); 

        if (matches.length > 0) {
            dropdown.empty();
            matches.forEach(match => {
                const item = $('<div class="autocomplete-item"></div>')
                    .text(`${match.name} - ${match.description}`)
                    .click(function () {
                        $('#mainSearchInput').val(`${match.name} ${match.description}`);
                        filterProducts(match.name);
                        dropdown.hide();
                    });
                dropdown.append(item);
            });
            dropdown.show();
        } else {
            dropdown.hide();
        }
    }, 100);
}

// search input
$('#mainSearchInput').on('keyup', function () {
    const searchTerm = $(this).val();
    filterProducts(searchTerm);
    showAutocomplete(searchTerm, $('#mainAutocompleteDropdown'));
});

// click mouse hide dropdown data
$(document).on('click', function (e) {
    if (!$(e.target).closest('.search-wrapper').length) {
        $('.autocomplete-dropdown').hide();
    }
});

// clear search using escape button
$(document).on('keyup', function (e) {
    if (e.key === 'Escape') {
        $('.autocomplete-dropdown').hide();
        $('#mainSearchInput').val('');
        filterProducts('');
    }
});


// Category filter buttons
$('.category-btn').on('click', function() {
    $('.category-btn').removeClass('active');
    
    $(this).addClass('active');
    
    // Get category
    const category = $(this).data('category');
    currentCategory = category;
    
    $('#mainSearchInput').val('');
    
    renderProducts(category);
});

function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = productData.filter(product => 
        category === 'all' || product.category === category
    );

    if (filteredProducts.length === 0) {
        showNoResultsMessage(true);
    } else {
        filteredProducts.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card slide-in';
            productCard.style.animationDelay = `${index * 0.1}s`;

            productCard.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price}</div>
            <div class="product-desc" id="desc-${product.id}">${product.description}</div>
            <div class="rating" data-product-id="${product.id}">
                <span class="star" data-rating="1">&#9733</span>
                <span class="star" data-rating="2">&#9733</span>
                <span class="star" data-rating="3">&#9733</span>
                <span class="star" data-rating="4">&#9733</span>
                <span class="star" data-rating="5">&#9733</span>
            </div>
            <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

            productsGrid.appendChild(productCard);
        });

        addRatingListeners();
        addCartListeners();

        showNoResultsMessage(false);
    }
}

function addRatingListeners() {
    const ratingContainers = document.querySelectorAll('.rating');
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', function () {
                const rating = parseInt(this.getAttribute('data-rating'));
                stars.forEach(s => s.classList.remove('active'));
                for (let i = 0; i < rating; i++) {
                    stars[i].classList.add('active');
                }
            });
        });
    });
}

function addCartListeners() {
    const cartBtns = document.querySelectorAll('.add-to-cart-btn');
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.textContent = 'Added! ✓';
            this.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
}

// Initialize
renderProducts();

//Day Night theme Toggle
// Theme Toggle Functionality
const dayBtn = document.getElementById('dayBtn');
const nightBtn = document.getElementById('nightBtn');

// Check saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'night') {
    document.body.classList.add('night-mode');
    dayBtn.classList.remove('active');
    nightBtn.classList.add('active');
}

dayBtn.addEventListener('click', function() {
    document.body.classList.remove('night-mode');
    dayBtn.classList.add('active');
    nightBtn.classList.remove('active');
    localStorage.setItem('theme', 'day');
});

nightBtn.addEventListener('click', function() {
    document.body.classList.add('night-mode');
    nightBtn.classList.add('active');
    dayBtn.classList.remove('active');
    localStorage.setItem('theme', 'night');
});