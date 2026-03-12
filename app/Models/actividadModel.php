<?php

namespace App\Models;

use CodeIgniter\Model;

class actividadModel extends Model
{

    protected $table = 'actividad';
    protected $primaryKey = 'id_actividad';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_actividad', 'tipo', 'descripcion', 'fecha', 'id_usuario', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';


    public function crearActividad(array $data) {

        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('actividad');

        $builder->insert($data);

        return $db->insertID();
    }

    public function getAllActividades() {
        
        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('actividad');

        $builder->select('actividad.*, leyenda_actividad.color');
        $builder->join('tipo_actividad', 'tipo_actividad.id_tipo_actividad = actividad.tipo');
        $builder->join('leyenda_actividad', 'leyenda_actividad.id_leyenda_actividad = tipo_actividad.tipo_reserva');
        $builder->orderBy('fecha', 'DESC'); 

        return $builder->get()->getResultArray();
    }
}