<?php

namespace App\Models;

use CodeIgniter\Model;
use DateTime;

class horariosModel extends Model
{

    protected $table = 'tipo_horario';
    protected $primaryKey = 'id_tipo_horario';

    protected $useAutoIncrement = true;

    protected $returnType = 'array'; //object
    // protected $useSoftDeletes = true;

    protected $allowedFields = ['id_tipo_horario', 'nombre', 'descripcion', 'color', 'fecha_inicio', 'fecha_final', 'es_especial', 'sin_fecha', 'created_at', 'updated_at', 'deleted_at'];

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

    public function comprobarHorarios(int $instalacion){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        // Creamos el horario
        $query = $builder->distinct()
        ->select('tipo_horario.*')
        ->join(
            'franjas_horarias',
            'franjas_horarias.id_tipo_horario = tipo_horario.id_tipo_horario',
            'inner'
        )
        ->where('franjas_horarias.id_instalacion', $instalacion)
        ->get();

        return $query->getResultArray();
    }

    public function comprobarHorariosLegend(int $instalacion){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        $currentYear = Date('Y');

        // Creamos el horario
        $query = $builder->distinct()
        ->select('tipo_horario.*')
        ->join(
            'franjas_horarias',
            'franjas_horarias.id_tipo_horario = tipo_horario.id_tipo_horario',
            'inner'
        )
        ->where('franjas_horarias.id_instalacion', $instalacion)
        ->where('tipo_horario.fecha_inicio >=', $currentYear.'-01-01')
        ->where('tipo_horario.fecha_fin <=', $currentYear.'-12-31')
        ->get();

        return $query->getResultArray();
    }


   public function comprobarHorariosSidebar(int $instalacion, string $currentYear)
    {
        $db = \Config\Database::connect('BDReservalo2');
        $builder = $db->table('tipo_horario');

        $inicioAnio = $currentYear . '-01-01';
        $finAnio    = $currentYear . '-12-31';

        $query = $builder
            ->distinct()
            ->select('tipo_horario.*')
            ->join(
                'franjas_horarias',
                'franjas_horarias.id_tipo_horario = tipo_horario.id_tipo_horario',
                'inner'
            )
            ->where('franjas_horarias.id_instalacion', $instalacion)
            ->where('tipo_horario.fecha_inicio <=', $finAnio)
            ->where('tipo_horario.fecha_fin >=', $inicioAnio)
            ->get();

        return $query->getResultArray();
    }


