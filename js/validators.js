export const esNombreValido = (v) => v.trim().length >= 3;

export const esCorreoValido = (v) => /^\S+@\S+\.\S+$/.test(v);

export const esContrasenaValida = (v) => v.length >= 8;

export const esTelefonoValido = (v) => /^\d{10}$/.test(v.replace(/\s/g, ""));