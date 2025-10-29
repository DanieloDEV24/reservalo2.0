<?php

namespace App\Models;

use CodeIgniter\Model;

class horariosModel extends Model
{

    protected $table = 'tipo_horario';
    protected $primaryKey = 'id_tipo_horario';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_tipo_horario', 'nombre', 'descripcion', 'color', 'fecha_inicio', 'fecha_final', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

  
    public function crearHorario(array $data){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        // Creamos el horario
        $builder->insert($data);

        // Devolvemos el id del horario
        return $db->insertID();
    }
}