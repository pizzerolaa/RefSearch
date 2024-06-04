-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2024 a las 00:08:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `refsear`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `username` varchar(45) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`username`, `password`) VALUES
('prueba1@gmail.com', 'prueba1'),
('prueba1@gmail.com', 'prueba1'),
('prueba1_1@gmail.com', 'prueba1_1'),
('prueba_back@gmail.com', 'pruebaBack1'),
('prueba_back@gmail.com', 'pruebaBack1'),
('prueba_client@gmail.com', 'prueba_client123'),
('prueba_react1@gmail.com', 'pruebareact1'),
('prueba_react2@gmail.com', 'pruebareact2'),
('prueba_react3@gmail.com', 'pruebareact3'),
('prueba1@gmail.com', 'prueba1'),
('', ''),
('', ''),
('prueba1@gmail.com', 'prueba1'),
('prueba1@gmail.com', 'prueba1'),
('pruebaerror@gmail.com', 'error'),
('newuser@gmail.com', 'new'),
('prueba_error@gmail.com', 'error'),
('juan_perez@perez.perez', 'perez'),
('nuevo_registro@gmail.com', 'Registr');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
