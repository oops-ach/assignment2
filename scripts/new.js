//Day Night theme Toggle
// Theme Toggle Functionality
const dayBtn = document.getElementById('dayBtn');
const nightBtn = document.getElementById('nightBtn');

// Check saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'night') {
    document.body.classList.add('night-mode');
    dayBtn.classList.remove('active');
    nightBtn.classList.add('active');
}

dayBtn.addEventListener('click', function() {
    document.body.classList.remove('night-mode');
    dayBtn.classList.add('active');
    nightBtn.classList.remove('active');
    localStorage.setItem('theme', 'day');
});

nightBtn.addEventListener('click', function() {
    document.body.classList.add('night-mode');
    nightBtn.classList.add('active');
    dayBtn.classList.remove('active');
    localStorage.setItem('theme', 'night');
});