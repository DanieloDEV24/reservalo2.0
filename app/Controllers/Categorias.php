<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;

class Categorias extends BaseController
{
    public function gestorCategorias(){
        
        $categoriasModel = new categoriasModel();
        $categorias = $categoriasModel->getFullCategorias();

        $assets = [
          
            "css" => [
                'css/instalaciones.css',
                'css/categorias.css', 
                'css/style.css'
            ], 

            "js" => [
                "js/categorias.js"
            ]
        ];
        
        $modalBorrarUsuario = view('usuarios/modalBorrarUsuario');
        $modalReservasUsuario = view('usuarios/modalReservasUsuario');
        $modalInfoUsuario = view('usuarios/modalInfoUsuario');

        $modalEditarCategoria = view('categorias/modalEditarCategoria');
        $modalBorrarCategoria = view('categorias/modalBorrarCategoria');

        $view = view('categorias/gestorCategorias', ["categorias" => $categorias, "modalBorrarUsuario" => $modalBorrarUsuario, "modalReservasUsuario" => $modalReservasUsuario, "modalInfoUsuario" => $modalInfoUsuario, "modalEditarCategoria" => $modalEditarCategoria, "modalBorrarCategoria" => $modalBorrarCategoria]);
        return view('plantillas/normal', ["view" => $view, "assets" => $assets]);
    }

    public function getCategoria(){

        $categoriasModel = new categoriasModel();
        $post  = $this->request->getPost();

        if(!empty($post)){

            $id_categoria = intval($post["id_categoria"]);
            $categoria = $categoriasModel->getCategoria($id_categoria)[0];

            if(count($categoria) > 0) {
                
                echo json_encode([
                    "success"   => true, 
                    "categoria" => $categoria
                ]);
                return;

            }
        }
    }

    public function editarCategorias() {

        $categoriasModel = new categoriasModel();
        $post  = $this->request->getPost();

        if(!empty($post)){
            
            $id_categoria = intval($post["id_categoria"]);
            $nombre = $post["nombre"];

            $categoriasModel->updateCategoria($id_categoria, $nombre);
            $categoria = $categoriasModel->getCategoria($id_categoria);

            echo json_encode([
                "success"   => true,
                "message"   => "La categoria se ha editado correctamente", 
                "categoria" => $categoria[0]
            ]);
            return;
        }
    }
}
