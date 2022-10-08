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
CREATE TABLE `tasks` (
  `t_id` int(11) NOT NULL,
  `task_name` varchar(100) NOT NULL,
  `description` text,
  `stat` int(11) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `u_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `work` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--
INSERT INTO `tasks` (`t_id`, `task_name`, `description`, `stat`, `deadline`, `u_id`, `p_id`, `work`) VALUES
(1, 'First', 'jmyvukyhvkuyvk', 0, NULL, 3, 6, NULL),
(2, 'Secondwon', 'jytvkkvkv   iuyblb\r\nkyuvkubk\r\nyutvfjygjyub', 0, NULL, 7, 6, NULL),
(3, 'Firstkhjb,', 'oiyblublb liuhbln ilunkjnkbkub jmyvukyhvkuyvk', 1, NULL, 7, 7, 'wf,jvsknv'),
(5, 'firtone', 'jytvkkvkv   iuybk,jvs,snv,knsv,klvalskdnva.dckm.sdkmvasdilnfvsljnv,nvksdfj,nf b\r\nkyuvkubk\r\nyutvfjygjyub', 0, NULL, 3, 8, NULL),
(6, 'second one', 'jytvkkvkvaskjnc,dnjv,aksjdc   iuybk,jvs,snv,knsv,klb\r\nkyuvkubk\r\nyutvfjygjyub', 2, NULL, 5, 8, 'krfbknaeckerbvs mvjwehrv,as'),
(8, 'fourthone', 's,jfvbkbvs\r\nvbsdfv\r\ndrtbv\r\nrgvd\r\nrbvdrb\r\n', 0, NULL, 3, 8, NULL),
(11, 'jhbuk', 'jhbkjh kjhbhkk', 0, '2021-02-27', 3, 7, NULL),
(12, 'hello', 'world', 2, '2021-02-04', 5, 7, 'khbunukijkn,'),
(13, 'jfhmgbjhgmhgvhmgv', 'kubdrthvbdrm vdjrhvbdr vdrhbmfdv\r\ndfbdlrjmbdr\r\nbdfgbdkrhvbdrv\r\nfgbdrlthbvfdkjvbdf\r\nbdflkvbhdtvhnd\r\nbkdfbhdnbvrd\r\nbvdkfjhvbdrkjtv\r\nrdtgvdkfuvbdfjvbr\'dtbdkfhvb\r\nrtsdukxnvf', 0, '2021-02-26', 10, 8, NULL),
(14, 'kuyhvjbkb jhmb', 'kuhnj,n', 2, '2021-02-20', 5, 8, 'github.com'),
(17, 'SE docs', 'sqasdfgbhn', 0, '2022-10-06', 12, 13, ''),
(18, 'demo', '', 2, '2022-10-06', 5, 13, 'https://github.com/jayrajmulani/group1-se-homeworks'),
(19, 'Docs generator', 'Generate docs files for the project code, use pdoc', 0, '2022-10-14', 12, 14, NULL),
(20, 'Code coverage', 'Using codecov, write tests through which we can get code coverage of our project', 0, '2022-10-15', 11, 14, NULL),
(21, 'Badges in the repo', 'Add the the required badges in the code repo', 0, '2022-10-17', 3, 14, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_db`
--

CREATE TABLE `user_db` (
  `u_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact` int(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_db`
--
INSERT INTO `user_db` (`u_id`, `name`, `email`, `password`, `contact`) VALUES
(3, 'Devanshi Savla', 'devanshik.savla123@gmail.com', '00110086', 2135516943),
(5, 'abcd', 'abcd@abcd.com', 'abcdefgh', 1234567899),
(7, 'Shubham', 'shubham@abcd.com', 'abcdefgh', 1234567890),
(10, 'DSM', 's@abcd.com', 'abcdefgh', 1234567890),
(11, 'Indranil Banerjee', 'banerjeeindranil350@gmail.com', '12345678', 123456789),
(12, 'Soha Bhatia', 'soha20bhatia@gmail.com', '12345678', 12345678);
-- --------------------------------------------------------

--
-- Table structure for table `works`
--

CREATE TABLE `works` (
  `u_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `works`
--
INSERT INTO `works` (`u_id`, `p_id`) VALUES
(3, 6),
(5, 6),
(7, 6),
(10, 6),
(3, 7),
(5, 7),
(7, 7),
(3, 8),
(5, 8),
(7, 8),
(5, 9),
(7, 9),
(10, 9),
(5, 10),
(7, 10),
(5, 11),
(11, 12),
(5, 13),
(12, 13),
(3, 14),
(11, 14),
(12, 14);

--
-- Indexes for dumped tables
--
--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`t_id`),
  ADD KEY `u_id` (`u_id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `user_db`
--
ALTER TABLE `user_db`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`u_id`,`p_id`),
  ADD KEY `p_id` (`p_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `p_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_db`
--
ALTER TABLE `user_db`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user_db` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `project` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `works`
--
ALTER TABLE `works`
  ADD CONSTRAINT `works_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user_db` (`u_id`),
  ADD CONSTRAINT `works_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `project` (`p_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
