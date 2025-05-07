<?php

namespace App\Controllers;

use App\Models\categoriasModel;
use App\Models\instalacionesModel;

class Home extends BaseController
{
    /**
     * Funcion index(). Funcion en la que obtenemos los datos necesarios para mostrar la pagina
     * principal. 
     */
    public function index(): string
    {
        //Creamos el modelo de las instalaciones
        $instalaciones = new instalacionesModel();

        $categorias = new categoriasModel();
        
        //Buscamos todas las instalaciones
        $resultado = $instalaciones->findAll();

        // Selección de las categorías con más instalaciones
        $numeroInstalaciones = count($resultado);

        $instalacionesCategoria = $categorias->categoriasContador();


        

        //Devolvemos la vista
        return view('index', ["numeroInstalaciones" => $numeroInstalaciones, "instalacionesCategoria" => $instalacionesCategoria, "baseUrl" => base_url()]);
    }
}
