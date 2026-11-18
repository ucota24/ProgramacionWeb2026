import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

const lista = document.querySelector("#barberos-lista");
const plantilla = document.querySelector("#tpl-barbero");
const resumenLista = document.querySelector("#resumen-lista");
const servicio = JSON.parse(localStorage.getItem("servicio"));

const mostrarEstado = (mensaje) => {
    const item = document.createElement("li");
    item.className = "reservar__estado";
    item.textContent = mensaje;
    lista.replaceChildren(item);
};

const renderBarberos = (barberos) => {
    barberos.forEach((b) => {
        const clon = plantilla.content.cloneNode(true);
        const radio = clon.querySelector(".barbero__radio");
        const etiqueta = clon.querySelector(".barbero");
        const foto = clon.querySelector(".barbero__foto");

        radio.id = `barbero-${b.id}`;
        radio.value = b.id;
        etiqueta.htmlFor = `barbero-${b.id}`;
        foto.src = `../assets/img/${b.foto}`;
        foto.alt = `Foto de ${b.nombre}`;
        clon.querySelector(".barbero__nombre").textContent = b.nombre;

        lista.append(clon);
    });
};

const crearItem = (nombre, detalle) => {
    const item = document.createElement("li");
    item.className = "resumen__item";

    const spanNombre = document.createElement("span");
    spanNombre.className = "resumen__corte";
    spanNombre.textContent = nombre;

    const spanDetalle = document.createElement("span");
    spanDetalle.className = "resumen__detalle";
    spanDetalle.textContent = detalle;

    item.append(spanNombre, spanDetalle);
    return item;
};

const renderResumen = (b) => {
    const items = [];
    if (servicio) items.push(crearItem(servicio.nombre, `${servicio.duracion} | ${servicio.precio} $`));
    if (b) items.push(crearItem(b.nombre, "Barbero"));
    resumenLista.replaceChildren(...items);
};

const cargarBarberos = async () => {
    mostrarEstado("Cargando barberos...");

    try {
        const respuesta = await fetch("../data/barberos.json");
        if (!respuesta.ok) throw new Error("No se pudo leer el archivo");
        const barberos = await respuesta.json();

        lista.replaceChildren();
        renderBarberos(barberos);

        const guardado = JSON.parse(localStorage.getItem("barbero"));
        if (guardado) {
            lista.querySelector(`#barbero-${guardado.id}`).checked = true;
        }
        renderResumen(guardado);

        lista.addEventListener("change", (e) => {
            const elegido = barberos.find((b) => b.id === e.target.value);
            renderResumen(elegido);
            localStorage.setItem("barbero", JSON.stringify(elegido));
        });
    } catch (error) {
        mostrarEstado("No se pudieron cargar los barberos. Intenta de nuevo más tarde.");
    }
};

const botonContinuar = document.querySelector(".lateral__continuar");

botonContinuar.addEventListener("click", () => {
    if (!lista.querySelector(".barbero__radio:checked")) {
        Swal.fire({
            icon: "warning",
            title: "Elige un barbero",
            text: "Selecciona un barbero para poder continuar.",
        });
    }
});

cargarBarberos();