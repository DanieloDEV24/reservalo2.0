<?php

namespace App\Models;

use CodeIgniter\Model;

class horasModel extends Model
{

    protected $table = 'horas_pistas';
    protected $primaryKey = 'id_hora_pista';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_hora_pista', 'id_pista', 'id_tipo_horario', 'id_franja_dia', 'hora_inicio', 'hora_fin', 'fecha', 'reservada', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

  
    // public function crearHora() {


    // }
}