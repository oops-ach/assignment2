$(document).ready(function() {
  // ========== CART MANAGEMENT ==========
  let cart = [];

  // Update cart button display
  function updateCartButton() {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price;
    });
    $('#cartButton').text(`Cart (${cart.length}) - $${totalPrice.toFixed(2)}`);
  }

  // Show notification when item added
  function showNotification() {
    $('#notification').removeClass('show');
    setTimeout(() => {
      $('#notification').addClass('show');
      setTimeout(() => {
        $('#notification').removeClass('show');
      }, 2000);
    }, 10);
  }

  // Add to cart button click event
  $('.add-to-cart-btn').on('click', function() {
    const productName = $(this).data('product-name');
    const productPrice = parseFloat($(this).data('product-price'));

    cart.push({ 
      name: productName, 
      price: productPrice 
    });

    showNotification();
    updateCartButton();
  });

  // Cart button click event - show cart contents
  $('#cartButton').on('click', function() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      const cartItems = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n');
      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
      alert(`Items in cart:\n\n${cartItems}\n\nTotal: $${totalPrice.toFixed(2)}`);
    }
  });

  // ========== LAZY LOADING IMAGES ==========
  let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

  function lazyLoad() {
    lazyImages = lazyImages.filter(function(lazyImage) {
      const rect = lazyImage.getBoundingClientRect();
      
      // Check if image is near viewport (200px buffer)
      if (rect.top <= window.innerHeight + 200 && rect.bottom >= 0) {
        const src = lazyImage.getAttribute('data-src');
        if (src) {
          lazyImage.setAttribute('src', src);
          lazyImage.classList.add('loaded');
          lazyImage.removeAttribute('data-src');
        }
        return false; // Remove from array (loaded)
      }
      return true; // Keep in array (not loaded yet)
    });

    // Stop listening if all images loaded
    if (lazyImages.length === 0) {
      $(window).off('scroll', lazyLoad);
    }
  }

  // Attach scroll event for lazy loading
  $(window).on('scroll', lazyLoad);
  
  // Initial load for images already in viewport
  lazyLoad();

$(document).ready(function() {
  $('.copy-btn').on('click', function() {
    var text = $(this).data('clipboard-text');
    navigator.clipboard.writeText(text).then(function() {
      $(this).addClass('copied');
      $(this).next('.copy-tooltip').fadeIn().delay(1000).fadeOut();
      $(this).text('Copied!');
    }.bind(this));
  });
});

});