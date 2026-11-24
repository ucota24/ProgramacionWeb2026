<?php
require __DIR__ . "/helpers.php";

$iniciales = require __DIR__ . "/data/servicios-iniciales.php";
$archivoNuevos = __DIR__ . "/data/servicios-nuevos.json";

$nuevos = file_exists($archivoNuevos) ? json_decode(file_get_contents($archivoNuevos), true) : [];
$servicios = array_merge($iniciales, $nuevos);

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo === "GET") {
    if (isset($_GET["id"])) {
        foreach ($servicios as $servicio) {
            if ($servicio["id"] === $_GET["id"]) {
                responder($servicio);
            }
        }
        responder(["error" => "Servicio no encontrado"], 404);
    }

    responder($servicios);
}

if ($metodo === "POST") {
    $datos = json_decode(file_get_contents("php://input"), true);

    if (!is_array($datos)) {
        responder(["error" => "El cuerpo debe ser un JSON valido"], 422);
    }

    $nombre = trim($datos["nombre"] ?? "");
    $duracion = trim($datos["duracion"] ?? "");
    $precio = $datos["precio"] ?? null;

    if (mb_strlen($nombre) < 3) {
        responder(["error" => "El nombre debe tener al menos 3 caracteres"], 422);
    }

    if ($duracion === "") {
        responder(["error" => "La duración es obligatoria"], 422);
    }

    if (!is_numeric($precio) || $precio <= 0) {
        responder(["error" => "El precio debe ser un numero positivo"], 422);
    }

    $nuevo = [
        "id" => uniqid(),
        "nombre" => $nombre,
        "duracion" => $duracion,
        "precio" => $precio + 0,
    ];

    $nuevos[] = $nuevo;
    file_put_contents(
        $archivoNuevos,
        json_encode($nuevos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE),LOCK_EX
    );

    responder($nuevo, 201);
}

responder(["error" => "Metodo no permitido"], 405);