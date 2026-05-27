<?php

namespace App\Models;

use CodeIgniter\Model;

class usuariosModel extends Model
{

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_usuario', 'email', 'password', 'id_rol', 'nombre', 'telf', 'token', 'token_date', 'usuario_baja', 'fecha_registro', 'ultimo_inicio', 'created_at', 'updated_at', 'deleted_at'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';


    public function getUsuarios()
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('usuarios');

        // Select con los campos y agregaciones
        $builder->select("
        usuarios.*,
        SUM(CASE 
            WHEN reservas.pagadas = 0
            AND reservas.fecha < '" . date("Y-m-d") . "'
            THEN 1
            ELSE 0
        END) AS reservas_pasadas
        ");

        // LEFT JOIN
        $builder->join(
            'reservas',
            'reservas.id_usuario = usuarios.id_usuario',
            'left'
        );

        // GROUP BY
        $builder->groupBy('usuarios.id_usuario');

        return $builder->get()->getResultArray();
    }

    public function getUsuarioById(int $id_usuario)
    {
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('usuarios');

        $builder->select('usuarios.*, COUNT(reservas.id_reserva) AS num_reservas');
        $builder->join('reservas', 'reservas.id_usuario = usuarios.id_usuario', 'left');
        $builder->where('usuarios.id_usuario', $id_usuario);
        $builder->groupBy('usuarios.id_usuario');

        return $builder->get()->getResultArray();
    }

    public function borrarUsuario(int $id_usuario)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('usuarios');

        $builder->where("id_usuario", $id_usuario);
        $builder->delete();
    }


    public function modificarUsuario(array $data)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('usuarios');

        $builder->where("id_usuario", intval($data["id_usuario"]));
        $builder->set($data);
        $builder->update();
    }

    public function setEstadoUsuario(int $id_usuario, int $estado)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('usuarios');

        $builder->where("id_usuario", $id_usuario);
        $builder->set("usuario_baja", $estado);
        $builder->update();
    }

    public function getReservasPasadas(int $id_usuario)
    {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Obtenemos la tabla principal
        $builder = $db->table('reservas');

        // Contar con condiciones
        $count = $builder
            ->where('id_usuario', $id_usuario)
            ->where('fecha <', date('Y-m-d'))
            ->where('pagadas', 0)
            ->countAllResults();

        return $count;
    }

    public function filtradoUsuarios(string $valor, bool $estado){
        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('usuarios');

        $builder->select("
            usuarios.*,
            SUM(CASE 
                WHEN reservas.pagadas = 0
                AND reservas.fecha < '" . date("Y-m-d") . "'
                THEN 1
                ELSE 0
            END) AS reservas_pasadas
        ");

        $builder->join(
            'reservas',
            'reservas.id_usuario = usuarios.id_usuario',
            'left'
        );

        if($estado) {
            
            // Primero filtra por estado (fuera del grupo)
            $builder->where('usuarios.usuario_baja', 1);
        }

        // Luego el grupo de búsqueda por texto
        $builder->groupStart()
            ->like('usuarios.nombre', $valor)
            ->orLike('usuarios.email', $valor)
            ->orLike('usuarios.telf', $valor)
        ->groupEnd();

        $builder->groupBy('usuarios.id_usuario');

        return $builder->get()->getResultArray();
    }

    public function getPassword(int $id_usuario) {

        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('usuarios');

        $builder->select('password');
        $builder->where('id_usuario', $id_usuario);

        if(isset($builder->get()->getResultArray()[0])) {
            return $builder->get()->getResultArray()[0];
        }
        else {
            // Pagina error
        }

    }
}
