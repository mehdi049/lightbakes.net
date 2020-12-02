$(function () {
    $("#header").addClass("header-black-bg");

    /** load basket */
    function redrawTable() {
        var basketItem = localStorage.getItem("basket") !== null
            ? JSON.parse(localStorage.getItem("basket"))
            : [];

        if (basketItem.length > 0) {
            $("#empty-basket-msg").hide();
            $("#basket-list").show();
        }
        else {
            $("#empty-basket-msg").show();
            $("#basket-list").hide();
        }

        var basketTable = "";
        var totalAmount = 0;
        for (var i = 0; i < basketItem.length; i++) {
            basketTable += "<tr>";
            basketTable += "<td><a href='/product/" + basketItem[i].ProductId + "'>" + basketItem[i].Product + " " + basketItem[i].Option + " (" + basketItem[i].Unity + ")</a></td>";
            basketTable += "<td>" + basketItem[i].Quantity + "</td>";
            basketTable += "<td>" + basketItem[i].TotalPrice + " TND</td>";
            basketTable += "<td><i class='fas fa-trash-alt pointer' data-id='" + basketItem[i].Id + "'></i></td>";
            basketTable += "</tr>";
            totalAmount += parseFloat("" + basketItem[i].TotalPrice.replace(",", "."));
        }
        /** add delivery price **/
        totalAmount += 6;

        basketTable += "<tr>";
        basketTable += "<td colspan='2' class='text-right'><u>Frais de livraison</u> <span class='text-small'>(sur grand Tunis)</span></td>";
        basketTable += "<td>6 TND</td>";
        basketTable += "</tr>";
        basketTable += "<tr>";
        basketTable += "<td colspan='2' class='text-right text-bold'>TOTAL</td>";
        basketTable += "<td class='text-bold'>" + (totalAmount+"").replace(".", ",") + " TND</td>";
        basketTable += "</tr>";

        $("#basket-body").html(basketTable);

        $(".fa-trash-alt").click(function () {
            var id = $(this).attr("data-id");
            removeBasketItem(id);
        });
    }

    redrawTable();

    /** remove item from basket */
    function removeBasketItem(id) {
        var basketItem = JSON.parse(localStorage.getItem("basket"));
        var itemsAfterRemove = basketItem.filter((x) => x.Id !== id);
        localStorage.setItem("basket", JSON.stringify(itemsAfterRemove));

        redrawTable();
        $.toast({
            text: 'Produit retiré avec succés.',
            showHideTransition: 'plain',
            hideAfter: 5000,
            icon: 'success',
            position: 'top-right',
            loader: false
        });
    }

    /** load customer info **/
    function loadCustomerInfo() {
        var customerInfo = localStorage.getItem("customerInfo") !== null
            ? JSON.parse(localStorage.getItem("customerInfo"))
            : {
                name: "",
                email: "",
                tel: "",
                address: "",
            };

        $("#customer-name").val(customerInfo.name);
        $("#customer-email").val(customerInfo.email);
        $("#customer-tel").val(customerInfo.tel);
        $("#customer-address").val(customerInfo.address);
    }
    loadCustomerInfo();

    /** submit order */
    $("#submit-order").click(function () {
        var name = $("#customer-name").val();
        var email = $("#customer-email").val();
        var tel = $("#customer-tel").val();
        var address = $("#customer-address").val();

        if (name === "") {
            $.toast({
                text: "Le champ 'Nom et prénom' est requis",
                showHideTransition: 'plain',
                hideAfter: 5000,
                icon: 'error',
                position: 'top-right',
                loader: false,
            });
            return;
        }
        if (email === "") {
            $.toast({
                text: "Le champ 'Email' est requis",
                showHideTransition: 'plain',
                hideAfter: 5000,
                icon: 'error',
                position: 'top-right',
                loader: false
            });
            return;
        }
        if (tel === "") {
            $.toast({
                text: "Le champ 'Num.Tél' est requis.",
                showHideTransition: 'plain',
                hideAfter: 5000,
                icon: 'error',
                position: 'top-right',
                loader: false
            });
            return;
        }
        if (address === "") {
            $.toast({
                text: "Le champ 'Adresse' est requis.",
                showHideTransition: 'plain',
                hideAfter: 5000,
                icon: 'error',
                position: 'top-right',
                loader: false
            });
            return;
        }

        var customerInfo = {
            name: name,
            email: email,
            tel: tel,
            address: address
        };

        localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

        var basketItem = JSON.parse(localStorage.getItem("basket"));

        $.ajax({
            method: "POST",
            data: {
                Orders: JSON.stringify(basketItem),
                CustomerInfo: JSON.stringify(customerInfo),
                __RequestVerificationToken: $("input[name=__RequestVerificationToken]").val()
            },
            url: "ctr/Email/SendOrder",
            beforeSend: function () {
                $("#submit-order").attr("disabled", true);
            }, success: function (data) {
                if (data == "True") {
                    localStorage.removeItem("basket");
                    redrawTable();
                    $('#customer-info-popup').modal('hide');
                    $.toast({
                        text: "Commande envoyée avec succés.",
                        showHideTransition: 'plain',
                        hideAfter: 5000,
                        icon: 'success',
                        position: 'top-right',
                        loader: false
                    });
                } else {
                    $.toast({
                        text: "Une erreur s'est produite, veuillez réessayer.",
                        showHideTransition: 'plain',
                        hideAfter: 5000,
                        icon: 'error',
                        position: 'top-right',
                        loader: false
                    });
                }
                $("#submit-order").attr("disabled", false);
            }, error: function () {
                $.toast({
                    text: "Une erreur s'est produite, veuillez réessayer.",
                    showHideTransition: 'plain',
                    hideAfter: 5000,
                    icon: 'error',
                    position: 'top-right',
                    loader: false
                });
                $("#submit-order").attr("disabled", false);
            }
        });

    });

});