<?php

namespace App\Controllers;

use App\Models\actividadModel;
use App\Models\categoriasModel;
use App\Models\horariosModel;
use App\Models\instalacionesModel;
use App\Models\reservasModel;
use App\Models\loginModel;

class Instalaciones extends BaseController
{

    public function crudInstalaciones(): string {

        $instalacionesModel = new instalacionesModel();
        $post  = $this->request->getPost();
        $filter = (!empty($post) && (isset($post["filter"]) && !empty($post["filter"])))? $post["filter"] : null;

        $instalaciones = $instalacionesModel->getInstalaciones($filter);

        if(!empty($post))
        {
            echo json_encode([
                "instalaciones" => $instalaciones
            ]);
            exit;
        }

        $categorias = $instalacionesModel->getCategorias();

        $nuevaInstalacion  = view('instalaciones/modalNuevaInstalacion', ["baseUrl" => base_url(), "categorias" => $categorias]);
        $verInstalacion    = view('instalaciones/modalVerInstalacion', ["baseUrl" => base_url()]);
        $borradoPista      = view('instalaciones/modalBorrarPista', ["baseUrl" => base_url()]);
        $editarInstalacion = view('instalaciones/modalEditarInstalacion', ["baseUrl" => base_url()]);
        $darDeBaja         = view('instalaciones/modalBajaInstalacion', ["baseUrl" => base_url()]);
        $borrarInstalacion = view('instalaciones/modalBorrarInstalacion', ["baseUrl" => base_url()]);
        $view = view('instalaciones/crudInstalaciones', ["instalaciones" => $instalaciones, "nuevaInstalacion" => $nuevaInstalacion, "verInstalacion" => $verInstalacion, "editarInstalacion" => $editarInstalacion, "modalBorrarPista" => $borradoPista, "modalBajaInstalacion" => $darDeBaja, "borrarInstalacion" => $borrarInstalacion, "categorias"=>$categorias, "baseUrl" => base_url()]);

        $assets = [
            "css" => [
                'css/crudInstalaciones.css',
                'css/instalaciones.css',
                'css/style.css', 
                'css/responsive.css'
            ], 

            "js" => [
                'js/instalaciones.js', 
                'js/movimiento.js'
            ]
        ];

        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalEditarReservaActividadUsuario = view('actividades/modalEditarReservaActividadUsuario');
            $modalEliminarReservaActividadUsuario = view('actividades/modalEliminarReservaActividadUsuario');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras, 'modalEditarReservaActividadUsuario' => $modalEditarReservaActividadUsuario, "modalEliminarReservaActividadUsuario" => $modalEliminarReservaActividadUsuario]);
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');


        return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
    }

    public function nuevaInstalacion() {
        $post  = $this->request->getPost();
        $files = $this->request->getFiles();
        $session = session();

        $instalacionesModel = new instalacionesModel();
        $actividadModel = new actividadModel();

        if (!empty($post)) {
            $nombre            = $post["nombreInstalacion"];
            $categoria         = intval($post["categorias"]);
            $descripcion       = $post["descripcion"];
            $direccion         = $post["direccion"];
            $puedeCompleto     = filter_var($post["puedeCompleto"], FILTER_VALIDATE_BOOLEAN);
            $precioCompleto    = floatval($post["precioCompleto"]);
            $catSecundaria     = intval($post["catSecundaria"]);
            $pistas            = json_decode($post["pistas"]);
            $noPistas          = filter_var($post["noPistas"], FILTER_VALIDATE_BOOLEAN);
            $iluminacion       = filter_var($post["iluminacion"], FILTER_VALIDATE_BOOLEAN);
            $material          = filter_var($post["material"], FILTER_VALIDATE_BOOLEAN);
            $sinHorario        = filter_var($post["sinHorario"], FILTER_VALIDATE_BOOLEAN);
            $capacidadCompleto = intval($post["capacidadCompleto"]);

            $dataInstalacion = [
                'nombre' => $nombre,
                'descripcion' => $descripcion,
                'direccion' => $direccion, 
                'categoria_principal' => $categoria,
                'categoria_opcional1' => ($catSecundaria !== 0) ? $catSecundaria : null,
                'puede_completo' => $puedeCompleto,
                'no_pistas' => $noPistas,
                'iluminacion' => $iluminacion,
                'material' => $material,
                'tipo_reserva' => $sinHorario,
                'precio_completo' => ($puedeCompleto || $noPistas) ? $precioCompleto : null,
                'capacidad_completo' => ($puedeCompleto || $noPistas) ? $capacidadCompleto : null
            ];

            $id_instalacion = $instalacionesModel->createInstalacion($dataInstalacion);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 7,
                    "descripcion" => "Creación de la instalación ". $nombre, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);

            $rutaDestino = FCPATH . 'images/';
            if (!is_dir($rutaDestino)) {
                mkdir($rutaDestino, 0755, true);
            }

            // Variable para guardar la primera imagen (para la pista completa)
            $imagenesDeFirstPista = null;
            $totalPistas = count($pistas);

            foreach ($pistas as $index => $pista) {
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

                // Guardar la primera imagen de la primera pista
                if ($index === 0 && !empty($imagenesGuardadas)) {
                    $imagenesDeFirstPista = $imagenesGuardadas;
                }
                // Si es la última pista (completa) y hay más de una pista, usar la imagen de la primera
                $esUltimaPista = ($index === $totalPistas - 1);
                $esPistaCompleta = ($pista->id === 'completo');

                if ($esUltimaPista && $esPistaCompleta && $totalPistas > 1 && $imagenesDeFirstPista) {
                    $imagenesGuardadas = $imagenesDeFirstPista;
                }

                // Insertar en base de datos
                $dataPista = [
                    'id_instalacion' => $id_instalacion,
                    'nombre_pista' => $pista->nombrePista,
                    'capacidad_pista' => $pista->capacidadPista,
                    'precio_pista' => $pista->precioPista,
                    'completa' => ($pista->id === 'completo') ? 1 : 0,
                    'imagen1' => $imagenesGuardadas[0] ?? null,
                    'imagen2' => $imagenesGuardadas[1] ?? null,
                    'imagen3' => $imagenesGuardadas[2] ?? null,
                    'imagen4' => $imagenesGuardadas[3] ?? null,
                    'pista_unica' => ($noPistas) ? 1 : 0
                ];
                $instalacionesModel->createPistas($dataPista);
            }



            // Carga instalaciones para devolver
            $instalaciones = $instalacionesModel->getInstalaciones(null);

            echo json_encode([
                "success"       => true,
                "message"       => "Todo correcto",
                "instalaciones" => $instalaciones,
                "base_url" => base_url()
            ]);
            exit;
        }

        echo json_encode([
            "success" => false,
            "message" => "No se enviaron datos"
        ]);
        exit;
    }

    public function verInstalacion() {

        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();

        if (!empty($post)) {
            $id_instalacion = intval($post["id"]);
            $instalacion    = $instalacionesModel->getInstalacion($id_instalacion);

            if ($instalacion) {
                $pistas = $instalacionesModel->getPistasByInstalacion($id_instalacion);
                echo json_encode([
                    "success" => true,
                    "message" => "Instalación encontrada",
                    "instalacion" => $instalacion,
                    "pistas" => $pistas
                ]);
                exit;
            }
        }

        echo json_encode([
            "success" => false,
            "message" => "No se enviaron datos"
        ]);
    }

    public function infoPista() {
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();

        if (!empty($post)) {
            $id_pista = intval($post["id"]);
            $pista    = $instalacionesModel->getPistasById($id_pista);

            if ($pista) {
                echo json_encode([
                    "success" => true,
                    "pista"   => $pista
                ]);
                exit;
            }
        }

        echo json_encode([
            "success" => false,
            "message" => "No se enviaron datos"
        ]);
    }

    public function editarInstalacion(){
        
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();
        $categoriasModel    = new categoriasModel();

        if (!empty($post)) {
            $id_instalacion = intval($post["id"]);
            $instalacion    = $instalacionesModel->getInstalacion($id_instalacion);
            $categorias     = $categoriasModel->getCategorias();

            if ($instalacion) {
                $pistas = $instalacionesModel->getPistasByInstalacion($id_instalacion);
                echo json_encode([
                    "success" => true,
                    "message" => "Instalación encontrada",
                    "instalacion" => $instalacion,
                    "pistas" => $pistas,
                    "categorias" => $categorias
                ]);
                exit;
            }
        }
    }

    public function editarPista(){
        $post  = $this->request->getPost();
        $files = $this->request->getFiles();
        $instalacionesModel = new instalacionesModel();
        $actividadModel = new actividadModel();

        $session = session();

        if (!empty($post)) {
            $id_pista = intval($post["id"]);

            $imagenesGuardadas = [];
            if (isset($files['imagenes'])) {
                $imagenes = $files['imagenes'];

                // Carpeta general donde se guardarán las imágenes
                $uploadPath = FCPATH . 'images/';

                // Crear la carpeta si no existe
                if (!is_dir($uploadPath)) {
                    mkdir($uploadPath, 0777, true);
                }

                // Guardar cada imagen
                foreach ($imagenes as $imagen) {
                    if ($imagen->isValid() && !$imagen->hasMoved()) {
                        // Mantiene el nombre original para reconocerlo fácilmente
                        $nuevoNombre = $imagen->getName();

                        // Movemos la imagen a la carpeta "images"
                        $imagen->move($uploadPath, $nuevoNombre);

                        // Guardamos la ruta relativa (para la BD)
                        $imagenesGuardadas[] = $nuevoNombre;
                    }
                }
            }

            // --- 2️⃣ Preparamos los datos a actualizar ---
            $data = [
                'nombre_pista'     => $post["nombre_pista"] ?? null,
                'capacidad_pista'  => $post["capacidad_pista"] ?? null,
                'precio_pista'     => $post["precio_pista"] ?? null,
                'imagen1'          => $imagenesGuardadas[0] ?? null,
                'imagen2'          => $imagenesGuardadas[1] ?? null,
                'imagen3'          => $imagenesGuardadas[2] ?? null,
                'imagen4'          => $imagenesGuardadas[3] ?? null,
            ];

            // --- 3️⃣ Actualizamos la pista ---
            $update = $instalacionesModel->updatePista($id_pista, $data);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 17,
                    "descripcion" => "Modificación de la pista ". $data['nombre_pista'], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);


            // --- 4️⃣ Respuesta ---
            if ($update) {
                $pista = $instalacionesModel->getPistasById($id_pista);

                echo json_encode([
                    "success"  => true,
                    "message"  => "Pista editada correctamente",
                    "pista"    => $pista,
                    "imagenes" => $imagenesGuardadas
                ]);
                exit;
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "No se pudo actualizar la pista"
                ]);
                exit;
            }
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Datos no recibidos"
            ]);
            exit;
        }
    }

    public function getNewIndexPista(){
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();
        $pistas = $instalacionesModel->getPistas();
        echo json_encode([
            "success" => true,
            "message" => "Las pistas han sido encontradas",
            "pistas"   => $pistas
        ]);
        exit;
    }

    public function borrarPista() {
        $post = $this->request->getPost(); // --> Obtenemos el post de la petición
        $instalacionesModel = new instalacionesModel(); // --> Inicializamos el modelo de instalaciones
        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel(); 

        $session = session();

        // Comprobamos que el post no este vacío para poder obtener el id de la pista
        if (!empty($post)) {
            $id_pista = intval($post["id"]); // --> Obtenemos el id de la pista que queremos eliminar
            $reservas = intval($post["reservas"]);

            $pista = $instalacionesModel->getPistasById($id_pista)[0]["nombre_pista"];

            if($reservas === 1) {
               $reservasModel->anularReservaByPista($id_pista);
               $reservasModel->deletePedidoByPista($id_pista); 
            }

            $result = $instalacionesModel->borrarPista($id_pista); // --> Llamamos a la función del modelo que elimina la pista
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 18,
                    "descripcion" => "Borrado de la pista ". $pista, 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);

            // Realizamos la respuesta si todo ha id bien 
            if ($result) {
                echo json_encode([
                    "succes" => true,
                    "result" => $result
                ]);
                exit;
            }
        }
    }

    public function crearPista() {
        $post = $this->request->getPost();
        $files = $this->request->getFiles();
        $instalacionesModel = new instalacionesModel();
        $actividadModel = new actividadModel();

        $session = session();

        if (!empty($post)) {
            $nombre = $post["nombre_pista"];
            $capacidad = $post["capacidad_pista"];
            $precio = $post["precio_pista"];
            $id_instalacion = $post["id_instalacion"];

            $rutaDestino = FCPATH . 'images/';
            if (!is_dir($rutaDestino)) {
                mkdir($rutaDestino, 0755, true);
            }

            $imagenesGuardadas = [];
            if (isset($files['imagenes'])) {
                foreach ($files['imagenes'] as $imagen) {

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

            $data = [
                "id_instalacion"  => $id_instalacion,
                "nombre_pista"    => $nombre,
                "capacidad_pista" => $capacidad,
                "precio_pista"    => $precio, 
                "completa"        => 0,
                'imagen1'         => $imagenesGuardadas[0] ?? 'predefinida.png',
                'imagen2'         => $imagenesGuardadas[1] ?? 'predefinida.png',
                'imagen3'         => $imagenesGuardadas[2] ?? 'predefinida.png',
                'imagen4'         => $imagenesGuardadas[3] ?? 'predefinida.png',
            ];

            $nuevaPista = $instalacionesModel->createPistas($data);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 17,
                    "descripcion" => "Creación de la pista ". $data['nombre_pista'], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);

            echo json_encode([
                "succes"   => true,
                "message"  => "Pista creada correctamente",
                "id_pista" => $nuevaPista
            ]);
            exit;
        }

        echo json_encode([
            "succes"  => false,
            "message" => "Error al crear la pista"
        ]);
        exit;
    }

    public function editarInstalacionBD(){
        $post = $this->request->getPost();
        $instalaciones = new instalacionesModel();
        $actividadModel = new actividadModel();

        $session = session();

        if (!empty($post)) {

            $id = intval($post["id"]);
            $nombre = $post["nombre"];
            $categoria = intval($post["categoria"]);
            $catSecundaria = intval($post["categoriaSec"]);
            $iluminacion = filter_var($post["iluminacion"], FILTER_VALIDATE_BOOLEAN);
            $material = filter_var($post["material"], FILTER_VALIDATE_BOOLEAN);
            $noPistas = filter_var($post["noPistas"], FILTER_VALIDATE_BOOLEAN);
            $puedeCompleta = filter_var($post["puedeCompleta"], FILTER_VALIDATE_BOOLEAN);
            $sinHorario = filter_var($post["sinHorario"], FILTER_VALIDATE_BOOLEAN);
            $precioCompleto = floatval($post["precioCompleto"]);
            $capacidadCompleta = intval($post["capacidadCompleta"]);
            $descripcion = $post["descripcion"];
            $direccion = $post["direccion"];

            $instalacionAntigua = $instalaciones->getInstalacion($id);
            $puedeCompletaAntigua = filter_var($instalacionAntigua[0]["puede_completo"], FILTER_VALIDATE_BOOLEAN);
            $noPistasAntigua = filter_var($instalacionAntigua[0]["no_pistas"], FILTER_VALIDATE_BOOLEAN);

            // Inicializamos array para guardar nombres de imágenes nuevas (si se suben)
            $imagenesGuardadas = [
                'imagen1' => null,
                'imagen2' => null,
                'imagen3' => null,
                'imagen4' => null,
            ];

            // Procesamos imágenes solo si existen (no obligatorias)
            if ($this->request->getFiles() && isset($_FILES['imagenesEditarNoPista'])) {
                $imagenes = $this->request->getFiles();
                $files = $imagenes['imagenesEditarNoPista'];
                $i = 1;

                foreach ($files as $file) {
                    if ($file->isValid() && !$file->hasMoved()) {
                        $nombreArchivo = $file->getClientName();
                        $file->move(FCPATH . 'images', $nombreArchivo);
                        $imagenesGuardadas["imagen{$i}"] = $nombreArchivo;
                        $i++;
                        if ($i > 4) break;
                    }
                }
            }

            // Si está activado el modo "sin pistas"
            if ($noPistas) {
                if (!$noPistasAntigua) {
                    $delete = $instalaciones->borrarPistas($id);

                    if ($delete) {
                        $pistaUnica = [
                            "id_instalacion"  => $id,
                            "nombre_pista"    => "pista única " . $nombre,
                            "capacidad_pista" => $capacidadCompleta,
                            "precio_pista"    => $precioCompleto,
                            "completa"        => 0,
                            "imagen1"         => $imagenesGuardadas['imagen1'],
                            "imagen2"         => $imagenesGuardadas['imagen2'],
                            "imagen3"         => $imagenesGuardadas['imagen3'],
                            "imagen4"         => $imagenesGuardadas['imagen4'],
                            "pista_unica"     => 1
                        ];

                        $instalaciones->createPistas($pistaUnica);
                    }
                }

                $pista = $instalaciones->getPistasByInstalacion($id);
                if ($pista) {
                    $datos = [
                        "nombre_pista"    => "pista única " . $nombre,
                        "capacidad_pista" => $capacidadCompleta,
                        "precio_pista"    => $precioCompleto,
                    ];

                    // Solo actualizamos imágenes si se suben nuevas
                    foreach ($imagenesGuardadas as $campo => $valor) {
                        if (!empty($valor)) {
                            $datos[$campo] = $valor;
                        }
                    }

                    $instalaciones->updatePista($pista[0]["id_pista"], $datos);
                }
            }

            if(!$puedeCompleta && $puedeCompletaAntigua) {
                
                $instalaciones->borrarPistaCompleta($id);
            }
            else if ($puedeCompleta && !$puedeCompletaAntigua) {
                $pistaCompleta = [
                    "id_instalacion"  => $id,
                    "nombre_pista"    => "pista completa " . $nombre,
                    "capacidad_pista" => $capacidadCompleta,
                    "precio_pista"    => $precioCompleto,
                    "completa"        => 1,
                    "imagen1"         => $imagenesGuardadas['imagen1'],
                    "imagen2"         => $imagenesGuardadas['imagen2'],
                    "imagen3"         => $imagenesGuardadas['imagen3'],
                    "imagen4"         => $imagenesGuardadas['imagen4'],
                    "pista_unica"     => 0
                ];

                $instalaciones->createPistas($pistaCompleta);
            }



            // Datos generales de la instalación
            $data = [
                "nombre" => $nombre,
                "descripcion" => $descripcion,
                "direccion" => $direccion,
                "categoria_principal" => $categoria,
                "categoria_opcional1" => ($catSecundaria === 0) ? null : $catSecundaria,
                "precio_completo" => ($noPistas || $puedeCompleta) ? $precioCompleto : null,
                "puede_completo" => $puedeCompleta,
                "iluminacion" => $iluminacion, 
                "material" => $material,
                "no_pistas" => $noPistas,
                "tipo_reserva" => $sinHorario,
                "capacidad_completo" => ($noPistas || $puedeCompleta) ? $capacidadCompleta : null
            ];

            $update = $instalaciones->updateInstalacion($id, $data);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 9,
                    "descripcion" => "Modificación de la instalación ". $data['nombre'], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);

            if ($update) {
                echo json_encode([
                    "success" => true,
                    "message" => "La instalación ha sido editada correctamente"
                ]);
                exit;
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "Se ha producido un error a la hora de editar la instalación"
                ]);
                exit;
            }
        }

        // Si no llega ningún POST válido
        echo json_encode([
            "success" => false,
            "message" => "No se recibieron datos válidos"
        ]);
        exit;
    }

    public function mensajeDarBajaInstalacion(){
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();

        if (!empty($post)) {
            $id_instalacion = intval($post["id"]);
            $result = $instalacionesModel->getInstalacion($id_instalacion);
            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "La instalación ha sido dada de baja correctamente",
                    "instalacion" => $result
                ]);
                exit;
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "No se pudo dar de baja la instalación"
                ]);
                exit;
            }
        }

        echo json_encode([
            "success" => false,
            "message" => "No se recibieron datos válidos"
        ]);
        exit;
    }

    public function darBajaInstalacion(){
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();
        $actividadModel = new actividadModel();

        $session = session();

        if (!empty($post)) {
            $id_instalacion = intval($post["id"]);
            $data = [
                "estado" => 1
            ];

            $instalacion = $instalacionesModel->getInstalacion($id_instalacion)[0];

            $result = $instalacionesModel->updateInstalacion($id_instalacion, $data);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 13,
                    "descripcion" => "Baja de la instalación ". $instalacion["nombre"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);

            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "La instalación ha sido dada de baja correctamente"
                ]);
                exit;
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "No se pudo dar de baja la instalación"
                ]);
                exit;
            }
        }

        echo json_encode([
            "success" => false,
            "message" => "No se recibieron datos válidos"
        ]);
        exit;
    }

    public function darAlta() {
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();
        $actividadModel = new actividadModel();

        $session = session();

        if (!empty($post)) {
            $id_instalacion = intval($post["id"]);
            $data = [
                "estado" => 0
            ];

            $instalacion = $instalacionesModel->getInstalacion($id_instalacion)[0];
            
            $result = $instalacionesModel->updateInstalacion($id_instalacion, $data);
            $actividad = $actividadModel->crearActividad([
                    "tipo" => 19,
                    "descripcion" => "Alta de la instalación ". $instalacion["nombre"], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
            ]);
            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "La instalación ha sido dada de alta correctamente"
                ]);
                exit;
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "No se pudo dar de alta la instalación"
                ]);
                exit;
            }
        }
    }

    public function mensajeBorrarInstalacion(){
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();

        if (!empty($post)) {
            $id_instalacion = intval($post["id"]);
            $result = $instalacionesModel->getInstalacion($id_instalacion);
            $pistas = $instalacionesModel->getPistasByInstalacion($id_instalacion);
            if ($result) {
                echo json_encode([
                    "success"     => true,
                    "message"     => "La instalación ha sido encontrada correctamente",
                    "instalacion" => $result,
                    "pistas"      => $pistas,
                    "base_url"    => base_url()
                ]);
                exit;
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "No se pudo encontrar la instalación"
                ]);
                exit;
            }
        }

        echo json_encode([
            "success" => false,
            "message" => "No se recibieron datos válidos"
        ]);
        exit;
    }

    public function borrarInstalacion() {
        $post = $this->request->getPost();
        $instalacionesModel = new instalacionesModel();
        $horariosModel = new horariosModel();
        $reservasModel = new reservasModel();
        $actividadModel = new actividadModel();

        $session = session();

        if (!empty($post)) {
            $id_instalacion = intval($post["id"]);

            $instalacion = $instalacionesModel->getInstalacion($id_instalacion);
            $reservas = $reservasModel->getReservasByInstalacion($id_instalacion);

            $reservas_agrupadas = $this->agruparReservas($reservas);
            foreach($reservas_agrupadas as $reserva_agr){
                $this->enviarEmailAnularActividad($reserva_agr, 'danielruizdeveloper@gmail.com');
            }
        
            // Lo nuevo - 17/03/2026
            $getHorario = $horariosModel->getHorarioByInstalacion($id_instalacion);

            if(count($getHorario) > 0) {

                $pistas = $instalacionesModel->getPistasByInstalacion($id_instalacion);
                
                foreach($pistas as $pista) {
                    $borrarReservas = $reservasModel->anularReservaByPista(intval($pista["id_pista"]));
                    $borrarPedido = $reservasModel->deletePedidoByPista(intval($pista["id_pista"]));
                }

                foreach($getHorario as $horario) {
                    
                    $getFranjasHoraria = $horariosModel->getFranjaHorariaByIdHorarioEInstalacion(intval($horario["id_tipo_horario"]), $id_instalacion);
                    $numero_instalaciones_horario = count($horariosModel->getIdsInstalacionesFromHorario(intval($horario["id_tipo_horario"])));

                    foreach($getFranjasHoraria as $franja){

                        $borrarFranjaDia = $horariosModel->borrarFranjaDia(intval($franja["id_franja_horaria"]));
                        $borrarFranjaHoraria = $horariosModel->borrarFranjaHoraria(intval($franja["id_franja_horaria"]));
                    }
                    
                    $borrarExcepcion = $horariosModel->borrarExcepcion(intval($horario["id_tipo_horario"]), $id_instalacion);
                    if( $numero_instalaciones_horario <= 1) {

                        $borrarHorario = $horariosModel->borrarHorario(intval($horario["id_tipo_horario"]));
                    }
                }
                

            }

            $borrarPistas = $instalacionesModel->borrarPistas($id_instalacion);

            if ($borrarPistas) {
                $result = $instalacionesModel->deleteInstalacion($id_instalacion);
                $actividad = $actividadModel->crearActividad([
                    "tipo" => 8,
                    "descripcion" => "Borrado de la instalación ". $instalacion[0]['nombre'], 
                    "fecha" => date("Y-m-d H:i:s"), 
                    "id_usuario" => $session->get('usuario')["id_usuario"]
                ]);
                if ($result) {
                    echo json_encode([
                        "success" => true,
                        "message" => "La instalación ha sido borrada correctamente"
                    ]);
                    exit;
                } else {
                    echo json_encode([
                        "success" => false,
                        "message" => "No se pudo borrar la instalación"
                    ]);
                    exit;
                }
            }


        }
    }

    public function instalaciones() {
        $instalacionesModel = new instalacionesModel();
        $post  = $this->request->getPost();
        $filter = (!empty($post) && (isset($post["filterInstalaciones"]) && !empty($post["filterInstalaciones"])))? $post["filterInstalaciones"] : null;
        $instalaciones = $instalacionesModel->getInstalaciones($filter);
        $url = base_url(); // ← Aquí está la corrección

        if(!empty($post))
        {
            echo json_encode([
                "instalaciones" => $instalaciones,
                "base_url" => $url
            ]);
            exit;
        }
        
        $numInstalaciones = $instalacionesModel->getNumInstalaciones();
        $instalacionesCategorias = $instalacionesModel->getInstalacionesCategorias();
        $categorias = $instalacionesModel->getCategorias();

        $assets = [
            "css" => [
                'css/instalaciones.css', 
                'css/style.css', 
                'css/responsive.css'
            ], 

            "js" => [
                'js/instalaciones.js',
                'js/movimiento.js'
            ]
        ];

        $modalAnularHoras = view('reservas/modalAnularHoras');
        $modalEditarReservaActividadUsuario = view('actividades/modalEditarReservaActividadUsuario');
           $modalEliminarReservaActividadUsuario = view('actividades/modalEliminarReservaActividadUsuario');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras, 'modalEditarReservaActividadUsuario' => $modalEditarReservaActividadUsuario, "modalEliminarReservaActividadUsuario" => $modalEliminarReservaActividadUsuario]);
        $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

        $view = view('instalaciones/instalaciones', ["instalaciones" => $instalaciones, "numInstalaciones"=>$numInstalaciones, "instalacionesCategorias" => $instalacionesCategorias, "categorias" => $categorias, "baseUrl" => base_url()]);
        return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
    }

    public function instalacion(?int $id_instalacion = null){

        $loginModel = new loginModel();

        if($id_instalacion !== null){
            
            $id = intval($id_instalacion);
            
            $instalacionesModel = new instalacionesModel();
            
            $instalacion = $instalacionesModel->getInstalacion($id)[0];
            $pistas = $instalacionesModel->getPistasByInstalacion($id);

            $usuario = $loginModel->buscaUsuarioPorId(session()->get('usuario')["id_usuario"]);
            

            $assets = [
                "css" => [
                    'css/instalaciones.css', 
                    'css/reservas.css',
                    'css/style.css', 
                    'css/responsive.css'
                ], 

                "js" => [
                    'js/instalaciones.js', 
                    'js/reservas.js', 
                    'js/movimiento.js'
                ]
            ];

            $modalReservaPista = view('instalaciones/modalPanelReserva', ["baseUrl" => base_url(), "instalacion" => $instalacion]);

            $modalAnularHoras = view('reservas/modalAnularHoras');
            $modalEditarReservaActividadUsuario = view('actividades/modalEditarReservaActividadUsuario');
                $modalEliminarReservaActividadUsuario = view('actividades/modalEliminarReservaActividadUsuario');
        $modalMisReservas = view('reservas/modalMisReservas', ["modalAnularHoras" => $modalAnularHoras, 'modalEditarReservaActividadUsuario' => $modalEditarReservaActividadUsuario, "modalEliminarReservaActividadUsuario" => $modalEliminarReservaActividadUsuario]);
            $modalInformacionPersonal = view('usuarios/modalInformacionPersonal');

            $view = view('instalaciones/instalacion', ["instalacion" => $instalacion, "pistas" => $pistas, "usuario" => $usuario, "modalReservaPista" => $modalReservaPista, "baseUrl" => base_url()]);
            return view('plantillas/normal', ["view" => $view, "baseUrl" => base_url(), "assets" => $assets, "modalMisReservas" => $modalMisReservas, "modalInformacionPersonal" => $modalInformacionPersonal]);
        }
        else
        {
            // Aqui va la página de error
        }

    }

    private function agruparReservas(array $rows): array
    {
        $agrupadas = [];

        foreach ($rows as $row) {
            $clave = $row['id_pedido'];

            if (!isset($agrupadas[$clave])) {
                $agrupadas[$clave] = [
                    'id_pedido'  => $row['id_pedido'],
                    'id_usuario' => $row['id_usuario'],
                    'nombre'     => $row['nombre'],
                    'email'      => $row['email'],
                    'fecha'      => $row['fecha'],
                    'horas'      => [],
                    'nombre_instalacion' => $row['nombre_instalacion']
                ];
            }

            $agrupadas[$clave]['horas'][] = $row['hora_inicio'];
        }

        return array_values($agrupadas);
    }

    private function enviarEmailAnularActividad($datos_reserva, $email) {
        try {        
            // Cargar plantilla de email
            $htmlContent = view('plantillas/emailInstalacionEliminada', [
                'datos_reserva' => $datos_reserva
            ]);
            
            // API Key de Resend
            $apiKey = env('RESEND_API_KEY');
            
            $curlData = [
                'from' => 'Ayuntamiento de Fuente de Piedra <noreply@resend.dev>',
                'to' => [$email],
                'subject' => '‼️SE HA ELIMINADO LA INSTALACIÓN DONDE TENÍAS UNA RESERVA',
                'html' => $htmlContent
            ];

            $ch = curl_init('https://api.resend.com/emails');
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json',
            ]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            $response  = curl_exec($ch);
            $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode === 200 || $httpCode === 202) {
                log_message('info', '✅ Email enviado a: ' . $email);
            } else {
                log_message('error', '❌ Error enviando email: ' . $response);
            }
            
        } catch (\Exception $e) {
            log_message('error', '❌ Error email: ' . $e->getMessage());
        }
        
        
        
    }

}
