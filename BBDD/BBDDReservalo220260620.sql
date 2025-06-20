-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para reservalo2
CREATE DATABASE IF NOT EXISTS `reservalo2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `reservalo2`;

-- Volcando estructura para tabla reservalo2.deportes
CREATE TABLE IF NOT EXISTS `deportes` (
  `id_deporte` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_deporte`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.deportes: ~3 rows (aproximadamente)
DELETE FROM `deportes`;
INSERT INTO `deportes` (`id_deporte`, `nombre`) VALUES
	(1, 'fútbol'),
	(2, 'pádel'),
	(3, 'fútbol sala');

-- Volcando estructura para vista reservalo2.instalaciones
-- Creando tabla temporal para superar errores de dependencia de VIEW
CREATE TABLE `instalaciones` (
	`id_instalacion` INT(11) NOT NULL,
	`nombre` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci',
	`id_deporte` INT(11) NOT NULL,
	`descripcion` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci',
	`valoración` INT(11) NOT NULL,
	`comentario` VARCHAR(1) NOT NULL COLLATE 'utf8mb4_general_ci'
) ENGINE=MyISAM;

-- Volcando estructura para tabla reservalo2.pistas
CREATE TABLE IF NOT EXISTS `pistas` (
  `id_pista` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `id_instalacion` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_pista`),
  KEY `FK1_pistas_instalaciones` (`id_instalacion`),
  CONSTRAINT `FK1_pistas_instalaciones` FOREIGN KEY (`id_instalacion`) REFERENCES `tb_instalaciones` (`id_instalaciones`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pistas: ~0 rows (aproximadamente)
DELETE FROM `pistas`;

-- Volcando estructura para tabla reservalo2.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.roles: ~2 rows (aproximadamente)
DELETE FROM `roles`;
INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
	(1, 'público'),
	(2, 'administrador');

-- Volcando estructura para tabla reservalo2.tb_instalaciones
CREATE TABLE IF NOT EXISTS `tb_instalaciones` (
  `id_instalaciones` int(11) NOT NULL AUTO_INCREMENT,
  `id_deporte` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL DEFAULT '',
  `descripcion` varchar(250) NOT NULL DEFAULT '',
  `portada` varchar(250) NOT NULL DEFAULT '',
  `img1` varchar(250) NOT NULL DEFAULT '',
  `img2` varchar(250) NOT NULL DEFAULT '',
  `img3` varchar(250) NOT NULL DEFAULT '',
  `precio` float DEFAULT 0,
  `capacidad` int(11) DEFAULT 0,
  PRIMARY KEY (`id_instalaciones`),
  KEY `FK1_instalaciones_deportes` (`id_deporte`),
  CONSTRAINT `FK1_instalaciones_deportes` FOREIGN KEY (`id_deporte`) REFERENCES `deportes` (`id_deporte`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.tb_instalaciones: ~1 rows (aproximadamente)
DELETE FROM `tb_instalaciones`;
INSERT INTO `tb_instalaciones` (`id_instalaciones`, `id_deporte`, `nombre`, `descripcion`, `portada`, `img1`, `img2`, `img3`, `precio`, `capacidad`) VALUES
	(1, 1, 'Campo de Fútbol', 'Campo de fútbol de césped artificial', '', '', '', '', 10, 11);

-- Volcando estructura para tabla reservalo2.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_roles_01` (`id_rol`),
  CONSTRAINT `fk_usuarios_roles_01` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.usuarios: ~3 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id_usuario`, `email`, `password`, `id_rol`, `nombre`, `token`, `token_date`) VALUES
	(5, 'danielruizdeveloper@gmail.com', '6cd417576f4790d1de516e45340adacae98656c5', 1, 'Daniel', '5f0c5879e21958a97a39e7e66efbb6b5fa1c78af0a7c38e4c6be2306c05a8bba0f935598cb07db2afbe10d87c0ee8d26df74', '2025-06-12 09:09:02'),
	(7, 'cristian1_24.fp@gmail.com', '4c7f83010ba7990acd919f7389432101301001dc', 1, 'Cristian ', NULL, NULL),
	(9, 'ruizsotodani2@gmail.com', '91cda6f4d61c06dcbc8b6efe056b346aed1431e7', 1, 'Dani', NULL, NULL);

-- Eliminando tabla temporal y crear estructura final de VIEW
DROP TABLE IF EXISTS `instalaciones`;

;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
