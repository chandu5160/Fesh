-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2019 at 03:11 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.39

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `customers` (IN `cust` VARCHAR(20))  NO SQL
SELECT * FROM customer$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(10) NOT NULL,
  `bid` varchar(10) NOT NULL,
  `bname` varchar(45) NOT NULL,
  `status` tinyint(2) NOT NULL,
  `cid` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `bid`, `bname`, `status`, `cid`) VALUES
(2, 'BND21', 'Shahsnk', 0, 'CAT2'),
(3, 'BND31', 'Praveen', 1, 'CAT9'),
(5, 'BND5', 'Samsung', 0, 'CAT31'),
(4, 'BND61', 'Kumar', 0, 'CAT31');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `cid` varchar(10) NOT NULL,
  `cname` varchar(45) NOT NULL,
  `status` tinyint(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `cid`, `cname`, `status`) VALUES
(10, 'CAT10', 'kdsajf', 0),
(11, 'CAT11', 'Shahsnk', 1),
(8, 'CAT2', 'Praveen', 1),
(1, 'CAT31', 'Chandu', 1),
(9, 'CAT9', 'Shashank', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `address`, `email`, `phone`) VALUES
(4, 'Angel ', 'Jl. Ciledug no 45A. tanggerang', 'angel@gmail.com', '082271626121'),
(5, 'Ujang', 'Jl. ribut no 90 A', 'ujang@gmail.com', '07846352532'),
(6, 'Memet', 'Blok cepu no 14. Bandung', 'memet@ongkek.com', '038372636232'),
(9, 'Agung', 'Jl st Petersburg no 34. Russia', 'agung@yahoo.com', '038373273262'),
(10, 'Jhon Taylor', 'St paris A . Block 43. paris', 'jtaylor@yahoo.com', '039223232323');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `pid` varchar(10) NOT NULL,
  `pname` varchar(45) NOT NULL,
  `pprice` int(11) NOT NULL,
  `pdescription` varchar(45) NOT NULL,
  `pquantity` int(11) NOT NULL,
  `pimg` varchar(200) NOT NULL,
  `pimg1` varchar(200) NOT NULL,
  `pimg2` varchar(200) NOT NULL,
  `pimg3` varchar(200) NOT NULL,
  `status` tinyint(2) NOT NULL,
  `bid` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `pid`, `pname`, `pprice`, `pdescription`, `pquantity`, `pimg`, `pimg1`, `pimg2`, `pimg3`, `status`, `bid`) VALUES
(10, 'PROD10', 'MI310', 5000, 'This Product is very Good Contion', 10, 'images/uploads/front-undefined1550748657054.jpg', 'images/uploads/lside-undefined1550748657055.jpg', 'images/uploads/rside-undefined1550748657055.jpg', 'images/uploads/back-undefined1550748657055.jpg', 1, 'BND61'),
(11, 'PROD11', 'Samsung m360', 5000, 'afsdfssafd', 10, 'images/uploads/front-undefined1550748914144.jpg', 'images/uploads/lside-undefined1550748914147.jpg', 'images/uploads/rside-undefined1550748914148.jpg', 'images/uploads/back-undefined1550748914148.jpg', 1, 'BND61'),
(7, 'PROD7', 'Iphone6s', 3000, 'Praveen', 10, 'images/uploads/front-1550744566972.jpg', 'images/uploads/lside-1550744566974.jpg', 'images/uploads/rside-1550744566974.jpg', 'images/uploads/back-1550744566974.jpg', 1, 'BND61'),
(8, 'PROD8', 'Iphone2', 30000, 'gfsdgdsfdsgdgsg', 2, 'images/uploads/front-1550746785801.jpg', 'images/uploads/lside-1550746785803.jpg', 'images/uploads/rside-1550746785803.jpg', 'images/uploads/back-1550746785804.jpg', 1, 'BND21'),
(9, 'PROD9', 'lava MI', 25000, 'kljfasdjsaofosajhfjsahf', 20, 'images/uploads/front-1550746785801.jpg', 'images/uploads/lside-1550746785803.jpg', 'images/uploads/rside-1550746785803.jpg', 'images/uploads/back-1550746785804.jpg', 1, 'BND31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` varchar(20) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(400) NOT NULL,
  `phone` bigint(10) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `fname`, `email`, `password`, `phone`, `status`, `id`) VALUES
('USER17', 'Praveen', 'Praveen@gmail.com', '$2a$12$8OGgYAr2CTVD0/Sez9hCo.riatVc9yt1feTCSMe1G.Xy1XQLtrsva', 97974646545, 1, 17),
('USER18', 'SHAHSNK', 'shahank@gmail.com', 'Shashank', 9898989856, 1, 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`bid`),
  ADD KEY `cid_idx` (`cid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `bid` (`bid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `brand` (`bid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
