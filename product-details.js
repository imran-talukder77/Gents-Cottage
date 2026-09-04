import { products } from "./products.js";



// ============================================================================
// LOAD PRODUCT FROM URL
// ============================================================================

const urlParams =
    new URLSearchParams(window.location.search);

const productId =
    Number(urlParams.get("id"));

const currentProduct =
    products.find(function (product) {
        return product.id === productId;
    });


// =========================
// UPDATE PRODUCT DETAILS
// =========================

if (currentProduct) {

    const productImage =
        document.querySelector(".details-image img");

    const productCategory =
        document.querySelector(".details-category");

    const productName =
        document.querySelector(".details-info h1");

    const productPrice =
        document.querySelector(".details-price span");

    const productOldPrice =
        document.querySelector(".details-price del");


    if (productImage) {

        productImage.src =
            currentProduct.image;

        productImage.alt =
            currentProduct.name;

    }


    if (productCategory) {

        productCategory.textContent =
            currentProduct.category.toUpperCase();

    }


    if (productName) {

        productName.textContent =
            currentProduct.name;

    }


    if (productPrice) {

        productPrice.textContent =
            "৳" +
            currentProduct.price.toLocaleString();

    }


    if (productOldPrice) {

        productOldPrice.textContent =
            "৳" +
            currentProduct.oldPrice.toLocaleString();

    }

}



// ============================================================================
// RELATED PRODUCTS
// ============================================================================

const relatedProductsContainer =
    document.querySelector(
        ".related-products-container"
    );


if (
    currentProduct &&
    relatedProductsContainer
) {

    const relatedProducts =
        products
            .filter(function (product) {

                return (

                    product.category ===
                    currentProduct.category &&

                    product.id !==
                    currentProduct.id

                );

            })
            .slice(0, 4);


    relatedProducts.forEach(
        function (product) {

            const productCard =
                document.createElement(
                    "div"
                );


            // Same class as Home page

            productCard.className =
                "product-card";


            productCard.dataset.category =
                product.category;


            productCard.innerHTML = `

                <div class="product-image">

                    <a href="product-details.html?id=${product.id}">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </a>


                    <span class="product-badge">

                        ${product.badge}

                    </span>

                </div>


                <div class="product-info">

                    <h3>

                        ${product.name}

                    </h3>


                    <div class="price">

                        <span>

                            ৳${product.price}

                        </span>

                        <del>

                            ৳${product.oldPrice}

                        </del>

                    </div>


                    <div class="product-sizes">

                        <button
                            class="size-btn"
                            data-size="M"
                        >
                            M
                        </button>


                        <button
                            class="size-btn"
                            data-size="L"
                        >
                            L
                        </button>


                        <button
                            class="size-btn"
                            data-size="XL"
                        >
                            XL
                        </button>


                        <button
                            class="size-btn"
                            data-size="XXL"
                        >
                            XXL
                        </button>

                    </div>


                    <p class="size-error">

                        Please select a size first!

                    </p>


                    <button class="add-cart">

                        <i class="fa-solid fa-cart-shopping"></i>

                        ADD TO CART

                    </button>

                </div>

            `;


            relatedProductsContainer.appendChild(
                productCard
            );

        }
    );

}



// ============================================================================
// RELATED PRODUCTS - SIZE & ADD TO CART
// ============================================================================


