-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 08, 2022 at 07:45 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `p_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `leader_id` int(11) NOT NULL,
  `startdate` date DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `Description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`p_id`, `title`, `leader_id`, `startdate`, `organization`, `Description`) VALUES
(1, 'project1', 0, NULL, NULL, NULL),
(2, 'project2', 0, NULL, NULL, NULL),
(3, 'project3', 0, NULL, NULL, NULL),
(4, 'demo', 5, '2021-01-23', 'demo2', NULL),
(5, 'demo', 5, '2021-01-23', 'demo2', NULL),
(6, 'demo', 5, '2021-01-23', 'demo2', NULL),
(7, 'jhfjjtj', 5, '2021-01-23', 'ykitgvk', NULL),
(8, 'DAAA', 5, '2021-01-24', 'muj', NULL),
(9, 'jgvcjgqwvb', 5, '2021-01-31', 'jgvjv', NULL),
(10, 'new project', 5, '2021-02-04', 'muj', NULL),
(11, 'Chatbot', 5, '2022-10-05', 'NCSU', NULL),
(12, 'Driverless', 11, '2022-10-05', 'NCSU', NULL),
(13, 'SE', 5, '2022-10-06', 'NCSU', NULL),
(14, 'SE-Project-Group24', 3, '2022-10-08', 'NCSU CSC', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--
