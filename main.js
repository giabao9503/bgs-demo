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
        popup.style.display = 'block'; // Hiển thị popup theo cách cũ của bạn
        overlay.classList.add('visible'); // Hiển thị overlay
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        refreshCartPopup(); // Refresh content every time it opens
    }
}

// Close cart popup
function closeCartPopup() {
    const popup = document.getElementById('cartPopup');
    const overlay = document.getElementById('cartOverlayBackground');
    if (popup && overlay) {
        popup.style.display = 'none'; // Ẩn popup theo cách cũ của bạn
        overlay.classList.remove('visible'); // Ẩn overlay
        document.body.style.overflow = ''; // Restore scrolling
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
    overlay.classList.add('open'); // Sử dụng class 'open' để kích hoạt CSS overlay.open
    document.body.style.overflow = 'hidden'; // Ngăn cuộn nền

    // Lắng nghe sự kiện click trên lớp phủ để đóng popup
    // Kiểm tra và xóa event listener cũ nếu có để tránh trùng lặp
    if (overlay._overlayClickHandler) {
        overlay.removeEventListener('click', overlay._overlayClickHandler);
    }
    const newOverlayClickHandler = function(e) {
        if (e.target === this) { // Chỉ đóng nếu click trực tiếp vào overlay
            closeDetail();
        }
    };
    overlay.addEventListener('click', newOverlayClickHandler);
    overlay._overlayClickHandler = newOverlayClickHandler; // Lưu handler để xóa sau

    // Quantity input and buttons
    const qtyInput = document.getElementById('quantityInput');
    qtyInput.value = "1"; // Reset quantity to 1 every time the detail opens

    const decreaseBtn = overlay.querySelector('.decrease-qty');
    const increaseBtn = overlay.querySelector('.increase-qty');

    // Remove old listeners to prevent duplicates if popup reopens
    if (decreaseBtn && decreaseBtn._clickHandler) decreaseBtn.removeEventListener('click', decreaseBtn._clickHandler);
    if (increaseBtn && increaseBtn._clickHandler) increaseBtn.removeEventListener('click', increaseBtn._clickHandler);
    
    // Add new listeners
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

    // Store handlers to remove later
    if (decreaseBtn) decreaseBtn._clickHandler = newDecreaseHandler;
    if (increaseBtn) increaseBtn._clickHandler = newIncreaseHandler;

    // Handle add to cart button click
    const addToCartBtn = overlay.querySelector('.add-to-cart-btn');
    
    // Remove old listener to prevent duplicates
    if (addToCartBtn && addToCartBtn._clickHandler) addToCartBtn.removeEventListener('click', addToCartBtn._clickHandler);

    // Add new listener
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
    if (addToCartBtn) addToCartBtn._clickHandler = newAddToCartHandler; // Store handler
}

// Close product detail overlay
function closeDetail() {
    const overlay = document.getElementById('productOverlay');
    if (overlay) {
        overlay.classList.remove('open'); // Xóa class 'open'
        document.body.style.overflow = '';

        // Tùy chọn: Xóa event listener của overlay khi đóng để dọn dẹp bộ nhớ
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

    if (!productList || productList.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                Không có sản phẩm nào trong danh mục "${subType}".
            </div>
        `;
    } else {
        container.innerHTML = productList.map(product => {
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
    document.querySelectorAll('.dropdown-menu a').forEach(item => {
        const type = item.getAttribute('data-type');
        const subType = item.getAttribute('data-subtype');

        if (type && subType) { // Only add listener if data attributes exist
            item.addEventListener('click', function(e) {
                e.preventDefault(); 
                e.stopPropagation(); 
                showProductList(type, subType);
            });
        } else {
            item.addEventListener('click', function(e) {
                if (this.textContent.trim() === "ZALO" || this.textContent.trim() === "INSTAGRAM") {
                    e.preventDefault(); 
                    showToast(`Mở liên kết ${this.textContent.trim()}... (Chức năng chưa được triển khai)`);
                }
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
    const menuBar = document.querySelector('.menu-bar');
    if (menuBar) {
        const cartIconHTML = `
            <div class="cart-icon" id="cartIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e4e29">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span class="cart-count" id="cartCount">0</span>
            </div>
        `;
        menuBar.insertAdjacentHTML('beforeend', cartIconHTML);
        document.getElementById('cartIcon').addEventListener('click', showCartPopup);

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

// Initialize functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupDropdownMenu();
    setupBackToTop();
    setupCartIcon(); 
    loadCartFromLocalStorage();

    // Handle logo click to return to main product collection
    document.getElementById('logo').addEventListener('click', () => {
        document.getElementById('product-list-section').style.display = 'none';
        document.querySelector('.minimal-products').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Expose necessary functions to the global scope if used in onclick attributes
window.showDetail = showDetail;
window.closeDetail = closeDetail;
