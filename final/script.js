document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {
            name: "EJ 100 Ox Chair",
            price: 3456,
            img: "https://via.placeholder.com/150",
            description: "Hangup data."
        },
        {
            name: "EJ 200 Ox Chair",
            price: 4456,
            img: "https://via.placeholder.com/150",
            description: "Second hangup data."
        }
    ];

    const populars = [
        {
            name: "Eyes Lounge",
            price: 12000,
            img: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?q=80&w=3412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Bisco Do Lobo"
        }
    ];

    const productList = document.getElementById('product-list');
    const popularList = document.getElementById('popular-list');
    const searchInput = document.getElementById('search-input');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartToggle = document.getElementById('cart-toggle');
    let cartItems = [];

    function generateProductHTML(product) {
        return `
            <div class="product w-fit rounded-xl p-2 bg-white">
                <div class="image w-[14rem] h-[13rem] bg-zinc-200 rounded-xl" style="background-image: url(${product.img}); background-size: cover;"></div>
                <div class="data w-full px-2 py-5">
                    <h1 class="font-semibold text-xl leading-none tracking-tight">${product.name}</h1>
                    <div class="flex justify-between w-full items-center mt-2">
                        <div class="w-1/2">
                            <h3 class="font-semibold opacity-20">${product.description}</h3>
                            <h4 class="font-semibold mt-2">$${product.price}</h4>
                        </div>
                        <button class="w-10 h-10 rounded-full shader text-yellow-400 add-to-cart" data-product='${JSON.stringify(product)}'><i class="ri-add-line"></i></button>
                    </div>
                </div>
            </div>
        `;
    }

    function generatePopularHTML(popular) {
        return `
            <div class="popular bg-white p-2 rounded-2xl flex items-start gap-3 w-[60%] flex-shrink-0">
                <div class="w-20 h-20 bg-red-500 flex-shrink-0 rounded-2xl border-4 border-white overflow-hidden">
                    <img class="w-full h-full object-cover" src="${popular.img}" alt="">
                </div>
                <div class="data py-2 w-full">
                    <h1 class="leading-none font-semibold">${popular.name}</h1>
                    <h4 class="leading-none mt-2 text-sm font-semibold opacity-20">${popular.description}</h4>
                    <h4 class="mt-3 font-semibold text-zinc-500">$${popular.price}</h4>
                </div>
            </div>
        `;
    }

    function renderProducts() {
        productList.innerHTML = products.map(generateProductHTML).join('');
    }

    function renderPopulars() {
        popularList.innerHTML = populars.map(generatePopularHTML).join('');
    }

    function renderCart() {
        if (cartItems.length === 0) {
            cartDropdown.innerHTML = '<p class="text-center p-2">Your cart is empty.</p>';
        } else {
            cartDropdown.innerHTML = cartItems.map(item => `
                <div class="flex items-center justify-between p-2 border-b">
                    <div class="flex items-center gap-3">
                        <img src="${item.img}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg">
                        <div>
                            <h3 class="font-semibold">${item.name}</h3>
                            <p class="text-sm opacity-50">${item.description}</p>
                        </div>
                    </div>
                    <div class="flex gap-3 items-center">
                        <p class="font-semibold">$${item.price}</p>
                        <button class="w-6 h-6 text-red-500" onclick="removeFromCart('${item.name}')">
                            <i class="ri-delete-bin-2-line"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    function addToCart(product) {
        cartItems.push(product);
        renderCart();
    }

    function removeFromCart(productName) {
        cartItems = cartItems.filter(item => item.name !== productName);
        renderCart();
    }

    // Event listeners
    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const product = JSON.parse(event.target.getAttribute('data-product'));
            addToCart(product);
        }
    });

    // Initial render
    renderProducts();
    renderPopulars();
});
