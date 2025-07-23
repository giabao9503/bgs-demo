// Product Data
const products = {
    product1: {
        name: "BRUBECK CHAIR",
        price: 285, // Store price as number for easier calculations
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL 2
        desc: "Handcrafted oak chair with minimalist design, perfect for adding a touch of modern elegance to any living or dining space. Features a comfortable, ergonomic seat and a sturdy, durable frame.",
        specs: ["Material: Solid oak", "Dimensions: 50cm (W) x 80cm (H) x 55cm (D)", "Finish: Natural wood oil"]
    },
    product2: {
        name: "HENDRIX SOFA",
        price: 320,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL 3
        desc: "Modular sofa inspired by 60s design, offering versatile seating arrangements. Upholstered in premium, soft fabric for ultimate comfort and style.",
        specs: ["Material: Beech wood frame, High-density foam, Polyester fabric", "Dimensions: 220cm (L) x 90cm (W) x 75cm (H)", "Color: Charcoal Grey"]
    },
    product3: {
        name: "MONK TABLE",
        price: 450,
        imageUrl: "https://images.unsplash.com/photo-1683342952214-7a16488a2876?q=80&w=629&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL 6
        desc: "Minimalist dining table crafted from reclaimed teak wood, showcasing natural grains and a unique, rustic charm. Ideal for intimate gatherings or large family meals.",
        specs: ["Material: Reclaimed teak wood", "Dimensions: 180cm (L) x 90cm (W) x 75cm (H)", "Seating Capacity: 6-8 people"]
    },
    product4: {
        name: "EVANS SHELF",
        price: 380,
        imageUrl: "https://images.unsplash.com/photo-1653971858341-865fca7c6d6e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL 4
        desc: "Open shelf unit perfect for books and decor, blending industrial design with natural wood. Provides ample storage and a contemporary aesthetic.",
        specs: ["Material: Powder-coated steel frame with solid oak shelves", "Dimensions: 180cm (H) x 80cm (W) x 30cm (D)", "Weight Capacity: 20kg per shelf"]
    },
    product5: {
        name: "COLTRANE BED",
        price: 620,
        imageUrl: "https://images.unsplash.com/photo-1667322524638-d00577a6467a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL 5
        desc: "Platform bed with integrated nightstands, designed for a sleek and modern bedroom. Crafted from durable wood with a supportive slatted base.",
        specs: ["Material: Solid oak frame", "Sizes Available: Queen, King", "Features: Integrated side tables"]
    },
    product6: {
        name: "MINGUS ARMCHAIR",
        price: 290,
        imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // URL 1
        desc: "Curved armchair with luxurious velvet upholstery, providing a stylish and comfortable seating option. Features elegant wooden legs and a supportive backrest.",
        specs: ["Material: Walnut frame, Velvet upholstery", "Color: Deep Green", "Style: Mid-century modern"]
    }
};

const productTypes = {
    living: {
        sofas: [products.product2, products.product6], // Assuming armchair is a type of living room seating
        tables: [products.product3, products.product4] // Including shelf here as a living room table/storage
    },
    dining: {
        tables: [products.product3],
        chairs: [products.product1]
    },
    bed: {
        beds: [products.product5],
        nightstands: [], // No specific nightstands defined yet
        dressers: []    // No specific dressers defined yet
    },
    bath: {
        vanities: [],
        mirrors: [],
        accessories: []
    },
    decor: {
        mirrors: [],
        artwork: [],
        vases: []
    }
};

let cart = [];

// Helper function to format price
function formatPrice(price) {
    return `$${price.toFixed(2)} USD`;
}

// Function to add product to cart
function addToCart(productId, quantity = 1) {
    const product = products[productId];
    if (!product) {
        showToast("Product not found.");
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
            quantity: quantity
        });
    }
    updateCartUI();
    saveCartToLocalStorage();
    showToast(`Đã thêm ${quantity} × ${product.name} vào giỏ hàng`);
}

// Function to remove product from cart
function removeFromCart(productId, itemElement) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToLocalStorage();
    refreshCartPopup(); // Refresh to show empty cart message if applicable
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

