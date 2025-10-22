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
$routes->get('/instalacion/(:num)', 'Instalaciones::instalacion/$1');

// HORARIOS
$routes->get('/horario/(:num)', 'Horarios::horario/$1');

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