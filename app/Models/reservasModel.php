<?php

namespace App\Models;

use CodeIgniter\Model;

class reservasModel extends Model
{

    protected $table = 'reservas';
    protected $primaryKey = 'id_reserva';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_reserva', 'id_pista', 'id_usuario', 'fecha', 'hora_inicio', 'hora_final', 'fecha_reserva', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';


    public function getInfoPista(int $id_pista, string $fecha) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las pistas
        $builder = $db->table('pistas');

        // Realizamos la sentencia
        $builder->distinct();
        $builder->select(
            'pistas.*, 
            franjas_horarias.hora_inicio_manana,
            franjas_horarias.hora_fin_manana,
            franjas_horarias.hora_inicio_tarde,
            franjas_horarias.hora_fin_tarde'
        );

        $builder->join(
            'instalaciones',
            'instalaciones.id_instalacion = pistas.id_instalacion',
            'inner'
        );

        $builder->join(
            'franjas_horarias',
            'franjas_horarias.id_instalacion = instalaciones.id_instalacion',
            'inner'
        );

        $builder->join(
            'tipo_horario',
            'tipo_horario.id_tipo_horario = franjas_horarias.id_tipo_horario',
            'inner'
        );

        $builder->where('tipo_horario.fecha_inicio <=', $fecha);
        $builder->where('tipo_horario.fecha_fin >=', $fecha);
        $builder->where('pistas.id_pista', $id_pista);

        // Ejecutamos la consulta
        $query = $builder->get();
        $resultado = $query->getResultArray();
        return $resultado;
    }
}