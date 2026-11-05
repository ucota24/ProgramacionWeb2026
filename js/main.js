import { esNombreValido, esCorreoValido, esContrasenaValida, esTelefonoValido } from "./validators.js";
import { limpiarErrores, mostrarErroresNativos } from "./ui.js";

const form = document.querySelector("#form-registro");

const validarNombre = (campo) => {
    campo.setCustomValidity(esNombreValido(campo.value) ? "" : "Mínimo 3 caracteres");
};

const validarCorreo = (campo) => {
    campo.setCustomValidity(esCorreoValido(campo.value) ? "" : "El correo ingresado no es válido");
};

const validarContrasena = (campo) => {
    campo.setCustomValidity(esContrasenaValida(campo.value) ? "" : "Mínimo 8 caracteres");
};

const validarTelefono = (campo) => {
    campo.setCustomValidity(esTelefonoValido(campo.value) ? "" : "Debe tener 10 dígitos");
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores(form);

    validarNombre(form.elements.nombre);
    validarCorreo(form.elements.correo);
    validarContrasena(form.elements.contrasena);
    validarTelefono(form.elements.telefono);

    if (!form.checkValidity()) {
        mostrarErroresNativos(form);
        return;
    }

    const datos = Object.fromEntries(new FormData(form));
});




