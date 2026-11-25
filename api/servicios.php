<?php
require __DIR__ . "/helpers.php";
require __DIR__ . '/db.php';

try {
    $pdo = conectar();
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare(
                    'SELECT id, nombre, duracion, precio
                     FROM servicios WHERE id = :id'
                );
                $stmt->execute(['id' => (int) $_GET['id']]);
                $servicio = $stmt->fetch();
                if (!$servicio) {
                    responder(['error' => 'Servicio no encontrado'], 404);
                }
                $servicio['precio'] = (float) $servicio['precio'];
                responder($servicio);
            }

            $stmt = $pdo->prepare('SELECT id, nombre, duracion, precio FROM servicios');
            $stmt->execute();
            $servicios = $stmt->fetchAll();
            foreach ($servicios as $i => $s) {
                $servicios[$i]['precio'] = (float) $s['precio'];
            }
            responder($servicios);
            break;
            
            case 'POST':
                [$nombre, $duracion, $precio] = validarServicio(leerJson());
                $stmt = $pdo->prepare('INSERT INTO servicios (nombre, duracion, precio) 
                VALUES (:nombre, :duracion, :precio)');
                
                $stmt->execute(['nombre' => $nombre,'duracion' => $duracion,'precio'   => $precio,]);
                
                responder(['id'=> (int) $pdo->lastInsertId(),'nombre'   => $nombre,'duracion' => $duracion,
                'precio'   => $precio,], 201);
                
                break;

            case 'PUT':
                if ($id === null) {
                    responder(['error' => 'Falta el id'], 400);
                    }
                    
                    [$nombre, $duracion, $precio] = validarServicio(leerJson());
                    
                    $existe = $pdo->prepare('SELECT id FROM servicios WHERE id = :id');
                    $existe->execute(['id' => $id]);
                    
                    if (!$existe->fetch()) {
                        responder(['error' => 'No se encontró el servicio'], 404);
                        }
                        
                        $stmt = $pdo->prepare('UPDATE servicios SET nombre = :nombre, duracion = :duracion, 
                        precio = :precio WHERE id = :id');
                        
                        $stmt->execute(['nombre' => $nombre, 'duracion' => $duracion, 'precio' => $precio, 'id' => $id]);
                        responder(['id' => $id, 'nombre' => $nombre, 'duracion' => $duracion, 'precio' => $precio]);

            case 'DELETE':
                if ($id === null) {
                    responder(['error' => 'Falta el id'], 400);
                    }
                    
                    $stmt = $pdo->prepare('DELETE FROM servicios WHERE id = :id');
                    $stmt->execute(['id' => $id]);
                    
                    if ($stmt->rowCount() === 0) {
                        responder(['error' => 'No se encontró el servicio'], 404);
                        }
                        
                        http_response_code(204);
                        exit;
                        default:
                        responder(['error' => 'Método no permitido'], 405);
                        }
        }catch (PDOException $e) {
            error_log($e->getMessage());
            responder(['error' => 'Error interno del servidor'], 500);
    }