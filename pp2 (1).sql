-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2024 a las 17:55:34
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
-- Base de datos: `pp2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `descripcion`, `precio`) VALUES
(1, 'papas fritas', 2300),
(2, 'Naranjas', 450),
(3, 'Manzanas', 100),
(4, 'Mandarina', 10),
(5, 'Prueba', 120),
(6, 'Mandarinas', 1010);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `saldo` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `apellido`, `nombre`, `saldo`, `status`) VALUES
(1, 'Aguirre', 'Nicolas Elias', 87000, 0),
(2, 'Bianchi', 'Germán', 92000, 1),
(3, 'Costa', 'María Laura', 45000, 1),
(4, 'Donzelli', 'Nicolas Emanuel', 92000, 0),
(5, 'Giavedoni', 'Augusto', 82000, 0),
(6, 'Girod', 'Ignacio', 82000, 0),
(7, 'Imhoff', 'Marianela', 80000, 0),
(8, 'Kouefati', 'Jacques', 80000, 1),
(9, 'Pallavidini', 'Nahuel', 80000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `meses`
--

CREATE TABLE `meses` (
  `id` int(2) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `dias` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `meses`
--

INSERT INTO `meses` (`id`, `nombre`, `dias`) VALUES
(1, 'Enero', 31),
(2, 'Febrero', 28),
(3, 'Marzo', 31),
(4, 'Abril', 30),
(5, 'Mayo', 31),
(6, 'Junio', 30),
(7, 'Julio', 31),
(8, 'Agosto', 31),
(9, 'Septiembre', 30),
(10, 'Octubre', 31),
(11, 'Noviembre', 30),
(12, 'Diciembre', 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `empleados` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`id`, `nombre`, `direccion`, `empleados`) VALUES
(1, 'Santa Fe', 'San Martin 1111', 11),
(2, 'Rosario', 'Belgrano 2222', 22),
(3, 'Santo Tome', '9 de Julio 3333', 16),
(4, 'Rafaela', 'Roca 4444', 4),
(5, 'Parana', 'Tunel 555', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(3, 'admin', 'admin123', 'admin'),
(4, 'user', 'user123', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `id_mes` int(11) NOT NULL,
  `monto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `id_sucursal`, `id_mes`, `monto`) VALUES
(1, 1, 1, 5000),
(2, 2, 1, 321),
(3, 3, 1, 444),
(4, 4, 1, 5111),
(5, 5, 1, 8019),
(6, 1, 2, 12000),
(7, 2, 2, 9289),
(8, 3, 2, 7299),
(9, 4, 2, 6530),
(10, 5, 2, 8430),
(11, 1, 3, 7810),
(12, 2, 3, 8540),
(13, 3, 3, 7920),
(14, 4, 3, 6500),
(15, 5, 3, 8100),
(16, 1, 4, 8190),
(17, 2, 4, 8730),
(18, 3, 4, 7250),
(19, 4, 4, 6900),
(20, 5, 4, 8400),
(21, 1, 5, 8900),
(22, 2, 5, 9300),
(23, 3, 5, 8700),
(24, 4, 5, 7100),
(25, 5, 5, 9200),
(26, 1, 6, 8500),
(27, 2, 6, 9100),
(28, 3, 6, 10),
(29, 4, 6, 6200),
(30, 5, 6, 8400),
(31, 1, 7, 8700),
(32, 2, 7, 8900),
(33, 3, 7, 10000),
(34, 4, 7, 7100),
(35, 5, 7, 8000),
(36, 1, 8, 9000),
(37, 2, 8, 9400),
(38, 3, 8, 8900),
(39, 4, 8, 7000),
(40, 5, 8, 9200),
(41, 1, 9, 8700),
(42, 2, 9, 9300),
(43, 3, 9, 8200),
(44, 4, 9, 6500),
(45, 5, 9, 8800),
(46, 1, 10, 9100),
(47, 2, 10, 9500),
(48, 3, 10, 7800),
(49, 4, 10, 6300),
(50, 5, 10, 8700),
(51, 1, 11, 9200),
(52, 2, 11, 9600),
(53, 3, 11, 8500),
(54, 4, 11, 6400),
(55, 5, 11, 8900),
(56, 1, 12, 9400),
(57, 2, 12, 9800),
(58, 3, 12, 8700),
(59, 4, 12, 6600),
(60, 5, 12, 9300);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `meses`
--
ALTER TABLE `meses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sucursal` (`id_sucursal`),
  ADD KEY `id_mes` (`id_mes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `meses`
--
ALTER TABLE `meses`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales` (`id`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`id_mes`) REFERENCES `meses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