if (relatedProductsContainer) {

    relatedProductsContainer.addEventListener(
        "click",
        function (event) {


            // =========================
            // SIZE SELECT
            // =========================

            const sizeButton =
                event.target.closest(
                    ".size-btn"
                );


            if (sizeButton) {

                const productCard =
                    sizeButton.closest(
                        ".product-card"
                    );


                const allSizeButtons =
                    productCard.querySelectorAll(
                        ".size-btn"
                    );


                allSizeButtons.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                sizeButton.classList.add(
                    "active"
                );


                const sizeError =
                    productCard.querySelector(
                        ".size-error"
                    );


                if (sizeError) {

                    sizeError.classList.remove(
                        "show"
                    );

                }


                return;

            }


            // =========================
            // ADD TO CART
            // =========================

            const addCartButton =
                event.target.closest(
                    ".add-cart"
                );


            if (addCartButton) {

                const productCard =
                    addCartButton.closest(
                        ".product-card"
                    );


                const selectedSizeButton =
                    productCard.querySelector(
                        ".size-btn.active"
                    );


                const sizeError =
                    productCard.querySelector(
                        ".size-error"
                    );


                // SIZE CHECK

                if (!selectedSizeButton) {

                    if (sizeError) {

                        sizeError.classList.add(
                            "show"
                        );

                    }

                    return;

                }


                const selectedSize =
                    selectedSizeButton.dataset.size;


                // FIND PRODUCT ID

                const productLink =
                    productCard.querySelector(
                        ".product-image a"
                    );


                const productUrl =
                    new URL(
                        productLink.href
                    );


                const relatedProductId =
                    Number(
                        productUrl.searchParams.get(
                            "id"
                        )
                    );


                // FIND PRODUCT DATA

                const relatedProduct =
                    products.find(
                        function (product) {

                            return (
                                product.id ===
                                relatedProductId
                            );

                        }
                    );


                if (!relatedProduct) {
                    return;
                }


                // CHECK EXISTING PRODUCT

                const existingProduct =
                    cart.find(
                        function (item) {

                            return (

                                item.name ===
                                relatedProduct.name &&

                                item.size ===
                                selectedSize

                            );

                        }
                    );


                // ADD / UPDATE

                if (existingProduct) {

                    existingProduct.quantity++;

                } else {

                    cart.push({

                        name:
                            relatedProduct.name,

                        image:
                            relatedProduct.image,

                        price:
                            relatedProduct.price,

                        size:
                            selectedSize,

                        quantity:
                            1

                    });

                }


                // UPDATE CART

                updateCart();


                // OPEN CART

                openCart();


                // BUTTON FEEDBACK


                // BUTTON FEEDBACK

                const originalText =
                    addCartButton.innerHTML;


                addCartButton.innerHTML =
                    '<i class="fa-solid fa-check"></i> ADDED';


                setTimeout(
                    function () {

                        addCartButton.innerHTML =
                            originalText;

                    },
                    1000
                );

            }

        }
    );

}



// ============================================================================
// PRODUCT DETAILS PAGE
// ============================================================================


// =========================
// MOBILE MENU
// =========================

const menuBtn =
    document.querySelector(".menu-btn");

const mobileMenu =
    document.querySelector(".mobile-menu");


if (menuBtn && mobileMenu) {

    menuBtn.addEventListener(
        "click",
        function () {

            if (
                mobileMenu.style.display === "block"
            ) {

                mobileMenu.style.display =
                    "none";

            } else {

                mobileMenu.style.display =
                    "block";

            }

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !mobileMenu.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                mobileMenu.style.display =
                    "none";

            }

        }
    );

}



// ============================================================================
// PRODUCT SIZE SELECTION
// ============================================================================

const detailSizeButtons =
    document.querySelectorAll(
        ".details-size .size-options button"
    );


let selectedSize = "";



detailSizeButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                // Remove active from all sizes

                detailSizeButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                // Active selected size

                button.classList.add(
                    "active"
                );


                // Save selected size

                // Save selected size

                selectedSize =
                    button.textContent.trim();


                // Remove size error

                const sizeError =
                    document.querySelector(".size-error");

                if (sizeError) {

                    sizeError.classList.remove("show");

                }

            }
        );

    }
);



// ============================================================================
// PRODUCT QUANTITY
// ============================================================================

const quantityBox =
    document.querySelector(
        ".quantity-box"
    );


let productQuantity = 1;



if (quantityBox) {

    const quantityButtons =
        quantityBox.querySelectorAll(
            "button"
        );

    const quantityDisplay =
        quantityBox.querySelector(
            "span"
        );


    quantityButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const buttonText =
                        button.textContent.trim();


                    // MINUS

                    if (
                        buttonText === "-"
                    ) {

                        if (
                            productQuantity > 1
                        ) {

                            productQuantity--;

                        }

                    }


                    // PLUS

                    if (
                        buttonText === "+"
                    ) {

                        productQuantity++;

                    }


                    // Update display

                    quantityDisplay.textContent =
                        productQuantity;

                }
            );

        }
    );

}



