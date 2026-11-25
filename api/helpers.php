<?php

function responder($datos, $codigo = 200)
{
    http_response_code($codigo);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

function leerJson(): array
{
    $datos = json_decode(file_get_contents('php://input'), true);
    return is_array($datos) ? $datos : [];
}

function validarServicio(array $datos): array
{
    $nombre   = trim($datos['nombre'] ?? '');
    $duracion = trim($datos['duracion'] ?? '');
    $precio   = $datos['precio'] ?? null;

    if (mb_strlen($nombre) < 3) {
        responder(['error' => 'El nombre debe tener al menos 3 caracteres'], 422);
    }
    if ($duracion === '') {
        responder(['error' => 'La duración es obligatoria'], 422);
    }
    if (!is_numeric($precio) || $precio <= 0) {
        responder(['error' => 'El precio debe ser un número positivo'], 422);
    }

    return [$nombre, $duracion, (float) $precio];
}