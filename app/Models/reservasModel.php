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

    protected $allowedFields = ['id_reserva', 'id_pista', 'id_usuario', 'fecha', 'hora_inicio', 'hora_final', 'fecha_reserva', 'precio_reserva', 'created_at', 'updated_at', 'deleted_at'];

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

        $builder->distinct();
        $builder->select(
            'pistas.*, 
        categorias.nombre AS categoria,
        franjas_horarias.hora_inicio_manana,
        franjas_horarias.hora_fin_manana,
        franjas_horarias.hora_inicio_tarde,
        franjas_horarias.hora_fin_tarde,
        tipo_horario.sin_fecha,
        instalaciones.estado'
        );

        $builder->join(
            'instalaciones',
            'instalaciones.id_instalacion = pistas.id_instalacion',
            'inner'
        );

        // CAMBIO A LEFT JOIN
        $builder->join(
            'franjas_horarias',
            'franjas_horarias.id_instalacion = instalaciones.id_instalacion',
            'left'
        );

        // CAMBIO A LEFT JOIN
        $builder->join(
            'tipo_horario',
            'tipo_horario.id_tipo_horario = franjas_horarias.id_tipo_horario',
            'left'
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

        // CAMBIO A LEFT JOIN
        $builder->join(
            'franjas_dias',
            'franjas_dias.id_franja_horaria = franjas_horarias.id_franja_horaria',
            'left'
        );

        $builder->join(
            'categorias',
            'categorias.id_categoria = instalaciones.categoria_principal',
            'inner'
        );

        // Condición WHERE adaptada para permitir NULL
        $whereCondition = "(
        tipo_horario.id_tipo_horario IS NULL
        OR
        (
            tipo_horario.sin_fecha = 0 
            AND tipo_horario.fecha_inicio <= " . $db->escape($fecha) . " 
            AND tipo_horario.fecha_fin >= " . $db->escape($fecha) . "
        )
        OR 
        (
            tipo_horario.sin_fecha = 1 
            AND excepciones_horario.id_excepciones_horario IS NOT NULL
            AND tipo_horario_excepcion.fecha_inicio <= " . $db->escape($fecha) . "
            AND tipo_horario_excepcion.fecha_fin >= " . $db->escape($fecha) . "
        )
    )";

        $builder->where($whereCondition);

        $builder->where('pistas.id_pista', $id_pista);

        // Permitimos NULL si no hay franjas
        $builder->groupStart()
            ->where('franjas_dias.id_dia_semana', $diaSemana)
            ->orWhere('franjas_dias.id_dia_semana IS NULL', null, false)
            ->groupEnd();

        // Ejecutamos la consulta
        $query = $builder->get();
        $resultado = $query->getResultArray();
        return $resultado;
    }


    public function hayReserva(int $id_pista, string $fecha, string $hora)
    {

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

    public function hacerReserva(array $data)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas');

        // Hacemos la sentencia 
        $builder->insert($data);

        return $db->insertID();
    }

    public function reservasById(int $id_pista, string $fecha)
    {

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

    public function hacerPedido(array $data)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('pedido');

        // Hacemos la sentencia 
        $builder->insert($data);

        return $db->insertID();
    }

    public function pedidosFromDate(string $date)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('pedido');

        $builder->select();
        $builder->where('fecha_pedido', $date);

        $query = $builder->get();
        return $query->getResultArray();
    }

    public function getFullReservasFromPedido(int $id_pedido)
    {

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
            instalaciones.tipo_reserva,
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

    public function getFullReservasFromPedidoAnular(int $id_pedido, string $hora_inicio)
    {

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
            instalaciones.tipo_reserva,
            categorias.nombre AS categoria
        ');

        // Hacemos los joins necesarios
        $builder->join('reservas', 'reservas.id_pedido = pedido.id_pedido');
        $builder->join('pistas', 'pistas.id_pista = reservas.id_pista');
        $builder->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion');
        $builder->join('categorias', 'categorias.id_categoria = instalaciones.categoria_principal');

        $builder->where('reservas.id_pedido', $id_pedido);
        $builder->where('reservas.hora_inicio', $hora_inicio.":00");

        $builder->orderBy('reservas.fecha');

        $query = $builder->get();
        return $query->getResultArray();
    }

    public function getPedidoFromId(int $id_pedido)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal 'pedido'
        $builder = $db->table('pedido');

        $builder->select();

        $builder->where("id_pedido", $id_pedido);

        $query = $builder->get();

        return $query->getResultArray();
    }

    public function getReservasByUsuario(int $id_usuario)
    {
        $fechaActual = date('Y-m-d');

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Subconsulta para obtener los id_pedido
        $subquery = $db->table('pedido')
            ->distinct()
            ->select('pedido.id_pedido')
            ->join('reservas', 'reservas.id_pedido = pedido.id_pedido', 'inner')
            ->where('reservas.fecha >=', $fechaActual)
            ->where('pedido.id_usuario', $id_usuario)
            ->getCompiledSelect();

        // Construcción de la query principal
        $builder = $db->table('reservas');

        $builder->select('
            reservas.*,
            pistas.nombre_pista,
            pistas.imagen1,
            pistas.capacidad_pista,
            categorias.nombre AS categoria,
            instalaciones.tipo_reserva,
            instalaciones.iluminacion, 
            instalaciones.material, 
            pedido.precio_pedido
        ')
            ->join('pistas', 'pistas.id_pista = reservas.id_pista', 'inner')
            ->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion', 'inner')
            ->join('categorias', 'categorias.id_categoria = instalaciones.categoria_principal', 'inner')
            ->join('pedido', 'pedido.id_pedido = reservas.id_pedido', 'inner')
            ->where("reservas.id_pedido IN ($subquery)", null, false)
            ->orderBy('reservas.fecha', 'ASC');

        return $builder->get()->getResultArray();
    }

    public function getTodasReservasByUsuario(int $id_usuario)
    {

        $fechaActual = date('Y-m-d');

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query principal
        $builder = $db->table('reservas');

        $builder->select('
            reservas.*,
            pistas.nombre_pista,
            pistas.imagen1,
            pistas.capacidad_pista,
            categorias.nombre AS categoria,
            instalaciones.tipo_reserva,
            instalaciones.iluminacion, 
            instalaciones.material, 
            pedido.precio_pedido
        ')
            ->join('pistas', 'pistas.id_pista = reservas.id_pista', 'inner')
            ->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion', 'inner')
            ->join('categorias', 'categorias.id_categoria = instalaciones.categoria_principal', 'inner')
            ->join('pedido', 'pedido.id_pedido = reservas.id_pedido', 'inner')
            ->where("reservas.id_usuario", $id_usuario)
            ->orderBy('reservas.fecha', 'ASC');

        return $builder->get()->getResultArray();
    }

    public function anularReservaByHourAndDate(string $fecha, string $hora, int $id_pedido)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->where('fecha', $fecha)
            ->where('hora_inicio', $hora)
            ->where('id_pedido', $id_pedido);

        return $builder->delete();
    }

    public function anularPedido(int $id_pedido)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular el pedido
        $builder = $db->table('pedido');

        $builder->where('id_pedido', $id_pedido);

        return $builder->delete();
    }

    public function numReservasFromPedido(int $id_pedido)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query
        $builder = $db->table('reservas');

        $builder->join('pedido', 'pedido.id_pedido = reservas.id_pedido', 'inner');
        $builder->where('pedido.id_pedido', $id_pedido);

        return count($builder->get()->getResultArray());
    }

    public function anularReservasByPedido(int $id_pedido)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->where('id_pedido', $id_pedido);

        return $builder->delete();
    }

    public function getReservasByFecha(string $fecha)
    {
        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción del query builder
        $builder = $db->table('reservas');

        $builder->select('
        pistas.nombre_pista,
        pistas.imagen1,
        pistas.capacidad_pista,
        pistas.precio_pista,
        usuarios.nombre AS nombre_usuario,
        usuarios.email,
        usuarios.telf,
        pedido.id_pedido,   
        pedido.fecha_pedido,
        pedido.num_pedido,
        pedido.precio_pedido,
        categorias.nombre AS categoria,
        instalaciones.nombre as nombre_instalacion, 
        instalaciones.direccion,
        instalaciones.material,
        instalaciones.iluminacion,
        instalaciones.tipo_reserva,
        reservas.id_reserva,
        reservas.fecha,
        reservas.hora_inicio,
        reservas.hora_final, 
        reservas.pagadas
        ');

        $builder->join('pedido', 'pedido.id_pedido = reservas.id_pedido');
        $builder->join('usuarios', 'usuarios.id_usuario = pedido.id_usuario');
        $builder->join('pistas', 'pistas.id_pista = reservas.id_pista');
        $builder->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion');
        $builder->join('categorias', 'categorias.id_categoria = instalaciones.categoria_principal');

        $builder->where('reservas.fecha', $fecha);



        return $builder->get()->getResultArray(); // Devuelve un array de objetos
    }

    public function getReservaById(int $id_reserva)
    {
        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción del query builder
        $builder = $db->table('reservas');

        $builder->select('
        pistas.id_pista,
        pistas.nombre_pista,
        pistas.id_pista,
        pistas.imagen1,
        pistas.capacidad_pista,
        pistas.precio_pista,
        usuarios.nombre AS nombre_usuario,
        usuarios.email,
        usuarios.telf,
        pedido.id_pedido,   
        pedido.fecha_pedido,
        pedido.num_pedido,
        pedido.precio_pedido,
        categorias.nombre AS categoria,
        instalaciones.nombre as nombre_instalacion, 
        instalaciones.direccion,
        instalaciones.material,
        instalaciones.iluminacion,
        instalaciones.tipo_reserva,
        reservas.id_reserva,
        reservas.fecha,
        reservas.hora_inicio,
        reservas.hora_final, 
        reservas.pagadas, 
        reservas.precio_reserva
        ');

        $builder->join('pedido', 'pedido.id_pedido = reservas.id_pedido');
        $builder->join('usuarios', 'usuarios.id_usuario = pedido.id_usuario');
        $builder->join('pistas', 'pistas.id_pista = reservas.id_pista');
        $builder->join('instalaciones', 'instalaciones.id_instalacion = pistas.id_instalacion');
        $builder->join('categorias', 'categorias.id_categoria = instalaciones.categoria_principal');

        $builder->where('reservas.id_reserva', $id_reserva);



        return $builder->get()->getResultArray(); // Devuelve un array de objetos
    }

    public function getReservasByMonthAndYear(int $mes, int $year)
    {

        $mes++;

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción del query builder
        $builder = $db->table('reservas');

        $builder->distinct();
        $builder->select('fecha');
        $builder->where('fecha >= ', $year . "-" . $mes . "-01");
        $builder->where('fecha < ', $year . "-" . ($mes + 1) . "-01");

        return $builder->get()->getResultArray();
    }

    public function anularReservaById(int $id_reserva)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->where('id_reserva', $id_reserva);

        return $builder->delete();
    }

    public function getDateReserva(int $id_reserva)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->select('fecha');
        $builder->where('id_reserva', $id_reserva);

        return $builder->get()->getResultArray();
    }

    public function getUsuarioReserva(int $id_reserva)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->select('id_usuario');
        $builder->where('id_reserva', $id_reserva);

        return $builder->get()->getResultArray();
    }

    public function getReservasByDate(string $date)
    {
        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->select();
        $builder->where('fecha', $date);

        return $builder->get()->getResultArray();
    }

    public function getReservasPagadasByDate(string $date)
    {
        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->select();
        $builder->where('fecha', $date);
        $builder->where('pagadas', 1);

        return $builder->get()->getResultArray();
    }

    public function getReservasNoPagadasByDate(string $date)
    {
        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para anular la reserva
        $builder = $db->table('reservas');

        $builder->select();
        $builder->where('fecha', $date);
        $builder->where('pagadas', 0);

        return $builder->get()->getResultArray();
    }

    public function setPagadas(int $id_reserva, int $estadoPago)
    {

        // Conexión a la BD
        $db = \Config\Database::connect('BDReservalo2');

        // Construcción de la query para actualizar el estado de pago
        $builder = $db->table('reservas');

        // Validar que el estado sea 0 o 1
        if ($estadoPago !== 0 && $estadoPago !== 1) {
            return false;
        }

        // Actualizar el campo pagadas
        $builder->where('id_reserva', $id_reserva);
        $builder->set('pagadas', $estadoPago);

        return $builder->update();
    }

    public function hacerPago(array $data)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('pagos');

        // Hacemos la sentencia 
        $builder->insert($data);

        return $db->insertID();
    }

    public function deshacerPago(int $id_reserva)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('pagos');

        $builder->where("id_reserva", $id_reserva);
        return $builder->delete();
    }

    public function getReservasByPedido(int $id_pedido)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas');

        $builder->select()->where('id_pedido', $id_pedido);

        return $builder->get()->getResultArray();
    }

    public function getAllReservasById(int $id_pista)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas');

        $builder->select()->where('id_pista', $id_pista);

        return $builder->get()->getResultArray();
    }

    public function getAllReservas()
    {

        $db = \Config\Database::connect('BDReservalo2');

        $builder = $db->table('instalaciones');

        $builder->select(
            "instalaciones.nombre,
            categorias.nombre AS categoria,
            instalaciones.estado,
            COUNT(reservas.id_reserva) AS reservas"
        );

        $builder->join(
            'pistas',
            'pistas.id_instalacion = instalaciones.id_instalacion',
            'inner'
        );

        $builder->join(
            'reservas',
            'reservas.id_pista = pistas.id_pista',
            'left'
        );

        $builder->join(
            'categorias',
            'categorias.id_categoria = instalaciones.categoria_principal',
            'inner'
        );

        $builder->groupBy('instalaciones.id_instalacion');

        $query = $builder->get();
        $resultado = $query->getResultArray();

        return $resultado;
    }

    public function getReservasMes()
    {
            $db = \Config\Database::connect('BDReservalo2');

            $anio = date('Y');

            $sql = "
            SELECT 
                COUNT(r.fecha_reserva) AS total
            FROM (
                SELECT 1 AS mes UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
                UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
                UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
            ) AS meses
            LEFT JOIN reservas r 
                ON MONTH(r.fecha_reserva) = meses.mes
                AND YEAR(r.fecha_reserva) = ?
            GROUP BY meses.mes
            ORDER BY meses.mes
        ";

            $resultado = $db->query($sql, [$anio])->getResultArray();

            return array_column($resultado, 'total');
    }

    public function getReservasCategorias() {
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Tabla principal
        $builder = $db->table('categorias');

        $builder->select("COUNT(reservas.id_reserva) AS reservas");

        $builder->join('instalaciones', 'instalaciones.categoria_principal = categorias.id_categoria', 'left');
        $builder->join('pistas', 'pistas.id_instalacion = instalaciones.id_instalacion', 'left');
        $builder->join('reservas', 'reservas.id_pista = pistas.id_pista', 'left');

        $builder->groupBy('categorias.id_categoria');

        return $builder->get()->getResultArray();
    }

    public function deletePedidoByPista($id_pista) {
        $db = \Config\Database::connect('BDReservalo2');

        // Primero obtenemos los ids de pedido relacionados con la pista
        $builder = $db->table('reservas');
        $builder->select('id_pedido');
        $builder->where('id_pista', $id_pista);
        $ids = array_column($builder->get()->getResultArray(), 'id_pedido');

        // Luego borramos los pedidos con esos ids
        if (!empty($ids)) {
            $db->table('pedido')->whereIn('id_pedido', $ids)->delete();
        }

        return true;
    }

    public function anularReservaByPista (int $id_pista) {
        
        // Conexión a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Tabla principal
        $builder = $db->table('reservas');
        $builder->where('id_pista', $id_pista)->delete(); 
        
        return true;
    }
}