// ============================================================================
// CART SYSTEM
// ============================================================================


// =========================
// CART ELEMENTS
// =========================

const cartDrawer =
    document.querySelector(
        ".cart-drawer"
    );


const cartOverlay =
    document.querySelector(
        ".cart-overlay"
    );


const cartClose =
    document.querySelector(
        ".cart-close"
    );


const cartIcon =
    document.querySelector(
        '.nav-icons a[href="#cart"]'
    );


const cartItems =
    document.querySelector(
        ".cart-items"
    );


const cartItemTotal =
    document.querySelector(
        ".cart-item-total"
    );


const cartTotalPrice =
    document.querySelector(
        ".cart-total-price"
    );


const cartCount =
    document.querySelector(
        ".cart-count"
    );



// =========================
// LOAD CART
// =========================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];



// ============================================================================
// OPEN CART
// ============================================================================

function openCart() {

    if (!cartDrawer) {
        return;
    }


    cartDrawer.classList.add(
        "active"
    );


    if (cartOverlay) {

        cartOverlay.classList.add(
            "active"
        );

    }


    // Browser history

    if (
        location.hash !== "#cart"
    ) {

        history.pushState(
            { cartOpen: true },
            "",
            "#cart"
        );

    }

}



// ============================================================================
// CLOSE CART
// ============================================================================

function closeCart(
    fromBack = false
) {

    if (cartDrawer) {

        cartDrawer.classList.remove(
            "active"
        );

    }


    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }


    if (
        !fromBack &&
        location.hash === "#cart"
    ) {

        history.back();

    }

}



// ============================================================================
// CART ICON
// ============================================================================

if (cartIcon) {

    cartIcon.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            openCart();

        }
    );

}



// ============================================================================
// CART CLOSE
// ============================================================================

if (cartClose) {

    cartClose.addEventListener(
        "click",
        function () {

            closeCart();

        }
    );

}



// ============================================================================
// CART OVERLAY
// ============================================================================

if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        function () {

            closeCart();

        }
    );

}



// ============================================================================
// ADD PRODUCT TO CART
// ============================================================================

const detailsAddCart =
    document.querySelector(
        ".details-add-cart"
    );



if (detailsAddCart) {

    detailsAddCart.addEventListener(
        "click",
        function () {

            // =========================
            // SIZE CHECK
            // =========================

            if (selectedSize === "") {

                const sizeError =
                    document.querySelector(".size-error");

                if (sizeError) {

                    sizeError.textContent =
                        "Please select a size first!";

                    sizeError.classList.add("show");

                }

                return;
            }


            // =========================
            // PRODUCT INFORMATION
            // =========================

            const productName =
                document
                    .querySelector(
                        ".details-info h1"
                    )
                    .textContent
                    .trim();


            const productImage =
                document
                    .querySelector(
                        ".details-image img"
                    )
                    .src;


            const productPriceText =
                document
                    .querySelector(
                        ".details-price span"
                    )
                    .textContent
                    .trim();


            const productPrice =
                parseInt(
                    productPriceText.replace(
                        /[^\d]/g,
                        ""
                    )
                );



            // =========================
            // CHECK EXISTING PRODUCT
            // =========================

            const existingProduct =
                cart.find(
                    function (item) {

                        return (

                            item.name ===
                            productName &&

                            item.size ===
                            selectedSize

                        );

                    }
                );



            // =========================
            // ADD / UPDATE
            // =========================

            if (existingProduct) {

                existingProduct.quantity +=
                    productQuantity;

            } else {

                cart.push({

                    name:
                        productName,

                    image:
                        productImage,

                    price:
                        productPrice,

                    size:
                        selectedSize,

                    quantity:
                        productQuantity

                });

            }



            // =========================
            // SAVE + UPDATE
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
                detailsAddCart.innerHTML;


            detailsAddCart.innerHTML =
                '<i class="fa-solid fa-check"></i> ADDED';


            detailsAddCart.style.background =
                "#27ae60";


            setTimeout(
                function () {

                    detailsAddCart.innerHTML =
                        originalText;


                    detailsAddCart.style.background =
                        "#111827";

                },
                1000
            );

        }
    );

}



