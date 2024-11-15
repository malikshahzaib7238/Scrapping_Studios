// Get elements for header, body, footer, and dropdown
const header = document.querySelector("header");
const body = document.body;
const footer = document.querySelector("footer");
const dropdown = document.getElementById("color-picker-dropdown");

// Store initial colors for reset
const initialHeaderColor = getComputedStyle(header).backgroundColor;
const initialBodyColor = getComputedStyle(body).backgroundColor;
const initialFooterColor = getComputedStyle(footer).backgroundColor;

// Toggle dropdown visibility
document.getElementById("color-picker-btn").addEventListener("click", function() {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Apply selected colors
function applyColors() {
    const headerColor = document.getElementById("header-color").value;
    const bodyColor = document.getElementById("body-color").value;
    const footerColor = document.getElementById("footer-color").value;

    header.style.backgroundColor = headerColor;
    body.style.backgroundColor = bodyColor;
    footer.style.backgroundColor = footerColor;
}

// Reset to original colors
function resetColors() {
    header.style.backgroundColor = initialHeaderColor;
    body.style.backgroundColor = initialBodyColor;
    footer.style.backgroundColor = initialFooterColor;
}
