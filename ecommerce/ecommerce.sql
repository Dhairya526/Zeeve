-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 18, 2021 at 01:08 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `mst_product_type`
--

CREATE TABLE `mst_product_type` (
  `type_id` tinyint(4) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `code` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mst_product_type`
--

INSERT INTO `mst_product_type` (`type_id`, `name`, `code`) VALUES
(1, 'Clothing and Footware', 'CAF'),
(2, 'Electrical', 'EE'),
(3, 'Electronics', 'EC'),
(4, 'Food and Beverages', 'FAB'),
(5, 'Furniture', 'FUR'),
(6, 'Home Decor', 'HD'),
(7, 'Kitchen', 'KITC'),
(8, 'Stationary', 'STAT');

-- --------------------------------------------------------

--
-- Table structure for table `mst_user_type`
--

CREATE TABLE `mst_user_type` (
  `type_id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mst_user_type`
--

INSERT INTO `mst_user_type` (`type_id`, `name`) VALUES
(0, 'ADMIN'),
(1, 'BUYER'),
(2, 'SELLER');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

CREATE TABLE `tbl_product` (
  `pid` int(10) UNSIGNED NOT NULL,
  `category` tinyint(4) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` float UNSIGNED NOT NULL,
  `quantity` int(11) UNSIGNED NOT NULL,
  `description` varchar(500) NOT NULL,
  `created_by` int(11) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_by` int(11) UNSIGNED NOT NULL,
  `modified_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `uid` int(10) UNSIGNED NOT NULL,
  `type_id` tinyint(3) UNSIGNED NOT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password_salt` varchar(29) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_last` datetime NOT NULL,
  `verified` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `blocked` tinyint(3) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mst_product_type`
--
ALTER TABLE `mst_product_type`
  ADD PRIMARY KEY (`type_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `mst_user_type`
--
ALTER TABLE `mst_user_type`
  ADD PRIMARY KEY (`type_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `category` (`category`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `modified_by` (`modified_by`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `type_id` (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mst_product_type`
--
ALTER TABLE `mst_product_type`
  MODIFY `type_id` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mst_user_type`
--
ALTER TABLE `mst_user_type`
  MODIFY `type_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_product`
--
ALTER TABLE `tbl_product`
  MODIFY `pid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_product`
--
ALTER TABLE `tbl_product`
  ADD CONSTRAINT `tbl_product_ibfk_1` FOREIGN KEY (`category`) REFERENCES `mst_product_type` (`type_id`),
  ADD CONSTRAINT `tbl_product_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `tbl_user` (`uid`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_product_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `tbl_user` (`uid`);

--
-- Constraints for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD CONSTRAINT `tbl_user_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `mst_user_type` (`type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
