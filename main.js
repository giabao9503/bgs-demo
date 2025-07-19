// Product Data
const products = {
    product1: {name:"BRUBECK CHAIR",price:"$285 USD",imageUrl:"https://images.unsplash.com/photo-1653971858653-f11f062bca5b?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",desc:"Handcrafted oak chair with minimalist design. Each piece is finished with natural oils to highlight the wood grain. The Brubeck Chair features a gently curved backrest that provides exceptional lumbar support while maintaining a sleek profile.",specs:["Material: Solid oak with natural oil finish","Dimensions: 80cm x 60cm x 45cm","Weight: 8.5kg","Assembly: No assembly required","Lead time: 4-6 weeks"]},
    product2: {name:"HENDRIX SOFA",price:"$320 USD",imageUrl:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",desc:"Modular sofa inspired by 60s design. Upholstered in premium organic cotton with removable covers for easy cleaning. The Hendrix Sofa features a solid beech wood frame and high-density foam cushions for lasting comfort.",specs:["Material: Beech wood frame with organic cotton upholstery","Dimensions: 180cm x 85cm x 75cm","Modular configurations available","Cushion filling: High-density foam","Lead time: 6-8 weeks"]},
    product3: {name:"MONK TABLE",price:"$450 USD",imageUrl:"https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",desc:"Minimalist dining table crafted from reclaimed teak. The Monk Table features a unique live-edge design that showcases the natural beauty of the wood while providing a sturdy surface for daily use.",specs:["Material: Reclaimed teak with matte finish","Dimensions: 180cm x 90cm x 75cm","Weight: 45kg","Seats: 6-8 comfortably","Lead time: 5-7 weeks"]},
    product4: {name:"EVANS SHELF",price:"$380 USD",imageUrl:"https://images.unsplash.com/photo-1653971858341-865fca7c6d6e?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",desc:"Floating shelf system with brass accents. The Evans Shelf combines functionality with artistic design, featuring hand-forged brass brackets that complement the walnut shelves.",specs:["Material: Walnut shelves with brass brackets","Dimensions: Various configurations available","Weight capacity: 15kg per shelf","Installation: Hardware included","Lead time: 3-5 weeks"]},
    product5: {name:"COLTRANE BED",price:"$620 USD",imageUrl:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",desc:"Platform bed with integrated nightstands. The Coltrane Bed features a low-profile design with ample under-bed storage and built-in lighting for a modern, functional bedroom centerpiece.",specs:["Material: Oak frame with linen headboard","Dimensions: King: 210cm x 220cm, Queen: 180cm x 200cm","Storage: Two large under-bed drawers","Includes: Integrated USB charging ports","Lead time: 8-10 weeks"]},
    product6: {name:"MINGUS ARMCHAIR",price:"$290 USD",imageUrl:"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",desc:"Curved armchair with velvet upholstery. The Mingus Armchair combines mid-century modern lines with contemporary comfort, featuring a solid walnut frame and plush cushioning.",specs:["Material: Walnut frame with velvet upholstery","Dimensions: 75cm x 80cm x 85cm","Weight: 18kg","Cushion: High-resilience foam","Lead time: 4-6 weeks"]}
};

const productTypes = {
    living: {
        sofas: [products.product2],
        tables: [products.product3]
    },
    dining: {
        tables: [products.product3],
        chairs: [products.product1]
    },
    bed: {
        beds: [products.product5],
        nightstands: [],
        dressers: [],
    },
    bath: {},
    decor: {}
};

function showDetail(productId) {
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
    document.getElementById('detailImage').style.backgroundImage = `url('${product.imageUrl}')`;
    const overlay = document.getElementById('productOverlay');
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }, 10);
}
function closeDetail() {
    const overlay = document.getElementById('productOverlay');
    overlay.classList.remove('show');
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function showProductList(type, subType) {
    type = type.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
    subType = subType.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');

    const list = productTypes[type]?.[subType] || [];
    const section = document.getElementById('product-list-section');
    const container = document.getElementById('product-list-container');
    const title = document.getElementById('product-list-title');
    const desc = document.getElementById('product-list-desc');
    title.textContent = `${subType.charAt(0).toUpperCase() + subType.slice(1)} (${type.charAt(0).toUpperCase() + type.slice(1)})`;
    desc.textContent = `Danh sách sản phẩm ${subType}`;

    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<div style="background:red;padding:40px;color:white;">Không có sản phẩm!</div>';
    } else {
        list.forEach(product => {
            const key = Object.keys(products).find(k => products[k].name === product.name);
            const card = document.createElement('div');
            card.className = 'product-card-mini';
            card.onclick = () => showDetail(key);
            card.innerHTML = `
                <div class="product-image-mini" style="background-image: url('${product.imageUrl}')"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }
    section.style.display = 'block';
    document.querySelector('.minimal-products').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.main-menu > li > .dropdown-menu > li > a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            let parentLi = item.closest('.main-menu > li');
            let type = parentLi.querySelector('a').textContent.trim().toLowerCase();
            type = type.replace(/\s+/g, '').replace(/[^a-z]/g, '');
            let subType = item.textContent.trim().toLowerCase();
            subType = subType.replace(/\s+/g, '').replace(/[^a-z]/g, '');

            showProductList(type, subType);
        });
    });

    document.getElementById('logo').addEventListener('click', function() {
        document.getElementById('product-list-section').style.display = 'none';
        document.querySelector('.minimal-products').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.showDetail = showDetail;
    window.closeDetail = closeDetail;
});
// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', function() {
        backTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    backTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
