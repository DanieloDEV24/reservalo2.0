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

        $nuevaInstalacion = view('instalaciones/modalNuevaInstalacion', ["baseUrl" => base_url(), "categorias"=>$categorias]);
        $view = view('instalaciones/crudInstalaciones', ["instalaciones" => $instalaciones, "nuevaInstalacion" => $nuevaInstalacion, "baseUrl" => base_url()]);
       

        return view('plantillas/normal', ["view"=>$view, "baseUrl" => base_url()]);
    }

public function nuevaInstalacion()
{
    $post  = $this->request->getPost();
    $files = $this->request->getFiles();

    $instalacionesModel = new instalacionesModel();

    if (!empty($post)) {
        $nombre         = $post["nombreInstalacion"];
        $deporte        = intval($post["categorias"]);
        $descripcion    = $post["descripcion"];
        $puedeCompleto  = filter_var($post["puedeCompleto"], FILTER_VALIDATE_BOOLEAN);
        $precioCompleto = floatval($post["precioCompleto"]);
        $catSecundaria  = intval($post["catSecundaria"]);
        $pistas         = json_decode($post["pistas"]);

        $data = [
            "nombre"      => $nombre, 
            "deporte"     => $deporte,
            "descripcion" => $descripcion,
            "precio"      => $precio,
            "capacidad"   => $capacidad,
            "portada"     => "",
            "img1"        => "",
            "img2"        => "",
            "img3"        => ""
        ];

        $rutaDestino = FCPATH . 'images/';
        if (!is_dir($rutaDestino)) {
            mkdir($rutaDestino, 0755, true);
        }

        $fotos = [
            "foto1" => '',
            "foto2" => '',
            "foto3" => '',
            "foto4" => '',
        ];

        $imagenes = $files['imagenes'];
        $indice = 1;

        if (is_array($imagenes)) {
            foreach ($imagenes as $imagen) {
                if ($indice > 4) break;
                if ($imagen->isValid() && !$imagen->hasMoved()) {
                    $nombreArchivo = $imagen->getName();
                    $imagen->move($rutaDestino, $nombreArchivo, true);
                    $fotos["foto$indice"] = $nombreArchivo;
                    $indice++;
                }
            }
        } else {
            if ($imagenes->isValid() && !$imagenes->hasMoved()) {
                $nombreArchivo = $imagenes->getName();
                $imagenes->move($rutaDestino, $nombreArchivo, true);
                $fotos["foto1"] = $nombreArchivo;
            }
        }

        // Asignar fotos al array para la BD
        $data["portada"] = $fotos["foto1"];
        $data["img1"]    = $fotos["foto2"];
        $data["img2"]    = $fotos["foto3"];
        $data["img3"]    = $fotos["foto4"];

        // Guarda en la BD
        $id_nuevaInstalacion = $instalacionesModel->createInstalacion($data);

        for ($i=1; $i <= $numeroPistas; $i++) { 
            $nombrePista = $nombre." - Pista: ".$i;

            $dataPista = 
            [
                "nombre"         => $nombrePista, 
                "id_instalacion" => $id_nuevaInstalacion
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
    }

   echo json_encode([
        "success" => false,
        "message" => "No se enviaron datos"
    ]);
}

}
