-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2024 at 02:40 PM
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
-- Table structure for table `fitter_data`
--

CREATE TABLE `fitter_data` (
  `user_id` int(11) NOT NULL,
  `fitter_data` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `fitter_data`
--

INSERT INTO `fitter_data` (`user_id`, `fitter_data`) VALUES
(65, '||\nsum'),
(67, 'https://www.facebook.com/PollenTruro\nhttps://www.facebook.com/PollenCountBaltimore\nhttps://www.facebook.com/pollenarchive\nhttps://www.facebook.com/pollennationfarm\nhttps://www.facebook.com/pollenandgrace\nhttps://www.facebook.com/PollenFinance\nhttps://www.facebook.com/PollenMidwest\nhttps://www.facebook.com/Pollencorvallis\nhttps://www.facebook.com/pollengreateccleston\nhttps://www.facebook.com/pollenstreetsocial\nhttps://www.facebook.com/pollenmaine\nhttps://www.facebook.com/ThePollinationProject\nhttps://www.facebook.com/LtLPollination\nhttps://www.facebook.com/pollination.culture\nhttps://www.facebook.com/Pollen8tion\nhttps://www.facebook.com/pollination.uk\nhttps://www.facebook.com/pollinationdecor\nhttps://www.facebook.com/PollinationEcology\nhttps://www.facebook.com/BeeHeroPollination\nhttps://www.facebook.com/PolliNation2021\nhttps://www.facebook.com/pollinationpermaculture\nhttps://www.facebook.com/PollinationGuelph\nhttps://www.facebook.com/PollinationStation\nhttps://www.facebook.com/WingBankKH\nhttps://www.facebook.com/Wingbwoi211\nhttps://www.facebook.com/RedWingShoes\nhttps://www.facebook.com/wingindumentaria\nhttps://www.facebook.com/TheWestWingTVShow\nhttps://www.facebook.com/Airfoil.Services\nhttps://www.facebook.com/Airfoil.Public.Relations\nhttps://www.facebook.com/airfoillife\nhttps://www.facebook.com/AirfoilManufacturing\nhttps://www.facebook.com/airfoilwrap\nhttps://www.facebook.com/RAETTSTURBOBLOWER\nhttps://www.facebook.com/airfoilclothing\nhttps://www.facebook.com/airfoilcommunity\nhttps://www.facebook.com/pages/Airfoil-services-sdnbhd/570230313006968\nhttps://www.facebook.com/airfoilcollective\nhttps://www.facebook.com/pages/Airfoil-Services/124802964254481\nhttps://www.facebook.com/AirfoilMedia\nhttps://www.facebook.com/AirfoilWorks\nhttps://www.facebook.com/SecretofFlightNewAirfoil\nhttps://www.facebook.com/newenglandairfoilproductsinc\nhttps://www.facebook.com/flightcentreRSA\nhttps://www.facebook.com/jacksflightclub\nhttps://www.facebook.com/NightFlightOfficial\nhttps://www.facebook.com/FlightCentreUK\nhttps://www.facebook.com/flightcentreAU\nhttps://www.facebook.com/FlightAttendantLife\nhttps://www.facebook.com/heavyflight\nhttps://www.facebook.com/FlightoftheConchords\nhttps://www.facebook.com/nasamarshallcenter\nhttps://www.facebook.com/flightfacilities\nhttps://www.facebook.com/NASAGoddard\nhttps://www.facebook.com/FlightCentreNZ\nhttps://www.facebook.com/FlightCentreCA\nhttps://www.facebook.com/officialteamflightbrothers\n||\nFlower;pollen;pollination;bird;wing;airfoil;flight'),
(68, 'http://www.baidu.com\nhttp://www.baidu.com\n||\nlook'),
(69, 'https://www.facebook.com/divestthemovie\nhttps://www.facebook.com/DivestOregon\nhttps://www.facebook.com/Usedivest\nhttps://www.facebook.com/DivestUR\nhttps://www.facebook.com/uwindivest\nhttps://www.facebook.com/DivestUSS\nhttps://www.facebook.com/DivestMTAAlumni\nhttps://www.facebook.com/divestMonsantoNow\nhttps://www.facebook.com/divestband\nhttps://www.facebook.com/divestwalthamforest\nhttps://www.facebook.com/divestny\nhttps://www.facebook.com/dpudivest\nhttps://www.facebook.com/divestUofS2017\nhttps://www.facebook.com/divestfromdeath\nhttps://www.facebook.com/investmps\nhttps://www.facebook.com/snorkelbobs\nhttps://www.facebook.com/safari.snorkel\nhttps://www.facebook.com/snorkelaroundtheworld\nhttps://www.facebook.com/pushurlimitoutdoorsportsgear\nhttps://www.facebook.com/destin.snorkel\nhttps://www.facebook.com/snorkelfl\nhttps://www.facebook.com/snorkellifts\nhttps://www.facebook.com/snorkelwilduk\nhttps://www.facebook.com/SnorkelAlaska\nhttps://www.facebook.com/KinlifeSnorkel\nhttps://www.facebook.com/DumpsterDiveKing\nhttps://www.facebook.com/divebombindustries\nhttps://www.facebook.com/divediveofficial\nhttps://www.facebook.com/DivingAdelaide\nhttps://www.facebook.com/Caninedipanddivemaldon\nhttps://www.facebook.com/diverite84\nhttps://www.facebook.com/phuketdivetours\nhttps://www.facebook.com/divesafe.training\nhttps://www.facebook.com/DigitalDive\nhttps://www.facebook.com/diveclubmv\nhttps://www.facebook.com/divedivedive.eu\nhttps://www.facebook.com/divedivedivebrisbane\nhttps://www.facebook.com/DiveRightInScuba1\nhttps://www.facebook.com/dive.oahu\nhttps://www.facebook.com/pages/Plung%C4%97/110198732343072\nhttps://www.facebook.com/thecoldplunge\nhttps://www.facebook.com/pages/Plung%C4%97/107877885901718\nhttps://www.facebook.com/PlungeLounge\nhttps://www.facebook.com/pages/Plung%C4%97/1654544191454822\nhttps://www.facebook.com/plunge96\nhttps://www.facebook.com/PlungeTherapyIceBath\nhttps://www.facebook.com/takingtheplungefilm\nhttps://www.facebook.com/plungelondon.net\n||\nunclothe;divest;snorkel;dive;plunge');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fitter_data`
--
ALTER TABLE `fitter_data`
  ADD PRIMARY KEY (`user_id`) USING BTREE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
