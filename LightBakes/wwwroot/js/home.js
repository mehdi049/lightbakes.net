﻿$(function () {
    function scrollHandler() {
        if (window.scrollY >= window.innerHeight - 40) $("#header").addClass("header-black-bg");
        else $("#header").removeClass("header-black-bg");
    }
    window.addEventListener("scroll", scrollHandler);
})