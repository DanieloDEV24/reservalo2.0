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
        $builder = $db->table('franjas_dias');

        // Creamos el horario
        $query = $builder->select('franjas_horarias.id_franja_horaria,
                                   franjas_horarias.id_tipo_horario,
                                   franjas_horarias.id_instalacion,
                                   franjas_horarias.hora_inicio_manana,
                                   franjas_horarias.hora_fin_manana,
                                   franjas_horarias.hora_inicio_tarde,
                                   franjas_horarias.hora_fin_tarde,
                                   franjas_horarias.franja_unica,
                                   franjas_dias.id_dia_semana')
                         ->join('franjas_horarias', 'franjas_dias.id_franja_horaria = franjas_horarias.id_franja_horaria')
                         ->where('id_tipo_horario', $id_horario)
                         ->get();

        return $query->getResultArray();
    }


    public function actualizarHorario(array $data, int $id_horario){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        // Actualizamos el horario
        $builder->where('id_tipo_horario', $id_horario);
        $builder->update($data);

        return true;
    }

    
}