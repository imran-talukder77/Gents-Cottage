// =========================
// PRODUCT CATEGORY FILTER
// =========================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Remove active from all buttons
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active to clicked button
        button.classList.add("active");


        // Get selected category
        const selectedCategory =
            button.dataset.filter;


        // Show / hide products
        productCards.forEach(function (product) {

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


wishlistButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const icon =
            button.querySelector("i");


        // Add Wishlist
        if (icon.classList.contains("fa-regular")) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");


            button.style.color =
                "#e74c3c";


            wishlistTotal++;


            wishlistCount.textContent =
                wishlistTotal;

        }


        // Remove Wishlist
        else {

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");


            button.style.color =
                "#333";


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


sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

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
        allSizeButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Selected size active
        button.classList.add("active");


        // Hide error
        sizeError.style.display =
            "none";

    });

});



// ============================================================================
// CART DRAWER
// ============================================================================

// Cart elements

const cartDrawer =
    document.querySelector(".cart-drawer");

const cartOverlay =
    document.querySelector(".cart-overlay");

const cartClose =
    document.querySelector(".cart-close");


const cartIcon =
    document.querySelector(
        '.nav-icons a[href="#cart"]'
    );


const cartItems =
    document.querySelector(".cart-items");


const cartItemTotal =
    document.querySelector(".cart-item-total");


const cartTotalPrice =
    document.querySelector(".cart-total-price");


const continueShopping =
    document.querySelector(".continue-shopping");


const cartCount =
    document.querySelector(".cart-count");


const addCartButtons =
    document.querySelectorAll(".add-cart");


// Actual cart array

let cart = [];



// =========================
// OPEN CART
// =========================

function openCart() {

    // Cart already open থাকলে
    // নতুন history add হবে না

    if (
        cartDrawer.classList.contains("active")
    ) {

        return;

    }


    // Cart open

    cartDrawer.classList.add("active");

    cartOverlay.classList.add("active");


    // Browser history add

    history.pushState(
        { cartOpen: true },
        "",
        "#cart"
    );

}



// =========================
// CART ICON CLICK
// =========================

cartIcon.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        openCart();

    }
);



// =========================
// CLOSE CART
// =========================

function closeCart(fromBack = false) {

    // Cart close

    cartDrawer.classList.remove("active");

    cartOverlay.classList.remove("active");


    // Normal close হলে history back

    if (
        !fromBack &&
        location.hash === "#cart"
    ) {

        history.back();

    }

}



// =========================
// CLOSE BUTTON
// =========================

cartClose.addEventListener(
    "click",
    function () {

        closeCart();

    }
);



// =========================
// OVERLAY CLICK
// =========================

cartOverlay.addEventListener(
    "click",
    function () {

        closeCart();

    }
);



// =========================
// CONTINUE SHOPPING
// =========================

if (continueShopping) {

    continueShopping.addEventListener(
        "click",
        function () {

            closeCart();

        }
    );

}



// =========================
// ADD PRODUCT TO CART
// =========================

addCartButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            // Current product

            const productCard =
                button.closest(".product-card");


            // Selected size

            const selectedSize =
                productCard.querySelector(
                    ".size-btn.active"
                );


            // Error message

            const sizeError =
                productCard.querySelector(
                    ".size-error"
                );


            // =========================
            // SIZE CHECK
            // =========================

            if (!selectedSize) {

                sizeError.style.display =
                    "block";

                return;

            }


            sizeError.style.display =
                "none";


            // =========================
            // PRODUCT INFORMATION
            // =========================

            const productName =
                productCard
                    .querySelector("h3")
                    .textContent
                    .trim();


            const productImage =
                productCard
                    .querySelector("img")
                    .src;


            const productPrice =
                productCard
                    .querySelector(".price span")
                    .textContent
                    .trim();


            const priceNumber =
                parseInt(
                    productPrice.replace(
                        /[^\d]/g,
                        ""
                    )
                );


            const size =
                selectedSize.dataset.size;



            // =========================
            // CHECK EXISTING PRODUCT
            // =========================

            const existingProduct =
                cart.find(function (item) {

                    return (

                        item.name ===
                            productName &&

                        item.size ===
                            size

                    );

                });



            // =========================
            // ADD PRODUCT
            // =========================

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name:
                        productName,

                    image:
                        productImage,

                    price:
                        priceNumber,

                    size:
                        size,

                    quantity:
                        1

                });

            }



            // =========================
            // UPDATE CART
            // =========================

            updateCart();



            // =========================
            // OPEN CART
            // =========================

            openCart();



            // =========================
            // BUTTON FEEDBACK
            // =========================

            const originalText =
                button.innerHTML;


            button.innerHTML =
                '<i class="fa-solid fa-check"></i> ADDED';


            button.style.background =
                "#27ae60";


            setTimeout(function () {

                button.innerHTML =
                    originalText;


                button.style.background =
                    "#222";

            }, 1000);

        }
    );

});



// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartItems.innerHTML = "";



    // =========================
    // EMPTY CART
    // =========================

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">

                    <i class="fa-solid fa-cart-shopping"></i>

                </div>


                <h3>
                    Your Cart is Empty
                </h3>


                <p>
                    Looks like you haven't added
                    anything to your cart yet.
                </p>


                <button class="continue-shopping">

                    CONTINUE SHOPPING

                </button>

            </div>

        `;



        // Dynamically created button

        const newContinueButton =
            cartItems.querySelector(
                ".continue-shopping"
            );


        if (newContinueButton) {

            newContinueButton.addEventListener(
                "click",
                function () {

                    closeCart();

                }
            );

        }



        // Update counts

        cartCount.textContent =
            "0";


        cartItemTotal.textContent =
            "0";


        cartTotalPrice.textContent =
            "৳0";


        return;

    }



    // =========================
    // CREATE CART PRODUCTS
    // =========================

    cart.forEach(function (item, index) {

        const cartProduct =
            document.createElement("div");


        cartProduct.className =
            "cart-product";


        cartProduct.innerHTML = `

            <div class="cart-product-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-product-info">

                <h3>
                    ${item.name}
                </h3>


                <p class="cart-product-size">

                    Size:

                    <strong>
                        ${item.size}
                    </strong>

                </p>


                <div class="cart-product-bottom">

                    <strong>

                        ৳${item.price.toLocaleString()}

                    </strong>


                    <div class="quantity-box">

                        <button
                            class="quantity-minus"
                            data-index="${index}"
                        >

                            −

                        </button>


                        <span>

                            ${item.quantity}

                        </span>


                        <button
                            class="quantity-plus"
                            data-index="${index}"
                        >

                            +

                        </button>

                    </div>

                </div>

            </div>


            <button
                class="remove-cart"
                data-index="${index}"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(
            cartProduct
        );

    });



    // =========================
    // QUANTITY MINUS
    // =========================

    const minusButtons =
        document.querySelectorAll(
            ".quantity-minus"
        );


    minusButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.dataset.index
                    );


                if (
                    cart[index].quantity > 1
                ) {

                    cart[index].quantity--;

                } else {

                    cart.splice(
                        index,
                        1
                    );

                }


                updateCart();

            }
        );

    });



    // =========================
    // QUANTITY PLUS
    // =========================

    const plusButtons =
        document.querySelectorAll(
            ".quantity-plus"
        );


    plusButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.dataset.index
                    );


                cart[index].quantity++;


                updateCart();

            }
        );

    });



    // =========================
    // REMOVE PRODUCT
    // =========================

    const removeButtons =
        document.querySelectorAll(
            ".remove-cart"
        );


    removeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.dataset.index
                    );


                cart.splice(
                    index,
                    1
                );


                updateCart();

            }
        );

    });



    // =========================
    // CALCULATE TOTAL
    // =========================

    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(function (item) {

        totalItems +=
            item.quantity;


        totalPrice +=
            item.price *
            item.quantity;

    });



    // =========================
    // UPDATE NAVBAR COUNT
    // =========================

    cartCount.textContent =
        totalItems;



    // =========================
    // UPDATE CART HEADER
    // =========================

    cartItemTotal.textContent =
        totalItems;



    // =========================
    // UPDATE TOTAL PRICE
    // =========================

    cartTotalPrice.textContent =
        "৳" +
        totalPrice.toLocaleString();

}



