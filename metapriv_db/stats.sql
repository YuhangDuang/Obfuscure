-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2024 at 02:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `metapriv_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `id` int(11) NOT NULL,
  `keywords` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`keywords`)),
  `stats_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`stats_data`)),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`id`, `keywords`, `stats_data`, `user_id`) VALUES
(1, '[\"Spring\", \"jump\", \"spring\"]', '[[24, 8, 11, 7], [17, 14, 7, 3], [13, 5, 11, 7]]', 0),
(2, '[\"Flower\", \"pollen\", \"pollination\", \"bird\", \"wing\", \"airfoil\", \"flight\"]', '[[0, 0, 0, 0], [54, 11, 4, 2], [52, 12, 7, 1], [0, 0, 1, 0], [8, 5, 18, 11], [26, 15, 0, 0], [79, 14, 5, 2]]', 67),
(11, '[\"Summer\", \"summertime\", \"summer solstice\"]', '[[0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]]', 66),
(18, '[\"sum\"]', '[[0, 0, 0, 0]]', 65),
(10546, '[\"unclothe\", \"divest\", \"snorkel\", \"dive\", \"plunge\"]', '[[0, 0, 0, 0], [40, 15, 17, 8], [50, 10, 18, 9], [77, 14, 9, 5], [59, 9, 6, 3]]', 69);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD UNIQUE KEY `111` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25763;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
