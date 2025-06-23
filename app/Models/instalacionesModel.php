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

    protected $allowedFields = ['id_instalacion', 'nombre', 'descripcion', 'categoria_principal', 'categoria_opcional1', 'puede_completo', 'precio_completo'];

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
        $query = $builder->select('instalaciones.*, categorias.nombre as categoria')
        ->join('categorias', 'instalaciones.categoria_principal = categorias.id_categoria')
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

}