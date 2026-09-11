const buttons =
    document.querySelectorAll(
        ".add-to-cart"
    );


buttons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                let cart =
                    JSON.parse(
                        localStorage.getItem(
                            "cart"
                        )
                    ) || [];


                const productName =
                    button.dataset.product;


                const productPrice =
                    Number(
                        button.dataset.price
                    );


                const originalPrice =
                    Number(
                        button.dataset.originalPrice ||
                        button.dataset.price
                    );



                const existingProduct =
                    cart.find(
                        function(product) {

                            return (
                                product.id ===
                                button.dataset.id
                            );

                        }
                    );



                // ==========================================
                // PRODUKT JUŻ JEST W KOSZYKU
                // ==========================================

                if (existingProduct) {

                    existingProduct.quantity =
                        (
                            existingProduct.quantity ||
                            1
                        ) + 1;


                    // Aktualizujemy ceny,
                    // gdyby produkt został przeceniony
                    // po wcześniejszym dodaniu

                    existingProduct.price =
                        productPrice;


                    existingProduct.original_price =
                        originalPrice;

                }



                // ==========================================
                // NOWY PRODUKT
                // ==========================================

                else {

                    cart.push({

                        id:
                            button.dataset.id,

                        name:
                            productName,

                        // Cena faktycznie płacona
                        price:
                            productPrice,

                        // Cena przed promocją
                        original_price:
                            originalPrice,

                        image_url:
                            button.dataset.image,

                        quantity:
                            1

                    });

                }



                // ==========================================
                // ZAPIS KOSZYKA
                // ==========================================

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );



                // ==========================================
                // POWIADOMIENIE
                // ==========================================

                const notification =
                    document.createElement(
                        "div"
                    );


                notification.textContent =
                    "Dodano do koszyka! 🛒💕";


                notification.classList.add(
                    "notification"
                );


                document.body.appendChild(
                    notification
                );


                setTimeout(
                    function() {

                        notification.remove();

                    },
                    2500
                );

            }
        );

    }
);