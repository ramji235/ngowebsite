document.addEventListener("DOMContentLoaded", function () {

    // =================================
    // MOBILE NAVIGATION
    // =================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }


    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    // Close the mobile menu when a link is clicked.

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", closeMenu);

    });


    // Close the menu with the Escape key.

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    // Reset mobile menu when switching to desktop.

    window.addEventListener("resize", function () {

        if (window.innerWidth > 760) {
            closeMenu();
        }

    });


    // =================================
    // AUTOMATIC FOOTER YEAR
    // =================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =================================
    // IMAGE LOADING FALLBACK
    // =================================

    const images = document.querySelectorAll("img");

    images.forEach(function (img) {

        img.addEventListener("error", function () {

            img.classList.add("image-unavailable");

            img.alt = img.alt || "Image currently unavailable";

        });

    });


    // =================================
    // CURRENT PAGE NAVIGATION
    // =================================

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    document.querySelectorAll(".nav-links > a").forEach(function (link) {

        const linkPage = link.getAttribute("href").split("#")[0];

        if (linkPage === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

});