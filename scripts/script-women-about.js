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
    $('#notification').removeClass('show hide');

    $('#notification').addClass('show');  
    setTimeout(function() {
      $('#notification').removeClass('show').addClass('hide');
    }, 1500); 
  }

  $('.add-to-cart-btn').on('click', function() {
    const productName = $(this).data('product-name');
    const productPrice = parseFloat($(this).data('product-price'));

    cart.push({ name: productName, price: productPrice });

    showNotification();
    updateCartButton();
  });

  $('#cartButton').on('click', function() {
    const cartItems = cart.map(item => item.name).join(', ');
    alert('In cart: ' + cartItems);
  });

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

$(document).ready(function() {
  var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

  function lazyLoad() {
    lazyImages.forEach(function(lazyImage) {
      if (lazyImage.getBoundingClientRect().top <= window.innerHeight && 
          lazyImage.getBoundingClientRect().bottom >= 0) {
        const src = lazyImage.getAttribute('data-src');
        lazyImage.setAttribute('src', src); 
        lazyImage.classList.add('loaded');
        lazyImage.removeAttribute('data-src'); 
      }
    });
  }

  $(window).on('scroll', function() {
    lazyLoad();
  });

  lazyLoad(); 
});

});