    public function comprobarHorariosAno(int $year, int $instalacion){
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        // Buscamos los horarios de ese año e instalación
            $query = $builder
        ->distinct()
        ->select('tipo_horario.id_tipo_horario, tipo_horario.nombre, tipo_horario.color, tipo_horario.sin_fecha, tipo_horario.fecha_inicio, tipo_horario.fecha_fin, franjas_horarias.id_instalacion')
        ->join(
            'franjas_horarias',
            'franjas_horarias.id_tipo_horario = tipo_horario.id_tipo_horario',
            'inner'
        )
        ->where('tipo_horario.fecha_inicio >=', $year.'-01-01')
        ->where('tipo_horario.fecha_fin <=', $year.'-12-31')
        ->where('franjas_horarias.id_instalacion', $instalacion)
        ->get();

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

    public function deleteFranjaHorarioByHorario (int $id_tipo_horario){
        
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('franjas_horarias');

        // Borramos las franjas horarias asociadas al horario
        $builder->where('id_tipo_horario', $id_tipo_horario);
        $builder->delete();

        return true;
    }

    public function borrarFranjaDia(int $id_franja_horaria){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('franjas_dias');

        // Borramos las franjas horarias asociadas al horario
        $builder->where('id_franja_horaria', $id_franja_horaria);
        $builder->delete();

        return true;
    }

    public function borrarFranjaHoraria(int $id_franja_horaria){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('franjas_horarias');

        // Borramos las franjas horarias asociadas al horario
        $builder->where('id_franja_horaria', $id_franja_horaria);
        $builder->delete();

        return true;
    }


    public function updateFranjaHoraria(array $data, int $id_tipo_horario, int $id_dia_semana)
    {
        // Conexión a la base de datos (usa tu conexión personalizada)
        $db = \Config\Database::connect('BDReservalo2');

        // Subconsulta: obtener el id_franja_horaria del lunes (id_dia_semana = 1, id_instalacion = 8)
        $subquery = $db->table('franjas_dias fd')
            ->select('fd.id_franja_horaria')
            ->join('franjas_horarias fh', 'fd.id_franja_horaria = fh.id_franja_horaria')
            ->where('fd.id_dia_semana', $id_dia_semana)
            ->where('fh.id_tipo_horario', $id_tipo_horario)
            ->get()
            ->getRow();

        if (!$subquery) {
            return false; // No se encontró la franja del lunes
        }

        $id_franja_horaria = $subquery->id_franja_horaria;

        // Obtenemos el builder de la tabla principal
        $builder = $db->table('franjas_horarias');

        // Actualizamos el registro
        $builder->where('id_franja_horaria', $id_franja_horaria);
        $builder->where('id_tipo_horario', $id_tipo_horario);
        $builder->update($data);

        return $db->affectedRows() > 0;
    }

    public function borrarHorario(int $id_tipo_horario){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        // Borramos el horario
        $builder->where('id_tipo_horario', $id_tipo_horario);
        $builder->delete();

        return true;
    }

    public function getHorarioFromFechas(string $fecha_inicio, string $fecha_fin, int $id_instalacion)
{
    $db = \Config\Database::connect('BDReservalo2');
    $builder = $db->table('tipo_horario');

    $builder->select('*');
    
    $builder->join(
            'franjas_horarias',
            'franjas_horarias.id_tipo_horario = tipo_horario.id_tipo_horario',
            'inner'
    );

    $builder->where('tipo_horario.sin_fecha', 0);

    // Detecta cualquier solapamiento
    $builder->where('tipo_horario.fecha_inicio <=', $fecha_fin);
    $builder->where('tipo_horario.fecha_fin >=', $fecha_inicio);
    $builder->where('franjas_horarias.id_instalacion', $id_instalacion);
    

    return $builder->get()->getResultArray();
}



    public function crearExcepcion(array $data) {
        
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('excepciones_horario');

        // Creamos el horario
        $builder->insert($data);

        // Devolvemos el id del horario
        return $db->insertID();
    }


    public function borrarExcepcion(int $id_horario) {
        
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('excepciones_horario');

        // Borramos las franjas horarias asociadas al horario
        $builder->where('id_tipo_horario_base', $id_horario);
        $builder->orWhere('id_tipo_horario_excepcion', $id_horario);
        $builder->delete();

        return true;
    }


    public function borrarExcepcionFechaSola(string $date) {
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('excepciones_horario');

        $fecha = DateTime::createFromFormat('d/m/Y', $date);

        $builder->where('fecha_inicio', $fecha->format('Y-m-d'));
        $builder->where('fecha_fin', $fecha->format('Y-m-d'));
        $builder->delete();


        return true;
    }



    public function hayExcepcionBase(int $id_horario)
    {

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de excepciones_horario
        $builder = $db->table('excepciones_horario');

        // Hago el select con join
        $query = $builder->distinct()->select('tipo_horario.nombre, excepciones_horario.id_tipo_horario_excepcion')
            ->join('tipo_horario', 'tipo_horario.id_tipo_horario = excepciones_horario.id_tipo_horario_excepcion')
            ->where('excepciones_horario.id_tipo_horario_base', $id_horario)
            ->get();

        $result = $query->getResultArray();

        return $result;
    }



    public function hayExcepcionExcepcion(int $id_horario) {
        
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('excepciones_horario');

        // Hago el select
        $query = $builder->select()
                         ->where("id_tipo_horario_excepcion", $id_horario)
                         ->get();

        $result = $query->getResultArray();

        return $result;
    }


    public function editarExcepcion (array $data) {

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('excepciones_horario');

        // Actualizamos el horario
        $builder->where('id_excepciones_horario', intval($data["id_excepciones_horario"]));
        $builder->update($data);

        return true;
    }


    public function getHorariosChange(int $year) {
        
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('tipo_horario');

        $query = $builder->select()->where('es_especial', 1)->where('sin_fecha', 1)
                 ->where('tipo_horario.fecha_inicio >=', $year.'-01-01')
                 ->where('tipo_horario.fecha_fin <=', $year.'-12-31')
                 ->get();   

        $result = $query->getResultArray();

        return $result;
    }


    public function cambiarHorariosSeleccionados(array $cambios) {

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        $builder = $db->table('excepciones_horario');

        $fecha = DateTime::createFromFormat('d/m/Y', $cambios['fecha']);
        $fecha_convertida = $fecha->format('Y-m-d');

        $builder->insert([
            "id_tipo_horario_base" => intval($cambios['horarioAntiguo']),
            "id_tipo_horario_excepcion" => intval($cambios['horarioNuevo']),
            "fecha_inicio" => $fecha_convertida,
            "fecha_fin"=> $fecha_convertida

        ]);

        return true;
    }


    public function comprobarExcepciones(int $instalacion){

        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('excepciones_horario');

        $builder = $db->table('excepciones_horario');
        $builder->select('excepciones_horario.*, tipo_horario.nombre, tipo_horario.color');
        $builder->join('tipo_horario', 'excepciones_horario.id_tipo_horario_excepcion = tipo_horario.id_tipo_horario');
        $builder->join('franjas_horarias', 'excepciones_horario.id_tipo_horario_excepcion = franjas_horarias.id_tipo_horario');
        $query = $builder->where('franjas_horarias.id_instalacion', $instalacion)
        ->get();

        return $query->getResultArray();
    }


    public function getHorariosChangeException(string $fecha) {
        
        //Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        //Obtenemos la tabla de horarios
        $builder = $db->table('excepciones_horario');

        $fechaNueva = DateTime::createFromFormat('d/m/Y', $fecha);
        $fecha_convertida = $fechaNueva->format('Y-m-d');

        $query = $builder->select('tipo_horario.*, excepciones_horario.*')
                         ->join('tipo_horario', 'excepciones_horario.id_tipo_horario_base = tipo_horario.id_tipo_horario')
                         ->where('excepciones_horario.fecha_inicio <=', $fecha_convertida)
                         ->where('excepciones_horario.fecha_fin >=', $fecha_convertida)
                         ->get();

        $result = $query->getResultArray();

        return $result;

    }

    public function getHorariosFromPista(int $id_pista) {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        // Builder principal
        $builder = $db->table('franjas_horarias');

        // Query
        $builder->select('*');
        $builder->join(
            'pistas',
            'pistas.id_instalacion = franjas_horarias.id_instalacion',
            'inner'
        );
        $builder->where('pistas.id_pista', $id_pista);

        // Ejecutar y devolver resultados
        $query = $builder->get();

        return $query->getResult();
    }

    public function getHorarioByInstalacion(int $id_instalacion) {

        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        $builder = $db->table('tipo_horario')->where('id_instalacion', $id_instalacion);

        return $builder->get()->getResultArray();
    }

    public function getFranjaHorariaByIdHorario(int $id_tipo_horario) {
        
        // Conexion a la base de datos
        $db = \Config\Database::connect('BDReservalo2');

        $builder = $db->table('tipo_horario')->where('id_tipo_horario', $id_tipo_horario);

        return $builder->get()->getResultArray();
    }
}