const productData = [
    { id: 1, name: 'Demon Slayer Shoes', price: '$120.00', category: 'shoes', image: '../photos/demon_slayer.png', description: 'Rivalry Low Demon Slayer'},
    { id: 2, name: 'Ken Kaneki Hoodie', price: '$109.00', category: 'hoodies', image: '../photos/Ken_Kaneki_Hoodie.png', description: 'Zip-Up Active Top'},
    { id: 3, name: 'Attack on Titan Shoes', price: '$184.00', category: 'shoes', image: '../photos/attack_on_titan.png', description: 'Levi Ackerman High Top'},
    { id: 4, name: 'One Piece Sneakers', price: '$120.00', category: 'shoes', image: '../photos/one_piece.png', description: 'Zoro Low Top Sneakers'},
    { id: 5, name: 'Naruto Sneakers', price: '$135.00', category: 'shoes', image: '../photos/naruto_shoes.png', description: 'Nara Shikamaru AF1 Shoes'},
    { id: 6, name: 'Bleach Sneakers', price: '$113.00', category: 'shoes', image: '../photos/bleach.png', description: 'BLEACH x ASICS Sneaker Collaboration'},
    { id: 7, name: 'Tokyo Ghoul Sneakers', price: '$140.00', category: 'shoes', image: '../photos/tokyo.png', description: 'Ken Kaneki High Top Shoes'},
    { id: 8, name: 'Itachi Naruto Shoes', price: '$105.00', category: 'shoes', image: '../photos/naruto_itachi.png', description: 'Akatsuki Itachi Shoes'}
];

function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = productData.filter(product => category === 'all' || product.category === category);

    filteredProducts.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card slide-in';
        productCard.style.animationDelay = `${index * 0.1}s`;

        productCard.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
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
            <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;

        productsGrid.appendChild(productCard);
    });

    addRatingListeners();
    addReadMoreListeners();
    addCartListeners();
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

function addReadMoreListeners() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const description = document.getElementById(`desc-${productId}`);
            description.classList.toggle('show');
            this.textContent = description.classList.contains('show') ? 'Read Less' : 'Read More';
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

renderProducts();
