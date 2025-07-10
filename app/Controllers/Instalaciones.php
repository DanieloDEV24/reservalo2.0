<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;

class Instalaciones extends BaseController
{
    /**
     * Funcion index(). Funcion en la que obtenemos los datos necesarios para mostrar la pagina
     * principal. 
     */
    public function instalaciones(): string
    {

        return view('index', ["baseUrl" => base_url()]);
    }

    public function crudInstalaciones(): string
    {

        $instalacionesModel = new instalacionesModel();
        $instalaciones = $instalacionesModel->getInstalaciones();
        $categorias = $instalacionesModel->getCategorias();

        $nuevaInstalacion = view('instalaciones/modalNuevaInstalacion', ["baseUrl" => base_url(), "categorias" => $categorias]);
        $verInstalacion   = view('instalaciones/modalVerInstalacion', ["baseUrl" => base_url()]);
        $view = view('instalaciones/crudInstalaciones', ["instalaciones" => $instalaciones, "nuevaInstalacion" => $nuevaInstalacion, "verInstalacion" => $verInstalacion, "baseUrl" => base_url()]);

        return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url()]);
    }

    public function nuevaInstalacion()
    {
        $post  = $this->request->getPost();
        $files = $this->request->getFiles();

        $instalacionesModel = new instalacionesModel();

        if (!empty($post)) {
            $nombre         = $post["nombreInstalacion"];
            $categoria      = intval($post["categorias"]);
            $descripcion    = $post["descripcion"];
            $puedeCompleto  = filter_var($post["puedeCompleto"], FILTER_VALIDATE_BOOLEAN);
            $precioCompleto = floatval($post["precioCompleto"]);
            $catSecundaria  = intval($post["catSecundaria"]);
            $pistas         = json_decode($post["pistas"]);
            $noPistas       = filter_var($post["noPistas"], FILTER_VALIDATE_BOOLEAN);

            $dataInstalacion = [
                'nombre' => $nombre, 
                'descripcion' => $descripcion,
                'categoria_principal' => $categoria,
                'categoria_opcional1' => ($catSecundaria !== 0) ? $catSecundaria : null,
                'puede_completo' => $puedeCompleto,
                'no_pistas' => $noPistas,
                'precio_completo' => ($puedeCompleto || $noPistas) ? $precioCompleto : null
            ]; 

            $id_instalacion = $instalacionesModel->createInstalacion($dataInstalacion);

            $rutaDestino = FCPATH . 'images/';
            if (!is_dir($rutaDestino)) {
                mkdir($rutaDestino, 0755, true);
            }

            foreach ($pistas as $pista) {
                $campoImagenes = 'imagenes_pista_' . $pista->id;
                $imagenesGuardadas = [];

                if (isset($files[$campoImagenes])) {
                    foreach ($files[$campoImagenes] as $imagen) {
                        if ($imagen->isValid() && !$imagen->hasMoved()) {
                            $nombreArchivo = basename($imagen->getClientName());
                            $rutaFinal = $rutaDestino . $nombreArchivo;

                            // Eliminar si ya existe para sobrescribir
                            if (file_exists($rutaFinal)) {
                                unlink($rutaFinal);
                            }

                            // Mover imagen al destino
                            $imagen->move($rutaDestino, $nombreArchivo);

                            // Guardar ruta relativa para la base de datos
                            $imagenesGuardadas[] = $nombreArchivo;
                        }
                    }
                }

                // Insertar en base de datos
                $dataPista = [
                    'id_instalacion' => $id_instalacion,
                    'nombre_pista' => $pista->nombrePista,
                    'capacidad_pista' => $pista->capacidadPista,
                    'precio_pista' => $pista->precioPista,
                    'imagen1' => $imagenesGuardadas[0] ?? null,
                    'imagen2' => $imagenesGuardadas[1] ?? null,
                    'imagen3' => $imagenesGuardadas[2] ?? null,
                    'imagen4' => $imagenesGuardadas[3] ?? null,
                ];

                $instalacionesModel->createPistas($dataPista);
            }



            // Carga instalaciones para devolver
            $instalaciones = $instalacionesModel->getInstalaciones();

            echo json_encode([
                "success"       => true,
                "message"       => "Todo correcto",
                "instalaciones" => $instalaciones
            ]);
            exit;
        }

        echo json_encode([
            "success" => false,
            "message" => "No se enviaron datos"
        ]);
    }

    public function verInstalacion()
    {
        echo json_encode([
            "success" => false,
            "message" => "No se enviaron datos"
        ]);
    }
}
