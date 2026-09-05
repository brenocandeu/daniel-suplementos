
const URL_PLANILHA_GOOGLE = 'https://docs.google.com/spreadsheets/d/1uQJiDBSCi8ZGXJ3IHOxzYlTWJR8vc1HQse6oMbpWgVg/gviz/tq?tqx=out:csv';
const URL_PLANILHA_CUPONS = 'https://docs.google.com/spreadsheets/d/1MqjOYkfgomfgPC7PTrvmJEENdWRiAjCnNfpXMH69sps/gviz/tq?tqx=out:csv'; // Link CSV da planilha de cupons

let CUPONS_DB = [{ codigo: 'kdbibi', desconto: 5 }]; // Inicializa com o cupom de teste
let appliedCoupon = null;

let PRODUTOS_DB = [];

document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DE DESEJOS
    const wishlistKeys = 'NF_WISHLIST';
    const WISHLIST_EXPIRACY = 30 * 24 * 60 * 60 * 1000;
    let wishlistItems = JSON.parse(localStorage.getItem(wishlistKeys)) || [];
    const now = Date.now();
    wishlistItems = wishlistItems.filter(item => now < item.expiresAt);
    localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));

    // LÓGICA DO CARRINHO
    const cartKeys = 'NF_CART';
    let cartItems = JSON.parse(localStorage.getItem(cartKeys)) || [];

    const cartCountEl = document.getElementById('cartCount');
    const wishlistCountEl = document.getElementById('wishlistCount');
    const cartSidebar = document.getElementById('cartSidebar');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const overlay = document.getElementById('globalOverlay');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');
    const cartTotalPriceEl = document.getElementById('cartTotalPrice');
    const couponInput = document.getElementById('couponInput');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    
    let productCards = []; // Vai ser preenchido após renderizar

    const formatPrice = (p) => parseFloat(p).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    if (applyCouponBtn && couponInput) {
        couponInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });

        applyCouponBtn.addEventListener('click', () => {
            const codigo = couponInput.value.trim().toLowerCase();
            if (!codigo) {
                alert('Digite um código de cupom válido.');
                return;
            }
            
            const foundCoupon = CUPONS_DB.find(c => c.codigo === codigo);
            if (foundCoupon) {
                appliedCoupon = foundCoupon;
                // alert(`Cupom ${codigo.toUpperCase()} aplicado com sucesso! Desconto de ${foundCoupon.desconto}%`);
                couponInput.value = '';
                renderCart();
            } else {
                alert('Cupom inválido ou expirado.');
            }
        });
    }

    const updateBadges = () => {
        cartCountEl.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        wishlistCountEl.textContent = wishlistItems.length;

        if(productCards.length > 0){
           productCards.forEach(card => {
               const id = card.getAttribute('data-id');
               const heartBtn = card.querySelector('.wishlist-btn');
               if(!heartBtn) return;
               const icon = heartBtn.querySelector('i');
               
               if(wishlistItems.find(w => w.id === id)){
                   heartBtn.classList.add('active');
                   icon.classList.remove('fa-regular');
                   icon.classList.add('fa-solid');
               } else {
                   heartBtn.classList.remove('active');
                   icon.classList.add('fa-regular');
                   icon.classList.remove('fa-solid');
               }
           });
        }
    };

    const toggleWishlist = (id, title, price, category, imageUrlHtml) => {
        const index = wishlistItems.findIndex(w => w.id === id);
        if(index > -1){
            wishlistItems.splice(index, 1);
        } else {
            wishlistItems.push({
                id, title, price, category, imageUrlHtml,
                expiresAt: Date.now() + WISHLIST_EXPIRACY
            });
        }
        localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));
        updateBadges();
        renderWishlist();
    };

    const addToCart = (id, title, price, category, imageUrlHtml) => {
        const numericPrice = parseFloat(price);
        const exists = cartItems.find(c => c.id === id);
        if(exists){
            exists.quantity += 1;
        } else {
            cartItems.push({ id, title, price: numericPrice, quantity: 1, category, imageUrlHtml });
        }
        localStorage.setItem(cartKeys, JSON.stringify(cartItems));
        updateBadges();
        renderCart();
        
        cartSidebar.classList.add('open');
        overlay.classList.add('open');
    };

    window.updateCartQuantity = (id, delta) => {
        const item = cartItems.find(c => c.id === id);
        if(!item) return;
        item.quantity += delta;
        if(item.quantity <= 0) {
            cartItems = cartItems.filter(c => c.id !== id);
        }
        localStorage.setItem(cartKeys, JSON.stringify(cartItems));
        updateBadges();
        renderCart();
    };

    window.removeWishlist = (id) => {
        wishlistItems = wishlistItems.filter(w => w.id !== id);
        localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));
        updateBadges();
        renderWishlist();
    };

    // Hero Buy Buttons (se existirem na página)
    const heroBuyBtns = document.querySelectorAll('.hero-buy-btn');
    if(heroBuyBtns.length > 0){
        heroBuyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                const title = btn.getAttribute('data-title');
                const price = btn.getAttribute('data-price');
                const category = btn.getAttribute('data-category');
                addToCart(id, title, price, category, '<div class="image-placeholder"><i class="fa-solid fa-bolt"></i></div>');
            });
        });
    }

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if(cartItems.length === 0){
            cartItemsContainer.innerHTML = '<p style="color:#A0A0A0; text-align:center; margin-top:20px;">O seu carrinho está vazio.</p>';
            cartTotalPriceEl.innerHTML = 'R$ 0,00';
            return;
        }

        cartItems.forEach(item => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="sidebar-item">
                    <div class="sidebar-item-img">${item.imageUrlHtml || ''}</div>
                    <div class="sidebar-item-info">
                        <h5>${item.title}</h5>
                        <span class="price">${formatPrice(item.price)}</span>
                        <div class="qty-controls">
                            <button onclick="updateCartQuantity('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                            <span>${item.quantity}</span>
                            <button onclick="updateCartQuantity('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            `;
        });

        if (appliedCoupon) {
            const discountValue = total * (appliedCoupon.desconto / 100);
            const totalWithDiscount = total - discountValue;
            cartTotalPriceEl.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: flex-end;">
                    <div><s style="font-size: 0.8em; color: #aaa; margin-right: 8px;">${formatPrice(total)}</s><span style="color: #2ecc71;">${formatPrice(totalWithDiscount)}</span></div>
                    <div style="font-size: 0.7em; color: #39FF14; margin-top: 4px;">Cupom ${appliedCoupon.codigo.toUpperCase()} aplicado (-${appliedCoupon.desconto}%)</div>
                </div>
            `;
        } else {
            cartTotalPriceEl.textContent = formatPrice(total);
        }
    };

    const renderWishlist = () => {
        wishlistItemsContainer.innerHTML = '';
        if(wishlistItems.length === 0){
            wishlistItemsContainer.innerHTML = '<p style="color:#A0A0A0; text-align:center; margin-top:20px;">Sua lista de desejos está vazia.</p>';
            return;
        }
        wishlistItems.forEach(item => {
            wishlistItemsContainer.innerHTML += `
                <div class="sidebar-item">
                    <div class="sidebar-item-img">${item.imageUrlHtml || ''}</div>
                    <div class="sidebar-item-info">
                        <h5>${item.title}</h5>
                        <span class="price">R$ ${item.price.replace('.', ',')}</span>
                        <div class="wishlist-actions" style="margin-top:10px;">
                            <button onclick="removeWishlist('${item.id}')" style="background:transparent; border:none; color:#ff4757; cursor:pointer;"><i class="fa-solid fa-trash"></i> Remover</button>
                        </div>
                    </div>
                </div>
            `;
        });
    };

    document.getElementById('openCartBtn').addEventListener('click', () => {
        renderCart();
        cartSidebar.classList.add('open');
        overlay.classList.add('open');
    });

    document.getElementById('openWishlistBtn').addEventListener('click', () => {
        renderWishlist();
        wishlistSidebar.classList.add('open');
        overlay.classList.add('open');
    });

    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        wishlistSidebar.classList.remove('open');
        overlay.classList.remove('open');
    });

    document.querySelectorAll('.close-sidebar').forEach(btn => {
        btn.addEventListener('click', () => {
             cartSidebar.classList.remove('open');
             wishlistSidebar.classList.remove('open');
             overlay.classList.remove('open');
        });
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if(cartItems.length === 0) return alert('Seu carrinho está vazio!');
        let message = "Olá! Gostaria de finalizar o seguinte pedido:\n\n";
        let totalOriginal = 0;
        cartItems.forEach(i => {
            totalOriginal += i.price * i.quantity;
            message += `- ${i.quantity}x *${i.title}* (${formatPrice(i.price)})\n`;
        });

        if (appliedCoupon) {
            const discountValue = totalOriginal * (appliedCoupon.desconto / 100);
            const totalFinal = totalOriginal - discountValue;
            message += `\nSubtotal: ${formatPrice(totalOriginal)}\n`;
            message += `*Cupom utilizado:* ${appliedCoupon.codigo.toUpperCase()} (${appliedCoupon.desconto}% de desconto)\n`;
            message += `*TOTAL FINAL: ${formatPrice(totalFinal)}*\n\nComo podemos prosseguir com o pagamento e a entrega?`;
        } else {
            message += `\n*TOTAL: ${formatPrice(totalOriginal)}*\n\nComo podemos prosseguir com o pagamento e a entrega?`;
        }

        const whatsappNumber = "5517996821533";
        const encodedUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(encodedUrl, '_blank');
    });

    // CARROSSEL INICIAL (HERO)
    const track = document.getElementById('heroCarousel');
    if(track) {
        const slides = document.querySelectorAll('.hero-card');
        const dots = document.querySelectorAll('.hero-pagination .dot');
        let currentIndex = 0;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        const updateCarousel = (index) => {
            currentTranslate = index * -100;
            prevTranslate = currentTranslate;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
            track.style.transform = `translateX(${currentTranslate}%)`;
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        };

        const getPositionX = (e) => {
            return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        };

        const touchStart = (index) => {
            return (e) => {
                isDragging = true;
                startPos = getPositionX(e);
                animationID = requestAnimationFrame(animation);
                track.style.transition = 'none';
                track.style.cursor = 'grabbing';
                clearInterval(carouselInterval);
            };
        };

        const touchMove = (e) => {
            if(isDragging) {
                const currentPosition = getPositionX(e);
                const diff = currentPosition - startPos;
                const diffPercent = (diff / track.offsetWidth) * 100;
                currentTranslate = prevTranslate + diffPercent;
            }
        };

        const touchEnd = () => {
            isDragging = false;
            cancelAnimationFrame(animationID);
            track.style.cursor = 'grab';

            const movedBy = currentTranslate - prevTranslate;

            if (movedBy < -15 && currentIndex < slides.length - 1) currentIndex += 1;
            else if (movedBy > 15 && currentIndex > 0) currentIndex -= 1;

            updateCarousel(currentIndex);
            startAutoSlide();
        };

        const animation = () => {
            track.style.transform = `translateX(${currentTranslate}%)`;
            if (isDragging) requestAnimationFrame(animation);
        };

        let carouselInterval;
        const startAutoSlide = () => {
            if(slides.length > 1) {
                clearInterval(carouselInterval);
                carouselInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateCarousel(currentIndex);
                }, 5000);
            }
        };

        if(slides.length > 1) {
            track.style.cursor = 'grab';
            startAutoSlide();
            track.addEventListener('mousedown', touchStart(currentIndex));
            track.addEventListener('mousemove', touchMove);
            track.addEventListener('mouseup', touchEnd);
            track.addEventListener('mouseleave', () => { if(isDragging) touchEnd() });
            track.addEventListener('touchstart', touchStart(currentIndex), {passive: true});
            track.addEventListener('touchmove', touchMove, {passive: true});
            track.addEventListener('touchend', touchEnd);

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateCarousel(currentIndex);
                    startAutoSlide();
                });
            });
            
            const disableDrag = e => e.preventDefault();
            track.querySelectorAll('img, a, h2, p, button, span').forEach(el => {
                el.addEventListener('dragstart', disableDrag);
            });
        }
    }

    // BUSCA
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    let searchActive = false;

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchActive = !searchActive;
            if(searchActive) {
                searchInput.style.width = '160px';
                searchInput.style.padding = '6px 12px';
                searchInput.style.opacity = '1';
                searchInput.style.marginRight = '8px';
                searchInput.style.border = '1px solid var(--primary-neon)';
                searchInput.focus();
            } else {
                searchInput.style.width = '0';
                searchInput.style.padding = '0';
                searchInput.style.opacity = '0';
                searchInput.style.marginRight = '0';
                searchInput.style.border = '1px solid transparent';
                searchInput.value = '';
                filterProducts('');
            }
        });

        searchInput.addEventListener('input', (e) => {
            filterProducts(e.target.value.toLowerCase().trim());
        });
    }

    const filterProducts = (term) => {
        productCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            if(title.includes(term) || category.includes(term)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        document.querySelectorAll('.featured-section').forEach(section => {
            const cards = section.querySelectorAll('.product-card');
            const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
            if(visibleCards.length === 0 && term !== '') {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    };

    // ABAS DE CATEGORIA
    const categoryTabsLinks = document.querySelectorAll('.category-tabs a');
    categoryTabsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
             e.preventDefault();
             document.querySelectorAll('.category-tabs .tab').forEach(t=>t.classList.remove('active'));
             link.parentElement.classList.add('active');
             
             const targetId = link.getAttribute('href');
             if(targetId && targetId.startsWith('#')) {
                 const targetSection = document.querySelector(targetId);
                 if(targetSection) {
                     const yOffset = -75;
                     const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                     window.scrollTo({top: y, behavior: 'smooth'});
                 }
             }
        });
    });

    // SISTEMA DE ESTOQUE GOOGLE SHEETS E RENDERIZAÇÃO
    function parseCSV(csvText) {
        const lines = csvText.split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return null;
        
        const parseLine = (line) => {
            const result = [];
            let current = '';
            let inQuotes = false;
            for(let i=0; i<line.length; i++){
                const char = line[i];
                if(char === '"'){
                    inQuotes = !inQuotes;
                } else if(char === ',' && !inQuotes){
                    result.push(current);
                    current = '';
                } else {
                    current += char;
                }
            }
            result.push(current);
            return result.map(s => s.trim());
        };

        let headers = parseLine(lines[0]).map(h => h.toLowerCase());
        let idIndex = headers.indexOf('id');
        let estoqueIndex = headers.indexOf('estoque');
        let nomeIndex = headers.indexOf('nome_produto') !== -1 ? headers.indexOf('nome_produto') : headers.indexOf('nome');
        let valorIndex = headers.indexOf('valor') !== -1 ? headers.indexOf('valor') : headers.indexOf('preco');
        let imagemIndex = headers.indexOf('imagem') !== -1 ? headers.indexOf('imagem') : headers.indexOf('url_imagem');
        let categoriaIndex = headers.indexOf('categoria');
        
        let startIndex = 1;

        if (idIndex === -1) {
            idIndex = 0;
            nomeIndex = 1;
            valorIndex = 2;
            estoqueIndex = 3;
            imagemIndex = 4;
            categoriaIndex = 5;
            startIndex = 0;
        }

        const stockMap = {};

        for(let i=startIndex; i<lines.length; i++) {
            const cols = parseLine(lines[i]);
            const cleanCol = (index) => index !== -1 && cols[index] ? cols[index] : '';

            const idCol = cleanCol(idIndex);
            const estoqueCol = estoqueIndex !== -1 ? cleanCol(estoqueIndex).toLowerCase() : 'sim';
            const nomeCol = cleanCol(nomeIndex);
            const valorCol = cleanCol(valorIndex);
            const imagemCol = cleanCol(imagemIndex);
            const categoriaCol = cleanCol(categoriaIndex);
            
            if(idCol) {
                stockMap[idCol] = (estoqueCol === 'sim' || estoqueCol === 's' || estoqueCol === 'true');
                
                let existingProds = PRODUTOS_DB.filter(p => p.id === idCol);
                
                // Update common attributes for all instances of this product
                if (existingProds.length > 0) {
                    existingProds.forEach(existingProd => {
                        existingProd.sortIndex = i;
                        if (nomeCol) existingProd.title = nomeCol;
                        if (valorCol) {
                            existingProd.priceText = valorCol.includes('R$') ? valorCol : `R$ ${valorCol}`;
                            let num = valorCol.replace(/[^\d,.-]/g, '').replace(',', '.');
                            if(num) existingProd.priceNum = num;
                        }
                        if (imagemCol) existingProd.image = imagemCol;
                    });
                }
                
                // Handle multiple categories if provided in CSV
                if (categoriaCol) {
                    let categories = categoriaCol.split(',').map(c => c.trim().toUpperCase());
                    categories.forEach(cat => {
                        let prodInCat = existingProds.find(p => p.category === cat);
                        if (!prodInCat) {
                            // If product is not in this category, add it
                            let num = valorCol.replace(/[^\d,.-]/g, '').replace(',', '.');
                            let titleToUse = nomeCol || (existingProds[0] ? existingProds[0].title : '');
                            let priceTextToUse = valorCol ? (valorCol.includes('R$') ? valorCol : `R$ ${valorCol}`) : (existingProds[0] ? existingProds[0].priceText : '');
                            let priceNumToUse = num || (existingProds[0] ? existingProds[0].priceNum : '0.00');
                            let imgToUse = imagemCol || (existingProds[0] ? existingProds[0].image : 'img/Logo2.png');
                            
                            if (titleToUse && priceTextToUse) {
                                PRODUTOS_DB.push({
                                    id: idCol,
                                    category: cat,
                                    priceNum: priceNumToUse,
                                    title: titleToUse,
                                    image: imgToUse, 
                                    priceText: priceTextToUse,
                                    sortIndex: i
                                });
                            }
                        }
                    });
                } else if (existingProds.length === 0 && nomeCol && valorCol) {
                    // New product without specific category
                    let num = valorCol.replace(/[^\d,.-]/g, '').replace(',', '.');
                    PRODUTOS_DB.push({
                        id: idCol,
                        category: "OUTROS",
                        priceNum: num || '0.00',
                        title: nomeCol,
                        image: imagemCol || 'img/Logo2.png', 
                        priceText: valorCol.includes('R$') ? valorCol : `R$ ${valorCol}`,
                        sortIndex: i
                    });
                }
            }
        }
        
        // Ordena o array oficial para refletir exatamente a ordem das linhas da planilha
        PRODUTOS_DB.sort((a, b) => {
            let indexA = a.sortIndex !== undefined ? a.sortIndex : 999999;
            let indexB = b.sortIndex !== undefined ? b.sortIndex : 999999;
            return indexA - indexB;
        });

        return stockMap;
    }

    function renderProducts(stockMap) {
        const container = document.getElementById('lista-produtos');
        if(!container) return;

        let html = '';
        
        // Mapeamento correto dos IDs das seções baseados nas abas
        const getCategoryId = (catName) => {
            const map = {
                "PROTEÍNAS": "proteinas",
                "PRÉ-TREINOS": "pre-treinos",
                "CREATINA": "creatina",
                "TERMOGÊNICOS": "termogenicos",
                "PASTAS DE AMENDOIM": "pastas-de-amendoim",
                "SNACKS E GÉIS": "snacks-e-geis",
                "HIPERCALÓRICOS": "hipercaloricos",
                "VITAMINAS": "vitaminas",
                "ACESSÓRIOS": "acessorios",
                "ELETRÓLITOS": "eletrolitos"
            };
            return map[catName] || catName.toLowerCase().replace(/ /g, '-');
        };

        let categories = [...new Set(PRODUTOS_DB.map(p => p.category))];
        
        // Garante que ACESSÓRIOS seja a última seção
        if (categories.includes("ACESSÓRIOS")) {
            categories = categories.filter(c => c !== "ACESSÓRIOS");
            categories.push("ACESSÓRIOS");
        }

        categories.forEach(category => {
            const catId = getCategoryId(category);
            
            html += `<section class="featured-section" id="${catId}" style="margin-top: 40px;">
                <div class="section-header">
                    <h3>${category}</h3>
                </div>
                <div class="product-grid">`;

            const prods = PRODUTOS_DB.filter(p => p.category === category);
            prods.forEach(p => {
                const hasStock = stockMap ? stockMap[p.id] !== false : true;
                
                const btnHtml = hasStock 
                    ? `<button class="add-btn"><i class="fa-solid fa-plus"></i></button>`
                    : `<button class="add-btn disabled" disabled style="background:#444; color:#999; cursor:not-allowed;"><i class="fa-solid fa-ban"></i></button>`;
                    
                const stockBadge = hasStock 
                    ? ''
                    : `<div class="out-of-stock-badge" style="position:absolute; top:10px; left:10px; background:#ff4757; color:#fff; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; z-index:2; text-transform:uppercase; letter-spacing:1px;">ESGOTADO</div>`;

                html += `<div class="product-card" data-category="${p.category}" data-id="${p.id}" data-price="${p.priceNum}" data-title="${p.title.replace(/"/g, '&quot;')}" style="position:relative;">
                    ${stockBadge}
                    <button class="wishlist-btn"><i class="fa-regular fa-heart"></i></button>
                    <div class="product-image">
                        <img alt="${p.title.replace(/"/g, '&quot;')}" src="${p.image}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;" />
                    </div>
                    <div class="product-info">
                        <span class="category">${p.category}</span>
                        <h4 class="product-title">${p.title}</h4>
                        <div class="product-bottom">
                            <span class="price">${p.priceText}</span>
                            ${btnHtml}
                        </div>
                    </div>
                </div>`;
            });
            
            html += `</div></section>`;
        });

        container.innerHTML = html;
        
        // Atualiza a variável global de cards para a pesquisa e badges funcionarem
        productCards = document.querySelectorAll('.product-card');
        
        attachProductEvents();
        updateBadges();
    }

    function attachProductEvents() {
        productCards.forEach(card => {
            const id = card.getAttribute('data-id');
            const title = card.getAttribute('data-title');
            const price = card.getAttribute('data-price');
            const category = card.getAttribute('data-category');
            const imagePlaceholderHtml = card.querySelector('.product-image').innerHTML;

            const wishBtn = card.querySelector('.wishlist-btn');
            if(wishBtn){
                wishBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    toggleWishlist(id, title, price, category, imagePlaceholderHtml);
                });
            }

            const addBtn = card.querySelector('.add-btn');
            if(addBtn && !addBtn.disabled){
                addBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    addToCart(id, title, price, category, imagePlaceholderHtml);
                });
            }
        });
    }

    async function loadStore() {
        renderProducts(null); // Renderiza inicial assuming em estoque
        
        if(URL_PLANILHA_GOOGLE.startsWith('http')) {
            try {
                // Adicionado cache-buster para forçar o navegador a pegar o CSV novo
                const cacheBuster = URL_PLANILHA_GOOGLE.includes('?') 
                    ? `&t=${Date.now()}` 
                    : `?t=${Date.now()}`;
                    
                const res = await fetch(URL_PLANILHA_GOOGLE + cacheBuster, { cache: 'no-store' });
                const csvText = await res.text();
                const stockMap = parseCSV(csvText);
                if(stockMap) {
                    renderProducts(stockMap);
                }
            } catch(e) {
                console.error("Erro ao carregar o estoque:", e);
            }
        }
    }

    async function loadCupons() {
        if(typeof URL_PLANILHA_CUPONS !== 'undefined' && URL_PLANILHA_CUPONS.startsWith('http')) {
            try {
                const cacheBuster = URL_PLANILHA_CUPONS.includes('?') 
                    ? `&t=${Date.now()}` 
                    : `?t=${Date.now()}`;
                    
                const res = await fetch(URL_PLANILHA_CUPONS + cacheBuster, { cache: 'no-store' });
                const csvText = await res.text();
                const lines = csvText.split('\n').filter(l => l.trim() !== '');
                if (lines.length > 0) {
                    const parseLine = (line) => {
                        const result = [];
                        let current = '';
                        let inQuotes = false;
                        for(let i=0; i<line.length; i++){
                            const char = line[i];
                            if(char === '"'){
                                inQuotes = !inQuotes;
                            } else if(char === ',' && !inQuotes){
                                result.push(current);
                                current = '';
                            } else {
                                current += char;
                            }
                        }
                        result.push(current);
                        return result.map(s => s.trim());
                    };

                    const headers = parseLine(lines[0]).map(h => h.toLowerCase());
                    const codigoIndex = headers.indexOf('codigo');
                    const descontoIndex = headers.indexOf('desconto');
                    
                    if(codigoIndex !== -1) {
                        const coupons = [];
                        for(let i=1; i<lines.length; i++) {
                            const cols = parseLine(lines[i]);
                            const cleanCol = (index) => index !== -1 && cols[index] ? cols[index] : '';

                            const codigo = cleanCol(codigoIndex).toLowerCase();
                            const descontoRaw = cleanCol(descontoIndex);
                            let descontoStr = descontoRaw.replace(/[^\d,.-]/g, '').replace(',', '.');
                            let desconto = parseFloat(descontoStr) || 5; 

                            if (codigo) {
                                coupons.push({ codigo, desconto });
                            }
                        }
                        if(coupons.length > 0) {
                            CUPONS_DB = coupons; // Sobrescreve com os valores da planilha
                        }
                    }
                }
            } catch(e) {
                console.error("Erro ao carregar cupons:", e);
            }
        }
    }

    loadCupons();
    loadStore();
});

