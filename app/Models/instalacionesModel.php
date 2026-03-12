<?php

namespace App\Models;

use CodeIgniter\Model;

class instalacionesModel extends Model
{

    protected $table = 'instalaciones';
    protected $primaryKey = 'id_instalacion';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_instalacion', 'nombre', 'descripcion', 'categoria_principal', 'categoria_opcional1', 'puede_completo', 'precio_completo', 'no_pistas', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

  public function getInstalaciones(?array $filter)
{
    $db = \Config\Database::connect('BDReservalo2');
    //Obtenemos la tabla en la que vamos a buscar a los usuarios
    $builder = $db->table('instalaciones');
    //Realizamos la consulta
    $query = $builder->select('instalaciones.*,
                            categorias1.nombre as categoria_name,
                            categorias2.nombre as categoria_opc_name,
                            (SELECT imagen1 FROM pistas
                            WHERE pistas.id_instalacion = instalaciones.id_instalacion
                            ORDER BY id_pista ASC LIMIT 1) as imagen1')
        ->join('categorias as categorias1', 'instalaciones.categoria_principal = categorias1.id_categoria', 'left')
        ->join('categorias as categorias2', 'instalaciones.categoria_opcional1 = categorias2.id_categoria', 'left');
        
    if($filter !== null)
    {
        foreach($filter as $campo => $valor)
        {
            if ($campo === "categoria") {
                // Buscar en categoría principal o secundaria
                $query->groupStart()
                      ->like('instalaciones.categoria_principal', $valor)
                      ->orLike('instalaciones.categoria_opcional1', $valor)
                      ->groupEnd();
            } else {
                // Otros filtros normales
                $query->like("instalaciones.".$campo, $valor);
            }
        }
    }
    $result = $query->get()->getResultArray();
    return $result;
}


    public function getCategorias() 
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('categorias');

        $query = $builder->select()->get();

        $result =  $result = $query->getResultArray();
        return $result;
    }

    public function createInstalacion(array $data)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('instalaciones');

        $builder->insert($data);

        return $db->insertID();
    }

    public function createPistas (array $data)
    {
         //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('pistas');

        $builder->insert($data);

        return $db->insertID();
    }

    public function getInstalacion(int $id)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('instalaciones');

        $query = $builder->select('instalaciones.*, categorias1.nombre as categoria_name, categorias2.nombre as categoria_opc_name')
        ->join('categorias as categorias1', 'instalaciones.categoria_principal = categorias1.id_categoria', 'left')
        ->join('categorias as categorias2', 'instalaciones.categoria_opcional1 = categorias2.id_categoria', 'left')
        ->where('id_instalacion', $id)
        ->get();

        $result = $query->getResultArray();
        return $result;
    }


    public function getPistasByInstalacion(int $id_instalacion)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('pistas');

        $query = $builder->select()->where('id_instalacion', $id_instalacion)->get();

        $result = $query->getResultArray();
        return $result;
    }

    public function getPistasById(int $id_pista)
    {
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Tabla principal
        $builder = $db->table('pistas');

        $query = $builder
            ->select('pistas.*, instalaciones.estado')
            ->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion', 'inner')
            ->where('pistas.id_pista', $id_pista)
            ->get();

        $result = $query->getResultArray();
        return $result;
    }

    public function getInstalacionesHome ()
    {
       // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        $builder = $db->table('instalaciones');

        $query = $builder->select('instalaciones.*,
                            categorias1.nombre as categoria_name,
                            categorias2.nombre as categoria_opc_name,
                            (SELECT imagen1 FROM pistas
                            WHERE pistas.id_instalacion = instalaciones.id_instalacion
                            ORDER BY id_pista ASC LIMIT 1) as imagen1')
        ->join('categorias as categorias1', 'instalaciones.categoria_principal = categorias1.id_categoria', 'left')
        ->join('categorias as categorias2', 'instalaciones.categoria_opcional1 = categorias2.id_categoria', 'left');
        $builder->limit(3);

        $query = $builder->get();
        $result = $query->getResultArray(); // devuelve array de arrays

        return $result;
    }

    public function updatePista(int $id_pista, array $data)
    {
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Tabla a actualizar
        $builder = $db->table('pistas');

        // Aplicar condición
        $builder->where('id_pista', $id_pista);

        // Ejecutar update
        $builder->update($data);

        // Retornar true si se afectó alguna fila
        return $db->affectedRows() > 0;
    }

    public function getPistas()
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('pistas');

        $query = $builder->select()->get();

        $result = $query->getResultArray();
        return $result;
    }


    public function borrarPista($id_pista)
    {
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Seleccionamos la tabla
        $builder = $db->table('pistas');

        // Borramos el registro cuyo id coincida
        $builder->where('id_pista', $id_pista);
        $builder->delete();

        // Puedes devolver true/false según si se borró algo
        return $db->affectedRows() > 0;
    }


    public function updateInstalacion(int $id, array $data)
    {
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Tabla a actualizar
        $builder = $db->table('instalaciones');

        // Aplicar condición
        $builder->where('id_instalacion', $id);

        // Ejecutar update
        $builder->update($data);

        // Retornar true si se afectó alguna fila
        return $db->affectedRows() > 0;
    }

    public function borrarPistas(int $id_instalacion)
    {
        $db = \Config\Database::connect('BDReservalo2');

        // Tabla a borrar
        $builder = $db->table('pistas');

        // Aplicar condición
        $builder->where('id_instalacion', $id_instalacion);

        // Ejecutar delete
        $builder->delete();

        // Retornar true si se afectó alguna fila
        return $db->affectedRows() > 0;
    }


    public function getLastIdPistas() 
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('pistas');

        $query = $builder->selectMax('id_pista')->get();

        $result = $query->getResultArray();
        return $result;
    }

    public function deleteInstalacion(int $id)
    {
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Seleccionamos la tabla
        $builder = $db->table('instalaciones');

        // Borramos el registro cuyo id coincida
        $builder->where('id_instalacion', $id);
        $builder->delete();

        // Puedes devolver true/false según si se borró algo
        return $db->affectedRows() > 0;
    }


    public function getNumInstalaciones() {
        
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Seleccionamos la tabla
        $builder = $db->table('instalaciones');

        $query = $builder->countAllResults();

        $result = $query;
        return $result;
    }


    public function getInstalacionesCategorias()
    {
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Seleccionamos la tabla
        $builder = $db->table('categorias');

        $query = $builder->select('categorias.nombre, COUNT(instalaciones.id_instalacion) AS num_instalaciones')
                         ->join('instalaciones', 'categorias.id_categoria = instalaciones.categoria_principal', 'left')
                         ->groupBy('categorias.nombre')
                         ->orderBy('num_instalaciones', 'DESC')
                         ->limit(3)
                         ->get();
        
        $result = $query->getResultArray();
        return $result;
    }


    public function getReservasInstalacionSolo()
    {
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Seleccionamos la tabla
        $builder = $db->table('reservas');

        $query = $builder->select('reservas.fecha')
                        ->join('pistas', 'pistas.id_pista = reservas.id_pista')
                        ->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion')
                        ->where('instalaciones.id_instalacion', 51)
                        ->where('instalaciones.tipo_reserva', 1)
                        ->get();
        
        $result = $query->getResultArray();
        return $result;
    }
}