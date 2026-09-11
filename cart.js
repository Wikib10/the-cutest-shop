const cartItems =
    document.querySelector("#cart-items");


// ==========================================
// KOSZYK
// ==========================================

let cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


// ==========================================
// WYŚWIETLANIE KOSZYKA
// ==========================================

function displayCart() {

    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    const cartTotal =
        document.querySelector("#cart-total");


    let total = 0;



    // ==========================================
    // PUSTY KOSZYK
    // ==========================================

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒💕
                </div>

                <h2>
                    Twój koszyk jest pusty
                </h2>

                <p>
                    Dodaj coś uroczego do swojego zamówienia 💗
                </p>

                <a
                    href="index.html"
                    class="empty-cart-button"
                >
                    🛍️ Wróć do sklepu
                </a>

            </div>

        `;


        if (cartTotal) {
            cartTotal.textContent = "0";
        }


        return;
    }



    // ==========================================
    // PRODUKTY
    // ==========================================

    cart.forEach(
        function(product, index) {

            const quantity =
                product.quantity || 1;


            // Cena faktycznie płacona
            const productPrice =
                Number(product.price) || 0;


            // Cena przed promocją
            const originalPrice =
                Number(
                    product.original_price
                ) || productPrice;


            const hasSale =
                originalPrice >
                productPrice;


            const itemTotal =
                productPrice *
                quantity;


            // Suma zawsze używa ceny promocyjnej,
            // jeśli produkt jest przeceniony

            total += itemTotal;



            // ==========================================
            // KONTENER PRODUKTU
            // ==========================================

            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "cart-item"
            );



            // ==========================================
            // ZDJĘCIE
            // ==========================================

            const image =
                document.createElement(
                    "img"
                );


            image.src =
                product.image_url;


            image.alt =
                product.name;


            image.classList.add(
                "cart-item-image"
            );



            // ==========================================
            // INFORMACJE
            // ==========================================

            const info =
                document.createElement(
                    "div"
                );


            info.classList.add(
                "cart-item-info"
            );



            // ==========================================
            // NAZWA
            // ==========================================

            const name =
                document.createElement(
                    "div"
                );


            name.classList.add(
                "cart-item-name"
            );


            name.textContent =
                product.name;



            // ==========================================
            // CENA
            // ==========================================

            const price =
                document.createElement(
                    "div"
                );


            price.classList.add(
                "cart-item-price"
            );


            if (hasSale) {

                price.innerHTML = `

                    <span class="unit-price">

                        <del
                            style="
                                text-decoration: line-through !important;
                            "
                        >
                            ${originalPrice}💕
                        </del>

                        <strong>
                            ${productPrice}💕
                        </strong>

                        × ${quantity}

                    </span>

                    <strong>
                        ${itemTotal}💕
                    </strong>

                `;

            } else {

                price.innerHTML = `

                    <span class="unit-price">
                        ${productPrice}💕 × ${quantity}
                    </span>

                    <strong>
                        ${itemTotal}💕
                    </strong>

                `;

            }


            info.appendChild(
                name
            );


            info.appendChild(
                price
            );



            // ==========================================
            // ILOŚĆ
            // ==========================================

            const quantityBox =
                document.createElement(
                    "div"
                );


            quantityBox.classList.add(
                "quantity"
            );



            // MINUS

            const minus =
                document.createElement(
                    "button"
                );


            minus.textContent =
                "−";


            minus.type =
                "button";


            minus.addEventListener(
                "click",
                function() {

                    const currentQuantity =
                        product.quantity || 1;


                    if (
                        currentQuantity > 1
                    ) {

                        product.quantity =
                            currentQuantity - 1;

                    }


                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );


                    displayCart();

                }
            );



            // LICZBA

            const number =
                document.createElement(
                    "span"
                );


            number.textContent =
                quantity;



            // PLUS

            const plus =
                document.createElement(
                    "button"
                );


            plus.textContent =
                "+";


            plus.type =
                "button";


            plus.addEventListener(
                "click",
                function() {

                    product.quantity =
                        (product.quantity || 1) + 1;


                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );


                    displayCart();

                }
            );



            quantityBox.appendChild(
                minus
            );


            quantityBox.appendChild(
                number
            );


            quantityBox.appendChild(
                plus
            );



            // ==========================================
            // USUWANIE
            // ==========================================

            const remove =
                document.createElement(
                    "button"
                );


            remove.classList.add(
                "remove"
            );


            remove.textContent =
                "🗑️";


            remove.type =
                "button";


            remove.addEventListener(
                "click",
                function() {

                    cart.splice(
                        index,
                        1
                    );


                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                    );


                    displayCart();

                }
            );



            // ==========================================
            // DODANIE DO KARTY
            // ==========================================

            item.appendChild(
                image
            );


            item.appendChild(
                info
            );


            item.appendChild(
                quantityBox
            );


            item.appendChild(
                remove
            );


            cartItems.appendChild(
                item
            );

        }
    );



    // ==========================================
    // SUMA
    // ==========================================

    if (cartTotal) {

        cartTotal.textContent =
            total;

    }

}



// ==========================================
// START KOSZYKA
// ==========================================

displayCart();



// ==========================================
// PRZEJŚCIE DO ZAMÓWIENIA
// ==========================================

const checkoutButton =
    document.querySelector(
        "#checkout-button"
    );


if (checkoutButton) {


    function updateCheckoutButton() {

        checkoutButton.disabled =
            cart.length === 0;

    }


    checkoutButton.addEventListener(
        "click",
        function() {

            if (
                cart.length === 0
            ) {

                return;

            }


            window.location.href =
                "zamowienie.html";

        }
    );


    updateCheckoutButton();

}