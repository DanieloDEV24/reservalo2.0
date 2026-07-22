<?php

namespace App\Models;

use CodeIgniter\Model;

class actividadesModel extends Model
{

    protected $table = 'actividades';
    protected $primaryKey = 'id_actividades';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_actividades', 'nombre', 'fecha_actividad', 'hora_actividad', 'fecha_lanzamiento', 'fecha_limite', 'hora_limite', 'descripcion', 'tiene_aforo', 'aforo', 'tiene_precio', 'precio', 'estado', 'lugar', 'imagen', 'duracion', 'tipo_actividad', 'plazas_ocupadas', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';


    public function getActividades() {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('actividades');

        // Select con los campos y agregaciones
        $builder->select('actividades.*, tipos_actividades.nombre as categoria_actividad');
        $builder->join('tipos_actividades', 'tipos_actividades.id_tipos_actividades = actividades.tipo_actividad');
        $query = $builder->get();

        return $query->getResultArray();
    }


    public function crearTipoActividad(string $nombre) {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('tipos_actividades');

        // Insertamos el nuevo tipo de actividad
        $builder->insert(['nombre' => $nombre]);

        return $db->insertID();
    }


    public function getTiposActividades() {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('tipos_actividades');

        // Select con los campos y agregaciones
        $builder->select();
        $query = $builder->get();

        return $query->getResultArray();
    }

    public function getTipoActividad(int $id_tipo_actividad) {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('tipos_actividades');

        // Select con los campos y agregaciones
        $builder->select();
        $builder->where('id_tipos_actividades', $id_tipo_actividad);
        $query = $builder->get();

        return $query->getResultArray();
    }

    public function editarTipoActividad(int $id_tipo_actividad, string $nombre) {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('tipos_actividades');

        // Actualizamos el tipo de actividad
        $builder->where('id_tipos_actividades', $id_tipo_actividad);
        $builder->update(['nombre' => $nombre]);

        return true;
    }

    public function getTiposActividadesConTotal() {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('tipos_actividades');

        // Seleccionamos los tipos de actividad junto al total de actividades asociadas
        $builder->select('tipos_actividades.*, COUNT(actividades.id_actividades) AS total_actividades');
        $builder->join('actividades', 'actividades.tipo_actividad = tipos_actividades.id_tipos_actividades', 'left');
        $builder->groupBy('tipos_actividades.id_tipos_actividades');
        $builder->orderBy('tipos_actividades.nombre', 'ASC');

        $query = $builder->get();

        return $query->getResultArray();
    }

    public function eliminarTipoActividad(int $id_tipo_actividad) {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('tipos_actividades');

        // Eliminamos el tipo de actividad
        $builder->where('id_tipos_actividades', $id_tipo_actividad);
        $builder->delete();

        return true;
    }


    public function crearActividad(array $data) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('actividades');
        $builder->insert($data);

        return $db->insertID();
    }


    public function editarActividad(int $id_actividad, array $data_actividades){

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('actividades');
        $builder->where('id_actividades', $id_actividad);
        $builder->update($data_actividades);

        return $db->affectedRows() > 0;
    }


    public function getDataActividad(int $id_actividad){

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('actividades');
        $builder->select('actividades.*, tipos_actividades.nombre as categoria_actividad');
        $builder->join('tipos_actividades', 'tipos_actividades.id_tipos_actividades = actividades.tipo_actividad');
        $builder->where('id_actividades', $id_actividad);

        $query = $builder->get();
        return $query->getResultArray();
    }

    public function bajaActividad(int $id_actividad){
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('actividades');

        $builder->where('id_actividades', $id_actividad);
        $builder->update(["estado" => 'cancelada']);

        return $db->affectedRows() > 0;
    }


    public function altaActividad(int $id_actividad){
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('actividades');

        $builder->where('id_actividades', $id_actividad);
        $builder->update(["estado" => 'activa']);

        return $db->affectedRows() > 0;
    }

    public function hacerReservaActividad(array $data, int $plazas){

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas_actividades');

        // Hacemos la sentencia 
        $builder->insert($data);

        $idReserva = $db->insertID();

        // Actualizamos las plazas ocupadas en la actividad
        $db->table('actividades')
            ->where('id_actividades', $data['id_actividad'])
            ->set('plazas_ocupadas', (intval($data['plazas_reserva']) + $plazas))
            ->update();

        return $idReserva;
    }

    public function getInscritosActividad(int $actividad) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas_actividades');

        $query = $builder->select()
                         ->join('usuarios', 'usuarios.id_usuario = reservas_actividades.id_usuario')
                         ->where('reservas_actividades.id_actividad', $actividad)
                         ->get();
        
        return $query->getResultArray();
    }

    public function setPagada(int $reserva, array $data){

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas_actividades');

        $builder->where('id_reserva_actividad', $reserva);
        $builder->update($data);

        return $db->affectedRows() > 0;
    }

    public function getReservaById(int $reserva) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla en la que vamos a buscar las reservas
        $builder = $db->table('reservas_actividades');

        $query = $builder->select()
                         ->join('usuarios', 'usuarios.id_usuario = reservas_actividades.id_usuario')
                         ->where('reservas_actividades.id_reserva_actividad', $reserva)
                         ->get();
        
        return $query->getResultArray();
    }

    public function eliminarReservaActividad(int $reserva, int $plazas_reserva, int $actividad, int $plazas_ocupadas) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('reservas_actividades');

        // Eliminamos el tipo de actividad
        $builder->where('id_reserva_actividad', $reserva);
        $builder->delete();

        $db->table('actividades')
        ->where('id_actividades', $actividad)
        ->set('plazas_ocupadas', ($plazas_ocupadas - $plazas_reserva))
        ->update();

        return true;
    }


    public function editarReserva(int $reserva, int $plazas, int $plazas_ocupadas, int $plazas_reservadas, int $actividad, float $precio_actividad) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('reservas_actividades');

        // Eliminamos el tipo de actividad
        $builder->where('id_reserva_actividad', $reserva);
        $builder->update([
                "plazas_reserva" => $plazas,
                "precio_reserva" => ($precio_actividad * $plazas)
            ]);

        $diferencia = $plazas - $plazas_reservadas;

        $db->table('actividades')
        ->where('id_actividades', $actividad)
        ->set('plazas_ocupadas', 'plazas_ocupadas + (' . $diferencia . ')', false)
        ->update();

        return $db->affectedRows() > 0;

    }
}
