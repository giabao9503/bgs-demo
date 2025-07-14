// Product Data
const products = {
    product1: {
        name: "BRUBECK CHAIR",
        price: "$285 USD",
        imageUrl: "https://images.unsplash.com/photo-1653971858653-f11f062bca5b?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        desc: "Handcrafted oak chair with minimalist design. Each piece is finished with natural oils to highlight the wood grain. The Brubeck Chair features a gently curved backrest that provides exceptional lumbar support while maintaining a sleek profile.",
        specs: [
            "Material: Solid oak with natural oil finish",
            "Dimensions: 80cm x 60cm x 45cm",
            "Weight: 8.5kg",
            "Assembly: No assembly required",
            "Lead time: 4-6 weeks"
        ]
    },
    product2: {
        name: "HENDRIX SOFA",
        price: "$320 USD",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        desc: "Modular sofa inspired by 60s design. Upholstered in premium organic cotton with removable covers for easy cleaning. The Hendrix Sofa features a solid beech wood frame and high-density foam cushions for lasting comfort.",
        specs: [
            "Material: Beech wood frame with organic cotton upholstery",
            "Dimensions: 180cm x 85cm x 75cm",
            "Modular configurations available",
            "Cushion filling: High-density foam",
            "Lead time: 6-8 weeks"
        ]
    },
    product3: {
        name: "MONK TABLE",
        price: "$450 USD",
        imageUrl: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        desc: "Minimalist dining table crafted from reclaimed teak. The Monk Table features a unique live-edge design that showcases the natural beauty of the wood while providing a sturdy surface for daily use.",
        specs: [
            "Material: Reclaimed teak with matte finish",
            "Dimensions: 180cm x 90cm x 75cm",
            "Weight: 45kg",
            "Seats: 6-8 comfortably",
            "Lead time: 5-7 weeks"
        ]
    },
    product4: {
        name: "EVANS SHELF",
        price: "$380 USD",
        imageUrl: "https://images.unsplash.com/photo-1653971858341-865fca7c6d6e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        desc: "Floating shelf system with brass accents. The Evans Shelf combines functionality with artistic design, featuring hand-forged brass brackets that complement the walnut shelves.",
        specs: [
            "Material: Walnut shelves with brass brackets",
            "Dimensions: Various configurations available",
            "Weight capacity: 15kg per shelf",
            "Installation: Hardware included",
            "Lead time: 3-5 weeks"
        ]
    },
    product5: {
        name: "COLTRANE BED",
        price: "$620 USD",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        desc: "Platform bed with integrated nightstands. The Coltrane Bed features a low-profile design with ample under-bed storage and built-in lighting for a modern, functional bedroom centerpiece.",
        specs: [
            "Material: Oak frame with linen headboard",
            "Dimensions: King: 210cm x 220cm, Queen: 180cm x 200cm",
            "Storage: Two large under-bed drawers",
            "Includes: Integrated USB charging ports",
            "Lead time: 8-10 weeks"
        ]
    },
    product6: {
        name: "MINGUS ARMCHAIR",
        price: "$290 USD",
        imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        desc: "Curved armchair with velvet upholstery. The Mingus Armchair combines mid-century modern lines with contemporary comfort, featuring a solid walnut frame and plush cushioning.",
        specs: [
            "Material: Walnut frame with velvet upholstery",
            "Dimensions: 75cm x 80cm x 85cm",
            "Weight: 18kg",
            "Cushion: High-resilience foam",
            "Lead time: 4-6 weeks"
        ]
    }
};

