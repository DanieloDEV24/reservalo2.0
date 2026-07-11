<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

/***********************************************************************************************************************************
************************************************************* RUTAS GET ************************************************************
***********************************************************************************************************************************/

// INSTALACIONES
$routes->get('/', 'Home::index');
$routes->get('/crudInstalaciones', 'Instalaciones::crudInstalaciones', ['filter' => 'auth']);
$routes->get('/login', 'Login::login');
$routes->get('/singIn', 'Login::registrarse');
$routes->get('/login', 'Login::login');
$routes->get('/logout', 'Login::logout');
$routes->get('/forgotPass', 'Login::forgotPassword');
$routes->get('/resetPassForm/(:num)', 'Login::resetPassForm/$1');
$routes->get('/resetPass', 'Login::resetPass');
$routes->get('/instalaciones', 'Instalaciones::instalaciones');
$routes->get('/instalacion/(:num)', 'Instalaciones::instalacion/$1', ['filter' => 'auth']);
$routes->get('/descargarTicket/(:num)', 'Reservas::descargarTicket/$1', );

// HORARIOS
$routes->get('/horario/(:num)', 'Horarios::horario/$1,', ['filter' => 'auth']);
$routes->get('/misReservas', 'Reservas::misReservas');


/***********************************************************************************************************************************
************************************************************* RUTAS POST ***********************************************************
***********************************************************************************************************************************/

// INSTALACIONES
$routes->post('/crudInstalaciones', 'Instalaciones::crudInstalaciones', ['filter' => 'auth']);
$routes->post('/', 'Instalaciones::crudInstalaciones', ['filter' => 'auth']);
$routes->post('/singIn', 'Login::registrarse');
$routes->post('/login', 'Login::login');
$routes->post('/forgotPass', 'Login::forgotPassword');
$routes->post('/resetPassForm/(:num)', 'Login::resetPassForm/$1');
$routes->post('/nuevaInstalacion', 'Instalaciones::nuevaInstalacion');
$routes->post('/verInstalacion', 'Instalaciones::verInstalacion');
$routes->post('/editarInstalacion', 'Instalaciones::editarInstalacion');
$routes->post('/infoPista', 'Instalaciones::infoPista');
$routes->post('/editarPista', 'Instalaciones::editarPista');
$routes->post('/getNewIndexPista', 'Instalaciones::getNewIndexPista');
$routes->post('/borrarPista', 'Instalaciones::borrarPista');
$routes->post('/crearPista', 'Instalaciones::crearPista');
$routes->post('/editarInstalacionBD', 'Instalaciones::editarInstalacionBD');
$routes->post('/mensajeDarBajaInstalacion', 'Instalaciones::mensajeDarBajaInstalacion');
$routes->post('/darBajaInstalacion', 'Instalaciones::darBajaInstalacion');
$routes->post('/darAlta', 'Instalaciones::darAlta');
$routes->post('/mensajeBorrarInstalacion', 'Instalaciones::mensajeBorrarInstalacion');
$routes->post('/borrarInstalacion', 'Instalaciones::borrarInstalacion');
$routes->post('/instalaciones', 'Instalaciones::instalaciones');
$routes->post('/crearHorario', 'Horarios::crearHorario');
$routes->post('/comprobarHorarios', 'Horarios::comprobarHorarios');
$routes->post('/getHorario', 'Horarios::getHorario');
$routes->post('/editarHorario', 'Horarios::editarHorario');
$routes->post('/borrarHorario', 'Horarios::borrarHorario');
$routes->post('/cambiarHorariosSeleccionados', 'Horarios::cambiarHorariosSeleccionados');
$routes->post('/getHorariosChangeException', 'Horarios::getHorariosChangeException');
$routes->post('/comprobarHorariosAno', 'Horarios::comprobarHorariosAno');
$routes->post('/menuHorario', 'Horarios::menuHorario');
$routes->post('/getHorariosChange', 'Horarios::getHorariosChange');

$routes->post('/getInfoPistasReserva', 'Reservas::getInfoPistasReserva');
$routes->post('/comprobarReservas', 'Reservas::comprobarReservas');
$routes->post('/hacerReserva', 'Reservas::hacerReserva');

