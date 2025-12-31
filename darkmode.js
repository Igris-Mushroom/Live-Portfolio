document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".colorswitch");
    const icon = document.getElementById("themeicon");

    btn.addEventListener("click", function () {
        // Toggle the lightmode class on the body
        document.body.classList.toggle("lightmode");

        // Toggle the rotation on the icon
        icon.classList.toggle("inverted");

        // Save preference
        const mode = document.body.classList.contains("lightmode") ? "light" : "dark";
        localStorage.setItem("theme", mode);
    });
});

btn.addEventListener("click", function () {
    // 1. Create a quick "Blind" effect like a flashbang
    document.body.style.filter = "brightness(1.5)";

    document.body.classList.toggle("lightmode");
    icon.classList.toggle("inverted");

    // 2. Return to normal brightness after 200ms
    setTimeout(() => {
        document.body.style.filter = "brightness(1)";
    }, 200);

    const mode = document.body.classList.contains("lightmode") ? "light" : "dark";
    localStorage.setItem("theme", mode);
});