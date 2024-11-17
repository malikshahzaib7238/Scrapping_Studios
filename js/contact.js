// Add event listener for form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    // Prevent form from submitting and reloading the page
    event.preventDefault();

    validateForm();
});

function validateForm() {
    let isValid = true;

    // Get input values and error message elements
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");
    const successMessage = document.getElementById("successMessage");

    // Clear previous error messages and success message
    clearErrors([nameError, emailError, phoneError, messageError]);
    successMessage.style.display = "none";

    // Validate each field
    isValid &= validateField(name, nameError, "Name is required.");
    isValid &= validateEmail(email, emailError);
    isValid &= validatePhone(phone, phoneError);
    isValid &= validateField(message, messageError, "Message cannot be empty.");

    // Show success message if all fields are valid
    if (isValid) {
        successMessage.style.display = "block";
        successMessage.innerText = "Thank you for reaching out to us!";
        clearFormFields([name, email, phone, message]);
    }
}

// Function to validate a general field (like name and message)
function validateField(field, errorField, errorMessage) {
    if (field.value.trim() === "") {
        errorField.innerText = errorMessage;
        return false;
    }
    return true;
}

// Function to validate email with pattern
function validateEmail(emailField, errorField) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value.trim() === "") {
        errorField.innerText = "Email is required.";
        return false;
    } else if (!emailPattern.test(emailField.value)) {
        errorField.innerText = "Enter a valid email address.";
        return false;
    }
    return true;
}

// Function to validate phone number
function validatePhone(phoneField, errorField) {
    const phonePattern = /^\d{10,15}$/;
    if (phoneField.value.trim() === "") {
        errorField.innerText = "Phone number is required.";
        return false;
    } else if (!phonePattern.test(phoneField.value)) {
        errorField.innerText = "Enter a valid phone number with 10-15 digits.";
        return false;
    }
    return true;
}

// Function to clear error messages
function clearErrors(errorFields) {
    errorFields.forEach(errorField => errorField.innerText = "");
}

// Function to clear form fields after successful submission
function clearFormFields(fields) {
    fields.forEach(field => field.value = "");
}

// Optional: Add real-time validation to clear error messages as the user types
document.querySelectorAll("#contactForm input, #contactForm textarea").forEach(input => {
    input.addEventListener("input", () => {
        const errorField = document.getElementById(input.id + "Error");
        if (errorField) {
            errorField.innerText = ""; // Clear error message as the user types
        }
    });
});
// Select elements
const body = document.body;
const footer = document.querySelector("footer");
const dropdown = document.getElementById("color-picker-dropdown");

// Store initial colors for reset
const initialBodyColor = getComputedStyle(body).backgroundColor;
const initialFooterColor = getComputedStyle(footer).backgroundColor;

// Toggle dropdown visibility
document.getElementById("color-picker-btn").addEventListener("click", function() {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Apply selected colors
function applyColors() {
    const bodyColor = document.getElementById("body-color").value;
    const footerColor = document.getElementById("footer-color").value;

    body.style.backgroundColor = bodyColor; // Set body background
    footer.style.backgroundColor = footerColor; // Set footer background
}

// Reset to original colors
function resetColors() {
    body.style.backgroundColor = initialBodyColor; // Reset body to initial color
    footer.style.backgroundColor = initialFooterColor; // Reset footer to initial color

    // Update color picker inputs to match initial colors
    document.getElementById("body-color").value = rgbToHex(initialBodyColor);
    document.getElementById("footer-color").value = rgbToHex(initialFooterColor);
}

// Utility function to convert RGB to Hex
function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
// Get references to the necessary sections
const header = document.querySelector("header");
const main = document.querySelector("main");

// Function to apply selected font style and color to the selected section
function applyTextStyle() {
    const fontStyle = document.getElementById("font-style").value;
    const fontColor = document.getElementById("font-color").value;
    const section = document.getElementById("section-select").value;

    let targetSection;

    // Determine which section to apply the styles to
    if (section === "header") {
        targetSection = header;
    } else if (section === "main") {
        targetSection = main;
    } else if (section === "footer") {
        targetSection = footer;
    }

    if (!targetSection) return;

    // Apply font color and style to the selected section
    targetSection.style.color = fontColor;

    if (fontStyle === "bold") {
        targetSection.style.fontWeight = "bold";
        targetSection.style.fontStyle = "normal"; // Reset to normal if bold is selected
    } else if (fontStyle === "italic") {
        targetSection.style.fontWeight = "normal"; // Reset to normal if italic is selected
        targetSection.style.fontStyle = "italic";
    } else {
        targetSection.style.fontWeight = "normal"; // Reset to normal if no special style
        targetSection.style.fontStyle = "normal";
    }

    // Apply styles to child elements of the selected section
    const childElements = targetSection.querySelectorAll("*");
    childElements.forEach(child => {
        child.style.color = fontColor;

        if (fontStyle === "bold") {
            child.style.fontWeight = "bold";
            child.style.fontStyle = "normal";
        } else if (fontStyle === "italic") {
            child.style.fontWeight = "normal";
            child.style.fontStyle = "italic";
        } else {
            child.style.fontWeight = "normal";
            child.style.fontStyle = "normal";
        }
    });
}

// Function to reset the text styles to default
function resetTextStyle() {
    // Reset header styles
    header.style.fontWeight = "normal";
    header.style.fontStyle = "normal";
    header.style.color = "";

    // Reset main section styles
    main.style.fontWeight = "normal";
    main.style.fontStyle = "normal";
    main.style.color = "";

    // Reset footer styles
    footer.style.fontWeight = "normal";
    footer.style.fontStyle = "normal";
    footer.style.color = "";

    // Reset all text to default for child elements
    resetChildStyles(header);
    resetChildStyles(main);
    resetChildStyles(footer);
}

// Helper function to reset the child elements' styles
function resetChildStyles(section) {
    const childElements = section.querySelectorAll("*");
    childElements.forEach(child => {
        child.style.fontWeight = "normal";
        child.style.fontStyle = "normal";
        child.style.color = "";
    });
}

// Attach the functions to the buttons
document.getElementById("apply-button").addEventListener("click", applyTextStyle);
document.getElementById("reset-button").addEventListener("click", resetTextStyle);
