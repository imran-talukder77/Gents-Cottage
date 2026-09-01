



// =========================
// PRODUCT CATEGORY FILTER
// =========================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        // Remove active from all buttons

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Add active to clicked button

        button.classList.add("active");


        // Get selected category

        const selectedCategory =
            button.dataset.filter;


        // Show / hide products

        productCards.forEach(function(product) {

            const productCategory =
                product.dataset.category;


            if (
                selectedCategory === "all" ||
                selectedCategory === productCategory
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});



// =========================
// WISHLIST
// =========================

const wishlistButtons =
    document.querySelectorAll(".wishlist-product");

const wishlistCount =
    document.querySelector(".wishlist-count");


let wishlistTotal = 0;


wishlistButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        const icon =
            button.querySelector("i");


        // Add Wishlist

        if (icon.classList.contains("fa-regular")) {


            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");


            button.style.color = "#e74c3c";


            wishlistTotal++;

            wishlistCount.textContent =
                wishlistTotal;


        }

        // Remove Wishlist

        else {


            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");


            button.style.color = "#333";


            wishlistTotal--;

            wishlistCount.textContent =
                wishlistTotal;

        }

    });

});



// =========================
// SIZE SELECTION
// =========================

const sizeButtons =
    document.querySelectorAll(".size-btn");


sizeButtons.forEach(function(button) {


    button.addEventListener("click", function() {


        // Current product card

        const productCard =
            button.closest(".product-card");


        // All size buttons of this product

        const allSizeButtons =
            productCard.querySelectorAll(".size-btn");


        // Error message

        const sizeError =
            productCard.querySelector(".size-error");


        // Remove active from all sizes

        allSizeButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Selected size active

        button.classList.add("active");


        // Hide error

        sizeError.style.display = "none";

    });

});



// =========================
// ADD TO CART
// =========================

const addCartButtons =
    document.querySelectorAll(".add-cart");

const cartCount =
    document.querySelector(".cart-count");


let cartTotal = 0;


addCartButtons.forEach(function(button) {


    button.addEventListener("click", function() {


        // Current product

        const productCard =
            button.closest(".product-card");


        // Selected size

        const selectedSize =
            productCard.querySelector(".size-btn.active");


        // Error message

        const sizeError =
            productCard.querySelector(".size-error");


        // =========================
        // SIZE NOT SELECTED
        // =========================

        if (!selectedSize) {

            sizeError.style.display = "block";

            return;

        }


        // =========================
        // SIZE SELECTED
        // =========================

        sizeError.style.display = "none";


        // Increase cart

        cartTotal++;


        // Update cart count

        cartCount.textContent =
            cartTotal;


        // Button feedback

        const originalText =
            button.innerHTML;


        button.innerHTML =
            '<i class="fa-solid fa-check"></i> ADDED';


        button.style.background =
            "#27ae60";


        // After 1 second

        setTimeout(function() {

            button.innerHTML =
                originalText;

            button.style.background =
                "#222";

        }, 1000);

    });

});






// =========================================================================================================================================================================





// =========================
// CART DRAWER
// =========================

const cartDrawer = document.querySelector(".cart-drawer");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");
const cartIcon = document.querySelector('.nav-icons a[href="#cart"]');

const cartItems = document.querySelector(".cart-items");
const cartItemTotal = document.querySelector(".cart-item-total");
const cartTotalPrice = document.querySelector(".cart-total-price");

const continueShopping =
    document.querySelector(".continue-shopping");


let cart = [];


// =========================
// OPEN CART
// =========================

cartIcon.addEventListener("click", function(event) {

    event.preventDefault();

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");

});


// =========================
// CLOSE CART
// =========================

function closeCart() {

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");

}


cartClose.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);

continueShopping.addEventListener("click", closeCart);



// =========================
// ADD PRODUCT TO CART
// =========================

addCartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productCard =
            button.closest(".product-card");

        const selectedSize =
            productCard.querySelector(".size-btn.active");

        const sizeError =
            productCard.querySelector(".size-error");


        // Size check

        if (!selectedSize) {

            sizeError.style.display = "block";

            return;

        }


        sizeError.style.display = "none";


        // Product information

        const productName =
            productCard.querySelector("h3").textContent.trim();

        const productImage =
            productCard.querySelector("img").src;

        const productPrice =
            productCard.querySelector(".price span").textContent.trim();

        const priceNumber =
            parseInt(productPrice.replace(/[^\d]/g, ""));


        const size =
            selectedSize.dataset.size;


        // Check existing product

        const existingProduct = cart.find(function(item) {

            return (
                item.name === productName &&
                item.size === size
            );

        });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,

                image: productImage,

                price: priceNumber,

                size: size,

                quantity: 1

            });

        }


        // Update cart

        updateCart();


        // Open cart automatically

        cartDrawer.classList.add("active");

        cartOverlay.classList.add("active");


        // Button feedback

        const originalText =
            button.innerHTML;

        button.innerHTML =
            '<i class="fa-solid fa-check"></i> ADDED';

        button.style.background =
            "#27ae60";


        setTimeout(function() {

            button.innerHTML =
                originalText;

            button.style.background =
                "#222";

        }, 1000);

    });

});



// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartItems.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>

                <h3>Your Cart is Empty</h3>

                <p>
                    Looks like you haven't added
                    anything to your cart yet.
                </p>

                <button class="continue-shopping">
                    CONTINUE SHOPPING
                </button>

            </div>

        `;


        const newContinueButton =
            cartItems.querySelector(".continue-shopping");

        newContinueButton.addEventListener(
            "click",
            closeCart
        );


        cartItemTotal.textContent = "0";

        cartTotalPrice.textContent = "৳0";

        return;

    }


    // Create cart products

    cart.forEach(function(item, index) {

        const cartProduct =
            document.createElement("div");

        cartProduct.className = "cart-product";


        cartProduct.innerHTML = `

            <div class="cart-product-image">

                <img src="${item.image}"
                     alt="${item.name}">

            </div>


            <div class="cart-product-info">

                <h3>${item.name}</h3>

                <p class="cart-product-size">
                    Size: <strong>${item.size}</strong>
                </p>

                <div class="cart-product-bottom">

                    <strong>
                        ৳${item.price}
                    </strong>

                    <div class="quantity-box">

                        <button
                            class="quantity-minus"
                            data-index="${index}">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-plus"
                            data-index="${index}">
                            +
                        </button>

                    </div>

                </div>

            </div>


            <button
                class="remove-cart"
                data-index="${index}">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(cartProduct);

    });


    // Quantity buttons

    const minusButtons =
        document.querySelectorAll(".quantity-minus");

    const plusButtons =
        document.querySelectorAll(".quantity-plus");


    minusButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.dataset.index);

            if (cart[index].quantity > 1) {

                cart[index].quantity--;

            } else {

                cart.splice(index, 1);

            }

            updateCart();

        });

    });


    plusButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.dataset.index);

            cart[index].quantity++;

            updateCart();

        });

    });


    // Remove buttons

    const removeButtons =
        document.querySelectorAll(".remove-cart");


    removeButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index =
                Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });


    // Total quantity

    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    // Update navbar count

    cartCount.textContent =
        totalItems;


    // Update cart header

    cartItemTotal.textContent =
        totalItems;


    // Update total price

    cartTotalPrice.textContent =
        "৳" + totalPrice.toLocaleString();

}




// ======================================================================================================================================================================




// =========================
// CHECKOUT SYSTEM
// =========================

const checkoutBtn =
    document.querySelector(".checkout-btn");

const checkoutModal =
    document.querySelector(".checkout-modal");

const checkoutOverlay =
    document.querySelector(".checkout-overlay");

const checkoutClose =
    document.querySelector(".checkout-close");

const checkoutProductList =
    document.querySelector(".checkout-product-list");

const checkoutTotalItems =
    document.querySelector(".checkout-total-items");

const checkoutTotalPrice =
    document.querySelector(".checkout-total-price");


// =========================
// OPEN CHECKOUT
// =========================

checkoutBtn.addEventListener("click", function() {

    // Cart empty হলে checkout হবে না
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Checkout products দেখানো
    updateCheckout();

    // Cart drawer বন্ধ
    closeCart();

    // Checkout modal open
    checkoutModal.classList.add("active");
    checkoutOverlay.classList.add("active");

});


