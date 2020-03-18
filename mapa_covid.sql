-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2020 a las 22:29:17
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mapa_covid`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(11) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `confirmado` int(11) NOT NULL,
  `sospechoso` int(11) NOT NULL,
  `falso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `estado`, `confirmado`, `sospechoso`, `falso`) VALUES
(0, 'oaxaca', 3, 6, 20),
(1, 'guerrero', 6, 6, 10),
(2, 'morelos', 12, 6, 15),
(3, 'michoacan', 3, 6, 19),
(4, 'chiapas', 13, 6, 10),
(5, 'yucatan', 10, 6, 2),
(6, 'quintana_roo', 2, 6, 5),
(7, 'campeche', 20, 6, 20),
(8, 'tabasco', 3, 6, 3),
(9, 'nuevo_leon', 10, 6, 3),
(10, 'tamaulipas', 5, 6, 10),
(11, 'veracruz', 3, 6, 2),
(12, 'sinaloa', 7, 6, 3),
(13, 'durango', 1, 6, 7),
(14, 'nayarit', 0, 6, 10),
(15, 'zacatecas', 4, 6, 5),
(16, 'aguas_calientes', 3, 6, 4),
(17, 'jalisco', 10, 6, 10),
(18, 'colima', 6, 6, 10),
(19, 'san_luis_potosi', 4, 6, 4),
(20, 'guanajuato', 2, 6, 2),
(21, 'queretaro', 3, 6, 3),
(22, 'hidalgo', 13, 6, 11),
(23, 'tlaxcala', 15, 6, 10),
(24, 'puebla', 10, 6, 21),
(25, 'ciudad_de_mexico', 6, 6, 2),
(26, 'estado_de_mexico', 10, 6, 20),
(27, 'baja_california_norte', 2, 6, 10),
(28, 'baja_california_sur', 1, 6, 30),
(29, 'sonora', 4, 6, 21),
(30, 'chihuahua', 3, 6, 10),
(31, 'coahuila', 4, 6, 7);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
