-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2025 at 02:51 PM
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
-- Database: `eksul`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nia` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'admin',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id_admin`, `name`, `password`, `nia`, `role`, `createdAt`, `updatedAt`) VALUES
(3, 'admin1', '$2b$10$rP63SsCgiQj7ws8UbPJenOzcCs4CqW2Tw6.HGDOdhxIFKYYw12OeS', '231234', 'admin', '2025-07-09 12:33:28', '2025-07-09 12:33:28');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id_attendance` int(11) NOT NULL,
  `eksulId` int(11) NOT NULL,
  `date` date NOT NULL,
  `present_members` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id_attendance`, `eksulId`, `date`, `present_members`, `createdAt`, `updatedAt`) VALUES
(1, 2, '2025-07-07', '[\"user1\",\"user3\",\"user5\"]', '2025-07-09 07:02:41', '2025-07-09 07:02:41'),
(2, 2, '2025-07-09', '[\"user3\",\"user1\"]', '2025-07-09 13:48:17', '2025-07-09 13:56:35'),
(3, 1, '2025-07-10', '[\"user1\"]', '2025-07-10 12:25:54', '2025-07-10 12:25:54');

-- --------------------------------------------------------

--
-- Table structure for table `eksul`
--

CREATE TABLE `eksul` (
  `id_eksul` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `day` text NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `members` text DEFAULT NULL,
  `coach` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eksul`
--

INSERT INTO `eksul` (`id_eksul`, `name`, `day`, `start_time`, `end_time`, `members`, `coach`, `createdAt`, `updatedAt`) VALUES
(1, 'Basket', '[\"Monday\",\"Wednesday\"]', '15:00:00', '18:00:00', '[\"user1\"]', 'Coach 1', '2025-07-10 12:04:53', '2025-07-10 12:05:09'),
(2, 'Badminton', '[\"Tuesday\",\"Wednesday\"]', '18:00:00', '20:00:00', NULL, 'Coach 2', '2025-07-10 12:05:40', '2025-07-10 12:05:40'),
(3, 'Music', '[\"Monday\",\"Tuesday\",\"Friday\"]', '16:30:00', '17:30:00', '[\"user3\",\"user1\"]', 'Coach 3', '2025-07-10 12:20:56', '2025-07-10 12:27:58'),
(7, 'band', '[\"senin-jumat\"]', '03:30:00', '06:30:00', NULL, 'coach5', '2025-07-10 12:37:05', '2025-07-10 12:37:05');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id_student` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `nis` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'student',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id_student`, `name`, `password`, `class`, `nis`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'user1', '$2b$10$bFFEJFNcxdqce.W/QYN8I.1ELZwuLgq5qb65qWpdECH6/qWcVTcmi', '10 IPA 3', '232312', 'student', '2025-07-09 05:05:53', '2025-07-09 05:05:53'),
(2, 'user2', '$2b$10$M1WiQjCSsGPYfW0AY2XuOOKG9.wKNYO.EtGPtDUcoeIAuaFWOGokK', '11 SOS 1', '128942', 'student', '2025-07-09 11:41:34', '2025-07-09 11:41:34'),
(3, 'user3', '$2b$10$wJYFRj38x6hQW9ZBggBZUeL6FFeNbJW9GJAvC.wNcakaWqi53LbdO', '10 IPA 1', '284092', 'student', '2025-07-09 12:12:21', '2025-07-09 12:12:21'),
(4, 'tes', '$2b$10$9j5TNs9iYLXHR2X2sOIdme.xLBOe6gRN47tfleXFrCtJPVc1OHxHe', '11 SOS 2', '2122222', 'student', '2025-07-10 07:16:08', '2025-07-10 07:16:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `nia` (`nia`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id_attendance`),
  ADD KEY `eksulId` (`eksulId`);

--
-- Indexes for table `eksul`
--
ALTER TABLE `eksul`
  ADD PRIMARY KEY (`id_eksul`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id_student`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id_attendance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `eksul`
--
ALTER TABLE `eksul`
  MODIFY `id_eksul` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`eksulId`) REFERENCES `eksul` (`id_eksul`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
