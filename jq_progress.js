
$(document).ready(function(){
    $(window).scroll(function(){
        var scroll =$(window).scrollTop();
        var doch =$(document).height();
        var winh =$(window).height();
        var value=(scroll/(doch-winh)) * 100;
        $('.scroll_progress').css('width', value + '%');
    });
});

// jQuery(document).ready(function ($) {
//     alert("I am an alert box!");
// });