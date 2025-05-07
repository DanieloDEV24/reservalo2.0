<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/instalaciones', 'instalaciones::index');
$routes->post('/instalaciones', 'instalaciones::index');
$routes->get('mostrarInstalacion/(:alphanum)', 'instalaciones::mostrarInstalacion/$1', ['filter' => 'auth']);
$routes->get('lugarInstalacion/(:num)', 'instalaciones::lugarInstalacion/$1', ['filter' => 'auth']);
$routes->get('mostrarPaginaError', 'instalaciones::mostrarPaginaError');
$routes->get('nuevaInstalacion', 'instalaciones::nuevaInstalacion', ['filter' => 'auth']);
$routes->post('nuevaInstalacion', 'instalaciones::nuevaInstalacion', ['filter' => 'auth']);
$routes->post('nuevasPistas', 'instalaciones::nuevasPistas', ['filter' => 'auth']);
$routes->get('nuevasPistas', 'instalaciones::nuevasPistas', ['filter' => 'auth']);
$routes->get('crudInstalaciones', 'instalaciones::crudInstalaciones', ['filter' => 'auth']);
$routes->get('editarInstalacion', 'instalaciones::editarInstalacion', ['filter' => 'auth']);
$routes->post('editarInstalacion', 'instalaciones::editarInstalacion', ['filter' => 'auth']);
$routes->post('obtenerInfoInstalacion', 'instalaciones::obtenerInfoInstalacion', ['filter' => 'auth']);
$routes->post('borrarInstalacion', 'instalaciones::borrarInstalacion', ['filter' => 'auth']);
$routes->post('dameInfoPistas', 'instalaciones::dameInfoPistas', ['filter' => 'auth']);
$routes->post('modPistas', 'instalaciones::modPistas', ['filter' => 'auth']);


$routes->get('crudMantenimientos', 'mantenimientos::crudMantenimientos', ['filter' => 'auth']);
$routes->get('nuevoMantenimiento', 'mantenimientos::nuevoMantenimiento', ['filter' => 'auth']);
$routes->post('nuevoMantenimiento', 'mantenimientos::nuevoMantenimiento', ['filter' => 'auth']);
$routes->post('obtenerInfoMantenimiento', 'mantenimientos::obtenerInfoMantenimientos', ['filter' => 'auth']);
$routes->get('editarMantenimiento', 'mantenimientos::editarMantenimiento', ['filter' => 'auth']);
$routes->post('editarMantenimiento', 'mantenimientos::editarMantenimiento', ['filter' => 'auth']);
$routes->post('finalizarMantenimiento', 'mantenimientos::finalizarMantenimiento', ['filter' => 'auth']);

//Login
$routes->get('login', 'login::index');
$routes->post('login', 'login::index');
$routes->get('registrar', 'login::registrar');
$routes->get('logout', 'login::logout');
$routes->get('loguearse', 'login::loguearse');
$routes->get('infoUsuario', 'login::infoUsuario', ['filter' => 'auth']);
$routes->post('infoUsuario', 'login::infoUsuario', ['filter' => 'auth']);


//Horarios
$routes->post('crearHorario', 'instalaciones::crearHorario', ['filter' => 'auth']);
$routes->get('crearHorario', 'Instalaciones::crearHorario', ['filter' => 'auth']);
$routes->post('peticionHorario', 'instalaciones::peticionHorario', ['filter' => 'auth']);
$routes->post('obtenerHorarios', 'instalaciones::obtenerHorarios', ['filter' => 'auth']);
$routes->get('peticionHorario', 'instalaciones::peticionHorario', ['filter' => 'auth']);
$routes->get('obtenerHorarios', 'instalaciones::obtenerHorarios', ['filter' => 'auth']);

$routes->post('modificarHorario', 'instalaciones::modificarHorario', ['filter' => 'auth']);
$routes->get('modificarHorario', 'Instalaciones::modificarHorario', ['filter' => 'auth']);


//Reserva
$routes->post('mostrarInstalacion/mostrarPanelReserva', 'reservas::mostrarPanelReserva', ['filter' => 'auth']);
$routes->post('mostrarInstalacion/obtenerDatosReserva', 'reservas::obtenerDatosReserva', ['filter' => 'auth']);
$routes->post('mostrarInstalacion/metodosPago', 'reservas::metodosPago', ['filter' => 'auth']);
$routes->post('mostrarInstalacion/realizarReserva', 'reservas::realizarReserva', ['filter' => 'auth']);
$routes->post('misReservas', 'reservas::misReservas');
$routes->get('misReservas', 'reservas::misReservas');
$routes->post('borrarReserva', 'reservas::borrarReserva');
$routes->post('mostrarInstalacion/misReservas', 'reservas::misReservas');
// $routes->get('mostrarInstalacion/misReservas', 'reservas::misReservas');
$routes->post('mostrarInstalacion/borrarReserva', 'reservas::borrarReserva', ['filter' => 'auth']);

$routes->get('reservasAdmin', 'reservas::reservasAdmin', ['filter' => 'auth']);
$routes->post('reservasAdmin', 'reservas::reservasAdmin', ['filter' => 'auth']);

// Comentarios
$routes->post('escribirComentario', 'comentarios::escribirComentario', ['filter' => 'auth']);


// DashBoard
$routes->get('dashboard', 'dashboard::index', ['filter' => 'auth']);
$routes->post('dashboard', 'dashboard::index', ['filter' => 'auth']);

$routes->get('obtenerPagosTarjeta', 'dashboard::obtenerPagosTarjeta');
$routes->get('obtenerPagosBizum', 'dashboard::obtenerPagosBizum');
$routes->get('obtenerPagosPayPal', 'dashboard::obtenerPagosPayPal');
$routes->get('obtenerEsteAnoVsAnoPasado', 'dashboard::obtenerEsteAnoVsAnoPasado');
$routes->get('obtenerTop5', 'dashboard::obtenerTop5');
$routes->get('obtenerTop5Mantenimientos', 'dashboard::obtenerTop5Mantenimientos');

//Categorias
$routes->get('crudCategorias', 'categorias::crudCategorias', ['filter' => 'auth']); 
$routes->post('nuevaCategoria', 'categorias::nuevaCategoria'); 
$routes->post('desactivarCategoria', 'categorias::desactivarCategoria'); 
$routes->post('verInstalaciones', 'categorias::verInstalaciones'); 
