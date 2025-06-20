<?php

namespace App\Models;

use CodeIgniter\Model;

class instalacionesModel extends Model
{

    protected $table = 'tb_instalaciones';
    protected $primaryKey = 'id_instalaciones';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_instalaciones', 'id_deporte', 'nombre', 'descripcion', 'portada', 'img1', 'img2', 'img3', 'precio', 'capacidad' ];

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
        $builder = $db->table('tb_instalaciones');

        //Realizamos la consulta
        $query = $builder->select('tb_instalaciones.*, deportes.nombre as deporte')
        ->join('deportes', 'tb_instalaciones.id_deporte = deportes.id_deporte')
        ->get();

        $result =  $result = $query->getResultArray();
        return $result;
    }

    public function getDeportes() 
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('deportes');

        $query = $builder->select()->get();

        $result =  $result = $query->getResultArray();
        return $result;
    }

    public function createInstalacion(array $data)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('deportes');

        $builder->insert($data);

        return $db->insertID();
    }

}