// Update cart UI (count in icon and total in popup)
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }

    const totalPrice = calculateTotal();
    const cartTotalPriceElement = document.getElementById('cartTotalPrice');
    if (cartTotalPriceElement) {
        cartTotalPriceElement.textContent = formatPrice(totalPrice);
    }
}

// Refresh cart popup content
function refreshCartPopup() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartFooter = document.querySelector('.cart-popup .cart-footer');
    const cartHeaderTitle = document.querySelector('.cart-header h3');

    if (!cartItemsContainer) {
        console.error("Cart items container not found.");
        return;
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => {
            const itemTotal = item.price * item.quantity;
            return `
                <div class="cart-item">
                    <button class="remove-item" data-id="${item.id}">×</button>
                    <img src="${item.image}" width="60" height="60" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${formatPrice(item.price)} × ${item.quantity} = ${formatPrice(itemTotal)}</p>
                    </div>
                </div>
            `;
        }).join('');
        if (cartFooter) cartFooter.style.display = ''; // Show footer if cart has items (use empty string to revert to default display)
    }

    // Update item count in header
    if (cartHeaderTitle) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartHeaderTitle.textContent = `Shopping Cart (${totalItems} items)`;
    }
    
    // Update total price in footer
    const totalElement = document.getElementById('cartTotalPrice');
    if (totalElement) {
        totalElement.textContent = formatPrice(calculateTotal());
    }

    // Add remove item event listeners
    cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.cart-item');
            removeFromCart(e.target.dataset.id, itemElement);
        });
    });
}

// Show cart popup
function showCartPopup() {
    const popup = document.getElementById('cartPopup');
    const overlay = document.getElementById('cartOverlayBackground');
    if (popup && overlay) {
        popup.style.display = 'block';
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
        refreshCartPopup(); // Refresh content every time it opens
    }
}

// Close cart popup
function closeCartPopup() {
    const popup = document.getElementById('cartPopup');
    const overlay = document.getElementById('cartOverlayBackground');
    if (popup && overlay) {
        popup.style.display = 'none';
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }
}

// Calculate total cart price
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Show toast message
function showToast(message) {
    let toast = document.querySelector('.toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-message';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Show product detail overlay
function showDetail(productId) {
    const product = products[productId];
    if (!product) return;

    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailPrice').textContent = formatPrice(product.price);
    document.getElementById('detailDesc').textContent = product.desc;

    const specsList = document.getElementById('detailSpecs');
    specsList.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        specsList.appendChild(li);
    });

    document.getElementById('detailImage').style.backgroundImage = `url('${product.imageUrl}')`;

    const overlay = document.getElementById('productOverlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (overlay._overlayClickHandler) {
        overlay.removeEventListener('click', overlay._overlayClickHandler);
    }
    const newOverlayClickHandler = function(e) {
        if (e.target === this) {
            closeDetail();
        }
    };
    overlay.addEventListener('click', newOverlayClickHandler);
    overlay._overlayClickHandler = newOverlayClickHandler;

    const qtyInput = document.getElementById('quantityInput');
    qtyInput.value = "1";

    const decreaseBtn = overlay.querySelector('.decrease-qty');
    const increaseBtn = overlay.querySelector('.increase-qty');

    if (decreaseBtn && decreaseBtn._clickHandler) decreaseBtn.removeEventListener('click', decreaseBtn._clickHandler);
    if (increaseBtn && increaseBtn._clickHandler) increaseBtn.removeEventListener('click', increaseBtn._clickHandler);
    
    const newDecreaseHandler = () => {
        let currentVal = parseInt(qtyInput.value, 10);
        if (currentVal > 1) {
            qtyInput.value = currentVal - 1;
        }
    };
    const newIncreaseHandler = () => {
        let currentVal = parseInt(qtyInput.value, 10);
        if (currentVal < 99) {
            qtyInput.value = currentVal + 1;
        }
    };

    if (decreaseBtn) decreaseBtn.addEventListener('click', newDecreaseHandler);
    if (increaseBtn) increaseBtn.addEventListener('click', newIncreaseHandler);

    if (decreaseBtn) decreaseBtn._clickHandler = newDecreaseHandler;
    if (increaseBtn) increaseBtn._clickHandler = newIncreaseHandler;

    const addToCartBtn = overlay.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn && addToCartBtn._clickHandler) addToCartBtn.removeEventListener('click', addToCartBtn._clickHandler);

    const newAddToCartHandler = () => {
        const quantity = parseInt(qtyInput.value, 10);
        if (isNaN(quantity) || quantity < 1 || quantity > 99) {
            showToast("Vui lòng nhập số lượng hợp lệ (1-99).");
            qtyInput.focus();
            return;
        }
        addToCart(productId, quantity);
        closeDetail();
    };
    if (addToCartBtn) addToCartBtn.addEventListener('click', newAddToCartHandler);
    if (addToCartBtn) addToCartBtn._clickHandler = newAddToCartHandler;
}