// =========================
// CLOSE CHECKOUT
// =========================

function closeCheckout() {

    checkoutModal.classList.remove("active");

    checkoutOverlay.classList.remove("active");

}

checkoutClose.addEventListener(
    "click",
    closeCheckout
);

checkoutOverlay.addEventListener(
    "click",
    closeCheckout
);


// =========================
// UPDATE CHECKOUT
// =========================

function updateCheckout() {

    checkoutProductList.innerHTML = "";

    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        totalItems += item.quantity;

        totalPrice += itemTotal;


        const checkoutProduct =
            document.createElement("div");

        checkoutProduct.className =
            "checkout-product";


        checkoutProduct.innerHTML = `

            <div class="checkout-product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="checkout-product-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    Size: <strong>${item.size}</strong>
                    &nbsp; | &nbsp;
                    Qty: <strong>${item.quantity}</strong>
                </p>

            </div>


            <div class="checkout-product-price">

                <strong>
                    ৳${itemTotal.toLocaleString()}
                </strong>

                <span>
                    ৳${item.price.toLocaleString()} × ${item.quantity}
                </span>

            </div>

        `;


        checkoutProductList.appendChild(
            checkoutProduct
        );

    });


    // Total Items

    checkoutTotalItems.textContent =
        totalItems;


    // Total Price

    checkoutTotalPrice.textContent =
        "৳" + totalPrice.toLocaleString();

}


// =========================
// order information check
// =========================


// =========================
// ORDER FORM
// =========================

const orderForm =
    document.querySelector(".order-form");



// ======================================================================================================================================================================




// =========================
// SUCCESS POPUP
// =========================

const successOverlay =
    document.querySelector(".success-overlay");

const successClose =
    document.querySelector(".success-close");

const successShopping =
    document.querySelector(".success-shopping");


// =========================
// OPEN SUCCESS POPUP
// =========================

function openSuccessPopup() {

    successOverlay.classList.add("active");

}


// =========================
// CLOSE SUCCESS POPUP
// =========================

function closeSuccessPopup() {

    successOverlay.classList.remove("active");

}


successClose.addEventListener(
    "click",
    closeSuccessPopup
);


successShopping.addEventListener(
    "click",
    closeSuccessPopup
);


// =========================
// CLOSE BY OVERLAY
// =========================

successOverlay.addEventListener(
    "click",
    function(event) {

        if (event.target === successOverlay) {
            closeSuccessPopup();
        }

    }
);



// ======================================================================================================================================================================
// ======================================================================================================================================================================
// ======================================================================================================================================================================












// ======================================================================================================================================================================

orderForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const customerName =
        document.querySelector("#customer-name").value.trim();

    const customerPhone =
        document.querySelector("#customer-phone").value.trim();

    const customerAddress =
        document.querySelector("#customer-address").value.trim();


    if (customerName === "") {
        alert("Please enter your name.");
        return;
    }


    if (customerPhone === "") {
        alert("Please enter your phone number.");
        return;
    }


    if (customerAddress === "") {
        alert("Please enter your delivery address.");
        return;
    }


    const phonePattern = /^01[3-9]\d{8}$/;

    if (!phonePattern.test(customerPhone)) {
        alert("Please enter a valid Bangladesh phone number.");
        return;
    }


    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }


    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach(function(item) {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    const orderData = {

        customerName: customerName,

        customerPhone: customerPhone,

        customerAddress: customerAddress,

        products: cart.map(function(item) {

            return {

                name: item.name,

                size: item.size,

                price: item.price,

                quantity: item.quantity

            };

        }),

        totalItems: totalItems,

        totalPrice: totalPrice,

        status: "Pending",

        createdAt: window.serverTimestamp()

    };


    try {

        const docRef = await window.addDoc(

            window.collection(
                window.db,
                "orders"
            ),

            orderData

        );


        console.log("Order ID:", docRef.id);


        orderForm.reset();

        cart = [];

        updateCart();

        closeCheckout();

        openSuccessPopup();


    } catch (error) {

        console.error("Order Error:", error);

        alert(
            "Something went wrong. Please try again."
        );

    }

});