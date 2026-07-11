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
        $builder->select();
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
}