// Close product detail overlay
function closeDetail() {
    const overlay = document.getElementById('productOverlay');
    if (overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';

        if (overlay._overlayClickHandler) {
            overlay.removeEventListener('click', overlay._overlayClickHandler);
            overlay._overlayClickHandler = null;
        }
    }
}

// Show product list by type/subtype
function showProductList(type, subType) {
    const category = productTypes[type];
    const productList = category ? category[subType] : null;

    const container = document.getElementById('product-list-container');
    const title = document.getElementById('product-list-title');
    const desc = document.getElementById('product-list-desc');

    if (!container || !title || !desc) {
        console.error("Product list container, title, or description element not found.");
        return;
    }

    if (!productList || productList.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                Không có sản phẩm nào trong danh mục "${subType}".
            </div>
        `;
    } else {
        container.innerHTML = productList.map(product => {
            // Find the product key from the global products object to use with showDetail
            const key = Object.keys(products).find(k => products[k].name === product.name);
            return `
                <div class="product-card-mini" onclick="showDetail('${key}')">
                    <div class="product-image-mini" style="background-image: url('${product.imageUrl}')"></div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">${formatPrice(product.price)}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    title.textContent = subType.toUpperCase();
    desc.textContent = `Sản phẩm ${subType}`;
    document.getElementById('product-list-section').style.display = 'block';
    document.querySelector('.minimal-products').style.display = 'none'; // Hide main product collection

    // Scroll to the product list section
    setTimeout(() => {
        const section = document.getElementById('product-list-section');
        if (section) {
            const offset = section.offsetTop - 100; // Adjust for sticky header/spacing
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }, 100);
}

// Setup dropdown menu functionality
function setupDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-menu');

        if (dropbtn && dropdownContent) {
            // Logic for Desktop (hover)
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    dropdownContent.style.display = 'block';
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    dropdownContent.style.display = 'none';
                }
            });

            // Logic for Mobile (click on dropbtn to toggle)
            dropbtn.addEventListener('click', (event) => {
                if (window.innerWidth <= 768) {
                    event.preventDefault(); // Prevent default link behavior for mobile dropdown toggle
                    dropdown.classList.toggle('active');
                }
            });

            // Attach click event for child items in dropdown
            dropdownContent.querySelectorAll('a').forEach(itemLink => {
                itemLink.addEventListener('click', (event) => {
                    event.preventDefault(); // PREVENT DEFAULT BEHAVIOR (scrolling to top)

                    const parentType = dropdown.dataset.type; // Get type from parent dropdown's data-attribute
                    const subType = itemLink.dataset.subtype; // Get subtype from child link's data-attribute

                    if (parentType && subType) {
                        showProductList(parentType, subType);
                    } else {
                        console.warn("Missing data-type or data-subtype for dropdown item:", itemLink);
                    }

                    // Close mobile menu after selecting an item
                    if (window.innerWidth <= 768) {
                        document.querySelector('.main-menu').classList.remove('active');
                        document.body.style.overflow = '';
                        dropdown.classList.remove('active'); // Close the specific dropdown
                    }
                    
                    // Close dropdown on desktop after click
                    if (window.innerWidth > 768) {
                        dropdownContent.style.display = 'none';
                    }
                });
            });
        }
    });
}

