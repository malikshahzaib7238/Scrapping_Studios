let products = [
    { name: "Stickers", description: "Cute stickers", deliveryTime: "3 days", imagePath: "../assets/product1.jpg" },
    { name: "Summer Themed Sticker", description: "Bright summer stickers", deliveryTime: "5 days", imagePath: "../assets/product2.jpg" },
    { name: "Journal Book Sticker", description: "Creative journal stickers", deliveryTime: "4 days", imagePath: "../assets/product3.jpg" },
    { name: "Flower Stickers", description: "Floral themed stickers", deliveryTime: "2 days", imagePath: "../assets/product4.jpg" },
    { name: "Origami Sticker", description: "Handcrafted origami stickers", deliveryTime: "3 days", imagePath: "../assets/product5.jpg" },
    { name: "Scrap Books", description: "Personalized scrapbooks", deliveryTime: "6 days", imagePath: "../assets/product7.jpg" },
];

function renderProducts() {
    const productContainer = document.querySelector(".products .grid-container");
    productContainer.innerHTML = ""; // Clear existing products

    products.forEach((product, index) => {
        const productBox = document.createElement("div");
        productBox.className = "product-box";
        productBox.innerHTML = `
        <div class="product-box">
            <img src="${product.imagePath}" alt="${product.name}" class="product-image" onmouseover="showOverlay(${index})" onmouseout="hideOverlay(${index})">
            <div class="overlay" id="overlay-${index}">
                <div class="overlay-text">
                    <p class="product-name">${product.name}</p>
                    <p class="product-description">${product.description}</p>
                    <p class="product-delivery-time">Delivery Time: ${product.deliveryTime}</p>
                </div>
                <button onclick="deleteProduct(${index})" class="new-btn">Delete</button>
            </div>
        </div>
    `;

        productContainer.appendChild(productBox);
    });
}

// Show and hide overlay on hover
function showOverlay(index) {
    document.getElementById(`overlay-${index}`).style.display = "block";
}

function hideOverlay(index) {
    document.getElementById(`overlay-${index}`).style.display = "none";
}

// Show Add Product Form
function showAddProductForm() {
    document.getElementById("add-product-form").style.display = "block";
}

// Hide Add Product Form
function hideAddProductForm() {
    document.getElementById("add-product-form").style.display = "none";
}

// Preview the image before adding
function previewImage() {
    const imageFile = document.getElementById("product-image").files[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("image-preview").src = e.target.result;
            document.getElementById("image-preview").style.display = "block";
        };
        reader.readAsDataURL(imageFile);
    }
}

// Add a new product using base64 for local storage
function addProduct() {
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const deliveryTime = document.getElementById("delivery-time").value;
    const imageFile = document.getElementById("product-image").files[0];

    if (name && description && deliveryTime && imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePath = e.target.result; // base64 encoded image
            products.push({ name, description, deliveryTime, imagePath });
            renderProducts();
            hideAddProductForm();

            // Clear form fields
            document.getElementById("product-name").value = "";
            document.getElementById("product-description").value = "";
            document.getElementById("delivery-time").value = "";
            document.getElementById("product-image").value = "";
            document.getElementById("image-preview").style.display = "none";
        };
        reader.readAsDataURL(imageFile); // Convert image to base64
    } else {
        alert("Please fill in all fields and select an image.");
    }
}

// Delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

// Initial render of products
renderProducts();
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
