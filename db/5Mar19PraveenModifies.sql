-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2019 at 07:10 AM
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
(1, 'BND1', 'SAMSUNG', 1, 'CAT1'),
(2, 'BND2', 'Apple', 1, 'CAT1'),
(3, 'BND3', 'Asus', 1, 'CAT1'),
(4, 'BND4', 'BlackBerry', 1, 'CAT1'),
(6, 'BND6', 'Samsung', 1, 'CAT2'),
(7, 'BND7', 'Dell', 1, 'CAT2'),
(8, 'BND8', 'Lenovo', 1, 'CAT2');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(10) NOT NULL,
  `uid` varchar(10) NOT NULL,
  `pid` varchar(10) NOT NULL,
  `no_of_items` int(20) NOT NULL,
  `total` int(10) NOT NULL,
  `export` tinyint(1) NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'CAT1', 'Mobiles', 1),
(13, 'CAT13', 'Dell', 1),
(14, 'CAT14', 'Praveen', 1),
(12, 'CAT2', 'Laptops', 1);

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
-- Table structure for table `prevorders`
--

CREATE TABLE `prevorders` (
  `pid` varchar(10) NOT NULL,
  `pname` varchar(30) NOT NULL,
  `pimg` int(150) NOT NULL,
  `quantity` int(10) NOT NULL,
  `totalPrice` int(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'PROD1', 'SAMSUNG J7', 9000, 'IT IS VERY GOOD CONDITION AND BATTERY CAPACIT', 5, 'images\\uploads\\33.jpg', 'images\\uploads\\SAMJ71.jpg', 'images\\uploads\\SAMJ72.jpg', 'images\\uploads\\SAMJ74.jpg', 1, 'BND1'),
(13, 'PROD13', 'Apple iPhone 6s Plus', 31999, 'Release date	September 2015\r\nForm factor	Touc', 5, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND2'),
(14, 'PROD14', 'Galaxy j7 PRO', 40000, 'The Samsung Galaxy J7 Pro mobile features a 5', 2, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND1'),
(15, 'PROD15', 'BlackBerry Porsche Design P9983 Graphite', 0, 'MobilesPhone FinderBlackBerry PhonesBlackBerr', 5, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND4'),
(16, 'PROD16', 'Asus Zenfone Max 3', 11000, '16MP Camera with auto focus, f/2.0 aperture, ', 1, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND3'),
(17, 'PROD17', 'Apple iPhone 6s Plus', 31999, 'dsfasffds', 2, 'images/uploads/front-1550829789433.jpg', 'images/uploads/lside-1550829789435.jpg', 'images/uploads/rside-1550829789435.jpg', 'images/uploads/back-1550829789436.jpg', 1, 'BND2'),
(18, 'PROD18', 'BlackBerry Porsche Design P9983 Graphite', 12000, 'MobilesPhone FinderBlackBerry PhonesBlackBerr', 5, 'images/uploads/front-1550829880201.jpeg', 'images/uploads/lside-1550829880202.jpeg', 'images/uploads/rside-1550829880202.jpeg', 'images/uploads/back-1550829880203.jpeg', 1, 'BND4'),
(19, 'PROD19', 'Galaxy j7 PRO', 40000, 'The Samsung Galaxy J7 Pro mobile features a 5', 2, 'images/uploads/front-1550830033627.jpg', 'images/uploads/lside-1550830033627.jpg', 'images/uploads/rside-1550830033628.jpg', 'images/uploads/back-1550830033628.jpg', 1, 'BND1'),
(12, 'PROD2', 'Apple iPhone 8 Plus', 66999, 'Good it is used very good condtion', 5, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND2'),
(20, 'PROD20', 'Asus Zenfone Max 3', 11000, '16MP Camera with auto focus, f/2.0 aperture, ', 10, 'images/uploads/front-1550830394749.jpg1', 'images/uploads/lside-1550830394750.jpeg2', 'images/uploads/rside-1550830394756.jpeg3', 'images/uploads/back-1550830394757.jpg4', 1, 'BND3'),
(21, 'PROD21', 'MI310', 4000, 'MI is very good Product ', 1, 'images/uploads/front-NaN11550830749557.jpeg', 'images/uploads/lside-NaN21550830749559.jpeg', 'images/uploads/rside-NaN31550830749560.jpeg', 'images/uploads/back-NaN41550830749561.jpeg', 1, 'BND3'),
(22, 'PROD22', 'fsg', 465, 'This product is very good condition ', 1200, 'images/uploads/front-NaN11550830872170.jpg', 'images/uploads/lside-NaN21550830872171.jpeg', 'images/uploads/rside-NaN31550830872172.jpg', 'images/uploads/back-NaN41550830872172.jpeg', 1, 'BND2'),
(23, 'PROD23', 'sdf', 4545, 'dsfa', 0, 'images/uploads/front-undefinedundefined11550835444174.jpg', 'images/uploads/lside-undefinedundefined21550835444175.jpg', 'images/uploads/rside-undefinedundefined31550835444175.jpg', 'images/uploads/back-undefinedundefined41550835444175.jpg', 1, 'BND4'),
(24, 'PROD24', 'sdaffsdaf', 0, 'dfsfs', 0, 'images/uploads/front-undefinedundefined11550835642597.jpg', 'images/uploads/lside-undefinedundefined21550835642601.jpg', 'images/uploads/rside-undefinedundefined31550835642603.jpg', 'images/uploads/back-undefinedundefined41550835642604.jpeg', 1, 'BND2'),
(25, 'PROD25', 'praveen', 1200, 'dfsaPrsavefkjshfsfkj', 12, 'images/uploads/front-11550835778061.jpg', 'images/uploads/lside-21550835778062.jpg', 'images/uploads/rside-31550835778063.jpg', 'images/uploads/back-41550835778063.jpg', 1, 'BND3'),
(26, 'PROD26', 'Lenovo IdeaPad 320 ', 40000, '\r\nLenovo IdeaPad 320 81BG00SLIN 15.6-inch FHD', 5, 'images/uploads/front-11551689098077.jpg', 'images/uploads/lside-21551689098078.jpg', 'images/uploads/rside-31551689098080.jpg', 'images/uploads/back-41551689098080.jpg', 1, 'BND8');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('USER19', 'Praveen', 'Praveen@123.com', '$2a$12$pdi830dB6aTN3kqaRS3gt.A1wh0um3UBUj4.L9xXVKGKdJOf8WGsi', 9441146522, 1, 19),
('USER20', 'PraveenBommu', 'Praveen1@gmail.com', '$2a$12$29TYnX9y2in95HSuSKJq1.LQ/G4j3/IFt9V68bWofZ1XyC8/wttYW', 9898568300, 1, 20),
('USER21', 'rocky', 'rocky@gmail.com', '$2a$12$lYBEVPBb6hPQi2lLyt/hF.GvSRbZwUKnFmvabCLcWJmSS5KLAnsvm', 8520963741, 1, 21),
('USER22', 'Praveen', 'chandu@gmail.com', '$2a$12$02z/kCX2kBbph2Jw9vBhFe5aGLDJtO3Ea.uhreYekZXfn4.4UI9wG', 9898656598, 1, 22);

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
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `pid` (`pid`);

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
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `category` (`cid`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `products` (`pid`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `brand` (`bid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