// ============================================================================
// UPDATE CART
// ============================================================================

function updateCart() {

    // =========================
    // SAVE CART
    // =========================

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";



    // =========================
    // EMPTY CART
    // =========================

    if (
        cart.length === 0
    ) {

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


        const continueButton =
            cartItems.querySelector(
                ".continue-shopping"
            );


        if (continueButton) {

            continueButton.addEventListener(
                "click",
                function () {

                    closeCart();

                }
            );

        }


        if (cartCount) {

            cartCount.textContent =
                "0";

        }


        if (cartItemTotal) {

            cartItemTotal.textContent =
                "0";

        }


        if (cartTotalPrice) {

            cartTotalPrice.textContent =
                "৳0";

        }


        return;

    }



    // =========================
    // CREATE CART PRODUCTS
    // =========================

    cart.forEach(
        function (item, index) {

            const cartProduct =
                document.createElement(
                    "div"
                );


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

        }
    );



    // ========================================================================
    // CART QUANTITY MINUS
    // ========================================================================

    const minusButtons =
        document.querySelectorAll(
            ".quantity-minus"
        );


    minusButtons.forEach(
        function (button) {

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

        }
    );



    // ========================================================================
    // CART QUANTITY PLUS
    // ========================================================================

    const plusButtons =
        document.querySelectorAll(
            ".quantity-plus"
        );


    plusButtons.forEach(
        function (button) {

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

        }
    );



    // ========================================================================
    // REMOVE CART PRODUCT
    // ========================================================================

    const removeButtons =
        document.querySelectorAll(
            ".remove-cart"
        );


    removeButtons.forEach(
        function (button) {

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

        }
    );



    // ========================================================================
    // CALCULATE TOTAL
    // ========================================================================

    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(
        function (item) {

            totalItems +=
                item.quantity;


            totalPrice +=
                item.price *
                item.quantity;

        }
    );



    // =========================
    // NAVBAR COUNT
    // =========================

    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }


    // =========================
    // CART HEADER COUNT
    // =========================

    if (cartItemTotal) {

        cartItemTotal.textContent =
            totalItems;

    }


    // =========================
    // CART TOTAL
    // =========================

    if (cartTotalPrice) {

        cartTotalPrice.textContent =
            "৳" +
            totalPrice.toLocaleString();

    }

}



// ============================================================================
// CHECKOUT SYSTEM
// ============================================================================

const checkoutBtn =
    document.querySelector(
        ".checkout-btn"
    );


const checkoutModal =
    document.querySelector(
        ".checkout-modal"
    );


const checkoutOverlay =
    document.querySelector(
        ".checkout-overlay"
    );


const checkoutClose =
    document.querySelector(
        ".checkout-close"
    );


const checkoutProductList =
    document.querySelector(
        ".checkout-product-list"
    );


const checkoutTotalItems =
    document.querySelector(
        ".checkout-total-items"
    );


const checkoutTotalPrice =
    document.querySelector(
        ".checkout-total-price"
    );


const orderForm =
    document.querySelector(
        ".order-form"
    );



// ============================================================================
// OPEN CHECKOUT
// ============================================================================

if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            // Empty cart

            if (
                cart.length === 0
            ) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            // Update checkout

            updateCheckout();


            // Close cart

            if (cartDrawer) {

                cartDrawer.classList.remove(
                    "active"
                );

            }


            if (cartOverlay) {

                cartOverlay.classList.remove(
                    "active"
                );

            }


            // Open checkout

            if (checkoutModal) {

                checkoutModal.classList.add(
                    "active"
                );

            }


            if (checkoutOverlay) {

                checkoutOverlay.classList.add(
                    "active"
                );

            }


            // History

            if (
                location.hash !== "#checkout"
            ) {

                history.pushState(
                    { checkoutOpen: true },
                    "",
                    "#checkout"
                );

            }

        }
    );

}



