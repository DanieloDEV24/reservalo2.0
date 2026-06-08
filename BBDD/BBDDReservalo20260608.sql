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

-- Volcando estructura para tabla reservalo2.actividad
CREATE TABLE IF NOT EXISTS `actividad` (
  `id_actividad` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(11) NOT NULL DEFAULT 0,
  `descripcion` varchar(250) NOT NULL DEFAULT '',
  `fecha` timestamp NULL DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_actividad`),
  KEY `tipo` (`tipo`),
  KEY `FK_actividad_usuarios` (`id_usuario`),
  CONSTRAINT `FK_actividad_tipo_actividad` FOREIGN KEY (`tipo`) REFERENCES `tipo_actividad` (`id_tipo_actividad`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_actividad_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.actividad: ~173 rows (aproximadamente)
DELETE FROM `actividad`;
INSERT INTO `actividad` (`id_actividad`, `tipo`, `descripcion`, `fecha`, `id_usuario`) VALUES
	(3, 22, 'Cerrado de sesión del usuarioadmin.instalaciones@fuentedepiedra.com', '2026-03-10 12:09:22', 15),
	(4, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-10 12:10:37', 15),
	(5, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-10 16:01:25', 15),
	(6, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-11 08:40:57', 15),
	(8, 1, 'Reserva de la pista Pista de fútbol 7. nº1', '2026-03-11 09:54:28', 15),
	(9, 9, 'Modificación de la instalación Pistas de pádel', '2026-03-11 09:55:30', 15),
	(10, 10, 'Creación del horario Semana del deporte', '2026-03-11 10:00:30', 15),
	(11, 9, 'Modificación de la instalación Silo', '2026-03-11 11:54:36', 15),
	(12, 9, 'Modificación de la instalación Salón de actos', '2026-03-11 11:55:03', 15),
	(13, 9, 'Modificación de la instalación Salón de actos', '2026-03-11 11:55:16', 15),
	(14, 1, 'Reserva de la pista pista única Salón de actos', '2026-03-11 12:57:05', 15),
	(15, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-11 15:43:28', 15),
	(16, 6, 'Inicio de sesión del usuario ruizsotodani2@gmail.com', '2026-03-12 22:07:17', 16),
	(17, 22, 'Cerrado de sesión del usuarioruizsotodani2@gmail.com', '2026-03-12 22:08:55', 16),
	(18, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-12 22:09:10', 15),
	(19, 14, 'Cambio de horarios', '2026-03-12 22:09:48', 15),
	(20, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-17 20:22:06', 15),
	(21, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-23 08:35:42', 15),
	(22, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-23 16:17:30', 15),
	(23, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-24 16:32:14', 15),
	(24, 23, 'Cambio de contraseña ruizsotodani2@gmail.com', '2026-03-25 12:30:19', 16),
	(25, 23, 'Cambio de contraseña ruizsotodani2@gmail.com', '2026-03-25 12:43:01', 16),
	(26, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-25 15:50:04', 15),
	(27, 1, 'Reserva de la pista Pista de fútbol 7. nº1', '2026-03-25 15:52:19', 15),
	(28, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-26 08:34:54', 15),
	(29, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-26 15:13:00', 15),
	(30, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-26 20:43:51', 15),
	(31, 22, 'Cerrado de sesión del usuarioadmin.instalaciones@fuentedepiedra.com', '2026-03-26 21:01:39', 15),
	(32, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-26 21:30:34', 15),
	(33, 22, 'Cerrado de sesión del usuarioadmin.instalaciones@fuentedepiedra.com', '2026-03-26 21:34:09', 15),
	(34, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-26 22:17:19', 15),
	(35, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-03-27 07:03:25', 15),
	(36, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-06 07:51:02', 15),
	(37, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-06 14:26:03', 15),
	(38, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-06 14:28:18', 15),
	(39, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-06 14:56:09', 15),
	(40, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-06 14:56:10', 15),
	(41, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-07 14:50:19', 15),
	(42, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-07 14:51:31', 15),
	(43, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-07 15:27:25', 15),
	(44, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 08:16:47', 15),
	(45, 1, 'Reserva de la pista Pista de fútbol 7. nº1', '2026-04-08 10:45:53', 15),
	(46, 22, 'Cerrado de sesión del usuarioadmin.instalaciones@fuentedepiedra.com', '2026-04-08 10:59:17', 15),
	(47, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 11:07:25', 15),
	(48, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 11:07:27', 15),
	(49, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 11:11:07', 15),
	(50, 22, 'Cerrado de sesión del usuarioadmin.instalaciones@fuentedepiedra.com', '2026-04-08 11:24:51', 15),
	(51, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 11:31:59', 15),
	(52, 1, 'Reserva de la pista Pista de fútbol 7. nº1', '2026-04-08 11:45:45', 15),
	(53, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 14:06:04', 15),
	(54, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 14:10:41', 15),
	(55, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-08 14:15:57', 15),
	(56, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-09 07:37:51', 15),
	(57, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-09 07:38:45', 15),
	(58, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-09 08:07:48', 15),
	(59, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-09 08:07:49', 15),
	(60, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-09 14:03:41', 15),
	(61, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-09 14:22:26', 15),
	(62, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-09 14:30:20', 15),
	(63, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-10 05:47:04', 15),
	(64, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-10 07:34:17', 15),
	(65, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-10 08:26:47', 15),
	(66, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-10 10:27:09', 15),
	(67, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-12 10:49:36', 15),
	(68, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 07:20:22', 15),
	(69, 17, 'Creación de la pista egerger', '2026-04-13 07:35:07', 15),
	(70, 18, 'Borrado de la pista egerger', '2026-04-13 07:35:20', 15),
	(71, 19, 'Alta de la instalación Pistas de pádel', '2026-04-13 08:09:34', 15),
	(72, 13, 'Baja de la instalación Pistas de pádel', '2026-04-13 08:09:39', 15),
	(73, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 08:43:50', 15),
	(74, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 08:51:52', 15),
	(75, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 08:51:53', 15),
	(76, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 14:29:55', 15),
	(77, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 14:31:05', 15),
	(78, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 14:31:06', 15),
	(79, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 15:12:30', 15),
	(80, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 15:39:30', 15),
	(81, 22, 'Cerrado de sesión del usuarioadmin.instalaciones@fuentedepiedra.com', '2026-04-13 15:48:00', 15),
	(82, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 16:04:55', 15),
	(83, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 20:42:38', 15),
	(84, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-13 21:13:58', 15),
	(85, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 07:45:18', 15),
	(86, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 07:47:29', 15),
	(87, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 08:03:40', 15),
	(88, 22, 'Cerrado de sesión del usuarioadmin.instalaciones@fuentedepiedra.com', '2026-04-14 08:04:36', 15),
	(89, 14, 'Cambio de horarios', '2026-04-14 08:24:40', 15),
	(90, 14, 'Cambio de horarios', '2026-04-14 08:24:40', 15),
	(91, 14, 'Cambio de horarios', '2026-04-14 08:24:40', 15),
	(92, 14, 'Cambio de horarios', '2026-04-14 08:24:40', 15),
	(93, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 10:21:00', 15),
	(94, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 10:54:04', 15),
	(95, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 11:21:10', 15),
	(96, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 14:30:39', 15),
	(97, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 14:31:54', 15),
	(98, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 14:31:57', 15),
	(99, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 16:55:48', 15),
	(100, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-14 16:57:50', 15),
	(101, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 07:52:29', 15),
	(102, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 09:32:30', 15),
	(103, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 09:32:31', 15),
	(104, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 09:32:32', 15),
	(105, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 09:32:34', 15),
	(106, 20, 'Baja del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 10:16:05', 15),
	(107, 21, 'Alta del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 10:16:09', 15),
	(108, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-15 14:08:53', 15),
	(109, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-27 09:58:47', 15),
	(110, 17, 'Creación de la pista Pista de futbol 7. nº3', '2026-04-27 09:59:41', 15),
	(111, 9, 'Modificación de la instalación Campo de fútbol', '2026-04-27 09:59:47', 15),
	(112, 18, 'Borrado de la pista Pista de futbol 7. nº3', '2026-04-27 10:13:16', 15),
	(113, 19, 'Alta de la instalación Pistas de pádel', '2026-04-27 12:49:51', 15),
	(114, 1, 'Reserva de la pista Instalación Pistas de pádel completa', '2026-04-27 12:53:27', 15),
	(115, 18, 'Borrado de la pista Instalación Pistas de pádel completa', '2026-04-27 13:16:30', 15),
	(116, 9, 'Modificación de la instalación Pistas de pádel', '2026-04-27 13:16:39', 15),
	(125, 4, 'Registro del usuario minguito', '2026-04-28 11:06:58', 31),
	(126, 4, 'Registro del usuario usuario', '2026-04-28 17:16:14', 32),
	(127, 22, 'Cerrado de sesión del usuariousuario.prueba@hotmail.com', '2026-04-28 17:33:55', 32),
	(128, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-28 17:34:30', 15),
	(129, 4, 'Registro del usuario raul', '2026-04-30 10:19:44', 33),
	(130, 22, 'Cerrado de sesión del usuarioraulgamer@gmail.com', '2026-04-30 10:19:53', 33),
	(131, 6, 'Inicio de sesión del usuario ruizsotodani2@gmail.com', '2026-04-30 10:23:24', 16),
	(132, 15, 'Modificación del usuario ruizsotodani2@gmail.com', '2026-04-30 10:34:43', 16),
	(133, 15, 'Modificación del usuario ruizsotodani2@gmail.com', '2026-04-30 10:35:13', 16),
	(134, 15, 'Modificación del usuario ruizsotodani2@gmail.com', '2026-04-30 10:38:53', 16),
	(135, 15, 'Modificación del usuario ruizsotodani2@gmail.com', '2026-04-30 10:39:14', 16),
	(136, 22, 'Cerrado de sesión del usuarioruizsotodani2@gmail.com', '2026-04-30 10:39:43', 16),
	(137, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-30 10:40:08', 15),
	(138, 15, 'Modificación del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-30 10:40:43', 15),
	(139, 15, 'Modificación del usuario admin.instalaciones@fuentedepiedra.com', '2026-04-30 10:40:53', 15),
	(140, 6, 'Inicio de sesión del usuario ruizsotodani2@gmail.com', '2026-04-30 16:17:56', 16),
	(141, 22, 'Cerrado de sesión del usuarioruizsotodani2@gmail.com', '2026-04-30 19:18:46', 16),
	(142, 6, 'Inicio de sesión del usuario ruizsotodani2@gmail.com', '2026-04-30 19:21:17', 16),
	(143, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-05-04 09:11:20', 15),
	(144, 6, 'Inicio de sesión del usuario ruizsotodani2@gmail.com', '2026-05-12 15:09:50', 16),
	(145, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-05-24 19:12:36', 15),
	(146, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-05-27 10:03:17', 15),
	(147, 13, 'Baja de la instalación Pistas de pádel', '2026-05-27 10:12:44', 15),
	(148, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-05-28 10:05:22', 15),
	(149, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-05-28 15:51:03', 15),
	(150, 1, 'Reserva de la pista Pista de fútbol 7. nº1', '2026-05-28 15:51:32', 15),
	(151, 11, 'Modificación del horario Horario de primavera 2026', '2026-05-28 15:52:45', 15),
	(152, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-05-31 20:34:37', 15),
	(153, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-02 10:52:27', 15),
	(154, 24, 'Anulación del CheckIn de la reserva de la pista Pista de fútbol 7. nº1', '2026-06-02 11:13:28', 15),
	(155, 3, 'Confirmación de la reserva Pista de fútbol 7. nº1', '2026-06-02 11:13:32', 15),
	(156, 24, 'Anulación del CheckIn de la reserva de la pista Pista de fútbol 7. nº1', '2026-06-02 11:13:35', 15),
	(157, 6, 'Inicio de sesión del usuario ruizsotodani2@gmail.com', '2026-06-03 10:14:06', 16),
	(158, 22, 'Cerrado de sesión del usuarioruizsotodani2@gmail.com', '2026-06-03 10:14:43', 16),
	(159, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-03 10:14:59', 15),
	(160, 11, 'Modificación del horario junio', '2026-06-03 11:38:39', 15),
	(161, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-03 15:19:47', 15),
	(162, 1, 'Reserva de la pista Pista de fútbol 7. nº1', '2026-06-03 15:30:57', 15),
	(163, 1, 'Reserva de la pista Pista de fútbol 7. nº1', '2026-06-03 15:32:55', 15),
	(164, 1, 'Reserva de la pista Pista de fútbol 7. nº2', '2026-06-03 15:33:29', 15),
	(165, 7, 'Creación de la instalación Pistas de tenis', '2026-06-03 15:40:42', 15),
	(166, 9, 'Modificación de la instalación Pistas de tenis', '2026-06-03 16:19:22', 15),
	(167, 9, 'Modificación de la instalación Pistas de tenis', '2026-06-03 16:19:59', 15),
	(168, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-04 09:39:56', 15),
	(169, 11, 'Modificación del horario Horario de verano', '2026-06-04 11:31:20', 15),
	(170, 11, 'Modificación del horario Horario de verano', '2026-06-04 11:39:55', 15),
	(171, 11, 'Modificación del horario sajdhflasef', '2026-06-04 11:43:10', 15),
	(172, 11, 'Modificación del horario gtbgvdfgf', '2026-06-04 11:49:41', 15),
	(173, 11, 'Modificación del horario sdfwsdfasd', '2026-06-04 11:51:05', 15),
	(174, 11, 'Modificación del horario hasjdklhas', '2026-06-04 12:51:59', 15),
	(175, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-04 15:30:38', 15),
	(176, 11, 'Modificación del horario Horario de verano Ayuntamiento', '2026-06-04 15:36:51', 15),
	(177, 11, 'Modificación del horario Horario de verano Ayuntamiento', '2026-06-04 15:43:09', 15),
	(178, 11, 'Modificación del horario Horario Verano Ayuntamieto', '2026-06-04 15:45:43', 15),
	(179, 11, 'Modificación del horario Horario de verano Ayuntamiento', '2026-06-04 15:48:48', 15),
	(180, 11, 'Modificación del horario Horario de verano', '2026-06-04 15:50:36', 15),
	(181, 11, 'Modificación del horario Horario de verano Ayuntamiento', '2026-06-04 15:53:03', 15),
	(182, 12, 'Modificación del horario Horario de verano', '2026-06-04 16:35:27', 15),
	(183, 12, 'Modificación del horario Horario de verano', '2026-06-04 16:40:47', 15),
	(184, 12, 'Modificación del horario Horario de verano', '2026-06-04 16:54:17', 15),
	(185, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-04 20:13:23', 15),
	(186, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-05 07:42:52', 15),
	(187, 11, 'Borrado del horario Horario de verano instalaciones deportivas', '2026-06-05 08:46:30', 15),
	(188, 11, 'Borrado del horario Horario prueba', '2026-06-05 08:49:27', 15),
	(189, 10, 'Creación del horario Horario vacaciones', '2026-06-05 10:13:25', 15),
	(190, 10, 'Creación del horario Horario de vacaciones', '2026-06-05 10:21:09', 15),
	(191, 10, 'Creación del horario kdjhfljkas', '2026-06-05 10:25:56', 15),
	(192, 10, 'Creación del horario Horario de vacaciones', '2026-06-05 10:28:42', 15),
	(193, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-05 15:10:29', 15),
	(194, 12, 'Modificación del horario Horario de verano', '2026-06-05 15:26:52', 15),
	(195, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-06 14:46:39', 15),
	(196, 10, 'Creación del horario Horario de vacaciones instalaciones deportivas. ', '2026-06-06 15:11:27', 15),
	(197, 10, 'Creación del horario Vacaciones instalaciones polideportivo.', '2026-06-06 15:14:33', 15),
	(198, 10, 'Creación del horario Vacaciones de verano polideportivo', '2026-06-06 15:20:09', 15),
	(199, 10, 'Creación del horario Vacaciones de verano instalaciones polideportivo.', '2026-06-06 15:22:40', 15),
	(200, 6, 'Inicio de sesión del usuario admin.instalaciones@fuentedepiedra.com', '2026-06-07 20:05:10', 15),
	(201, 10, 'Creación del horario Vacaciones verano polideportivo', '2026-06-07 20:19:07', 15);

-- Volcando estructura para tabla reservalo2.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.categorias: ~4 rows (aproximadamente)
DELETE FROM `categorias`;
INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
	(1, 'deporte'),
	(2, 'cultura'),
	(7, 'ocio'),
	(11, 'entretenimiento');

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
  `id_instalacion` int(11) DEFAULT 0,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_excepciones_horario`),
  KEY `id_tipo_horario_base` (`id_tipo_horario_base`),
  KEY `id_tipo_horario_excepcion` (`id_tipo_horario_excepcion`),
  KEY `id_instalacion` (`id_instalacion`),
  CONSTRAINT `FK_excepciones_horario_instalaciones` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_excepciones_horario_tipo_horario` FOREIGN KEY (`id_tipo_horario_base`) REFERENCES `tipo_horario` (`id_tipo_horario`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_excepciones_horario_tipo_horario_2` FOREIGN KEY (`id_tipo_horario_excepcion`) REFERENCES `tipo_horario` (`id_tipo_horario`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.excepciones_horario: ~11 rows (aproximadamente)
DELETE FROM `excepciones_horario`;
INSERT INTO `excepciones_horario` (`id_excepciones_horario`, `id_tipo_horario_base`, `id_tipo_horario_excepcion`, `id_instalacion`, `fecha_inicio`, `fecha_fin`) VALUES
	(176, 109, 114, 42, '2026-07-01', '2026-07-15'),
	(177, 109, 114, 42, '2026-07-01', '2026-07-15'),
	(178, 109, 114, 42, '2026-07-01', '2026-07-15'),
	(179, 109, 114, 42, '2026-07-01', '2026-07-15'),
	(180, 109, 114, 45, '2026-06-01', '2026-09-30'),
	(181, 109, 114, 45, '2026-06-01', '2026-09-30'),
	(182, 109, 114, 45, '2026-06-01', '2026-09-30'),
	(183, 109, 114, 66, '2026-06-01', '2026-09-30'),
	(184, 109, 114, 66, '2026-06-01', '2026-09-30'),
	(185, 109, 114, 66, '2026-06-01', '2026-09-30'),
	(186, 109, 114, 66, '2026-06-01', '2026-09-30');

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
) ENGINE=InnoDB AUTO_INCREMENT=1268 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.franjas_dias: ~41 rows (aproximadamente)
DELETE FROM `franjas_dias`;
INSERT INTO `franjas_dias` (`id_franja_dia`, `id_franja_horaria`, `id_dia_semana`) VALUES
	(1142, 309, 1),
	(1143, 309, 2),
	(1144, 309, 4),
	(1145, 310, 3),
	(1146, 310, 5),
	(1147, 311, 6),
	(1148, 312, 7),
	(1149, 313, 1),
	(1150, 313, 2),
	(1151, 313, 4),
	(1152, 314, 3),
	(1153, 314, 5),
	(1154, 315, 6),
	(1155, 316, 7),
	(1156, 317, 1),
	(1157, 317, 2),
	(1158, 317, 4),
	(1159, 318, 3),
	(1160, 318, 5),
	(1161, 319, 6),
	(1247, 333, 1),
	(1248, 333, 2),
	(1249, 333, 3),
	(1250, 333, 4),
	(1251, 333, 5),
	(1252, 333, 6),
	(1253, 333, 7),
	(1254, 334, 1),
	(1255, 334, 2),
	(1256, 334, 3),
	(1257, 334, 4),
	(1258, 334, 5),
	(1259, 334, 6),
	(1260, 334, 7),
	(1261, 335, 1),
	(1262, 335, 2),
	(1263, 335, 3),
	(1264, 335, 4),
	(1265, 335, 5),
	(1266, 335, 6),
	(1267, 335, 7);

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
) ENGINE=InnoDB AUTO_INCREMENT=336 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.franjas_horarias: ~14 rows (aproximadamente)
DELETE FROM `franjas_horarias`;
INSERT INTO `franjas_horarias` (`id_franja_horaria`, `id_tipo_horario`, `id_instalacion`, `hora_inicio_manana`, `hora_fin_manana`, `hora_inicio_tarde`, `hora_fin_tarde`, `franja_unica`) VALUES
	(309, 109, 66, '08:00:00', '14:00:00', '18:00:00', '22:00:00', 0),
	(310, 109, 66, '08:00:00', '14:00:00', '18:00:00', '20:00:00', 0),
	(311, 109, 66, '10:00:00', '13:00:00', '00:00:00', '00:00:00', 0),
	(312, 109, 66, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 0),
	(313, 109, 42, '08:00:00', '14:00:00', '19:00:00', '22:00:00', 0),
	(314, 109, 42, '08:00:00', '14:00:00', '19:00:00', '20:00:00', 0),
	(315, 109, 42, '10:00:00', '13:00:00', '00:00:00', '00:00:00', 0),
	(316, 109, 42, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 0),
	(317, 109, 45, '08:00:00', '14:00:00', '19:00:00', '22:00:00', 0),
	(318, 109, 45, '08:00:00', '14:00:00', '19:00:00', '20:00:00', 0),
	(319, 109, 45, '10:00:00', '13:00:00', '00:00:00', '00:00:00', 0),
	(333, 114, 42, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 1),
	(334, 114, 45, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 1),
	(335, 114, 66, '00:00:00', '00:00:00', '00:00:00', '00:00:00', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.instalaciones: ~4 rows (aproximadamente)
DELETE FROM `instalaciones`;
INSERT INTO `instalaciones` (`id_instalacion`, `nombre`, `descripcion`, `categoria_principal`, `categoria_opcional1`, `precio_completo`, `puede_completo`, `no_pistas`, `capacidad_completo`, `estado`, `material`, `iluminacion`, `tipo_reserva`, `direccion`) VALUES
	(42, 'Campo de fútbol', 'Instalación de césped artificial de última generación, apta para fútbol 11 y divisible en dos campos de fútbol 7. Dispone de iluminación artificial, ideal para entrenamientos y partidos en horario nocturno.\r\nEl recinto cuenta con porterías móviles, banquillos y zonas laterales amplias. Además, se puede solicitar material deportivo adicional (balones, petos, conos, etc.) al realizar la reserva.\r\n\r\nPerfecto para competiciones, entrenamientos o partidos entre amigos.', 1, NULL, 48, 1, 0, 22, 0, 1, 1, 0, 'C/ La Roda, 47. 29520. Fuente de Piedra'),
	(44, 'Salón de actos', 'Espacio amplio y funcional con capacidad para 100 personas, ideal para conferencias, presentaciones, reuniones, talleres o eventos culturales.\r\nEl salón dispone de escenario, equipo de sonido, proyector y sistema de iluminación, ofreciendo todas las comodidades necesarias para el desarrollo de actividades tanto institucionales como privadas.\r\n\r\nUn entorno cómodo y versátil, adaptable a diferentes tipos de eventos.', 7, 1, 0, 0, 1, 100, 0, 1, 1, 0, 'C/ Ancha, 9. 29520. Fuente de Piedra'),
	(45, 'Pistas de pádel', 'Nuestras modernas instalaciones cuentan con dos pistas de pádel de moqueta azul y paredes de vidrio, diseñadas para ofrecer una experiencia de juego óptima tanto a jugadores principiantes como avanzados.\r\nUna de las pistas está totalmente techada, ideal para jugar sin importar las condiciones del clima, mientras que la otra es al aire libre, perfecta para disfrutar del sol y el entorno.\r\nAmbas pistas disponen de iluminación de alta calidad, lo que permite partidos nocturnos con excelente visibil', 1, 7, 16, 1, 0, 8, 1, 1, 1, 0, 'C/ La Roda, 47. 29520. Fuente de Piedra'),
	(51, 'Silo', 'Instalación en la que se puede celebrar todo tipo de festejos como cumpleaños, reuniones, ensayos... Dispone de corriente, iluminación, sillas, mesas, escenario y un servicio', 7, 7, 0, 0, 1, 50, 0, 1, 1, 1, 'C/ de la Estación. 29520. Fuente de Piedra.'),
	(66, 'Pistas de tenis', 'dfcasdfcasdfcasdfad', 1, 11, 16, 1, 0, 16, 0, 1, 1, 0, 'C/ La Roda, 47, 29520 Fuente de Piedra, Málaga');

-- Volcando estructura para tabla reservalo2.leyenda_actividad
CREATE TABLE IF NOT EXISTS `leyenda_actividad` (
  `id_leyenda_actividad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL DEFAULT '0',
  `color` varchar(250) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_leyenda_actividad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.leyenda_actividad: ~4 rows (aproximadamente)
DELETE FROM `leyenda_actividad`;
INSERT INTO `leyenda_actividad` (`id_leyenda_actividad`, `nombre`, `color`) VALUES
	(1, 'reserva', '#9810FA'),
	(2, 'instalacion', '#FDC745'),
	(3, 'horario', '#05DF72'),
	(4, 'usuario', '#2B7FFF');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pagos: ~6 rows (aproximadamente)
DELETE FROM `pagos`;
INSERT INTO `pagos` (`id_pago`, `id_reserva`, `precio_reserva`, `resto_precio_pedido`, `fecha_pago`) VALUES
	(9, 192, 28, 28, '2026-02-27 08:05:19'),
	(10, 215, 28, 0, '2026-03-12 22:10:52'),
	(11, 215, 28, 0, '2026-03-12 22:10:56'),
	(12, 220, 0, 0, '2026-03-12 22:11:00'),
	(13, 233, 28, 28, '2026-06-02 11:09:20'),
	(14, 233, 28, 28, '2026-06-02 11:10:49');

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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pedido: ~17 rows (aproximadamente)
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
	(98, 16, '2026-03-09 10:17:28', 0, '20260309-111728-001'),
	(102, 16, '2026-03-11 09:54:27', 56, '20260311-105427-001'),
	(103, 16, '2026-03-11 12:56:59', 0, '20260311-135659-001'),
	(104, 16, '2026-03-25 15:52:19', 28, '20260325-165219-001'),
	(106, 16, '2026-04-08 10:45:53', 56, '20260408-124553-001'),
	(107, 16, '2026-04-08 11:45:45', 28, '20260408-134545-001'),
	(108, 16, '2026-04-27 12:53:27', 32, '20260427-145327-001'),
	(109, 16, '2026-05-28 15:51:31', 56, '20260528-175131-001'),
	(110, 16, '2026-06-03 15:30:56', 56, '20260603-173056-001'),
	(111, 31, '2026-06-03 15:32:55', 28, '20260603-173255-001'),
	(112, 18, '2026-06-03 15:33:28', 56, '20260603-173328-001');

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
  `completa` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_pista`),
  KEY `FK1_pistas_instalacion` (`id_instalacion`),
  CONSTRAINT `FK1_pistas_instalacion` FOREIGN KEY (`id_instalacion`) REFERENCES `instalaciones` (`id_instalacion`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.pistas: ~9 rows (aproximadamente)
DELETE FROM `pistas`;
INSERT INTO `pistas` (`id_pista`, `id_instalacion`, `imagen1`, `imagen2`, `imagen3`, `imagen4`, `capacidad_pista`, `precio_pista`, `nombre_pista`, `pista_unica`, `completa`) VALUES
	(89, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 14, 28, 'Pista de fútbol 7. nº1', 0, 0),
	(90, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 14, 28, 'Pista de fútbol 7. nº2', 0, 0),
	(91, 42, 'CampoFutbol.jpg', 'CampoFutbol2.jpg', 'CampoFutbol3.jpg', 'CampoFutbol4.jpg', 22, 48, 'Instalación Campo de fútbol  completa', 0, 1),
	(95, 44, 'SalonActos4.jpg', 'SalonActos3.jpg', 'SalonActos2.jpg', 'SalonActos1.jpg', 100, 0, 'pista única Salón de actos', 1, 0),
	(96, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 4, 8, 'Pista de pádel techada', 0, 0),
	(97, 45, 'padel1.jpg', 'padel2.jpg', 'padel3.jpg', 'padel4.jpg', 4, 8, 'Pista de pádel no techada', 0, 0),
	(101, 51, 'silo1.jpg', 'silo2.jpg', 'silo3.jpg', 'silo4.jpg', 50, 0, 'pista única Silo', 1, 0),
	(118, 66, NULL, NULL, NULL, NULL, 4, 4, 'Pista de tenis 1', 0, 0),
	(119, 66, NULL, NULL, NULL, NULL, 4, 4, 'Pista de tenis 2', 0, 0),
	(121, 66, NULL, NULL, NULL, NULL, 16, 16, 'pista completa Pistas de tenis', 0, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.reservas: ~30 rows (aproximadamente)
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
	(215, 89, 18, 94, '2026-03-12', '19:00:00', '20:00:00', '2026-03-04 16:57:25', 1, 28),
	(216, 89, 16, 95, '2026-03-13', '10:00:00', '11:00:00', '2026-03-04 16:58:12', 0, 28),
	(217, 89, 16, 95, '2026-03-13', '11:00:00', '12:00:00', '2026-03-04 16:58:12', 0, 28),
	(218, 101, 16, 98, '2026-03-10', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(219, 101, 16, 98, '2026-03-11', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(220, 101, 16, 98, '2026-03-12', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 1, 0),
	(221, 101, 16, 98, '2026-03-13', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(222, 101, 16, 98, '2026-03-14', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(223, 101, 16, 98, '2026-03-15', '00:00:00', '23:59:59', '2026-03-09 10:17:28', 0, 0),
	(228, 89, 16, 102, '2026-03-11', '12:00:00', '13:00:00', '2026-03-11 09:54:27', 0, 28),
	(229, 89, 16, 102, '2026-03-11', '13:00:00', '14:00:00', '2026-03-11 09:54:27', 0, 28),
	(230, 95, 16, 103, '2026-03-11', '17:00:00', '18:00:00', '2026-03-11 12:56:59', 0, 0),
	(231, 95, 16, 103, '2026-03-11', '18:00:00', '19:00:00', '2026-03-11 12:56:59', 0, 0),
	(232, 89, 16, 104, '2026-03-25', '17:00:00', '18:00:00', '2026-03-25 15:52:19', 0, 28),
	(233, 89, 16, 106, '2026-04-09', '08:00:00', '09:00:00', '2026-04-08 10:45:53', 1, 28),
	(234, 89, 16, 106, '2026-04-09', '09:00:00', '10:00:00', '2026-04-08 10:45:53', 0, 28),
	(235, 89, 16, 107, '2026-04-09', '10:00:00', '11:00:00', '2026-04-08 11:45:45', 0, 28),
	(238, 89, 16, 109, '2026-05-29', '08:00:00', '09:00:00', '2026-05-28 15:51:31', 0, 28),
	(239, 89, 16, 109, '2026-05-29', '09:00:00', '10:00:00', '2026-05-28 15:51:31', 0, 28),
	(240, 89, 16, 110, '2026-07-03', '08:00:00', '09:00:00', '2026-06-03 15:30:56', 0, 28),
	(241, 89, 16, 110, '2026-07-03', '09:00:00', '10:00:00', '2026-06-03 15:30:56', 0, 28),
	(242, 89, 31, 111, '2026-07-03', '18:00:00', '19:00:00', '2026-06-03 15:32:55', 0, 28),
	(243, 90, 18, 112, '2026-07-02', '18:00:00', '19:00:00', '2026-06-03 15:33:28', 0, 28),
	(244, 90, 18, 112, '2026-07-02', '19:00:00', '20:00:00', '2026-06-03 15:33:28', 0, 28);

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

-- Volcando estructura para tabla reservalo2.tipo_actividad
CREATE TABLE IF NOT EXISTS `tipo_actividad` (
  `id_tipo_actividad` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL DEFAULT '',
  `tipo_reserva` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_actividad`),
  KEY `FK_tipo_actividad_leyenda_actividad` (`tipo_reserva`),
  CONSTRAINT `FK_tipo_actividad_leyenda_actividad` FOREIGN KEY (`tipo_reserva`) REFERENCES `leyenda_actividad` (`id_leyenda_actividad`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.tipo_actividad: ~0 rows (aproximadamente)
DELETE FROM `tipo_actividad`;
INSERT INTO `tipo_actividad` (`id_tipo_actividad`, `nombre`, `tipo_reserva`) VALUES
	(1, 'reserva', 1),
	(2, 'cancelacion', 1),
	(3, 'confirmacion', 1),
	(4, 'registro', 4),
	(5, 'eliminar usuario', 4),
	(6, 'inicio de sesion', 4),
	(7, 'crear instalacion', 2),
	(8, 'borrar instalacion', 2),
	(9, 'editar instalacion', 2),
	(10, 'crear horario', 3),
	(11, 'borrar horario', 3),
	(12, 'editar horario', 2),
	(13, 'baja instalacion', 2),
	(14, 'cambio de horario', 3),
	(15, 'editar usuario', 4),
	(16, 'crear pista', 2),
	(17, 'editar pista', 2),
	(18, 'borrar pista', 2),
	(19, 'alta instalacion', 2),
	(20, 'baja usuario', 4),
	(21, 'alta usuario', 4),
	(22, 'cerrar sesion', 4),
	(23, 'modificacion contraseña', 4),
	(24, 'Anulación CheckIn', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.tipo_horario: ~1 rows (aproximadamente)
DELETE FROM `tipo_horario`;
INSERT INTO `tipo_horario` (`id_tipo_horario`, `nombre`, `descripcion`, `color`, `fecha_inicio`, `fecha_fin`, `es_especial`, `sin_fecha`) VALUES
	(109, 'Horario de verano', 'Horario de verano', '#ff6600', '2026-06-01', '2026-09-30', 0, 0),
	(114, 'Vacaciones verano polideportivo', 'Horario de vacaciones para las instalaciones del polideportivo', '#6600ff', '2026-07-01', '2026-07-15', 1, 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla reservalo2.usuarios: ~0 rows (aproximadamente)
DELETE FROM `usuarios`;
INSERT INTO `usuarios` (`id_usuario`, `email`, `password`, `id_rol`, `nombre`, `telf`, `token`, `token_date`, `usuario_baja`, `fecha_registro`, `ultimo_inicio`) VALUES
	(15, 'admin.instalaciones@fuentedepiedra.com', '1474b04e54fb64ce2557315183de2aa6d2ed8157', 2, 'Administrador', '681671014', NULL, NULL, 0, '2026-02-25', '2026-06-07 20:05:10'),
	(16, 'ruizsotodani2@gmail.com', 'f39426ccdb0ce5e981c826977de6f19aaf2da984', 1, 'Daniel', '681671014', 'd3fec8ba6b72ab874f15321649d02dd36a49cc9b07a2859cdc90f8ff1acc3b2d360d76125fd95d46c1a268c8db5c1f2284b1', '2026-03-25 14:42:19', 1, '2026-02-25', '2026-06-03 10:14:05'),
	(17, '1402monicahidalgo@gmail.com', '7ce8cae50accf9da162cd63db3d64aa4a0f8a4c2', 1, 'Monica', '656194528', NULL, NULL, 0, '2026-02-25', '2026-02-25 10:13:06'),
	(18, 'eliasruizespejo1903@gmail.com', '825085d930cdb82b011dd9504638ca9b79a2e09b', 1, 'Elias', '685167679', NULL, NULL, 0, '2026-02-25', '2026-02-25 10:14:06'),
	(19, 'inmasoto69@gmail.com', 'cd10e2869b70a1690734b968503dbb5fedfb78fe', 1, 'Inmaculada', '635531629', NULL, NULL, 0, '2026-02-25', '2026-02-25 16:20:58'),
	(31, 'minguito@gmail.com', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', 1, 'minguito', '666444555', NULL, NULL, 0, '2026-04-28', '2026-04-28 11:06:58'),
	(32, 'usuario.prueba@hotmail.com', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', 1, 'usuario', '666666666', NULL, NULL, 0, '2026-04-28', '2026-04-28 17:16:14'),
	(33, 'raulgamer@gmail.com', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441', 1, 'raul', '999333444', NULL, NULL, 0, '2026-04-30', '2026-04-30 10:19:45');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
