const themeIcons = document.querySelectorAll(".theme-icon");
const body = document.querySelector("body")

function toggleTheme(e) {
    body.classList.toggle("light");
    body.classList.toggle("dark")
}


themeIcons.forEach(icon => icon.addEventListener("click", toggleTheme));