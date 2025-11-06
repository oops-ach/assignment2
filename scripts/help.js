$(window).on('load', function() {
  setTimeout(function() {
    $('#loader').fadeOut(500);
  }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          formStatus.textContent = "Thank you for your message, we will get back to you soon!";
          formStatus.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          formStatus.textContent = "Something went wrong. Please try again.";
          formStatus.style.color = "red";
        });
    });
  }
});

$('.copy-btn').on('click', function() {
  var $button = $(this);
  var textToCopy = $button.data('clipboard-target');
  var text = $(textToCopy).text();

  var $textarea = $('<textarea>');
  $textarea.val(text).css({position: 'fixed', opacity: 0});
  $('body').append($textarea);
  $textarea.select();

  $(document).one('copy', function() {
    $button.addClass('copied');
    $button.html('✓ Copied');
    $button.attr('title', 'Copied to clipboard!');
    
    setTimeout(function() {
      $button.removeClass('copied');
      $button.html('Copy');
      $button.removeAttr('title');
    }, 2000);
  });

  try {
    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('Copy command failed');
    }
  } catch (err) {
    console.error('Unable to copy', err);
  } finally {
    $textarea.remove();
  }
});


$(document).ready(function () {
  $(".faq-answer").hide();

  $(".faq-question").on("click", function () {
    var answer = $(this).next(".faq-answer");
    answer.slideToggle();

    $(this).toggleClass("highlight");
  });

  $(window).on('load', function () {
    setTimeout(function () {
      $('#loader').fadeOut(500);
    }, 2000);
  });
});
