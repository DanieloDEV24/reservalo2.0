-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.28-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
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

-- Volcando estructura para tabla reservalo2.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.categorias: ~3 rows (aproximadamente)
DELETE FROM `categorias`;
INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
	(1, 'deporte'),
	(2, 'cultura'),
	(3, 'ocio');

-- Volcando estructura para tabla reservalo2.incidencias
CREATE TABLE IF NOT EXISTS `incidencias` (
  `id_incidencia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '',
  `fecha` date NOT NULL,
  `id_pista` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_incidencia`),
  KEY `FK1_pistas_incidencias` (`id_pista`),
  CONSTRAINT `FK1_pistas_incidencias` FOREIGN KEY (`id_pista`) REFERENCES `pistas` (`id_pista`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.incidencias: ~0 rows (aproximadamente)
DELETE FROM `incidencias`;

-- Volcando estructura para tabla reservalo2.instalaciones
CREATE TABLE IF NOT EXISTS `instalaciones` (
  `id_instalacion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT '',
  `descripcion` varchar(250) DEFAULT '',
  `categoria_principal` int(11) DEFAULT NULL,
  `categoria_opcional1` int(11) DEFAULT NULL,
  `precio_completo` float DEFAULT NULL,
  `puede_completo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_instalacion`),
  KEY `FK1_categorias_instalaciones` (`categoria_principal`),
  KEY `FK2_categorias_instalaciones` (`categoria_opcional1`),
  CONSTRAINT `FK1_categorias_instalaciones` FOREIGN KEY (`categoria_principal`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK2_categorias_instalaciones` FOREIGN KEY (`categoria_opcional1`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.instalaciones: ~0 rows (aproximadamente)
DELETE FROM `instalaciones`;

-- Volcando estructura para tabla reservalo2.mantenimiento
CREATE TABLE IF NOT EXISTS `mantenimiento` (
  `id_mantenimiento` int(11) NOT NULL AUTO_INCREMENT,
  `id_pista` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT '',
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_mantenimiento`),
  KEY `FK1_mantenimiento_pistas` (`id_pista`),
  CONSTRAINT `FK1_mantenimiento_pistas` FOREIGN KEY (`id_pista`) REFERENCES `pistas` (`id_pista`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.mantenimiento: ~0 rows (aproximadamente)
DELETE FROM `mantenimiento`;

-- Volcando estructura para tabla reservalo2.pistas
CREATE TABLE IF NOT EXISTS `pistas` (
  `id_pista` int(11) NOT NULL AUTO_INCREMENT,
  `id_instalacion` int(11) DEFAULT NULL,
  `imagen1` varchar(250) DEFAULT '',
  `imagen2` varchar(250) DEFAULT '',
  `imagen3` varchar(250) DEFAULT '',
  `imagen4` varchar(250) DEFAULT '',
  PRIMARY KEY (`id_pista`),
  KEY `FK1_pistas_instalacion` (`id_instalacion`),
  CONSTRAINT `FK1_pistas_instalacion` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`) ON DELETE NO ACTION ON UPDATE CASCADE
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

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
