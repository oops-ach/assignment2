// jq_numcounter.js
(function($){
  $(function(){ // DOM ready
    $(".count").each(function () {
      const $el = $(this);
      // read numeric target from data-stop attribute (fallback to current text)
      const target = parseInt($el.attr('data-stop') || $el.text().replace(/,/g,''), 10) || 0;

      // initialize property and animate custom numeric property "Counter"
      $el.prop("Counter", 0).animate(
        { Counter: target },
        {
          duration: 5000, 
          easing: "swing",
          step: function(now) {
            const display = Math.ceil(now).toLocaleString('en');
            $el.text(display);
          }
        }
      );
    });
  });
})(jQuery);
