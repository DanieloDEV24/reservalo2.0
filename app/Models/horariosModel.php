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


    public function crearFranjaHoraria(array $data){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('franjas_horarias');

        // Creamos el horario
        $builder->insert($data);

        // Devolvemos el id del horario
        return $db->insertID();
    }


    public function crearFranjaDia(array $data){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('franjas_dias');

        // Creamos el horario
        $builder->insert($data);

        // Devolvemos el id del horario
        return $db->insertID();
    }

    public function comprobarHorarios(){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        // Creamos el horario
        $query = $builder->select()->get();

        return $query->getResultArray();
    }


    public function getHorario(int $id_horario){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        // Creamos el horario
        $query = $builder->select()->where('id_tipo_horario', $id_horario)->get();

        return $query->getResultArray();
    }

    
    public function getFranjaByIdHorario(int $id_horario){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('franjas_horarias');

        // Creamos el horario
        $query = $builder->select()->where('id_tipo_horario', $id_horario)->get();

        return $query->getResultArray();
    }
}