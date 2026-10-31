const buscador = document.querySelector(".reservar__buscador");

buscador.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    document.querySelectorAll(".reservar__item").forEach((t) => {
        const coincide = t.textContent.toLowerCase().includes(texto);
        t.hidden = !coincide;
    });
});