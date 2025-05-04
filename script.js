// 1. Event Handling

document.addEventListener('DOMContentLoaded', function () {
    const clickButton = document.getElementById('clickButton');
    const secretMessage = document.getElementById('secretMessage');

    console.log(clickButton); // Should log the button element
    console.log(secretMessage); // Should log the secret message element

    clickButton.addEventListener('click', function () {
        secretMessage.classList.add('show');
        secretMessage.textContent = "🎉 You clicked the button! Here's the secret message! 🎉";

        setTimeout(() => {
            secretMessage.classList.remove('show');
        }, 3000);
    });
});

// Hover effects
const hoverArea = document.getElementById('hoverArea');

hoverArea.addEventListener('mouseover', function() {
    this.style.backgroundColor = "#3f72af";
    this.style.color = "white";
    this.textContent = "Wow! You're hovering! So cool!";
});

hoverArea.addEventListener('mouseout', function() {
    this.style.backgroundColor = "#dbe2ef";
    this.style.color = "black";
    this.textContent = "Hover over me to see magic!";
});

// Keypress detection
const keyDisplay = document.getElementById('keyDisplay');

document.addEventListener('keydown', function(event) {
    keyDisplay.textContent = `You pressed: ${event.key} (Key code: ${event.keyCode})`;
});

// Secret action (double click or long press)
const secretArea = document.getElementById('secretArea');

let pressTimer;

secretArea.addEventListener('dblclick', showSecret);

secretArea.addEventListener('mousedown', function() {
    pressTimer = setTimeout(showSecret, 1000); // 1 second long press
});

secretArea.addEventListener('mouseup', function() {
    clearTimeout(pressTimer);
});

secretArea.addEventListener('mouseleave', function() {
    clearTimeout(pressTimer);
});

const resetSecretButton = document.createElement('button');
resetSecretButton.textContent = 'Reset Secret';
resetSecretButton.classList.add('fun-button');
resetSecretButton.style.marginTop = '10px';
resetSecretButton.style.display = 'none';

secretArea.appendChild(resetSecretButton);

resetSecretButton.addEventListener('click', function () {
    secretMessage.classList.remove('show');
    resetSecretButton.style.display = 'none';
});

function showSecret() {
    secretMessage.classList.add('show');
    resetSecretButton.style.display = 'inline-block';
    setTimeout(() => {
        secretMessage.classList.remove('show');
        resetSecretButton.style.display = 'none';
    }, 3000);
}

// 2. Interactive Elements

// Button that changes text and color
const colorChanger = document.getElementById('colorChanger');

colorChanger.addEventListener('click', function () {
    this.textContent = "Color Changed!";
    this.style.backgroundColor = "#ffa36b";
    this.style.color = "#ffffff";
});

// Image gallery
const galleryImages = document.querySelectorAll('.gallery img');
const mainImage = document.getElementById('mainImage');
const imageCaption = document.getElementById('imageCaption');

galleryImages.forEach((img) => {
    img.addEventListener('click', function () {
        mainImage.src = this.src;
        mainImage.style.display = "block";
        imageCaption.textContent = this.alt;
    });
});

// Tabs system
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
        tabs.forEach((t) => t.classList.remove('active'));
        tabContents.forEach((content) => content.classList.remove('active'));

        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});

// Bounce animation
const bounceButton = document.getElementById('bounceButton');

bounceButton.addEventListener('click', function() {
    this.classList.toggle('bounce');
});

// 3. Form Validation

const form = document.getElementById('userForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordStrength = document.getElementById('passwordStrength');

// Utility function to toggle validation classes
function toggleValidationClasses(element, isValid, errorElement, errorMessage = '') {
    if (isValid) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        errorElement.style.display = 'none';
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        errorElement.style.display = 'block';
        errorElement.textContent = errorMessage;
    }
}

// Validate username
function validateUsername() {
    const error = document.getElementById('usernameError');
    const isValid = username.value.trim() !== '';
    toggleValidationClasses(username, isValid, error, 'Username is required');
    return isValid;
}

// Validate email
function validateEmail() {
    const error = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email.value.trim());
    toggleValidationClasses(email, isValid, error, 'Please enter a valid email');
    return isValid;
}

// Validate password
function validatePassword() {
    const error = document.getElementById('passwordError');
    const isValid = password.value.length >= 8;
    toggleValidationClasses(password, isValid, error, 'Password must be at least 8 characters');
    return isValid;
}

// Update password strength
function updatePasswordStrength() {
    const length = password.value.length;
    let strength = 0;

    if (length > 4) strength += 20;
    if (length > 7) strength += 20;
    if (/[A-Z]/.test(password.value)) strength += 20;
    if (/[0-9]/.test(password.value)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password.value)) strength += 20;

    strength = Math.min(strength, 100);
    passwordStrength.style.width = `${strength}%`;

    if (strength < 40) {
        passwordStrength.style.backgroundColor = '#ff6b6b';
    } else if (strength < 80) {
        passwordStrength.style.backgroundColor = '#ffa36b';
    } else {
        passwordStrength.style.backgroundColor = '#6bff6b';
    }
}

// Form submission handler
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isUsernameValid && isEmailValid && isPasswordValid) {
        alert('Form submitted successfully!');
        form.reset();
        passwordStrength.style.width = '0%';

        [username, email, password].forEach((field) => {
            field.classList.remove('valid');
            field.classList.remove('invalid');
        });
    } else {
        alert('Please fix the errors in the form before submitting.');
    }
});

// Real-time validation
username.addEventListener('input', validateUsername);
email.addEventListener('input', validateEmail);
password.addEventListener('input', function () {
    validatePassword();
    updatePasswordStrength();
});