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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.categorias: ~3 rows (aproximadamente)
DELETE FROM `categorias`;
INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
	(1, 'deporte'),
	(2, 'cultura'),
	(7, 'ocio');

-- Volcando estructura para tabla reservalo2.dias_semana
CREATE TABLE IF NOT EXISTS `dias_semana` (
  `id_dia` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_dia`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.dias_semana: ~6 rows (aproximadamente)
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
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.excepciones_horario: ~7 rows (aproximadamente)
DELETE FROM `excepciones_horario`;
INSERT INTO `excepciones_horario` (`id_excepciones_horario`, `id_tipo_horario_base`, `id_tipo_horario_excepcion`, `fecha_inicio`, `fecha_fin`) VALUES
	(119, 78, 79, '2026-03-16', '2026-03-16'),
	(120, 78, 79, '2026-03-17', '2026-03-17'),
	(121, 78, 79, '2026-03-18', '2026-03-18'),
	(122, 78, 79, '2026-03-19', '2026-03-19'),
	(123, 78, 79, '2026-03-20', '2026-03-20'),
	(124, 78, 79, '2026-03-21', '2026-03-21'),
	(125, 78, 79, '2026-03-22', '2026-03-22');

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
) ENGINE=InnoDB AUTO_INCREMENT=666 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.franjas_dias: ~21 rows (aproximadamente)
DELETE FROM `franjas_dias`;
INSERT INTO `franjas_dias` (`id_franja_dia`, `id_franja_horaria`, `id_dia_semana`) VALUES
	(638, 182, 1),
	(639, 182, 3),
	(640, 183, 2),
	(641, 183, 4),
	(642, 184, 5),
	(643, 185, 6),
	(644, 185, 7),
	(645, 186, 1),
	(646, 186, 2),
	(647, 186, 3),
	(648, 186, 4),
	(649, 186, 5),
	(650, 187, 6),
	(651, 187, 7),
	(659, 189, 1),
	(660, 189, 3),
	(661, 190, 2),
	(662, 190, 4),
	(663, 191, 5),
	(664, 192, 6),
	(665, 192, 7);

-- Volcando estructura para tabla reservalo2.franjas_horarias
CREATE TABLE IF NOT EXISTS `franjas_horarias` (
  `id_franja_horaria` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_horario` int(11) NOT NULL DEFAULT 0,
  `id_instalacion` int(11) DEFAULT NULL,
  `hora_inicio_manana` time DEFAULT NULL,
  `hora_fin_manana` time DEFAULT NULL,
  `hora_inicio_tarde` time DEFAULT NULL,
  `hora_fin_tarde` time DEFAULT NULL,
  `franja_unica` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id_franja_horaria`),
  KEY `id_tipo_horario` (`id_tipo_horario`),
  KEY `id_instalacion` (`id_instalacion`),
  CONSTRAINT `FK__tipo_horario` FOREIGN KEY (`id_tipo_horario`) REFERENCES `tipo_horario` (`id_tipo_horario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_franjas_horarias_instalaciones` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.franjas_horarias: ~10 rows (aproximadamente)
DELETE FROM `franjas_horarias`;
INSERT INTO `franjas_horarias` (`id_franja_horaria`, `id_tipo_horario`, `id_instalacion`, `hora_inicio_manana`, `hora_fin_manana`, `hora_inicio_tarde`, `hora_fin_tarde`, `franja_unica`) VALUES
	(182, 78, 42, '08:30:00', '14:00:00', '17:00:00', '19:00:00', 0),
	(183, 78, 42, '08:30:00', '14:00:00', '17:00:00', '20:00:00', 0),
	(184, 78, 42, '08:30:00', '14:00:00', '00:00:00', '00:00:00', 0),
	(185, 78, 42, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 0),
	(186, 79, 42, '08:30:00', '14:00:00', '00:00:00', '00:00:00', 0),
	(187, 79, 42, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 0),
	(189, 80, 42, '09:00:00', '14:00:00', '16:00:00', '19:00:00', 0),
	(190, 80, 42, '09:00:00', '14:00:00', '16:00:00', '20:00:00', 0),
	(191, 80, 42, '09:00:00', '14:00:00', '00:00:00', '00:00:00', 0),
	(192, 80, 42, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 0);

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
  `tipo_reserva` tinyint(4) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_instalacion`),
  KEY `FK1_categorias_instalaciones` (`categoria_principal`),
  KEY `FK2_categorias_instalaciones` (`categoria_opcional1`),
  CONSTRAINT `FK1_categorias_instalaciones` FOREIGN KEY (`categoria_principal`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK2_categorias_instalaciones` FOREIGN KEY (`categoria_opcional1`) REFERENCES `categorias` (`id_categoria`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.instalaciones: ~4 rows (aproximadamente)
DELETE FROM `instalaciones`;
INSERT INTO `instalaciones` (`id_instalacion`, `nombre`, `descripcion`, `categoria_principal`, `categoria_opcional1`, `precio_completo`, `puede_completo`, `no_pistas`, `capacidad_completo`, `estado`, `material`, `iluminacion`, `tipo_reserva`, `direccion`) VALUES
	(42, 'Campo de fútbol', 'Instalación de césped artificial de última generación, apta para fútbol 11 y divisible en dos campos de fútbol 7. Dispone de iluminación artificial, ideal para entrenamientos y partidos en horario nocturno.\r\nEl recinto cuenta con porterías móviles, banquillos y zonas laterales amplias. Además, se puede solicitar material deportivo adicional (balones, petos, conos, etc.) al realizar la reserva.\r\n\r\nPerfecto para competiciones, entrenamientos o partidos entre amigos.', 1, NULL, 48, 1, 0, 22, 0, 1, 1, 0, 'C/ La Roda, 47. 29520. Fuente de Piedra'),
	(44, 'Salón de actos', 'Espacio amplio y funcional con capacidad para 100 personas, ideal para conferencias, presentaciones, reuniones, talleres o eventos culturales.\r\nEl salón dispone de escenario, equipo de sonido, proyector y sistema de iluminación, ofreciendo todas las comodidades necesarias para el desarrollo de actividades tanto institucionales como privadas.\r\n\r\nUn entorno cómodo y versátil, adaptable a diferentes tipos de eventos.', 2, 1, 0, 0, 1, 100, 0, 1, 1, 0, 'C/ Ancha, 9. 29520. Fuente de Piedra'),
	(45, 'Pistas de pádel', 'Nuestras modernas instalaciones cuentan con dos pistas de pádel de moqueta azul y paredes de vidrio, diseñadas para ofrecer una experiencia de juego óptima tanto a jugadores principiantes como avanzados.\r\nUna de las pistas está totalmente techada, ideal para jugar sin importar las condiciones del clima, mientras que la otra es al aire libre, perfecta para disfrutar del sol y el entorno.\r\nAmbas pistas disponen de iluminación de alta calidad, lo que permite partidos nocturnos con excelente visibil', 1, NULL, 16, 1, 0, 8, 1, 1, 1, 0, 'C/ La Roda, 47. 29520. Fuente de Piedra'),
	(51, 'Silo', 'Instalación en la que se puede celebrar todo tipo de festejos como cumpleaños, reuniones, ensayos... Dispone de corriente, iluminación, sillas, mesas, escenario y un servicio', 2, 1, 0, 0, 1, 50, 0, 1, 1, 1, 'C/ de la Estación. 29520. Fuente de Piedra.');

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

-- Volcando estructura para tabla reservalo2.pagos
CREATE TABLE IF NOT EXISTS `pagos` (
  `id_pago` int(11) NOT NULL AUTO_INCREMENT,
  `id_reserva` int(11) NOT NULL,
  `precio_reserva` float NOT NULL DEFAULT 0,
  `resto_precio_pedido` float NOT NULL DEFAULT 0,
  `fecha_pago` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_pago`),
  KEY `id_reserva` (`id_reserva`),
  CONSTRAINT `FK__reservas` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id_reserva`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pagos: ~0 rows (aproximadamente)
DELETE FROM `pagos`;
INSERT INTO `pagos` (`id_pago`, `id_reserva`, `precio_reserva`, `resto_precio_pedido`, `fecha_pago`) VALUES
	(9, 192, 28, 28, '2026-02-27 08:05:19');

-- Volcando estructura para tabla reservalo2.pedido
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha_pedido` timestamp NULL DEFAULT NULL,
  `precio_pedido` float DEFAULT NULL,
  `num_pedido` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `num_pedido` (`num_pedido`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `FK__usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pedido: ~10 rows (aproximadamente)
DELETE FROM `pedido`;
INSERT INTO `pedido` (`id_pedido`, `id_usuario`, `fecha_pedido`, `precio_pedido`, `num_pedido`) VALUES
	(82, 19, '2026-02-25 16:15:18', 56, '20260225-171518-001'),
	(84, 16, '2026-02-27 08:02:54', 56, '20260227-090254-001'),
	(85, 16, '2026-02-27 08:03:12', 56, '20260227-090312-001'),
	(86, 16, '2026-03-02 10:57:43', 28, '20260302-115743-001'),
	(90, 16, '2026-03-04 16:50:25', 28, '20260304-175025-001'),
	(91, 19, '2026-03-04 16:52:09', 28, '20260304-175209-001'),
	(92, 18, '2026-03-04 16:54:15', 28, '20260304-175415-001'),
	(93, 17, '2026-03-04 16:56:49', 28, '20260304-175649-001'),
	(94, 18, '2026-03-04 16:57:25', 28, '20260304-175725-001'),
	(95, 16, '2026-03-04 16:58:12', 56, '20260304-175812-001'),
	(98, 16, '2026-03-09 10:17:28', 0, '20260309-111728-001');

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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pistas: ~8 rows (aproximadamente)
DELETE FROM `pistas`;
INSERT INTO `pistas` (`id_pista`, `id_instalacion`, `imagen1`, `imagen2`, `imagen3`, `imagen4`, `capacidad_pista`, `precio_pista`, `nombre_pista`, `pista_unica`) VALUES
	(89, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 14, 28, 'Pista de fútbol 7. nº1', 0),
	(90, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 14, 28, 'Pista de fútbol 7. nº2', 0),
	(91, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 22, 48, 'Instalación Campo de fútbol  completa', 0),
	(95, 44, 'SalonActos4.jpg', 'SalonActos3.jpg', 'SalonActos2.jpg', 'SalonActos1.jpg', 100, 0, 'pista única Salón de actos', 1),
	(96, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 4, 8, 'Pista de pádel techada', 0),
	(97, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 4, 8, 'Pista de pádel no techada', 0),
	(98, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 8, 16, 'Instalación Pistas de pádel completa', 0),
	(101, 51, 'silo1.jpg', 'silo2.jpg', 'silo3.jpg', 'silo4.jpg', 50, 0, 'pista única Silo', 1);

-- Volcando estructura para tabla reservalo2.reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id_reserva` int(11) NOT NULL AUTO_INCREMENT,
  `id_pista` int(11) NOT NULL DEFAULT 0,
  `id_usuario` int(11) NOT NULL DEFAULT 0,
  `id_pedido` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `fecha_reserva` timestamp NULL DEFAULT NULL,
  `pagadas` tinyint(4) DEFAULT NULL,
  `precio_reserva` float DEFAULT 0,
  PRIMARY KEY (`id_reserva`),
  KEY `id_pista` (`id_pista`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_pedido` (`id_pedido`),
  CONSTRAINT `FK_reservas_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_reservas_pistas` FOREIGN KEY (`id_pista`) REFERENCES `pistas` (`id_pista`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_reservas_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.reservas: ~19 rows (aproximadamente)
DELETE FROM `reservas`;
INSERT INTO `reservas` (`id_reserva`, `id_pista`, `id_usuario`, `id_pedido`, `fecha`, `hora_inicio`, `hora_final`, `fecha_reserva`, `pagadas`, `precio_reserva`) VALUES
	(188, 89, 19, 82, '2026-02-27', '12:00:00', '13:00:00', '2026-02-25 16:15:18', 0, 28),
	(189, 89, 19, 82, '2026-02-27', '13:00:00', '14:00:00', '2026-02-25 16:15:18', 0, 28),
	(192, 89, 16, 84, '2026-02-27', '17:00:00', '18:00:00', '2026-02-27 08:02:54', 0, 28),
	(194, 89, 16, 85, '2026-02-27', '17:00:00', '18:00:00', '2026-02-27 08:03:12', 0, 28),
	(195, 89, 16, 85, '2026-02-27', '18:00:00', '19:00:00', '2026-02-27 08:03:12', 0, 28),
	(196, 89, 16, 86, '2026-02-27', '18:00:00', '19:00:00', '2026-03-02 10:57:43', 0, 28),
	(211, 89, 16, 90, '2026-03-04', '18:00:00', '19:00:00', '2026-03-04 16:50:25', 0, 28),
	(212, 89, 19, 91, '2026-03-06', '08:00:00', '09:00:00', '2026-03-04 16:52:09', 0, 28),
	(213, 89, 18, 92, '2026-03-06', '09:00:00', '10:00:00', '2026-03-04 16:54:15', 0, 28),
	(214, 89, 17, 93, '2026-03-06', '10:00:00', '11:00:00', '2026-03-04 16:56:49', 0, 28),
	(215, 89, 18, 94, '2026-03-12', '19:00:00', '20:00:00', '2026-03-04 16:57:25', 0, 28),
	(216, 89, 16, 95, '2026-03-13', '10:00:00', '11:00:00', '2026-03-04 16:58:12', 0, 28),
	(217, 89, 16, 95, '2026-03-13', '11:00:00', '12:00:00', '2026-03-04 16:58:12', 0, 28),
	(218, 101, 16, 98, '2026-03-10', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(219, 101, 16, 98, '2026-03-11', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(220, 101, 16, 98, '2026-03-12', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(221, 101, 16, 98, '2026-03-13', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(222, 101, 16, 98, '2026-03-14', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(223, 101, 16, 98, '2026-03-15', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0);

-- Volcando estructura para tabla reservalo2.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.roles: ~0 rows (aproximadamente)
DELETE FROM `roles`;
INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
	(1, 'público'),
	(2, 'administrador');

-- Volcando estructura para tabla reservalo2.tipo_horario
CREATE TABLE IF NOT EXISTS `tipo_horario` (
  `id_tipo_horario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT '',
  `descripcion` varchar(250) DEFAULT NULL,
  `color` varchar(50) DEFAULT '',
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `es_especial` tinyint(4) DEFAULT 0,
  `sin_fecha` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id_tipo_horario`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.tipo_horario: ~0 rows (aproximadamente)
DELETE FROM `tipo_horario`;
INSERT INTO `tipo_horario` (`id_tipo_horario`, `nombre`, `descripcion`, `color`, `fecha_inicio`, `fecha_fin`, `es_especial`, `sin_fecha`) VALUES
	(78, 'Horario de primavera 2026', 'Horario para los meses de primavera del año 2026', '#3ed048', '2026-02-01', '2026-06-15', 0, 0),
	(79, 'Horario solo mañana de primavera 2026', 'Horario para los meses de primavera del año 2026, en los que solo se abrirá por la mañana', '#0c1bed', '2026-01-01', '2026-12-31', 1, 1),
	(80, 'Horario de enero 2026', 'Horario para el mes de enero', '#0ccfe9', '2026-01-01', '2026-01-31', 0, 0);

-- Volcando estructura para tabla reservalo2.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `telf` char(9) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_date` datetime DEFAULT NULL,
  `usuario_baja` tinyint(4) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `ultimo_inicio` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_roles_01` (`id_rol`),
  CONSTRAINT `fk_usuarios_roles_01` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.usuarios: ~5 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id_usuario`, `email`, `password`, `id_rol`, `nombre`, `telf`, `token`, `token_date`, `usuario_baja`, `fecha_registro`, `ultimo_inicio`) VALUES
	(15, 'admin.instalaciones@fuentedepiedra.com', '1474b04e54fb64ce2557315183de2aa6d2ed8157', 2, 'Administrador', '681671014', NULL, NULL, 0, '2026-02-25', '2026-03-09 15:13:23'),
	(16, 'ruizsotodani2@gmail.com', 'f39426ccdb0ce5e981c826977de6f19aaf2da984', 1, 'Daniel', '681671014', NULL, NULL, 1, '2026-02-25', '2026-03-04 12:59:02'),
	(17, '1402monicahidalgo@gmail.com', '7ce8cae50accf9da162cd63db3d64aa4a0f8a4c2', 1, 'Monica', '656194528', NULL, NULL, 0, '2026-02-25', '2026-02-25 10:13:06'),
	(18, 'eliasruizespejo1903@gmail.com', '825085d930cdb82b011dd9504638ca9b79a2e09b', 1, 'Elias', '685167679', NULL, NULL, 0, '2026-02-25', '2026-02-25 10:14:06'),
	(19, 'inmasoto69@gmail.com', 'cd10e2869b70a1690734b968503dbb5fedfb78fe', 1, 'Inmaculada', '635531629', NULL, NULL, 0, '2026-02-25', '2026-02-25 16:20:58');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
