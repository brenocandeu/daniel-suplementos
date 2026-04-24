document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DE DESEJOS (LOCAL STORAGE PARA 30 DIAS)
    const wishlistKeys = 'NF_WISHLIST';
    const WISHLIST_EXPIRACY = 30 * 24 * 60 * 60 * 1000; // 30 dias contados em milissegundos

    // Recupera dados do local storage e foca apenas nos que ainda não expiraram
    let wishlistItems = JSON.parse(localStorage.getItem(wishlistKeys)) || [];
    const now = Date.now();
    wishlistItems = wishlistItems.filter(item => now < item.expiresAt);
    localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));

    // LÓGICA DO CARRINHO
    const cartKeys = 'NF_CART';
    let cartItems = JSON.parse(localStorage.getItem(cartKeys)) || [];

    // Referências de Elementos
    const cartCountEl = document.getElementById('cartCount');
    const wishlistCountEl = document.getElementById('wishlistCount');
    const cartSidebar = document.getElementById('cartSidebar');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const overlay = document.getElementById('globalOverlay');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');
    const cartTotalPriceEl = document.getElementById('cartTotalPrice');
    const productCards = document.querySelectorAll('.product-card');
    
    // Utilitários
    const formatPrice = (p) => parseFloat(p).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

    const updateBadges = () => {
        cartCountEl.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        wishlistCountEl.textContent = wishlistItems.length;

        // Restaura a solidez dos ícones de coração caso os produtos estejam na lista de itens guardados
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

    // Lógica Principal de Desejos
    const toggleWishlist = (id, title, price, category, imageUrlHtml) => {
        const index = wishlistItems.findIndex(w => w.id === id);
        if(index > -1){
            // Remover item caso ele já exista
            wishlistItems.splice(index, 1);
        } else {
            // Adicionar novo item
            wishlistItems.push({
                id, title, price, category, imageUrlHtml,
                expiresAt: Date.now() + WISHLIST_EXPIRACY
            });
        }
        localStorage.setItem(wishlistKeys, JSON.stringify(wishlistItems));
        updateBadges();
        renderWishlist(); // Recarrega automaticamente o painel se ele já estiver aberto
    };

    // Lógica Principal do Carrinho
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
        
        // Puxa as barras pra tela e escurece o fundo
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

    // Ligações de Eventos Interativos nos Cards
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
        if(addBtn){
            addBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(id, title, price, category, imagePlaceholderHtml);
            });
        }
    });

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

    // Renderização do Código das Barras Laterais
    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if(cartItems.length === 0){
            cartItemsContainer.innerHTML = '<p style="color:#A0A0A0; text-align:center; margin-top:20px;">O seu carrinho está vazio.</p>';
            cartTotalPriceEl.textContent = 'R$ 0,00';
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
        cartTotalPriceEl.textContent = formatPrice(total);
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

    // Controles de Abrir e Fechar as Barras Ocultas
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

    // Lógica do Checkout Direto pro WhatsApp Central
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if(cartItems.length === 0) return alert('Seu carrinho está vazio!');
        
        let message = "Olá! Gostaria de finalizar o seguinte pedido:\n\n";
        let total = 0;

        cartItems.forEach(i => {
            total += i.price * i.quantity;
            message += `- ${i.quantity}x *${i.title}* (${formatPrice(i.price)})\n`;
        });

        message += `\n*TOTAL: ${formatPrice(total)}*\n\nComo podemos prosseguir com o pagamento e a entrega?`;
        
        // Empacotador para transformar a URL perfeitamente válida e não quebrar textos num numero especifico
        const whatsappNumber = "5517996821533";
        const encodedUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(encodedUrl, '_blank');
    });

    // Dinâmica de Rolagem e Carrossel Automático Inicial (com Arraste)
    const track = document.getElementById('heroCarousel');
    const slides = document.querySelectorAll('.hero-card');
    const dots = document.querySelectorAll('.hero-pagination .dot');
    let currentIndex = 0;
    
    // Variáveis do Drag (Arrastar)
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

        // Eventos de Toque e Mouse
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
        
        // Evitar drag em elementos filhos soltos pra não bugar o cursor
        const disableDrag = e => e.preventDefault();
        track.querySelectorAll('img, a, h2, p, button, span').forEach(el => {
            el.addEventListener('dragstart', disableDrag);
        });
    }

    // Inicialização Primordial
    updateBadges();

    // Lógica de Busca Responsiva do Cabeçalho
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
        
        // Esconder / Exibir a seção dependendo de haver cards visíveis
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

    // Lógica das animações das categorias soltas da página (Smooth Scroll)
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
                     const yOffset = -75; // Exato recuo para não ficar embaixo do header de 55px + folga
                     const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                     window.scrollTo({top: y, behavior: 'smooth'});
                 }
             }
        });
    });
});