// Setup back to top button functionality
function setupBackToTop() {
    const backTop = document.getElementById('backTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        backTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Setup cart icon and its functionality
function setupCartIcon() {
    // Attempt to find an existing cart icon container first
    let cartIconContainer = document.getElementById('cartIcon'); 
    
    // If no existing container, create one and append it to the menu-bar
    if (!cartIconContainer) {
        const menuBar = document.querySelector('.menu-bar');
        if (menuBar) {
            cartIconContainer = document.createElement('div');
            cartIconContainer.className = 'cart-icon';
            cartIconContainer.id = 'cartIcon';
            cartIconContainer.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e4e29">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span class="cart-count" id="cartCount">0</span>
            `;
            menuBar.insertAdjacentElement('beforeend', cartIconContainer);
        } else {
            console.warn("Menu bar not found, cannot attach cart icon.");
            return; // Exit if menuBar is not found
        }
    }

    // Attach click event to the cart icon (whether it was existing or newly created)
    if (cartIconContainer) {
        cartIconContainer.addEventListener('click', showCartPopup);

        // Add event listener to close cart popup from the close button inside the popup
        const closeCartButton = document.querySelector('.cart-popup .close-cart');
        if (closeCartButton) {
            closeCartButton.addEventListener('click', closeCartPopup);
        }

        // Add event listener for clicking on the overlay background
        let cartOverlayBackground = document.getElementById('cartOverlayBackground');
        if (!cartOverlayBackground) {
            cartOverlayBackground = document.createElement('div');
            cartOverlayBackground.id = 'cartOverlayBackground';
            cartOverlayBackground.className = 'cart-overlay-background';
            document.body.appendChild(cartOverlayBackground);
        }
        
        if (cartOverlayBackground._cartOverlayClickHandler) {
            cartOverlayBackground.removeEventListener('click', cartOverlayBackground._cartOverlayClickHandler);
        }
        const newCartOverlayClickHandler = closeCartPopup; 
        cartOverlayBackground.addEventListener('click', newCartOverlayClickHandler);
        cartOverlayBackground._cartOverlayClickHandler = newCartOverlayClickHandler; 
    }
}

// Setup hamburger menu functionality
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const mainMenu = document.querySelector('.main-menu');

    if (hamburger && mainMenu) {
        hamburger.addEventListener('click', () => {
            mainMenu.classList.toggle('active');
            if (mainMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on any link within it (excluding the dropdown parent links, handled by dropdown logic)
        mainMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                const parentDropdown = link.closest('.dropdown');
                if (!parentDropdown && mainMenu.classList.contains('active')) { // If not part of a dropdown and menu is active
                   mainMenu.classList.remove('active');
                   document.body.style.overflow = '';
                }
            });
        });
    } else {
        console.warn("Hamburger menu or main menu element not found.");
    }
}

// Initialize functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupDropdownMenu();
    setupBackToTop();
    setupCartIcon();
    setupHamburgerMenu();
    loadCartFromLocalStorage();

    // Handle logo click to return to main product collection
    document.getElementById('logo').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        document.getElementById('product-list-section').style.display = 'none';
        document.querySelector('.minimal-products').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


// Expose necessary functions to the global scope if used in onclick attributes
window.showDetail = showDetail;
window.closeDetail = closeDetail;
window.showProductList = showProductList; // Ensure this is accessible globally
// Fix lỗi scroll bị vô hiệu hóa
function enablePageScroll() {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}

// Gọi hàm này khi cần khôi phục scroll
document.addEventListener('click', function(e) {
    // Nếu không phải là các phần tử form
    if (!e.target.closest('input, select, textarea')) {
        enablePageScroll();
    }
});

// Sửa sự kiện cho overlay
const overlay = document.getElementById('productOverlay');
if (overlay) {
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            enablePageScroll();
        }
    });
}
