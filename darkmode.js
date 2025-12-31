document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".colorswitch");
    const icon = document.getElementById("themeicon");
    const nav = document.getElementById("nav");
    const sections = document.querySelectorAll('.home, .about, .skill, .projects, .contact');
    const navLinks = document.querySelectorAll('nav ul li a');
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    let lastScrollY = window.scrollY;

    // --- 1. Adlaw og Gabie (Theme) Mode ---
    btn.addEventListener("click", function () {
        document.body.style.filter = "brightness(1.5)";
        document.body.classList.toggle("lightmode");
        icon.classList.toggle("inverted");

        setTimeout(() => {
            document.body.style.filter = "brightness(1)";
        }, 500);

        const mode = document.body.classList.contains("lightmode") ? "light" : "dark";
        localStorage.setItem("theme", mode);
    });

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add("nav-hidden");
        } else {
            nav.classList.remove("nav-hidden");
        }
        lastScrollY = currentScrollY;
    });

    function applyRise(target) {
        sections.forEach(s => s.classList.remove('element-rise'));
        if (target) target.classList.add('element-rise');
    }

    sections.forEach(section => {
        section.addEventListener('click', () => applyRise(section));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const targetId = this.getAttribute('href').substring(1);
            applyRise(document.getElementById(targetId));
            nav.classList.remove("nav-hidden");
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            submitBtn.innerText = "SENDING...";
            submitBtn.disabled = true;

            const now = new Date();
            const formattedTime = now.toLocaleString();
            document.getElementById('form-time').value = formattedTime;

            const serviceID = 'service_7n5k6ng';
            const templateID = 'template_hi9vggt';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    submitBtn.innerText = "SENT!";
                    alert("Salamat! Your message has been sent.");
                    contactForm.reset();
                })
                .catch((err) => {
                    submitBtn.innerText = "FAILED";
                    alert("Error: " + JSON.stringify(err));
                })
                .finally(() => {
                    setTimeout(() => {
                        submitBtn.innerText = "Send Message";
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("lightmode");
        icon.classList.add("inverted");
    }
});