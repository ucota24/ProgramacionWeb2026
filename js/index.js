const btnMenu = document.querySelector(".menu__boton");
const nav = document.querySelector(".menu");

btnMenu.addEventListener("click", () => {
    nav.classList.toggle("abierto");
});