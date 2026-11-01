document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // MOBILE NAVIGATION
    // ======================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    // Close the menu after clicking a navigation link.

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", closeMenu);

    });


    // Close the menu when the user presses Escape.

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    // Close the menu when switching to desktop layout.

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {
            closeMenu();
        }

    });


    // ======================================
    // ANIMATED IMPACT COUNTERS
    // ======================================

    const counters = document.querySelectorAll(".counter");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    function animateCounter(counter) {

        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target) || target < 0) {
            counter.textContent = "0";
            return;
        }

        if (reducedMotion) {
            counter.textContent = target.toLocaleString("en-IN");
            return;
        }

        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Smooth ease-out animation.

            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                target * easedProgress
            );

            counter.textContent =
                currentValue.toLocaleString("en-IN");

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target.toLocaleString("en-IN");

            }

        }

        requestAnimationFrame(updateCounter);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.4
            }

        );

        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(animateCounter);

    }


    // ======================================
    // SCROLL REVEAL ANIMATIONS
    // ======================================

    const revealElements = document.querySelectorAll(
        ".intro-visual, " +
        ".intro-content, " +
        ".purpose-card, " +
        ".value-card, " +
        ".work-card, " +
        ".impact-intro, " +
        ".impact-stat, " +
        ".team-card"
    );


    if (reducedMotion) {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    } else if ("IntersectionObserver" in window) {

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
        });

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    // ======================================
    // CURRENT FOOTER YEAR
    // ======================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ======================================
    // BACK TO TOP
    // ======================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        backToTop.addEventListener("click", function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });

        });

    }

});