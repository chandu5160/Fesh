-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2019 at 12:52 PM
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
(7, 'BND7', 'Dell', 1, 'CAT2');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(10) NOT NULL,
  `uid` varchar(10) NOT NULL,
  `pid` varchar(20) NOT NULL,
  `pname` varchar(30) NOT NULL,
  `pimg` varchar(200) NOT NULL,
  `pquantity` int(11) NOT NULL,
  `pprice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `uid`, `pid`, `pname`, `pimg`, `pquantity`, `pprice`) VALUES
(178, 'USER26', 'PROD2', 'Apple iPhone 8 Plus', 'images/uploads/front-1550828404148.jpg', 3, 66999),
(179, 'USER26', 'PROD14', 'Galaxy j7 PRO', 'images/uploads/front-1550828404148.jpg', 2, 40000),
(180, 'USER26', 'PROD18', 'BlackBerry Porsche Design P998', 'images/uploads/front-1550829880201.jpeg', 1, 12000);

-- --------------------------------------------------------

--
-- Table structure for table `cart2`
--

CREATE TABLE `cart2` (
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
-- Table structure for table `prevorders`
--

CREATE TABLE `prevorders` (
  `prevOrd_id` int(10) NOT NULL,
  `uid` varchar(10) NOT NULL,
  `pid` varchar(20) NOT NULL,
  `pname` varchar(30) NOT NULL,
  `pimg` varchar(200) NOT NULL,
  `pquantity` int(11) NOT NULL,
  `pprice` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `prevorders`
--

INSERT INTO `prevorders` (`prevOrd_id`, `uid`, `pid`, `pname`, `pimg`, `pquantity`, `pprice`, `date`) VALUES
(3, 'USER26', 'PROD2', 'Apple iPhone 8 Plus', 'images/uploads/front-1550828404148.jpg', 1, 66999, '2019-03-06');

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
(1, 'PROD1', 'SAMSUNG J7', 9000, 'IT IS VERY GOOD CONDITION AND BATTERY CAPACIT', 9, 'images\\uploads\\33.jpg', 'images\\uploads\\SAMJ71.jpg', 'images\\uploads\\SAMJ72.jpg', 'images\\uploads\\SAMJ74.jpg', 1, 'BND1'),
(13, 'PROD13', 'Apple iPhone 6s Plus', 31999, 'Release date	September 2015\r\nForm factor	Touc', 10, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND2'),
(14, 'PROD14', 'Galaxy j7 PRO', 40000, 'The Samsung Galaxy J7 Pro mobile features a 5', 10, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND1'),
(15, 'PROD15', 'BlackBerry Porsche Design P9983 Graphite', 0, 'MobilesPhone FinderBlackBerry PhonesBlackBerr', 10, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND4'),
(16, 'PROD16', 'Asus Zenfone Max 3', 11000, '16MP Camera with auto focus, f/2.0 aperture, ', 10, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND3'),
(17, 'PROD17', 'Apple iPhone 6s Plus', 31999, 'dsfasffds', 10, 'images/uploads/front-1550829789433.jpg', 'images/uploads/lside-1550829789435.jpg', 'images/uploads/rside-1550829789435.jpg', 'images/uploads/back-1550829789436.jpg', 1, 'BND2'),
(18, 'PROD18', 'BlackBerry Porsche Design P9983 Graphite', 12000, 'MobilesPhone FinderBlackBerry PhonesBlackBerr', 10, 'images/uploads/front-1550829880201.jpeg', 'images/uploads/lside-1550829880202.jpeg', 'images/uploads/rside-1550829880202.jpeg', 'images/uploads/back-1550829880203.jpeg', 1, 'BND4'),
(19, 'PROD19', 'Galaxy j7 PRO', 40000, 'The Samsung Galaxy J7 Pro mobile features a 5', 10, 'images/uploads/front-1550830033627.jpg', 'images/uploads/lside-1550830033627.jpg', 'images/uploads/rside-1550830033628.jpg', 'images/uploads/back-1550830033628.jpg', 1, 'BND1'),
(12, 'PROD2', 'Apple iPhone 8 Plus', 66999, 'Good it is used very good condtion', 9, 'images/uploads/front-1550828404148.jpg', 'images/uploads/lside-1550828404152.jpg', 'images/uploads/rside-1550828404153.jpg', 'images/uploads/back-1550828404154.jpg', 1, 'BND2'),
(20, 'PROD20', 'Asus Zenfone Max 3', 11000, '16MP Camera with auto focus, f/2.0 aperture, ', 10, 'images/uploads/front-1550830394749.jpg1', 'images/uploads/lside-1550830394750.jpeg2', 'images/uploads/rside-1550830394756.jpeg3', 'images/uploads/back-1550830394757.jpg4', 1, 'BND3'),
(21, 'PROD21', 'MI310', 4000, 'MI is very good Product ', 10, 'images/uploads/front-NaN11550830749557.jpeg', 'images/uploads/lside-NaN21550830749559.jpeg', 'images/uploads/rside-NaN31550830749560.jpeg', 'images/uploads/back-NaN41550830749561.jpeg', 1, 'BND3'),
(22, 'PROD22', 'fsg', 465, 'This product is very good condition ', 10, 'images/uploads/front-NaN11550830872170.jpg', 'images/uploads/lside-NaN21550830872171.jpeg', 'images/uploads/rside-NaN31550830872172.jpg', 'images/uploads/back-NaN41550830872172.jpeg', 1, 'BND2'),
(23, 'PROD23', 'sdf', 4545, 'dsfa', 10, 'images/uploads/front-undefinedundefined11550835444174.jpg', 'images/uploads/lside-undefinedundefined21550835444175.jpg', 'images/uploads/rside-undefinedundefined31550835444175.jpg', 'images/uploads/back-undefinedundefined41550835444175.jpg', 1, 'BND4'),
(24, 'PROD24', 'sdaffsdaf', 0, 'dfsfs', 10, 'images/uploads/front-undefinedundefined11550835642597.jpg', 'images/uploads/lside-undefinedundefined21550835642601.jpg', 'images/uploads/rside-undefinedundefined31550835642603.jpg', 'images/uploads/back-undefinedundefined41550835642604.jpeg', 1, 'BND2'),
(25, 'PROD25', 'praveen', 1200, 'dfsaPrsavefkjshfsfkj', 10, 'images/uploads/front-11550835778061.jpg', 'images/uploads/lside-21550835778062.jpg', 'images/uploads/rside-31550835778063.jpg', 'images/uploads/back-41550835778063.jpg', 1, 'BND3');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('h02S40dz-rafbIyMRCC_wkAfIzNnt46c', 1551872860, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2019-03-06T11:46:40.512Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"userId\":\"USER23\"}');

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
('', 'chandu', 'chandualuru@gmail.com', '$2a$12$QQrvkneYGXbD3wDaRJL/se76qTfT0CBxOtf8QEhTnMeMl.CfeR3KO', 9000394202, 1, 20),
('USER21', 'chandu', 'cs@gmail.com', '$2a$12$/ilRg.GkBAyuC75yaqXrReIXIo9BDbc9HO8llOG.dQ8r4wGu2NPZS', 9000394201, 1, 21),
('USER22', 'chandu', 'cs1@gmail.com', '$2a$12$AkWjotznVbObuR2kJjRHN.Kkhvvyh612N9JnPwCl1cal9ohzqRoii', 9000394200, 1, 22),
('USER23', 'rocky', 'rocky@gmail.com', '$2a$12$uXuY6opqOvmGkxk3q5zsJ.afcclJaGTF/jUBxrGx0rIyoRe2BZE1C', 9000394203, 1, 23),
('USER24', 'chandu', 'cs2@gmail.com', '$2a$12$oB7fu3MhYTd8Yw3RJkWX0OhoM07sLAMHgWAjlgE0bw8W5aiBY9IWW', 9000394204, 1, 24),
('USER25', 'chandu', 'sri@gmail.com', '$2a$12$RBSipkgdvMc849fVMPzd8u73sttrwa6Yee6iiUnNoG81QY56J.xyK', 9000394210, 1, 25),
('USER26', 'Praveen', 'praveen@gmail.com', '$2a$12$cLJAk.5iljBQWESBRxrp0OfFivQXr3cBgpY6HiuUWTZ1.S1I7tMNW', 9441146300, 1, 26);

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
-- Indexes for table `cart2`
--
ALTER TABLE `cart2`
  ADD KEY `cart_ibfk_1` (`uid`),
  ADD KEY `cart_ibfk_2` (`pid`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `prevorders`
--
ALTER TABLE `prevorders`
  ADD PRIMARY KEY (`prevOrd_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `pid` (`pid`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `prevorders`
--
ALTER TABLE `prevorders`
  MODIFY `prevOrd_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
-- Constraints for table `cart2`
--
ALTER TABLE `cart2`
  ADD CONSTRAINT `cart2_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `cart2_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `products` (`pid`);

--
-- Constraints for table `prevorders`
--
ALTER TABLE `prevorders`
  ADD CONSTRAINT `prevorders_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  ADD CONSTRAINT `prevorders_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `products` (`pid`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `brand` (`bid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
