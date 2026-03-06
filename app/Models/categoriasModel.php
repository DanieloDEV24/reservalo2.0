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

    public function getFullCategorias() {
        
        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('categorias');

        $builder->select('categorias.*, COUNT(DISTINCT i1.id_instalacion) AS instalaciones_principal, COUNT(DISTINCT i2.id_instalacion) AS instalaciones_secundaria, COUNT(DISTINCT i1.id_instalacion) + COUNT(DISTINCT i2.id_instalacion) AS total_instalaciones');
        $builder->join('instalaciones i1', 'i1.categoria_principal = categorias.id_categoria', 'left');
        $builder->join('instalaciones i2', 'i2.categoria_opcional1 = categorias.id_categoria', 'left');
        $builder->groupBy('categorias.id_categoria');

        $query = $builder->get();
        return $query->getResultArray();
    }

    public function getCategoria(int $id_categoria) {

        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('categorias');

        $builder->select()->where('id_categoria', $id_categoria);
        
        return $builder->get()->getResultArray(); 
    }

    public function updateCategoria(int $id_categoria, string $nombre) {

        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('categorias');

        $builder->where('id_categoria', $id_categoria);
        $builder->set('nombre', $nombre);
        $builder->update();
        
    }

}