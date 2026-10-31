const btnTema = document.querySelector(".menu__tema");


if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("oscuro");
}

if (btnTema){
btnTema.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");

    localStorage.setItem("tema", document.body.classList.contains("oscuro") ? "oscuro" : "claro");
    });
}
