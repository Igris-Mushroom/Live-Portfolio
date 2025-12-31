document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".colorswitch");
    const icon = document.getElementById("themeicon");
    const nav = document.getElementById("nav");
    const sections = document.querySelectorAll('.home, .about, .skill, .projects, .contact');
    const navLinks = document.querySelectorAll('nav ul li a');
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

    sections.forEach(section => {
        section.addEventListener('click', function () {
            sections.forEach(s => s.classList.remove('element-rise'));
            this.classList.add('element-rise');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(s => s.classList.remove('element-rise'));
            if (targetSection) {
                targetSection.classList.add('element-rise');
            }

            nav.classList.remove("nav-hidden");
        });
    });

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("lightmode");
        icon.classList.add("inverted");
    }
});