// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchBar = document.querySelector('.search-bar');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    searchBar.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Product Data
const products = [
    {
        id: 1,
        name: 'Diamond Solitaire Ring',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Classic solitaire ring with a brilliant cut diamond'
    },
    {
        id: 2,
        name: 'Pearl Necklace',
        price: 899,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Elegant freshwater pearl necklace'
    },
    {
        id: 3,
        name: 'Gold Hoop Earrings',
        price: 499,
        image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Classic gold hoop earrings'
    },
    {
        id: 4,
        name: 'Sapphire Pendant',
        price: 799,
        image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Stunning sapphire pendant with diamond accents'
    },
    {
        id: 5,
        name: 'Emerald Bracelet',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Luxurious emerald and diamond bracelet'
    },
    {
        id: 6,
        name: 'Rose Gold Ring',
        price: 699,
        image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        description: 'Elegant rose gold ring with diamond details'
    }
];

// Dynamic Product Loading
const productsContainer = document.querySelector('.products');

function loadProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
                <div class="quick-add">
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Cart Functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartIcon();
        showNotification('Product added to cart!');
    }
}

function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cart.length > 0) {
        cartIcon.setAttribute('data-count', cart.length);
    }
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    // Clear current products
    productsContainer.innerHTML = '';
    
    // Show filtered products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="quick-add">
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for new elements
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .fa-shopping-cart[data-count]:after {
        content: attr(data-count);
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
    }

    .navbar.scroll-down {
        transform: translateY(-100%);
    }

    .navbar.scroll-up {
        transform: translateY(0);
    }

    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--white);
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .search-bar.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        padding: 1rem;
        background: var(--white);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style); 