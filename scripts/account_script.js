
    let registeredUsers = [
        { username: 'demo', email: 'demo@demonslayer.com', password: 'demo123', fullname: 'Demo User' }
    ];

    // Preload audio files
    const successAudio = new Audio('applepay.mp3');
    const failAudio = new Audio('fail-234710.mp3');

    // Success and fail sound functions
    function playSuccessSound() {
        if (successAudio.readyState >= 2) {
            successAudio.currentTime = 0;
            successAudio.play().catch(error => console.log('Audio play failed:', error));
        } else {
            console.log('Success audio file not loaded or missing.');
        }
    }

    function playFailSound() {
        if (failAudio.readyState >= 2) {
            failAudio.currentTime = 0;
            failAudio.play().catch(error => console.log('Audio play failed:', error));
        } else {
            console.log('Fail audio file not loaded or missing.');
        }
    }

    function playSuccessSound() {
        if (successAudio) {
            successAudio.currentTime = 0;
            successAudio.play().catch(error => console.log('Audio play failed:', error));
        } else {
            console.log('Success audio file is missing or failed to load.');
        }
    }

    function playFailSound() {
        const audio = new Audio('fail-234710.mp3');
        audio.play().catch(error => console.log('Audio play failed:', error));
    }



    const menuItems = document.querySelectorAll('.menu-item');
    let currentMenuIndex = 0;

    // Function to focus menu item
    function focusMenuItem(index) {
        if (menuItems[index]) {
            menuItems[index].focus();
            currentMenuIndex = index;
        }
    }

    // Handle keyboard navigation
    document.addEventListener('keydown', (event) => {
        // Only handle arrow keys when no input is focused and modal is not open
        const activeElement = document.activeElement;
        const isInputFocused = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
        const isModalOpen = document.getElementById('register-modal').classList.contains('show');
        
        if (isInputFocused || isModalOpen) {
            return;
        }
        
        switch (event.key) {
            case 'ArrowRight':
                event.preventDefault();
                currentMenuIndex = (currentMenuIndex + 1) % menuItems.length;
                focusMenuItem(currentMenuIndex);
                break;
                
            case 'ArrowLeft':
                event.preventDefault();
                currentMenuIndex = (currentMenuIndex - 1 + menuItems.length) % menuItems.length;
                focusMenuItem(currentMenuIndex);
                break;
                
            case 'ArrowDown':
                event.preventDefault();
                currentMenuIndex = Math.min(currentMenuIndex + 1, menuItems.length - 1);
                focusMenuItem(currentMenuIndex);
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                currentMenuIndex = Math.max(currentMenuIndex - 1, 0);
                focusMenuItem(currentMenuIndex);
                break;
        }
    });



    const registerModal = document.getElementById('register-modal');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const closeModal = document.querySelector('.close-modal');

    // Function to open modal
    function openModal() {
        registerModal.classList.add('show');
        playClickSound();
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Function to close modal
    function closeModalFunction() {
        registerModal.classList.remove('show');
        playClickSound();
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }

    // Event listeners for modal
    if (registerLink) {
        registerLink.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', (event) => {
            event.preventDefault();
            closeModalFunction();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === registerModal) {
            closeModalFunction();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && registerModal.classList.contains('show')) {
            closeModalFunction();
        }
    });



    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Function to show success message
    function showSuccessMessage(message) {
        successMessage.textContent = message;
        successMessage.classList.add('show');
        playClickSound();
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 4000);
    }

    // Function to show error message
    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        playClickSound();
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 4000);
    }


    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to check if username exists
    function usernameExists(username) {
        return registeredUsers.some(user => user.username.toLowerCase() === username.toLowerCase());
    }

    // Function to check if email exists
    function emailExists(email) {
        return registeredUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
    }

    // Function to validate password strength
    function isStrongPassword(password) {
        return password.length >= 6;
    }


    const loginForm = document.getElementById('login-form');

    // Handle login form submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        
        // Validate inputs
        if (!username || !password) {
            showErrorMessage('Please fill in all fields!');
            return;
        }
        
        // Check credentials using array methods
        const user = registeredUsers.find(u => 
            (u.username.toLowerCase() === username.toLowerCase() || 
            u.email.toLowerCase() === username.toLowerCase()) && 
            u.password === password
        );
        
        if (user) {
            showSuccessMessage(`Welcome back, ${user.fullname}! Login successful.`);
            playSuccessSound();
            
            // Clear form
            loginForm.reset();
            
            // Simulate redirect after 2 seconds
            setTimeout(() => {
                console.log('Redirecting to dashboard...');
                // window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            showErrorMessage('Invalid username/email or password!');
            playFailSound();
        }
    });


    const registerForm = document.getElementById('register-form');

    // Handle registration form submission
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const fullname = document.getElementById('register-fullname').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Validation checks
        if (!fullname || !email || !username || !password || !confirmPassword) {
            showErrorMessage('Please fill in all fields!');
            return;
        }
        
        if (!isValidEmail(email)) {
            showErrorMessage('Please enter a valid email address!');
            return;
        }
        
        if (usernameExists(username)) {
            showErrorMessage('Username already exists! Please choose another one.');
            return;
        }
        
        if (emailExists(email)) {
            showErrorMessage('Email already registered! Please use another email.');
            return;
        }
        
        if (!isStrongPassword(password)) {
            showErrorMessage('Password must be at least 6 characters long!');
            return;
        }
        
        if (password !== confirmPassword) {
            showErrorMessage('Passwords do not match!');
            return;
        }
        
        if (!termsAccepted) {
            showErrorMessage('You must agree to the Terms and Conditions!');
            return;
        }
        
        // Create new user object
        const newUser = {
            fullname: fullname,
            email: email,
            username: username,
            password: password
        };
        
        // Add to registered users array
        registeredUsers.push(newUser);
        
        // Show success message and play sound
        showSuccessMessage(`Account created successfully! Welcome, ${fullname}!`);
        playSuccessSound();
        
        // Clear form
        registerForm.reset();
        
        // Close modal
        setTimeout(() => {
            closeModalFunction();
        }, 2000);
        
        // Log registered users (for debugging)
        console.log('Registered Users:', registeredUsers);
    });


    // Add focus animations to all inputs
    const allInputs = document.querySelectorAll('input');

    allInputs.forEach(input => {
        input.addEventListener('focus', () => {
            playClickSound();
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                input.style.borderColor = '#4CAF50';
            }
        });
    });


    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Account Page Loaded!');
        console.log('Registered Users:', registeredUsers.length);
        
        // Add animation to card
        const card = document.querySelector('.card');
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }
    });
