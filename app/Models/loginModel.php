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

        return $db->insertID();
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

    public function buscaUsuarioPorId(int $idUsuario)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        // Realizamos la sentencia
        $builder->select()->where("id_usuario", $idUsuario);

        // Obtenemos los resultados
        $query  = $builder->get();
        $result = $query->getResultArray();

        return $result[0]; 
    }

    public function passwordEmail($email)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        // Realizamos la sentencia
        $builder->select("password")->where("email", $email);

        // Obtenemos los resultados
        $query  = $builder->get();
        $result = $query->getResultArray();

        return $result[0];
    }

    public function selectDatawithEmail($email)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        // Realizamos la sentencia
        $builder->select()->where("email", $email);

         // Obtenemos los resultados
        $query  = $builder->get();
        $result = $query->getResultArray();

        return $result[0];
    }

    public function buscarIdporEmail (string $email)
    {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        // Realizamos la sentencia
        $builder->select("id_usuario")->where("email", $email);

        // Obtenemos los resultados
        $query  = $builder->get();
        $result = $query->getResultArray();

        return $result[0];
    }

    public function anadirToken (array $data, int $id_usuario)
    {
        //Conexion a la base de datos
        $db     = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        //Actualizamos los campos token y date_token con los valores creados
        $builder->where("id_usuario", $id_usuario)->update($data);
    }

    public function buscarPorToken (string $token)
    {
        //Conexion a la base de datos
        $db      = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        //Buscamos por el token 
        $builder->select()->where("token", $token);

        $query  = $builder->get();
        $result = $query->getResultArray();

        return $result[0];
    }

    public function cambioPass(string $newPass, int $id_usuario) 
    {
        //Conexion a la base de datos
        $db      = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla en la que vamos a buscar a los usuarios
        $builder = $db->table('usuarios');

        // Cambiamos el usuario
        $builder->where("id_usuario", $id_usuario)->update(["password" => $newPass]);
    }

}