// ===============================
// FOODIE WEBSITE - SCRIPT
// ===============================

let cart = [];
let selectedFood = null;
let detailsQuantity = 1;


// ===============================
// CART FUNCTIONS
// ===============================

function addToCart(name, price, image) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart! 🛒💚");
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image || ""}" alt="${item.name}">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>₹${item.price}</p>

                    <div class="cart-controls">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${index})">
                            🗑️
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">🛒</div>

                <h3>Your cart is empty</h3>

                <p>Add some delicious food!</p>

            </div>
        `;
    }

    cartTotal.innerText = "₹" + total;
    cartCount.innerText = count;
}


// ===============================
// CART QUANTITY
// ===============================

function increaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity++;

    updateCart();
}


function decreaseQuantity(index) {

    if (!cart[index]) return;

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}


function removeFromCart(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();
}


// ===============================
// CART OPEN / CLOSE
// ===============================

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


function closeCart() {

    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


// ===============================
// MENU FUNCTIONS
// ===============================

function goToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// SEARCH FOOD
// ===============================

function searchFood() {

    const searchInput =
        document.getElementById("searchInput");

    const searchText =
        searchInput.value.toLowerCase().trim();

    const foodCards =
        document.querySelectorAll(".food-card");

    foodCards.forEach(card => {

        const foodName =
            card.querySelector("h3")
                .innerText
                .toLowerCase();

        const category =
            card.dataset.category
                ? card.dataset.category.toLowerCase()
                : "";

        if (
            foodName.includes(searchText) ||
            category.includes(searchText)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}


// ===============================
// FILTER CATEGORY
// ===============================

function filterCategory(category) {

    const foodCards =
        document.querySelectorAll(".food-card");

    foodCards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// SHOW ALL FOODS
// ===============================

function showAllFoods() {

    const foodCards =
        document.querySelectorAll(".food-card");

    foodCards.forEach(card => {
        card.style.display = "block";
    });

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = "";
    }
}


// ===============================
// FOOD DETAILS
// ===============================

function openFoodDetails(
    name,
    price,
    description,
    rating,
    delivery,
    image
) {

    selectedFood = {
        name: name,
        price: price,
        description: description,
        rating: rating,
        delivery: delivery,
        image: image
    };

    detailsQuantity = 1;


    // IMPORTANT:
    // HTML uses "detailsName"
    // "detailsPrice"
    // etc.

    document.getElementById("detailsName").innerText =
        name;

    document.getElementById("detailsPrice").innerText =
        "₹" + price;

    document.getElementById("detailsDescription").innerText =
        description;

    document.getElementById("detailsRating").innerText =
        "⭐ " + rating;

    document.getElementById("detailsDelivery").innerText =
        "🚴 " + delivery;

    document.getElementById("detailsImage").src =
        image;

    document.getElementById("detailsQuantity").innerText =
        detailsQuantity;


    document
        .getElementById("foodDetailsOverlay")
        .classList.add("active");
}


// ===============================
// CLOSE FOOD DETAILS
// ===============================

function closeFoodDetails() {

    document
        .getElementById("foodDetailsOverlay")
        .classList.remove("active");
}


// ===============================
// FOOD DETAILS QUANTITY
// ===============================

function changeDetailsQuantity(change) {

    detailsQuantity += change;

    if (detailsQuantity < 1) {
        detailsQuantity = 1;
    }

    document.getElementById("detailsQuantity").innerText =
        detailsQuantity;
}


// ===============================
// ADD DETAILS FOOD TO CART
// ===============================

function addDetailsToCart() {

    if (!selectedFood) return;

    const existingItem =
        cart.find(
            item => item.name === selectedFood.name
        );

    if (existingItem) {

        existingItem.quantity += detailsQuantity;

    } else {

        cart.push({

            name: selectedFood.name,

            price: selectedFood.price,

            image: selectedFood.image,

            quantity: detailsQuantity
        });
    }

    updateCart();

    closeFoodDetails();

    alert(
        detailsQuantity +
        " x " +
        selectedFood.name +
        " added to cart! 🛒💚"
    );
}


// ===============================
// CHECKOUT
// ===============================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty! Please add some food first. 😊"
        );

        return;
    }

    closeCart();

    document
        .getElementById("checkoutOverlay")
        .classList.add("active");

    calculateCheckoutTotal();
}


// ===============================
// CLOSE CHECKOUT
// ===============================

function closeCheckout() {

    document
        .getElementById("checkoutOverlay")
        .classList.remove("active");
}


// ===============================
// CHECKOUT TOTAL
// ===============================

function calculateCheckoutTotal() {

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });


    // Fixed delivery fee
    const deliveryFee = 40;

    // Final total
    const total =
        subtotal + deliveryFee;


    // Show subtotal
    const checkoutSubtotal =
        document.getElementById("checkoutSubtotal");

    if (checkoutSubtotal) {

        checkoutSubtotal.innerText =
            "₹" + subtotal;
    }


    // Show delivery fee
    const deliveryFeeElement =
        document.getElementById("deliveryFee");

    if (deliveryFeeElement) {

        deliveryFeeElement.innerText =
            "₹" + deliveryFee;
    }


    // Show final total
    const checkoutTotal =
        document.getElementById("checkoutTotal");

    if (checkoutTotal) {

        checkoutTotal.innerText =
            "₹" + total;
    }
}


// ===============================
// PLACE ORDER
// ===============================
function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Calculate subtotal
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    // Delivery fee
    const deliveryFee = 40;

    // Final total
    const total = subtotal + deliveryFee;


    // Customer details
    const customerName =
        document.getElementById("customerName").value;

    const paymentMethod =
        document.getElementById("paymentMethod").value;


    // Generate Order ID
    const orderId =
        "FD" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );
    // Save the latest order
localStorage.setItem("foodieLatestOrder", JSON.stringify({
    orderId: orderId,
    name: customerName,
    total: total,
    payment: paymentMethod,
    createdAt: Date.now()
}));
// Save every order in Order History
const savedOrders = JSON.parse(
    localStorage.getItem("foodieOrderHistory") || "[]"
);

savedOrders.unshift({
    orderId: orderId,
    name: customerName,
    total: total,
    payment: paymentMethod,
    createdAt: Date.now(),
    items: cart.map(function (item) {
        return {
            name: item.name,
            price: item.price,
            quantity: item.quantity
        };
    })
});

localStorage.setItem(
    "foodieOrderHistory",
    JSON.stringify(savedOrders)
);


    // Success screen details
    const successName =
        document.getElementById("successName");

    const successOrderId =
        document.getElementById("orderId");

    const successTotal =
        document.getElementById("successTotal");

    const successPayment =
        document.getElementById("successPayment");


    if (successName) {
        successName.innerText = customerName;
    }

    if (successOrderId) {
        successOrderId.innerText = orderId;
    }

    if (successTotal) {
        successTotal.innerText = "₹" + total;
    }

    if (successPayment) {
        successPayment.innerText = paymentMethod;
    }


    // Close checkout
    closeCheckout();


    // Show success screen
    document
        .getElementById("orderSuccess")
        .classList.add("active");


    // Clear cart
    cart = [];

    updateCart();


    // Start order tracking
    startOrderTracking();
}
// ===============================
// ORDER TRACKING - 5 STEPS
// ===============================

function startOrderTracking() {

    const steps = document.querySelectorAll(".tracking-step");

    if (steps.length < 5) return;

    // Reset all steps
    steps.forEach(step => {
        step.classList.remove("active", "completed");
    });

    // Step 1 - Order Confirmed
    steps[0].classList.add("active");

    // Step 2 - Preparing
    setTimeout(function () {
        steps[0].classList.remove("active");
        steps[0].classList.add("completed");
        steps[1].classList.add("active");
    }, 3000);

    // Step 3 - Picked Up
    setTimeout(function () {
        steps[1].classList.remove("active");
        steps[1].classList.add("completed");
        steps[2].classList.add("active");
    }, 6000);

    // Step 4 - Out for Delivery
    setTimeout(function () {
        steps[2].classList.remove("active");
        steps[2].classList.add("completed");
        steps[3].classList.add("active");
    }, 9000);

    // Step 5 - Delivered
    setTimeout(function () {
        steps[3].classList.remove("active");
        steps[3].classList.add("completed");
        steps[4].classList.add("active");
    }, 12000);

    // Mark Delivered as completed
    setTimeout(function () {
        steps[4].classList.remove("active");
        steps[4].classList.add("completed");
    }, 15000);
}
// ===============================
// CLOSE SUCCESS
// ===============================

function closeSuccess() {

    document
        .getElementById("orderSuccess")
        .classList.remove("active");
}


// ===============================
// LOGIN / SIGN UP
// ===============================

function openLogin() {

    document
        .getElementById("authOverlay")
        .classList.add("active");

    showLogin();
}


function closeLogin() {

    document
        .getElementById("authOverlay")
        .classList.remove("active");
}


// ===============================
// SHOW LOGIN
// ===============================

function showLogin() {

    document
        .getElementById("loginForm")
        .style.display = "block";

    document
        .getElementById("signupForm")
        .style.display = "none";
}


// ===============================
// SHOW SIGN UP
// ===============================

function showSignup() {

    document
        .getElementById("loginForm")
        .style.display = "none";

    document
        .getElementById("signupForm")
        .style.display = "block";
}


// ===============================
// SIGN UP
// ===============================

function signupUser(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("signupName")
            .value
            .trim();


    const email =
        document
            .getElementById("signupEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("signupPassword")
            .value;


    if (!name || !email || !password) {

        alert(
            "Please fill all details! 😊"
        );

        return;
    }


    const user = {

        name: name,

        email: email,

        password: password
    };


    localStorage.setItem(
        "foodieUser",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully! 🎉💚"
    );


    const signupForm =
        document.getElementById("signupForm");


    if (signupForm) {

        signupForm.reset();
    }


    showLogin();
}


// ===============================
// LOGIN
// ===============================

function loginUser(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "foodieUser"
            )
        );


    if (!savedUser) {

        alert(
            "No account found. Please Sign Up first. 😊"
        );

        showSignup();

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "foodieLoggedIn",
            "true"
        );


        alert(
            "Login successful! Welcome " +
            savedUser.name +
            " 💚"
        );


        closeLogin();

        updateLoginButton();


        const loginForm =
            document.getElementById("loginForm");


        if (loginForm) {

            loginForm.reset();
        }


    } else {

        alert(
            "Incorrect email or password. Please try again."
        );
    }
}


// ===============================
// LOGIN BUTTON STATE
// ===============================

function updateLoginButton() {

    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "foodieUser"
            )
        );


    const loggedIn =
        localStorage.getItem(
            "foodieLoggedIn"
        ) === "true";


    const loginButton =
        document.querySelector(
            ".login-nav-btn"
        );


    if (!loginButton) return;


    if (loggedIn && savedUser) {

        loginButton.innerText =
            "👤 " + savedUser.name;

        loginButton.onclick =
            logoutUser;

    } else {

        loginButton.innerText =
            "👤 Login";

        loginButton.onclick =
            openLogin;
    }
}


// ===============================
// LOGOUT
// ===============================

function logoutUser() {

    localStorage.removeItem(
        "foodieLoggedIn"
    );


    alert(
        "Logged out successfully! 👋"
    );


    updateLoginButton();
}


// ===============================
// PAGE LOAD
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCart();

        updateLoginButton();

    }
);


// ===============================
// ESC KEY
// ===============================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeFoodDetails();

            closeCart();

            closeCheckout();

            closeSuccess();

            closeLogin();
        }
    }
);



function openOrders() {
    const overlay = document.getElementById("orderHistoryOverlay");
    const list = document.getElementById("orderHistoryList");

    if (!overlay || !list) {
        alert("Order History section not found!");
        return;
    }

    let orders = [];

    try {
        orders = JSON.parse(
            localStorage.getItem("foodieOrderHistory") || "[]"
        );

        if (!Array.isArray(orders)) {
            orders = [];
        }
    } catch (error) {
        orders = [];
    }

    // Show the latest saved order if history is empty
    if (orders.length === 0) {
        try {
            const latestOrder = localStorage.getItem("foodieLatestOrder");

            if (latestOrder) {
                orders = [JSON.parse(latestOrder)];
            }
        } catch (error) {
            orders = [];
        }
    }

    list.innerHTML = "";

    if (orders.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "order-history-empty";
        emptyMessage.textContent =
            "No orders yet. Place your first order! 🍔";

        list.appendChild(emptyMessage);
    } else {
        orders.forEach(function (order) {
            const card = document.createElement("div");
            card.className = "order-history-card";

            const heading = document.createElement("h3");
            heading.textContent = "Order ID: " + (order.orderId || "N/A");
            card.appendChild(heading);

            function addRow(label, value) {
                const paragraph = document.createElement("p");
                paragraph.textContent = label + ": " + value;
                card.appendChild(paragraph);
            }

            const orderDate = order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "Date unavailable";

            addRow("Date", orderDate);
            addRow("Total Amount", "₹" + (order.total ?? 0));
            addRow("Payment", order.payment || "N/A");

            if (Array.isArray(order.items) && order.items.length > 0) {
                const itemNames = order.items.map(function (item) {
                    return item.name + " × " + item.quantity;
                }).join(", ");

                addRow("Items", itemNames);
            }

            list.appendChild(card);
        });
    }

    overlay.classList.add("active");
}


function closeOrderHistory() {
    document.getElementById("orderHistoryOverlay")
        .classList.remove("active");
}
