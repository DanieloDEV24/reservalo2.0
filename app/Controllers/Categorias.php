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
                'css/style.css', 
                'css/responsive.css'
            ], 

            "js" => [
                "js/categorias.js", 
                "js/movimiento.js"
            ]
        ];
        
        $modalBorrarUsuario = view('usuarios/modalBorrarUsuario');
        $modalReservasUsuario = view('usuarios/modalReservasUsuario');
        $modalInfoUsuario = view('usuarios/modalInfoUsuario');

        $modalEditarCategoria = view('categorias/modalEditarCategoria');
        $modalBorrarCategoria = view('categorias/modalBorrarCategoria');
        $modalCrearCategoria  = view('categorias/modalCrearCategoria'); 

        $view = view('categorias/gestorCategorias', ["categorias" => $categorias, "modalBorrarUsuario" => $modalBorrarUsuario, "modalReservasUsuario" => $modalReservasUsuario, "modalInfoUsuario" => $modalInfoUsuario, "modalEditarCategoria" => $modalEditarCategoria, "modalBorrarCategoria" => $modalBorrarCategoria, "modalCrearCategoria" => $modalCrearCategoria]);
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

    public function borrarCategoria() {

        $categoriasModel = new categoriasModel();
        $post  = $this->request->getPost();

        if(!empty($post)){
            
            $id_categoria = intval($post["id_categoria"]);

            $categoriasModel->deleteCategoria($id_categoria);

            echo json_encode([
                "success"   => true,
                "message"   => "La categoria se ha borrado correctamente"
            ]);
            return;
        }
    }

    public function crearCategoria() {

        $categoriasModel = new categoriasModel();
        $post  = $this->request->getPost();

        if(!empty($post)){
            
            $nombre = $post["nombre"];

            $id_categoria = $categoriasModel->createCategoria($nombre);
            $categoria = $categoriasModel->getCategoria(intval($id_categoria))[0];

            echo json_encode([
                "success"   => true,
                "message"   => "La categoria se ha creado correctamente",
                "categoria" => $categoria
            ]);
            return;
        }
    }
}