$routes->post('/anularHora', 'Reservas::anularHora');
$routes->post('/anularReservaEspecial', 'Reservas::anularReservaEspecial');
$routes->get('/crudReservas', 'Reservas::crudReservas', ['filter' => 'auth']);

$routes->post('/getFechasReservas', 'Reservas::getFechasReservas');
$routes->post('/getReservasByDate', 'Reservas::getReservasByDate');
$routes->post('/getInfoReserva', 'Reservas::getInfoReserva');
$routes->post('/anularReservasById', 'Reservas::anularReservasById');
$routes->post('/checkIn', 'Reservas::checkIn');
$routes->post('/deshacerCheckIn', 'Reservas::deshacerCheckIn');

$routes->get('/gestorUsuarios', 'Usuarios::gestorUsuarios', ['filter' => 'auth']);
$routes->post('/getUsuario', 'Usuarios::getUsuario', ['filter' => 'auth']);
$routes->post('/borrarUsuario', 'Usuarios::borrarUsuario', ['filter' => 'auth']);
$routes->post('/getReservasUsuario', 'Usuarios::getReservasUsuario', ['filter' => 'auth']);
$routes->post('/editarUsuario', 'Usuarios::editarUsuario', ['filter' => 'auth']);
$routes->post('/darBaja', 'Usuarios::darBaja', ['filter' => 'auth']);
$routes->post('/darAltaUsuario', 'Usuarios::darAlta', ['filter' => 'auth']);
$routes->post('/filtroUsuarios', 'Usuarios::filtroUsuarios', ['filter' => 'auth']);
$routes->post('/editarUsuarioPersonal', 'Usuarios::editarUsuarioPersonal', ['filter' => 'auth']);
$routes->post('/getReservasByPedido', 'Reservas::getReservasByPedido', ['filter' => 'auth']);
$routes->post('/borrarReservasDia', 'Reservas::borrarReservasDia', ['filter' => 'auth']);

$routes->get('/gestorCategorias', 'Categorias::gestorCategorias', ['filter' => 'auth']);
$routes->post('/getCategoria', 'Categorias::getCategoria', ['filter' => 'auth']);
$routes->post('/editarCategorias', 'Categorias::editarCategorias', ['filter' => 'auth']);
$routes->post('/borrarCategoria', 'Categorias::borrarCategoria', ['filter' => 'auth']);
$routes->post('/crearCategoria', 'Categorias::crearCategoria', ['filter' => 'auth']);

$routes->get('/dashboard', 'Dashboard::dashboard', ['filter' => 'auth']);
$routes->get('/reservasMes', 'Dashboard::reservasMes', ['filter' => 'auth']);
$routes->get('/reservasCategoria', 'Dashboard::reservasCategoria', ['filter' => 'auth']);

$routes->post('/getInstalacionesCategoriaHome', 'Home::getInstalacionesCategoriaHome');

$routes->get('/contacto', 'Contacto::contacto');
$routes->get('/politicasPrivacidad', 'Permisos::politicaPrivacidad');
$routes->get('/cookies', 'Permisos::cookies');
$routes->get('/avisoLegal', 'Permisos::avisoLegal');

$routes->post('/obtenerInstalacionesHorarios', 'Horarios::obtenerInstalacionesHorarios', ['filter' => 'auth']);
$routes->post('/obtenerInstalacionesConEseHorario', 'Horarios::obtenerInstalacionesConEseHorario', ['filter' => 'auth']);
$routes->post('/obtenerInstalacionesConEsosHorarios', 'Horarios::obtenerInstalacionesConEsosHorarios', ['filter' => 'auth']);

$routes->get('/actividades', 'Actividades::actividades');
$routes->post('/crearTipoActividad', 'Actividades::crearTipoActividad');
$routes->post('/getMenuTiposActividades', 'Actividades::getMenuTiposActividades');
$routes->post('/getTipoActividad', 'Actividades::getTipoActividad');
$routes->post('/editarTipoActividad', 'Actividades::editarTipoActividad');
$routes->post('/eliminarTipoActividad', 'Actividades::eliminarTipoActividad');