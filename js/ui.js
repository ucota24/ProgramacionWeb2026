export const limpiarErrores = (form) => {
    form.querySelectorAll("[data-error-para]").forEach((span) => {
        span.textContent = "";
    });
};

export const mostrarErroresNativos = (form) => {
    for (const campo of form.elements) {
        if (!campo.name || campo.validity.valid) continue;
        const span = form.querySelector(`[data-error-para="${campo.name}"]`);
        span.textContent = campo.validationMessage;
    }
};