$(document).ready(function() {
  let cart = [];

  function updateCartButton() {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price;
    });
    $('#cartButton').text(`Cart (${cart.length}) - $${totalPrice.toFixed(2)}`);
  }

  function showNotification() {
    $('#notification').removeClass('show');
    setTimeout(() => {
      $('#notification').addClass('show');
      setTimeout(() => {
        $('#notification').removeClass('show');
      }, 2000);
    }, 10);
  }

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

  $('#cartButton').on('click', function() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      const cartItems = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n');
      const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
      alert(`Items in cart:\n\n${cartItems}\n\nTotal: $${totalPrice.toFixed(2)}`);
    }
  });

  let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

  function lazyLoad() {
    lazyImages = lazyImages.filter(function(lazyImage) {
      const rect = lazyImage.getBoundingClientRect();

      if (rect.top <= window.innerHeight + 200 && rect.bottom >= 0) {
        const src = lazyImage.getAttribute('data-src');
        if (src) {
          lazyImage.setAttribute('src', src);
          lazyImage.classList.add('loaded');
          lazyImage.removeAttribute('data-src');
        }
        return false; 
      }
      return true; 
    });

  
    if (lazyImages.length === 0) {
      $(window).off('scroll', lazyLoad);
    }
  }

  $(window).on('scroll', lazyLoad);
  

});