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

    public function getInstalaciones()
    {

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('instalaciones');

        //Realizamos la consulta
        $query = $builder->select('instalaciones.*, categorias1.nombre as categoria_name, categorias2.nombre as categoria_opc_name')
        ->join('categorias as categorias1', 'instalaciones.categoria_principal = categorias1.id_categoria', 'left')
        ->join('categorias as categorias2', 'instalaciones.categoria_opcional1 = categorias2.id_categoria', 'left')
        ->get();

        $result =  $result = $query->getResultArray();
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

    public function getInstalacionesHome ()
    {
       // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        $builder = $db->table('instalaciones');

        $builder->select('instalaciones.*, c1.nombre AS categoria_principal, c2.nombre AS categoria_secundaria, p.*');
        $builder->join('categorias c1', 'instalaciones.categoria_principal = c1.id_categoria', 'inner');
        $builder->join('categorias c2', 'instalaciones.categoria_opcional1 = c2.id_categoria', 'left'); // LEFT JOIN
        $builder->join('pistas p', 'instalaciones.id_instalacion = p.id_instalacion', 'inner');
        $builder->limit(3);

        $query = $builder->get();
        $result = $query->getResultArray(); // devuelve array de arrays

        return $result;
    }

}