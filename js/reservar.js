import Swal from "../node_modules/sweetalert2/dist/sweetalert2.esm.all.js";

const lista = document.querySelector("#servicios-lista");
const plantilla = document.querySelector("#tpl-servicio");
const resumenLista = document.querySelector("#resumen-lista");

const mostrarEstado = (mensaje) => {
    const item = document.createElement("li");
    item.className = "reservar__estado";
    item.textContent = mensaje;
    lista.replaceChildren(item);
};

const renderServicios = (servicios) => {
    servicios.forEach((s) => {
        const clon = plantilla.content.cloneNode(true);
        const radio = clon.querySelector(".servicio__radio");
        const etiqueta = clon.querySelector(".servicio");

        radio.id = `servicio-${s.id}`;
        radio.value = s.id;
        etiqueta.setAttribute("for", `servicio-${s.id}`);
        clon.querySelector(".servicio__nombre").textContent = s.nombre;
        clon.querySelector(".servicio__detalle").textContent = `${s.duracion} | ${s.precio} $`;

        lista.append(clon);
    });
};

const renderResumen = (s) => {
    const item = document.createElement("li");
    item.className = "resumen__item";

    const nombre = document.createElement("span");
    nombre.className = "resumen__corte";
    nombre.textContent = s.nombre;

    const detalle = document.createElement("span");
    detalle.className = "resumen__detalle";
    detalle.textContent = `${s.duracion} | ${s.precio} $`;

    item.append(nombre, detalle);
    resumenLista.replaceChildren(item);
};

const cargarServicios = async () => {
    mostrarEstado("Cargando servicios...");

    try {
        const respuesta = await fetch("../data/servicios.json");

        if (!respuesta.ok) {
            throw new Error(`Error HTTP ${respuesta.status}: no fue posible cargar los servicios.`);
        }

        const servicios = await respuesta.json();

        lista.replaceChildren();
        renderServicios(servicios);

        const guardado = JSON.parse(localStorage.getItem("servicio"));
        if (guardado) {
            lista.querySelector(`#servicio-${guardado.id}`).checked = true;
            renderResumen(guardado);
        }

        lista.addEventListener("change", (evento) => {
            const elegido = servicios.find((s) => s.id === evento.target.value);
            renderResumen(elegido);
            localStorage.setItem("servicio", JSON.stringify(elegido));
        });
    } catch (error) {
        mostrarEstado("No se pudieron cargar los servicios. Intentalo ms tarde.");
    }
};

const botonContinuar = document.querySelector(".lateral__continuar");

botonContinuar.addEventListener("click", () => {
    if (!lista.querySelector(".servicio__radio:checked")) {
        Swal.fire({
            icon: "warning",
            title: "Elige un servicio",
            text: "Selecciona un servicio para poder continuar.",
        });
    }
});

cargarServicios();