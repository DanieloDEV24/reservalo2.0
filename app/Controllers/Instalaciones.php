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
        $categoria      = intval($post["categorias"]);
        $descripcion    = $post["descripcion"];
        $puedeCompleto  = filter_var($post["puedeCompleto"], FILTER_VALIDATE_BOOLEAN);
        $precioCompleto = floatval($post["precioCompleto"]);
        $catSecundaria  = intval($post["catSecundaria"]);
        $pistas         = json_decode($post["pistas"]);
        $noPistas       = filter_var($post["noPistas"], FILTER_VALIDATE_BOOLEAN);

        $data = [
            "nombre"              => $nombre, 
            "categoria_principal" => $categoria,
            "descripcion"         => $descripcion,
            "precio_completo"     => $precioCompleto,
            "puede_completo"      => $puedeCompleto,
            "categoria_opcional1" => $catSecundaria,
        ];

        $rutaDestino = FCPATH . 'images/';
        if (!is_dir($rutaDestino)) {
            mkdir($rutaDestino, 0755, true);
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
