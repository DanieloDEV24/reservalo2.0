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