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
