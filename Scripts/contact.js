$(function () {
    $("#submit-contact").click(function () {
        var name = $("#contact-name").val();
        var email = $("#contact-email").val();
        var tel = $("#contact-tel").val();
        var message = $("#contact-message").val();

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
        if (message === "") {
            $.toast({
                text: "Le champ 'Message' est requis.",
                showHideTransition: 'plain',
                hideAfter: 5000,
                icon: 'error',
                position: 'top-right',
                loader: false
            });
            return;
        }

        var contactInfo = {
            Name: name,
            Email: email,
            Tel: tel,
            Message: message
        };

        $.ajax({
            method: "POST",
            data: { contact: JSON.stringify(contactInfo), __RequestVerificationToken: $("input[name=__RequestVerificationToken]").val() },
            url: "ctr/Email/Contact",
            beforeSend: function () {
                $("#submit-contact").attr("disabled", true);
            }, success: function (data) {
                if (data == "True") {
                    $.toast({
                        text: "Email envoyé avec succés.",
                        showHideTransition: 'plain',
                        hideAfter: 5000,
                        icon: 'success',
                        position: 'top-right',
                        loader: false
                    });
                    $("#contact-name").val("");
                    $("#contact-email").val("");
                    $("#contact-tel").val("");
                    $("#contact-message").val("");
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
                $("#submit-contact").attr("disabled", false);
            }, error: function () {
                $.toast({
                    text: "Une erreur s'est produite, veuillez réessayer.",
                    showHideTransition: 'plain',
                    hideAfter: 5000,
                    icon: 'error',
                    position: 'top-right',
                    loader: false
                });
                $("#submit-contact").attr("disabled", false);
            }
        });

    });
});