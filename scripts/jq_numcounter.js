// jQuery(document).ready(function($){
//     alert("I'm ready boss")
// })

$(".count").each(function () {
  $(this)
    .prop("counter", 0)
    .animate(
      {
        Counter: $(this).text(),
      },
      {
        duration: 8000,
        easing: "swing",
        step: function (now) {
          now = Number(Math.ceil(now)).toLocaleString('en');
                                $(this).text(now);
        },
      }
    );
});