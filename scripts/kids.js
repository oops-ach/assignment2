$(document).ready(function() {
  function showNotification(message) {
    var notification = $('#notification');
    notification.text(message)
      .fadeIn(400) 
      .css('opacity', 1); 

    setTimeout(function() {
      notification.fadeOut(400);
    }, 3000); 
  }

  $('.addToCartBtn').on('click', function() {
    showNotification('Item added to cart!'); 
  });

  function lazyLoad() {
    $('.lazy').each(function() {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height() + 200) {
        var src = $(this).data('src');
        if (src) {
          $(this).attr('src', src).removeClass('lazy');
        }
      }
    });
  }
я
  $(window).on('scroll', lazyLoad);
  lazyLoad(); 
});

document.getE