// ============================================================================
// CLOSE CHECKOUT
// ============================================================================

function closeCheckout(
    fromBack = false
) {

    if (checkoutModal) {

        checkoutModal.classList.remove(
            "active"
        );

    }


    if (checkoutOverlay) {

        checkoutOverlay.classList.remove(
            "active"
        );

    }


    if (
        !fromBack &&
        location.hash === "#checkout"
    ) {

        history.back();

    }

}



// ============================================================================
// CHECKOUT CLOSE BUTTON
// ============================================================================

if (checkoutClose) {

    checkoutClose.addEventListener(
        "click",
        function () {

            closeCheckout();

        }
    );

}



// ============================================================================
// CHECKOUT OVERLAY
// ============================================================================

if (checkoutOverlay) {

    checkoutOverlay.addEventListener(
        "click",
        function () {

            closeCheckout();

        }
    );

}



// ============================================================================
// UPDATE CHECKOUT
// ============================================================================

function updateCheckout() {

    if (!checkoutProductList) {
        return;
    }


    checkoutProductList.innerHTML =
        "";


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(
        function (item) {

            const itemTotal =
                item.price *
                item.quantity;


            totalItems +=
                item.quantity;


            totalPrice +=
                itemTotal;


            const checkoutProduct =
                document.createElement(
                    "div"
                );


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

        }
    );



    // =========================
    // TOTAL ITEMS
    // =========================

    if (checkoutTotalItems) {

        checkoutTotalItems.textContent =
            totalItems;

    }


    // =========================
    // TOTAL PRICE
    // =========================

    if (checkoutTotalPrice) {

        checkoutTotalPrice.textContent =
            "৳" +
            totalPrice.toLocaleString();

    }

}



// ============================================================================
// SUCCESS POPUP
// ============================================================================

const successOverlay =
    document.querySelector(
        ".success-overlay"
    );


const successClose =
    document.querySelector(
        ".success-close"
    );


const successShopping =
    document.querySelector(
        ".success-shopping"
    );



// ============================================================================
// OPEN SUCCESS
// ============================================================================

function openSuccessPopup() {

    if (successOverlay) {

        successOverlay.classList.add(
            "active"
        );

    }

}



// ============================================================================
// CLOSE SUCCESS
// ============================================================================

function closeSuccessPopup() {

    if (successOverlay) {

        successOverlay.classList.remove(
            "active"
        );

    }

}



// ============================================================================
// SUCCESS CLOSE
// ============================================================================

if (successClose) {

    successClose.addEventListener(
        "click",
        closeSuccessPopup
    );

}



// ============================================================================
// SUCCESS SHOPPING
// ============================================================================

if (successShopping) {

    successShopping.addEventListener(
        "click",
        function () {

            closeSuccessPopup();

            window.location.href =
                "index.html#products";

        }
    );

}



// ============================================================================
// SUCCESS OVERLAY CLICK
// ============================================================================

if (successOverlay) {

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

}



// ============================================================================
// FORM ELEMENTS
// ============================================================================

const customerNameInput =
    document.querySelector(
        "#customer-name"
    );


const customerPhoneInput =
    document.querySelector(
        "#customer-phone"
    );


const customerAddressInput =
    document.querySelector(
        "#customer-address"
    );


const nameError =
    document.querySelector(
        "#name-error"
    );


const phoneError =
    document.querySelector(
        "#phone-error"
    );


const addressError =
    document.querySelector(
        "#address-error"
    );



// ============================================================================
// CLEAR NAME ERROR
// ============================================================================

if (customerNameInput) {

    customerNameInput.addEventListener(
        "input",
        function () {

            if (
                this.value.trim() !== ""
            ) {

                if (nameError) {

                    nameError.textContent =
                        "";

                }

            }

        }
    );

}



// ============================================================================
// CLEAR PHONE ERROR
// ============================================================================

if (customerPhoneInput) {

    customerPhoneInput.addEventListener(
        "input",
        function () {

            const phone =
                this.value.trim();


            if (
                /^01[3-9]\d{8}$/.test(phone)
            ) {

                if (phoneError) {

                    phoneError.textContent =
                        "";

                }

            }

        }
    );

}



