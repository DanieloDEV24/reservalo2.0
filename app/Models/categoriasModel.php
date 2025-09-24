<?php

namespace App\Models;

use CodeIgniter\Model;

class categoriasModel extends Model
{

    protected $table = 'categorias';
    protected $primaryKey = 'id_categoria';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_categoria', 'nombre', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

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

}