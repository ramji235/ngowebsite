document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    // Close mobile navigation after clicking a link

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });


    // =========================
    // ANIMATED IMPACT COUNTERS
    // =========================

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = Number(counter.dataset.target);
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            // Ease-out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                easedProgress * target
            );

            counter.textContent = currentValue.toLocaleString("en-IN");

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target.toLocaleString("en-IN");

            }

        }

        requestAnimationFrame(updateCounter);

    }


    // Start the animation when counters become visible

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.5
        });

        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(animateCounter);

    }


    // =========================
    // DONATION AMOUNT SELECTION
    // =========================

    const amountButtons = document.querySelectorAll(".amount-btn");
    const donationMessage = document.getElementById("donationMessage");

    const donationImpacts = {

        500: "Your ₹500 contribution can help provide basic learning or food essentials.",

        1000: "Your ₹1,000 contribution can support essential community needs.",

        2500: "Your ₹2,500 contribution can help support education and family assistance.",

        5000: "Your ₹5,000 contribution can help fund larger community support initiatives."

    };


    amountButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            amountButtons.forEach(function (item) {

                item.classList.remove("active");

            });

            button.classList.add("active");

            const amount = button.dataset.amount;

            donationMessage.textContent = donationImpacts[amount];

        });

    });


    // =========================
    // CONTACT FORM
    // =========================

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            formStatus.textContent = "Please complete all fields.";

            return;

        }

        formStatus.textContent =
            "Your form is valid. Connect a backend or email service to send your message.";

    });


    // =========================
    // NEWSLETTER FORM
    // =========================

    const newsletterForm = document.getElementById("newsletterForm");

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput = document.getElementById("newsletterEmail");
        const newsletterStatus = document.getElementById("newsletterStatus");

        if (!emailInput.checkValidity()) {

            emailInput.reportValidity();

            return;

        }

        newsletterStatus.textContent =
            "Email validated! Connect a mailing service to save your subscription.";

        newsletterForm.reset();

    });


    // =========================
    // FOOTER YEAR
    // =========================

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();

});