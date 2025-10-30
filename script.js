// ===================================
// Loading Screen

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});


// Navbar Scroll Effect & Active Link
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Close mobile menu
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});


// Mobile Hamburger Menu

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Animate on Scroll

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 100) {
            el.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Hero Stats Counter Animation

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateCount = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.floor(current);
                        setTimeout(updateCount, 20);
                    } else {
                        stat.textContent = target + '+';
                    }
                };

                updateCount();
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}


// Search Functionality
const searchToggle = document.getElementById('search-toggle');
const searchOverlay = document.getElementById('search-overlay');
const searchClose = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// All dishes data for search
const allDishes = [
    { name: 'Margherita Pizza', price: 199, category: 'pizza' },
    { name: 'Pasta Alfredo', price: 249, category: 'pasta' },
    { name: 'Veggie Burger', price: 149, category: 'burger' },
    { name: 'World Famous Spaghetti', price: 249, category: 'pasta' },
    { name: 'Mexican Rice', price: 229, category: 'rice' },
    { name: 'Southern Buttermilk Biscuits', price: 179, category: 'burger' }
];

searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
});

searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
});

// Close search on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }
});

// Search input handler
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        searchResults.innerHTML = '';
        return;
    }

    const results = allDishes.filter(dish => 
        dish.name.toLowerCase().includes(query)
    );

    if (results.length > 0) {
        searchResults.innerHTML = results.map(dish => `
            <div class="search-result-item" onclick="scrollToDish('${dish.name}')">
                <strong>${dish.name}</strong> - ₹${dish.price}
            </div>
        `).join('');
    } else {
        searchResults.innerHTML = '<div class="search-result-item">No dishes found</div>';
    }
});

// Scroll to dish function
function scrollToDish(dishName) {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    
    const menuSection = document.getElementById('menu');
    menuSection.scrollIntoView({ behavior: 'smooth' });
    
    showToast(`Showing: ${dishName}`, 'success');
}

// Category Filter

const filterButtons = document.querySelectorAll('.filter-btn');
const dishCards = document.querySelectorAll('.dish-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-category');

        dishCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Testimonial Slider

let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');
const dotsContainer = document.querySelector('.testimonial-dots');

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.testimonial-dot');

const showTestimonial = (index) => {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
};

prevBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
});

nextBtn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
});

// Auto-play testimonials
let testimonialAutoPlay = setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
}, 5000);

// Pause auto-play on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialAutoPlay);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialAutoPlay = setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        showTestimonial(testimonialIndex);
    }, 5000);
});

showTestimonial(testimonialIndex);

// Cart Functionality

const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.querySelector('.cart-count');

let cart = [];

// Load cart from localStorage
const loadCart = () => {
    const savedCart = localStorage.getItem('foodieHubCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
};

// Save cart to localStorage
const saveCart = () => {
    localStorage.setItem('foodieHubCart', JSON.stringify(cart));
};

// Add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const name = btn.getAttribute('data-name');
        const price = parseInt(btn.getAttribute('data-price'));

        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += 1;
            showToast(`${name} quantity updated!`, 'success');
        } else {
            cart.push({ name, price, qty: 1 });
            showToast(`${name} added to cart!`, 'success');
        }
        
        updateCart();
        saveCart();
        
        // Button animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 100);
    });
});

// Update cart UI
const updateCart = () => {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotalEl.textContent = '₹0';
        cartCountEl.textContent = '0';
        cartCountEl.classList.remove('show');
        return;
    }
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.qty;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} × ${item.qty}</div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
                <span class="cart-item-qty">${item.qty}</span>
                <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                <button class="remove-item" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalEl.textContent = `₹${total}`;
    
    // Update cart count
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
    cartCountEl.classList.add('show');
};

// Increase quantity
window.increaseQty = (index) => {
    cart[index].qty += 1;
    updateCart();
    saveCart();
};

// Decrease quantity
window.decreaseQty = (index) => {
    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1);
        showToast('Item removed from cart', 'error');
    }
    updateCart();
    saveCart();
};

// Remove item
window.removeItem = (index) => {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    updateCart();
    saveCart();
    showToast(`${itemName} removed from cart`, 'error');
};

// Toggle cart sidebar
cartToggle.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.toggle('active');
});

// Close cart sidebar
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Checkout button
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
    } else {
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
        
        showToast(`Order placed! Total: ₹${total} for ${itemCount} items`, 'success');
        
        // Clear cart
        cart = [];
        updateCart();
        saveCart();
        cartSidebar.classList.remove('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Load cart on page load
loadCart();


// Newsletter Form

const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('newsletter-name').value;
    const email = document.getElementById('newsletter-email').value;
    
    if (name && email) {
        showToast(`Welcome ${name}! Check your email for 20% off coupon!`, 'success');
        newsletterForm.reset();
    }
});

// ===================================
// Toast Notification
// ===================================
const toast = document.getElementById('toast');

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Scroll to Top Button

const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Prevent Default Empty Links
// ===================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.id) {
            e.preventDefault();
        }
    });

// Performance Optimization - Debounce
    
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Console Welcome Message

console.log('%c🍕 Welcome to FoodieHub! 🍕', 'font-size: 24px; color: #e74c3c; font-weight: bold;');
console.log('%c😋 Hungry? Order now and get fresh food delivered! 🚀', 'font-size: 14px; color: #2ecc71;');

    
// Service Worker Registration (Optional PWA)
    
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// End of Script
console.log('✅ FoodieHub - All systems ready!');
