<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('/crudInstalaciones', 'Instalaciones::crudInstalaciones', ['filter' => 'auth']);
$routes->get('/login', 'Login::login');
$routes->get('/singIn', 'Login::registrarse');
$routes->post('/singIn', 'Login::registrarse');
$routes->get('/login', 'Login::login');
$routes->post('/login', 'Login::login');
$routes->get('/logout', 'Login::logout');
$routes->post('/forgotPass', 'Login::forgotPassword');
$routes->get('/forgotPass', 'Login::forgotPassword');
$routes->post('/resetPassForm/(:num)', 'Login::resetPassForm/$1');
$routes->get('/resetPassForm/(:num)', 'Login::resetPassForm/$1');
$routes->get('/resetPass', 'Login::resetPass');
$routes->post('/nuevaInstalacion', 'Instalaciones::nuevaInstalacion');