// ============================================================================
// CHECKOUT SYSTEM
// ============================================================================

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


const orderForm =
    document.querySelector(".order-form");



// =========================
// OPEN CHECKOUT
// =========================

checkoutBtn.addEventListener(
    "click",
    function () {

        // Cart empty check

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;

        }



        // Update products

        updateCheckout();



        // Close cart manually

        cartDrawer.classList.remove(
            "active"
        );


        cartOverlay.classList.remove(
            "active"
        );



        // Open checkout

        checkoutModal.classList.add(
            "active"
        );


        checkoutOverlay.classList.add(
            "active"
        );



        // Form show

        orderForm.style.display =
            "block";

    }
);



// =========================
// CLOSE CHECKOUT
// =========================

function closeCheckout() {

    checkoutModal.classList.remove(
        "active"
    );


    checkoutOverlay.classList.remove(
        "active"
    );

}



// =========================
// CHECKOUT CLOSE BUTTON
// =========================

checkoutClose.addEventListener(
    "click",
    closeCheckout
);



// =========================
// CHECKOUT OVERLAY CLICK
// =========================

checkoutOverlay.addEventListener(
    "click",
    closeCheckout
);



// =========================
// UPDATE CHECKOUT
// =========================

function updateCheckout() {

    checkoutProductList.innerHTML =
        "";


    let totalItems = 0;

    let totalPrice = 0;



    cart.forEach(function (item) {

        const itemTotal =
            item.price *
            item.quantity;


        totalItems +=
            item.quantity;


        totalPrice +=
            itemTotal;



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

                    Size:

                    <strong>
                        ${item.size}
                    </strong>

                    &nbsp; | &nbsp;

                    Qty:

                    <strong>
                        ${item.quantity}
                    </strong>

                </p>

            </div>


            <div class="checkout-product-price">

                <strong>

                    ৳${itemTotal.toLocaleString()}

                </strong>


                <span>

                    ৳${item.price.toLocaleString()}
                    ×
                    ${item.quantity}

                </span>

            </div>

        `;


        checkoutProductList.appendChild(
            checkoutProduct
        );

    });



    // Total items

    checkoutTotalItems.textContent =
        totalItems;



    // Total price

    checkoutTotalPrice.textContent =
        "৳" +
        totalPrice.toLocaleString();

}



// ============================================================================
// SUCCESS POPUP
// ============================================================================

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

    successOverlay.classList.add(
        "active"
    );

}



// =========================
// CLOSE SUCCESS POPUP
// =========================

function closeSuccessPopup() {

    successOverlay.classList.remove(
        "active"
    );

}



// =========================
// SUCCESS CLOSE BUTTON
// =========================

successClose.addEventListener(
    "click",
    closeSuccessPopup
);



// =========================
// SUCCESS SHOPPING BUTTON
// =========================

successShopping.addEventListener(
    "click",
    closeSuccessPopup
);



// =========================
// SUCCESS OVERLAY CLICK
// =========================

successOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            successOverlay
        ) {

            closeSuccessPopup();

        }

    }
);



// ============================================================================
// ORDER FORM SUBMIT
// ============================================================================

orderForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();



        const customerName =
            document
                .querySelector(
                    "#customer-name"
                )
                .value
                .trim();



        const customerPhone =
            document
                .querySelector(
                    "#customer-phone"
                )
                .value
                .trim();



        const customerAddress =
            document
                .querySelector(
                    "#customer-address"
                )
                .value
                .trim();



        // =========================
        // NAME VALIDATION
        // =========================

        if (
            customerName === ""
        ) {

            alert(
                "Please enter your name."
            );

            return;

        }



        // =========================
        // PHONE VALIDATION
        // =========================

        if (
            customerPhone === ""
        ) {

            alert(
                "Please enter your phone number."
            );

            return;

        }



        // =========================
        // ADDRESS VALIDATION
        // =========================

        if (
            customerAddress === ""
        ) {

            alert(
                "Please enter your delivery address."
            );

            return;

        }



        // =========================
        // BANGLADESH PHONE PATTERN
        // =========================

        const phonePattern =
            /^01[3-9]\d{8}$/;



        if (
            !phonePattern.test(
                customerPhone
            )
        ) {

            alert(
                "Please enter a valid Bangladesh phone number."
            );

            return;

        }



        // =========================
        // CART EMPTY CHECK
        // =========================

        if (
            cart.length === 0
        ) {

            alert(
                "Your cart is empty."
            );

            return;

        }



        // =========================
        // CALCULATE TOTAL
        // =========================

        let totalItems = 0;

        let totalPrice = 0;



        cart.forEach(function (item) {

            totalItems +=
                item.quantity;


            totalPrice +=
                item.price *
                item.quantity;

        });



        // =========================
        // ORDER DATA
        // =========================

        const orderData = {

            customerName:
                customerName,

            customerPhone:
                customerPhone,

            customerAddress:
                customerAddress,

            products:
                cart.map(function (item) {

                    return {

                        name:
                            item.name,

                        size:
                            item.size,

                        price:
                            item.price,

                        quantity:
                            item.quantity

                    };

                }),

            totalItems:
                totalItems,

            totalPrice:
                totalPrice,

            status:
                "Pending",

            createdAt:
                window.serverTimestamp()

        };



        // =========================
        // SEND ORDER TO FIREBASE
        // =========================

        try {

            const docRef =
                await window.addDoc(

                    window.collection(
                        window.db,
                        "orders"
                    ),

                    orderData

                );



            console.log(
                "Order ID:",
                docRef.id
            );



            // =========================
            // CREATE ORDER NUMBER
            // =========================

            const orderNumber =
                "GC-" +
                new Date()
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, "") +
                "-" +
                docRef.id
                    .slice(0, 3)
                    .toUpperCase();



            document.querySelector(
                "#success-order-id"
            ).textContent =
                orderNumber;



            // =========================
            // RESET FORM
            // =========================

            orderForm.reset();



            // =========================
            // CLEAR CART
            // =========================

            cart = [];


            updateCart();



            // =========================
            // CLOSE CHECKOUT
            // =========================

            closeCheckout();



            // =========================
            // OPEN SUCCESS POPUP
            // =========================

            openSuccessPopup();



        } catch (error) {

            console.error(
                "Order Error:",
                error
            );


            alert(
                "Something went wrong. Please try again."
            );

        }

    }
);



// ============================================================================
// CATEGORY SHOP NOW BUTTON
// ============================================================================

const categoryShopButtons =
    document.querySelectorAll(
        ".category-shop"
    );


categoryShopButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const category =
                    this.dataset.category;



                // Find matching filter button

                const filterButton =
                    document.querySelector(
                        `.filter-btn[data-filter="${category}"]`
                    );



                if (filterButton) {

                    // Click filter button

                    filterButton.click();

                }



                // Scroll to products

                document
                    .querySelector("#products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    }
);



// ============================================================================
// PHONE / BROWSER BACK BUTTON
// ============================================================================

window.addEventListener(
    "popstate",
    function () {

        // Checkout open থাকলে

        if (
            checkoutModal.classList.contains(
                "active"
            )
        ) {

            closeCheckout();

        }



        // Cart open থাকলে

        if (
            cartDrawer.classList.contains(
                "active"
            )
        ) {

            closeCart(true);

        }

    }
);