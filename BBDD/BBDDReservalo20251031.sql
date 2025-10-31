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

-- Volcando estructura para tabla reservalo2.dias_semana
CREATE TABLE IF NOT EXISTS `dias_semana` (
  `id_dia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_dia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.dias_semana: ~7 rows (aproximadamente)
DELETE FROM `dias_semana`;
INSERT INTO `dias_semana` (`id_dia`, `nombre`) VALUES
	(1, 'Lunes'),
	(2, 'Martes'),
	(3, 'Miércoles'),
	(4, 'Jueves'),
	(5, 'Viernes'),
	(6, 'Sábado'),
	(7, 'Domingo');

-- Volcando estructura para tabla reservalo2.excepciones_horario
CREATE TABLE IF NOT EXISTS `excepciones_horario` (
  `id_excepciones_horario` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_horario_base` int(11) NOT NULL DEFAULT 0,
  `id_tipo_horario_excepcion` int(11) NOT NULL DEFAULT 0,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_excepciones_horario`),
  KEY `id_tipo_horario_base` (`id_tipo_horario_base`),
  KEY `id_tipo_horario_excepcion` (`id_tipo_horario_excepcion`),
  CONSTRAINT `FK_excepciones_horario_tipo_horario` FOREIGN KEY (`id_tipo_horario_base`) REFERENCES `tipo_horario` (`id_tipo_horario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_excepciones_horario_tipo_horario_2` FOREIGN KEY (`id_tipo_horario_excepcion`) REFERENCES `tipo_horario` (`id_tipo_horario`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.excepciones_horario: ~0 rows (aproximadamente)
DELETE FROM `excepciones_horario`;

-- Volcando estructura para tabla reservalo2.franjas_dias
CREATE TABLE IF NOT EXISTS `franjas_dias` (
  `id_franja_dia` int(11) NOT NULL AUTO_INCREMENT,
  `id_franja_horaria` int(11) NOT NULL DEFAULT 0,
  `id_dia_semana` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_franja_dia`),
  KEY `id_dia_semana` (`id_dia_semana`),
  KEY `id_horaria` (`id_franja_horaria`) USING BTREE,
  CONSTRAINT `FK__franjas_horarias` FOREIGN KEY (`id_franja_horaria`) REFERENCES `franjas_horarias` (`id_franja_horaria`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_franjas_dias_dias_semana` FOREIGN KEY (`id_dia_semana`) REFERENCES `dias_semana` (`id_dia`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.franjas_dias: ~14 rows (aproximadamente)
DELETE FROM `franjas_dias`;
INSERT INTO `franjas_dias` (`id_franja_dia`, `id_franja_horaria`, `id_dia_semana`) VALUES
	(22, 16, 1),
	(23, 16, 3),
	(24, 17, 2),
	(25, 17, 4),
	(26, 18, 5),
	(27, 19, 6),
	(28, 20, 7),
	(29, 21, 1),
	(30, 21, 2),
	(31, 21, 3),
	(32, 21, 4),
	(33, 21, 5),
	(34, 21, 6),
	(35, 21, 7);

-- Volcando estructura para tabla reservalo2.franjas_horarias
CREATE TABLE IF NOT EXISTS `franjas_horarias` (
  `id_franja_horaria` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_horario` int(11) NOT NULL DEFAULT 0,
  `id_instalacion` int(11) DEFAULT NULL,
  `hora_inicio_manana` time DEFAULT NULL,
  `hora_fin_manana` time DEFAULT NULL,
  `hora_inicio_tarde` time DEFAULT NULL,
  `hora_fin_tarde` time DEFAULT NULL,
  PRIMARY KEY (`id_franja_horaria`),
  KEY `id_tipo_horario` (`id_tipo_horario`),
  KEY `id_instalacion` (`id_instalacion`),
  CONSTRAINT `FK__tipo_horario` FOREIGN KEY (`id_tipo_horario`) REFERENCES `tipo_horario` (`id_tipo_horario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_franjas_horarias_instalaciones` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.franjas_horarias: ~6 rows (aproximadamente)
DELETE FROM `franjas_horarias`;
INSERT INTO `franjas_horarias` (`id_franja_horaria`, `id_tipo_horario`, `id_instalacion`, `hora_inicio_manana`, `hora_fin_manana`, `hora_inicio_tarde`, `hora_fin_tarde`) VALUES
	(16, 4, 42, '09:00:00', '14:00:00', '16:00:00', '18:30:00'),
	(17, 4, 42, '09:00:00', '14:00:00', '16:00:00', '19:00:00'),
	(18, 4, 42, '09:00:00', '14:00:00', '16:00:00', '18:00:00'),
	(19, 4, 42, '10:00:00', '13:00:00', '00:00:00', '00:00:00'),
	(20, 4, 42, '00:00:00', '00:00:00', '00:00:00', '00:00:00'),
	(21, 7, 42, '08:00:00', '14:00:00', '16:00:00', '21:00:00');

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
  `descripcion` varchar(500) DEFAULT '',
  `categoria_principal` int(11) DEFAULT NULL,
  `categoria_opcional1` int(11) DEFAULT NULL,
  `precio_completo` float DEFAULT NULL,
  `puede_completo` tinyint(4) DEFAULT 0,
  `no_pistas` tinyint(4) DEFAULT 0,
  `capacidad_completo` int(11) DEFAULT NULL,
  `estado` tinyint(4) DEFAULT 0,
  `material` tinyint(4) DEFAULT NULL,
  `iluminacion` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_instalacion`),
  KEY `FK1_categorias_instalaciones` (`categoria_principal`),
  KEY `FK2_categorias_instalaciones` (`categoria_opcional1`),
  CONSTRAINT `FK1_categorias_instalaciones` FOREIGN KEY (`categoria_principal`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK2_categorias_instalaciones` FOREIGN KEY (`categoria_opcional1`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.instalaciones: ~3 rows (aproximadamente)
DELETE FROM `instalaciones`;
INSERT INTO `instalaciones` (`id_instalacion`, `nombre`, `descripcion`, `categoria_principal`, `categoria_opcional1`, `precio_completo`, `puede_completo`, `no_pistas`, `capacidad_completo`, `estado`, `material`, `iluminacion`) VALUES
	(42, 'Campo de fútbol', 'Instalación de césped artificial de última generación, apta para fútbol 11 y divisible en dos campos de fútbol 7. Dispone de iluminación artificial, ideal para entrenamientos y partidos en horario nocturno.\r\nEl recinto cuenta con porterías móviles, banquillos y zonas laterales amplias. Además, se puede solicitar material deportivo adicional (balones, petos, conos, etc.) al realizar la reserva.\r\n\r\nPerfecto para competiciones, entrenamientos o partidos entre amigos.', 1, NULL, 48, 1, 0, 22, 0, 1, 1),
	(44, 'Salón de actos', 'Espacio amplio y funcional con capacidad para 100 personas, ideal para conferencias, presentaciones, reuniones, talleres o eventos culturales.\r\nEl salón dispone de escenario, equipo de sonido, proyector y sistema de iluminación, ofreciendo todas las comodidades necesarias para el desarrollo de actividades tanto institucionales como privadas.\r\n\r\nUn entorno cómodo y versátil, adaptable a diferentes tipos de eventos.', 2, 3, 0, 0, 1, 100, 0, 1, 1),
	(45, 'Pistas de pádel', 'Nuestras modernas instalaciones cuentan con dos pistas de pádel de moqueta azul y paredes de vidrio, diseñadas para ofrecer una experiencia de juego óptima tanto a jugadores principiantes como avanzados.\r\nUna de las pistas está totalmente techada, ideal para jugar sin importar las condiciones del clima, mientras que la otra es al aire libre, perfecta para disfrutar del sol y el entorno.\r\nAmbas pistas disponen de iluminación de alta calidad, lo que permite partidos nocturnos con excelente visibil', 1, NULL, 16, 1, 0, 8, 1, 1, 1);

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
  `capacidad_pista` int(11) DEFAULT 0,
  `precio_pista` float DEFAULT 0,
  `nombre_pista` varchar(255) DEFAULT NULL,
  `pista_unica` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id_pista`),
  KEY `FK1_pistas_instalacion` (`id_instalacion`),
  CONSTRAINT `FK1_pistas_instalacion` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pistas: ~7 rows (aproximadamente)
DELETE FROM `pistas`;
INSERT INTO `pistas` (`id_pista`, `id_instalacion`, `imagen1`, `imagen2`, `imagen3`, `imagen4`, `capacidad_pista`, `precio_pista`, `nombre_pista`, `pista_unica`) VALUES
	(89, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 14, 28, 'Pista de fútbol 7. nº1', 0),
	(90, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 14, 28, 'Pista de fútbol 7. nº2', 0),
	(91, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 22, 48, 'Instalación Campo de fútbol  completa', 0),
	(95, 44, 'SalonActos4.jpg', 'SalonActos3.jpg', 'SalonActos2.jpg', 'SalonActos1.jpg', 100, 0, 'pista única Salón de actos', 1),
	(96, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 4, 8, 'Pista de pádel techada', 0),
	(97, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 4, 8, 'Pista de pádel no techada', 0),
	(98, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 8, 16, 'Instalación Pistas de pádel completa', 0);

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

-- Volcando estructura para tabla reservalo2.tipo_horario
CREATE TABLE IF NOT EXISTS `tipo_horario` (
  `id_tipo_horario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT '',
  `descripcion` varchar(200) DEFAULT NULL,
  `color` varchar(50) DEFAULT '',
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_tipo_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.tipo_horario: ~2 rows (aproximadamente)
DELETE FROM `tipo_horario`;
INSERT INTO `tipo_horario` (`id_tipo_horario`, `nombre`, `descripcion`, `color`, `fecha_inicio`, `fecha_fin`) VALUES
	(4, 'Horario de verano', 'Horarios para los meses de verano (junio, julio, agosto y septiembre).', '#ff8040', '2025-06-09', '2025-09-15'),
	(7, 'Horario de invierno', 'Horarios para los meses de invierno (noviembre, diciembre y enero).', '#0000ff', '2025-11-17', '2026-01-31');

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
	(5, 'danielruizdeveloper@gmail.com', 'f39426ccdb0ce5e981c826977de6f19aaf2da984', 1, 'Daniel', '0f816ff0ded29886905e4bc24747835a0242f3f2f3045a8327e18eed59805de6e7596bb02ba34ac8d9d4f07e58516797c966', '2025-09-23 17:54:01'),
	(7, 'cristian1_24.fp@gmail.com', '4c7f83010ba7990acd919f7389432101301001dc', 1, 'Cristian ', NULL, NULL),
	(9, 'ruizsotodani2@gmail.com', '91cda6f4d61c06dcbc8b6efe056b346aed1431e7', 1, 'Dani', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
