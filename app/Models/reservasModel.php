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


    public function getInfoPista(int $id_pista, string $fecha)
    {

            $diaSemana = date('N', strtotime($fecha)); // Obtener el día de la semana (1-7)

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las pistas
        $builder = $db->table('pistas');

        // Realizamos la sentencia
        $builder->distinct();
        $builder->select(
            'pistas.*, 
            categorias.nombre AS categoria,
            franjas_horarias.hora_inicio_manana,
            franjas_horarias.hora_fin_manana,
            franjas_horarias.hora_inicio_tarde,
            franjas_horarias.hora_fin_tarde,
            tipo_horario.sin_fecha,'
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

        $builder->join(
            'excepciones_horario',
            $db->escape($fecha) . " BETWEEN excepciones_horario.fecha_inicio AND excepciones_horario.fecha_fin 
     AND excepciones_horario.id_tipo_horario_base = tipo_horario.id_tipo_horario",
            'left'
        );

        $builder->join(
            'tipo_horario AS tipo_horario_excepcion',
            'tipo_horario_excepcion.id_tipo_horario = excepciones_horario.id_tipo_horario_excepcion',
            'left'
        );

        $builder->join(
            'franjas_dias',
            'franjas_dias.id_franja_horaria = franjas_horarias.id_franja_horaria',
            'inner'
        );

        $builder->join(
            'categorias',
            'categorias.id_categoria = instalaciones.categoria_principal',
            'inner'
        );

        // Condición WHERE compleja con escape
        $whereCondition = "(
    (tipo_horario.sin_fecha = 0 
     AND tipo_horario.fecha_inicio <= " . $db->escape($fecha) . " 
     AND tipo_horario.fecha_fin >= " . $db->escape($fecha) . ")
    OR 
    (tipo_horario.sin_fecha = 1 
     AND excepciones_horario.id_excepciones_horario IS NOT NULL
     AND tipo_horario_excepcion.fecha_inicio <= " . $db->escape($fecha) . "
     AND tipo_horario_excepcion.fecha_fin >= " . $db->escape($fecha) . ")
)";

        $builder->where($whereCondition);
        $builder->where('pistas.id_pista', $id_pista);
        $builder->where('franjas_dias.id_dia_semana', $diaSemana);

        // Ejecutamos la consulta
        $query = $builder->get();
        $resultado = $query->getResultArray();
        return $resultado;
    }


    public function hayReserva (int $id_pista, string $fecha, string $hora){

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas');

        // Hacemos la sentencia
        $builder->select();
        $builder->where('id_pista', $id_pista);
        $builder->where('fecha', $fecha); 
        $builder->where('hora_inicio', $hora);

        // Obtenemos el resultado
        $query = $builder->get();

        // Obtenemos el resultado
        $result = $query->getResultArray();

        return $result;

    }

    public function hacerReserva(array $data){
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas');

        // Hacemos la sentencia 
        $builder->insert($data);

        return $db->insertID();
    }

    public function reservasById(int $id_pista, string $fecha){
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas');

        $builder->select();
        $builder->where("id_pista", $id_pista);
        $builder->where("fecha", $fecha);

        $query = $builder->get();
        return $query->getResultArray();
    }


    public function hacerPedido(array $data) {
                
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('pedido');

        // Hacemos la sentencia 
        $builder->insert($data);

        return $db->insertID();
    }


    public function pedidosFromDate(string $date) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('pedido');

        $builder->select();
        $builder->where('fecha_pedido', $date);
        
        $query = $builder->get();
        return $query->getResultArray();
    }


    public function getFullReservasFromPedido(int $id_pedido){

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal 'pedido'
        $builder = $db->table('pedido');

        // Seleccionamos los campos que necesitamos
        $builder->select('
            reservas.fecha AS fecha_reserva,
            reservas.hora_inicio,
            reservas.hora_final,
            pistas.imagen1,
            pistas.capacidad_pista,
            pistas.nombre_pista,
            pistas.precio_pista,
            instalaciones.nombre,
            instalaciones.direccion,
            instalaciones.material,
            instalaciones.iluminacion,
            categorias.nombre AS categoria
        ');

        // Hacemos los joins necesarios
        $builder->join('reservas', 'reservas.id_pedido = pedido.id_pedido');
        $builder->join('pistas', 'pistas.id_pista = reservas.id_pista');
        $builder->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion');
        $builder->join('categorias', 'categorias.id_categoria = instalaciones.categoria_principal');

        $builder->where('reservas.id_pedido', $id_pedido);

        $builder->orderBy('reservas.fecha');

        $query = $builder->get();
        return $query->getResultArray();
    }


    public function getPedidoFromId(int $id_pedido) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal 'pedido'
        $builder = $db->table('pedido');

        $builder->select();
        
        $builder->where("id_pedido", $id_pedido);

        $query = $builder->get();
        
        return $query->getResultArray(); 

    }
}