// ============================================================================
// CLEAR ADDRESS ERROR
// ============================================================================

if (customerAddressInput) {

    customerAddressInput.addEventListener(
        "input",
        function () {

            if (
                this.value.trim() !== ""
            ) {

                if (addressError) {

                    addressError.textContent =
                        "";

                }

            }

        }
    );

}



// ============================================================================
// ORDER SUBMIT
// ============================================================================

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                orderForm.querySelector(
                    'button[type="submit"]'
                );


            const customerName =
                customerNameInput
                    ? customerNameInput.value.trim()
                    : "";


            const customerPhone =
                customerPhoneInput
                    ? customerPhoneInput.value.trim()
                    : "";


            const customerAddress =
                customerAddressInput
                    ? customerAddressInput.value.trim()
                    : "";



            // =========================
            // NAME VALIDATION
            // =========================

            if (
                customerName === ""
            ) {

                if (nameError) {

                    nameError.textContent =
                        "Please enter your name.";

                }

                return;

            }



            // =========================
            // PHONE VALIDATION
            // =========================

            if (
                customerPhone === ""
            ) {

                if (phoneError) {

                    phoneError.textContent =
                        "Please enter your phone number.";

                }

                return;

            }



            const phonePattern =
                /^01[3-9]\d{8}$/;


            if (
                !phonePattern.test(
                    customerPhone
                )
            ) {

                if (phoneError) {

                    phoneError.textContent =
                        "Please enter a valid Bangladesh phone number.";

                }

                return;

            }



            // =========================
            // ADDRESS VALIDATION
            // =========================

            if (
                customerAddress === ""
            ) {

                if (addressError) {

                    addressError.textContent =
                        "Please enter your delivery address.";

                }

                return;

            }



            // =========================
            // CART CHECK
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
            // BUTTON DISABLE
            // =========================

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "PROCESSING...";

            }



            // =========================
            // CALCULATE TOTAL
            // =========================

            let totalItems = 0;

            let totalPrice = 0;


            cart.forEach(
                function (item) {

                    totalItems +=
                        item.quantity;


                    totalPrice +=
                        item.price *
                        item.quantity;

                }
            );



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
                    cart.map(
                        function (item) {

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

                        }
                    ),

                totalItems:
                    totalItems,

                totalPrice:
                    totalPrice,

                status:
                    "Pending",

                createdAt:
                    window.serverTimestamp()

            };



            // ====================================================================
            // FIREBASE
            // ====================================================================

            try {

                // Check Firebase

                if (
                    !window.db ||
                    !window.collection ||
                    !window.addDoc ||
                    !window.serverTimestamp
                ) {

                    throw new Error(
                        "Firebase is not connected."
                    );

                }



                // =========================
                // SEND ORDER
                // =========================

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



                // =========================
                // SHOW ORDER ID
                // =========================

                const successOrderId =
                    document.querySelector(
                        "#success-order-id"
                    );


                if (successOrderId) {

                    successOrderId.textContent =
                        orderNumber;

                }



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
                // OPEN SUCCESS
                // =========================

                openSuccessPopup();



                // =========================
                // RESET BUTTON
                // =========================

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        'PLACE ORDER <i class="fa-solid fa-check"></i>';

                }



            } catch (error) {

                console.error(
                    "Order Error:",
                    error
                );


                alert(
                    "Something went wrong. Please try again."
                );


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        'PLACE ORDER <i class="fa-solid fa-check"></i>';

                }

            }

        }
    );

}



// ============================================================================
// BROWSER BACK BUTTON
// ============================================================================

window.addEventListener(
    "popstate",
    function () {

        // Close checkout

        if (
            checkoutModal &&
            checkoutModal.classList.contains(
                "active"
            )
        ) {

            closeCheckout(true);

        }


        // Close cart

        if (
            cartDrawer &&
            cartDrawer.classList.contains(
                "active"
            )
        ) {

            closeCart(true);

        }

    }
);



// ============================================================================
// LOAD SAVED CART
// ============================================================================

updateCart();