// Scroll to Top Functionality
const scrollHandler = {
    init() {
        this.lastScroll = 0;
        window.addEventListener('scroll', () => this.handleScroll(), {passive: true});
        document.getElementById('backTop').addEventListener('click', this.scrollToTop);
        document.getElementById('logo').addEventListener('click', this.scrollToTop);
    },
    
    handleScroll() {
        const menuBar = document.querySelector('.menu-bar');
        const currentScroll = window.scrollY;
        
        // Only update if scroll difference is significant to avoid repaints
        if (Math.abs(currentScroll - this.lastScroll) > 50) {
            if (currentScroll > 100) {
                menuBar.classList.add('scrolled');
            } else {
                menuBar.classList.remove('scrolled');
            }
            this.lastScroll = currentScroll;
        }
        
        // Back to top button
        document.getElementById('backTop').style.display = 
            currentScroll > 300 ? 'flex' : 'none';
    },
    
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Product Modal Functionality
const productModal = {
    init() {
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        document.querySelector('.close-btn').addEventListener('click', this.closeDetail);
    },
    
    showDetail(productId) {
        const product = products[productId];
        if (!product) return;
        
        document.getElementById('detailName').textContent = product.name;
        document.getElementById('detailPrice').textContent = product.price;
        document.getElementById('detailDesc').textContent = product.desc;
        
        const specsList = document.getElementById('detailSpecs');
        specsList.innerHTML = '';
        product.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });
        
        const detailImage = document.getElementById('detailImage');
        detailImage.style.backgroundImage = `url('${product.imageUrl}')`;
        
        const overlay = document.getElementById('productOverlay');
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 10);
    },
    
    closeDetail() {
        const overlay = document.getElementById('productOverlay');
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
};

// Mobile Menu Functionality
const mobileMenu = {
    init() {
        this.setupEventListeners();
        this.fixMobileIssues();
        
        // Add touch support for product cards
        if ('ontouchstart' in window) {
            document.querySelectorAll('.product-card-mini').forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('touchstart', function() {
                    this.classList.add('active');
                }, {passive: true});
            });
        }
    },
    
    setupEventListeners() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.main-menu');
        
        // Click toggle menu
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu(toggle, menu);
        });
        
        // Click menu items
        document.querySelectorAll('.main-menu > li > a').forEach(item => {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parentLi = e.target.closest('li');
                    parentLi.classList.toggle('active');
                    
                    // Close other dropdowns
                    document.querySelectorAll('.main-menu > li').forEach(li => {
                        if (li !== parentLi) li.classList.remove('active');
                    });
                }
            });
        });
    },
    
    toggleMenu(toggle, menu) {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        
        if (menu.classList.contains('active')) {
            this.createOverlay();
        } else {
            this.removeOverlay();
        }
    },
    
    createOverlay() {
        if (!document.querySelector('.menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => {
                this.toggleMenu(
                    document.querySelector('.mobile-menu-toggle'),
                    document.querySelector('.main-menu')
                );
            });
        }
    },
    
    removeOverlay() {
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) overlay.remove();
    },
    
    fixMobileIssues() {
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-bar') && 
                document.querySelector('.mobile-menu-toggle.active')) {
                this.toggleMenu(
                    document.querySelector('.mobile-menu-toggle'),
                    document.querySelector('.main-menu')
                );
            }
        });
        
        // Close menu on resize above mobile breakpoint
        let resizeTimer;
        window.addEventListener('resize', () => {
            document.body.classList.add('resize-animation-stopper');
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
            
            if (window.innerWidth > 768 && 
                document.querySelector('.mobile-menu-toggle.active')) {
                this.toggleMenu(
                    document.querySelector('.mobile-menu-toggle'),
                    document.querySelector('.main-menu')
                );
            }
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    scrollHandler.init();
    productModal.init();
    mobileMenu.init();
    
    // Make functions available globally for HTML onclick
    window.showDetail = productModal.showDetail;
    window.closeDetail = productModal.closeDetail;
    
    // Prevent zoom on double-tap
    document.addEventListener('dblclick', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Optimize touch elements
    document.querySelectorAll('button, a, [onclick]').forEach(element => {
        element.style.tapHighlightColor = 'transparent';
        element.style.webkitTapHighlightColor = 'transparent';
    });
});