document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMessage = document.getElementById('error-message');

  errorMessage.textContent = '';

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent = 'Please enter a valid email.';
    return;
  }

  if (password.length < 6) {
    errorMessage.textContent = 'Password must be at least 6 characters.';
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    return;
  }

  alert('Form submitted successfully!');
});

document.querySelectorAll('.faq-title').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

const popup = document.getElementById('popupForm');
const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');

openPopup.addEventListener('click', () => {
  popup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});

document.getElementById('changeColorButton').addEventListener('click', () => {
  document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
});

function updateTime() {
  const now = new Date();
  const dateTimeString = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  document.getElementById('currentDateTime').textContent = dateTimeString;
}

setInterval(updateTime, 1000);  
