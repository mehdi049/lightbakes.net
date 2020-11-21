$(function () {
    $("#header").addClass("header-black-bg");

    $('#image-gallery').lightSlider({
        gallery: true,
        item: 1,
        thumbItem: thumbItemNumber,
        slideMargin: 0,
        speed: 1000,
        auto: false,
        loop: false,
        onSliderLoad: function () {
            $('#image-gallery').removeClass('cS-hidden');
        }
    });

    $("#content-slider").lightSlider({
        loop: true,
        keyPress: true
    });

    $("#order-form .form-control").change(function () {
        $("#submit-btn").attr("disabled", false);
        var quantity = $("#quantity").val();
        if (quantity == "" || isNaN(quantity) || quantity.indexOf(",") !== -1 || quantity.indexOf(".") !== -1 || parseInt(quantity) <= 0) {
            $.toast({
                text: 'Quantité incorrecte.',
                showHideTransition: 'plain',
                hideAfter: 5000,
                icon: 'error',
                position: 'top-right',
                loader: false
            });
            $("#submit-btn").attr("disabled", true);
            return;
        }

        var unityOptionPrice = $("#price-option").val();
        var productOption = $("#product-option").val();

        var productOptionPrice = getProduct().ProductOptions.filter(
            (x) => x.Option.toLowerCase() === productOption.toLowerCase()
        )[0].Price;

        var totalPrice = (unityOptionPrice.replace(/,/gi, ".") * quantity) + (productOptionPrice * quantity);

        var totalPriceText = "" + totalPrice;
        $("#total-price").html(totalPriceText.replace(/\./gi, ","));
    });

    function getProduct() {
        var product = productJson;
        product = product.replace(/&quot;/gi, "\"")
            .replace(/&gt;/gi, ">")
            .replace(/&lt;/gi, "<")
            .replace(/&#233;/gi, "é")
            .replace(/&#224;/gi, "à")
            .replace(/&#39;/gi, "'")
            .replace(/&#226;/gi, "â");
        return JSON.parse(product);
    }

    function UUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    $("#submit-btn").click(function () {

        var product = getProduct();

        var productsToAdd =
            localStorage.getItem("basket") != null
                ? JSON.parse(localStorage.getItem("basket"))
                : [];

        var productUnity = product.UnityOptions.filter(
            (x) => parseFloat(x.Price) === parseFloat($("#price-option").val().replace(/,/gi, '.'))
        )[0].Unity;

        var selectedProductOption = $("#product-option").val();

        var productsToAddCheck = productsToAdd.filter(
            (x) =>
                x.ProductId === product.Id &&
                x.Option.toLowerCase() === selectedProductOption.toLowerCase() &&
                x.Unity.toLowerCase() === productUnity.toLowerCase()
        );

        var quantity = $("#quantity").val();
        var totalPrice = $("#total-price").html();

        if (productsToAddCheck.length === 0)
            productsToAdd.push({
                Id: UUID(),
                ProductId: product.Id,
                Product: product.Title,
                Unity: productUnity,
                Option: selectedProductOption,
                Quantity: parseFloat(quantity),
                TotalPrice: totalPrice,
            });
        else {
            var foundIndex = productsToAdd.findIndex(
                (x) =>
                    x.ProductId === product.Id &&
                    x.Option.toLowerCase() === selectedProductOption.toLowerCase() &&
                    x.Unity.toLowerCase() === productUnity.toLowerCase()
            );
            productsToAdd[foundIndex] = {
                Id: UUID(),
                ProductId: product.Id,
                Product: product.Title,
                Unity: productUnity,
                Option: selectedProductOption,
                Quantity: parseFloat(quantity),
                TotalPrice: totalPrice,
            };
        }

        localStorage.setItem("basket", JSON.stringify(productsToAdd));
        $.toast({
            text: 'Produit ajouté au panier avec succés.',
            showHideTransition: 'plain',
            hideAfter: 5000,
            icon: 'success',
            position: 'top-right',
            loader: false
        });
    });

});