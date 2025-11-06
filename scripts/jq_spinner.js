$(function() {
  $('.btn').click(function(e) {
    e.preventDefault();
    const btn = $(this);
    btn.prop('disabled', true).html('<span class="spinner"></span> Loading...');
    setTimeout(() => {
      btn.prop('disabled', false).html('Login');
    }, 2000);
  });
});
