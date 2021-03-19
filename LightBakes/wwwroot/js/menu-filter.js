$(function () {
    $(".menu-filter").click(function () {
        $(".menu-filter").removeClass("menu-selected");
        $(this).addClass("menu-selected");
        var filter = $(this).attr("data-filter");
        if (filter == "all")
            $(".item-product").css({ "display": "block" });
        else {
            $(".item-product").css({ "display": "none" });
            $(".item-" + filter).css({ "display": "block" });
        }
    });
});