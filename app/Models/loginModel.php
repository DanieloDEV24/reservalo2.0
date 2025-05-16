<?php

namespace App\Models;

use CodeIgniter\Model;

class loginModel extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_usuario', 'email', 'password'];

    protected bool $allowEmptyInserts = false;

    // Dates
    protected $useTimestamps = false;
    protected $dateFormat = 'datetime';
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    public function registrar(string $nombre, string $email, string $password)
    {

        //En primer lugar añadimos el usuario a la tabla de usuarios

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        //Preparamos un array con los datos a insertar
        $dataInsert = [
            "nombre"=>$nombre,
            "email"=> $email,
            "password"=> sha1($password),
            "id_rol" =>1
        ];

        //Realizamos la consulta
        $query = $builder->insert($dataInsert);
    }

    public function existeEmail(string $email)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        // Realizamos la sentencia
        $builder->select('email');

        // Obtenemos los resultados
        $query  = $builder->get();
        $result = $query->getResultArray();

        return $result; 
    }
}