// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 50) {
            el.classList.add('animated');
        }
    });
};
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Testimonial Slider
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

const showTestimonial = (index) => {
    testimonials.forEach(t => t.classList.remove('active'));
    testimonials[index].classList.add('active');
};

prevBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
});

nextBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
});

showTestimonial(testimonialIndex);

// Cart Functionality
const cartToggle = document.getElementById('cart-toggle');
const body = document.body;

// Create cart sidebar dynamically
const cartSidebar = document.createElement('div');
cartSidebar.classList.add('cart-sidebar');
cartSidebar.innerHTML = `
    <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button id="cart-close">&times;</button>
    </div>
    <div class="cart-items"></div>
    <div class="cart-footer">
        <div class="cart-total">Total: ₹0</div>
        <button class="btn btn-primary checkout-btn">Checkout</button>
    </div>
`;
body.appendChild(cartSidebar);

const cartClose = document.getElementById('cart-close');
const cartItemsContainer = cartSidebar.querySelector('.cart-items');
const cartTotalEl = cartSidebar.querySelector('.cart-total');
const cartCountEl = document.querySelector('.cart-count');

let cart = [];

// Add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const dishCard = e.target.closest('.dish-card');
        const title = dishCard.querySelector('h3').innerText;
        const priceText = dishCard.querySelector('p').innerText;
        const price = parseInt(priceText.replace('₹',''));

        const existing = cart.find(item => item.title === title);
        if(existing){
            existing.qty += 1;
        } else {
            cart.push({ title, price, qty: 1 });
        }
        updateCart();
    });
});

const updateCart = () => {
    // Update cart items in sidebar
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.style.display = 'flex';
        cartItem.style.justifyContent = 'space-between';
        cartItem.style.marginBottom = '10px';
        cartItem.innerHTML = `
            <span>${item.title} x ${item.qty}</span>
            <span>₹${item.price * item.qty}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    cartTotalEl.innerText = `Total: ₹${total}`;

    // Update cart count
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.innerText = totalQty;
    cartCountEl.style.display = totalQty > 0 ? 'flex' : 'none';
};

// Toggle cart sidebar
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.toggle('active');
});

// Close cart sidebar
cartClose.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Checkout button functionality
const checkoutBtn = document.querySelector('.checkout-btn');

checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0){
        alert("Your cart is empty!");
    } else {
        let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        alert(`Thank you for your order! Total: ₹${total}`);
        cart = []; // clear cart
        updateCart(); // update cart UI
        cartSidebar.classList.remove('active'); // close sidebar
    }
});

