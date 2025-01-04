-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2025 at 09:36 AM
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
-- Database: `yar_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`) VALUES
(4, 'Tools/Equipments', '2025-01-04 05:52:46'),
(5, 'Consumables', '2025-01-04 05:52:54'),
(6, 'Vehicles', '2025-01-04 05:53:03');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `checkedOutDate` date DEFAULT NULL,
  `checkedInDate` date DEFAULT NULL,
  `checkedOutBy` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `projectSite` varchar(255) DEFAULT NULL,
  `useStartDate` date DEFAULT NULL,
  `useEndDate` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `category`, `name`, `tag`, `quantity`, `unit`, `remarks`, `date`, `checkedOutDate`, `checkedInDate`, `checkedOutBy`, `project`, `projectSite`, `useStartDate`, `useEndDate`, `status`) VALUES
(10, 'Tools', 'Excavator', 'EXC-101', 5, 'Units', 'Heavy equipment for digging', '2023-12-01', '2023-12-05', '2023-12-20', 'John Doe', 'Construction of Building A', 'Site A', '2023-12-05', '2024-03-15', 'Checked Out'),
(11, 'Tools', 'Welding Machine', 'WEL-202', 3, 'Units', 'For welding metal joints', '2023-12-02', '2023-12-10', '2023-12-15', 'Jane Smith', 'Bridge Maintenance', 'Bridge Site', '2023-12-10', '2024-02-28', 'Checked Out'),
(12, 'Consumables', 'Cement', 'CEM-301', 100, 'Bags', 'Used for concrete mixing', '2023-12-03', '2023-12-07', '2023-12-15', 'Alice Johnson', 'Construction of Building A', 'Site A', '2023-12-07', '2024-03-15', 'Checked Out'),
(13, 'Tools', 'Angle Grinder', 'ANG-404', 10, 'Units', 'Cutting and grinding metal', '2023-12-04', '2023-12-08', '2023-12-20', 'Bob Lee', 'Renovation of Office HQ', 'Office Site', '2023-12-08', '2024-05-25', 'Checked Out'),
(14, 'Consumables', 'Paint', 'PAI-405', 50, 'Liters', 'For painting walls and surfaces', '2023-12-05', '2023-12-10', '2023-12-25', 'Charlie White', 'Road Paving Project', 'Highway Site', '2023-12-10', '2023-11-10', 'Checked Out'),
(15, 'Tools', 'Power Saw', 'PSA-506', 7, 'Units', 'Used for cutting wood and metal', '2023-12-06', '2023-12-12', '2023-12-17', 'David Lee', 'Airport Expansion', 'Airport Site', '2023-12-12', '2024-12-31', 'Checked Out'),
(16, 'Tools', 'Crane', 'CRA-607', 2, 'Units', 'Used for lifting heavy loads', '2023-12-07', '2023-12-15', '2023-12-20', 'Eve Turner', 'Construction of Building A', 'Building A', '2023-12-15', '2024-03-15', 'Checked Out'),
(17, 'Consumables', 'Nails', 'NAI-708', 500, 'Packs', 'Used for building structures', '2023-12-08', '2023-12-15', '2023-12-20', 'John Doe', 'Renovation of Office HQ', 'Office HQ', '2023-12-15', '2024-05-25', 'Checked Out'),
(18, 'Tools', 'Jackhammer', 'JAC-809', 4, 'Units', 'For breaking concrete', '2023-12-09', '2023-12-16', '2023-12-25', 'Catherine Lee', 'Bridge Maintenance Project', 'Bridge Site', '2023-12-16', '2024-02-28', 'Checked Out'),
(19, 'Consumables', 'Lumber', 'LUM-910', 200, 'Pieces', 'For building wooden frames', '2023-12-10', '2023-12-18', '2023-12-25', 'David Lee', 'Road Paving Project', 'Highway Site', '2023-12-18', '2023-11-10', 'Checked Out'),
(20, 'Tools', 'Scaffolding', 'SCA-011', 10, 'Sets', 'Used for constructing elevated work platforms', '2023-12-11', '2023-12-20', '2023-12-30', 'Eve Turner', 'Airport Expansion', 'Airport Site', '2023-12-20', '2024-12-31', 'Checked Out'),
(21, 'Consumables', 'Concrete', 'CON-112', 200, 'Bags', 'Used for construction work', '2023-12-12', '2023-12-22', '2023-12-25', 'Alice Johnson', 'Construction of Building A', 'Site A', '2023-12-22', '2024-03-15', 'Checked Out'),
(22, 'Tools', 'Paver', 'PAV-213', 3, 'Units', 'Used for paving roads', '2023-12-13', '2023-12-22', '2023-12-30', 'John Doe', 'Road Paving Project', 'Highway Site', '2023-12-22', '2023-11-10', 'Checked Out'),
(23, 'Consumables', 'Asphalt', 'ASP-314', 50, 'Tons', 'Used for road surfacing', '2023-12-14', '2023-12-23', '2023-12-30', 'Jane Smith', 'Bridge Maintenance Project', 'Bridge Site', '2023-12-23', '2024-02-28', 'Checked Out'),
(24, 'Tools', 'Cement Mixer', 'CEM-415', 5, 'Units', 'For mixing cement and other materials', '2023-12-15', '2023-12-25', '2023-12-30', 'Catherine Lee', 'Construction of Building A', 'Site A', '2023-12-25', '2024-03-15', 'Checked Out'),
(25, 'Consumables', 'Plaster', 'PLA-516', 40, 'Bags', 'Used for covering walls', '2023-12-16', '2023-12-26', '2023-12-30', 'Bob Lee', 'Renovation of Office HQ', 'Office Site', '2023-12-26', '2024-05-25', 'Checked Out'),
(26, 'Tools', 'Forklift', 'FOR-617', 2, 'Units', 'For moving materials around the site', '2023-12-17', '2023-12-28', '2023-12-30', 'Alice Johnson', 'Airport Expansion', 'Airport Site', '2023-12-28', '2024-12-31', 'Checked Out'),
(27, 'Consumables', 'Brick', 'BRI-718', 500, 'Pieces', 'Used for building walls', '2023-12-18', '2023-12-30', '2023-12-30', 'David Lee', 'Road Paving Project', 'Highway Site', '2023-12-30', '2023-11-10', 'Checked Out'),
(28, 'Tools', 'Pallet Jack', 'PAL-819', 3, 'Units', 'Used for moving pallets', '2023-12-19', '2023-12-31', '2023-12-30', 'Charlie White', 'Bridge Maintenance Project', 'Bridge Site', '2023-12-31', '2024-02-28', 'Checked Out'),
(29, 'Consumables', 'Tarp', 'TAR-920', 100, 'Units', 'Used for covering materials on site', '2023-12-20', '2023-12-31', '2023-12-30', 'John Doe', 'Construction of Building A', 'Site A', '2023-12-31', '2024-03-15', 'Checked Out'),
(30, 'Tools', 'Laser Level', 'LAS-021', 5, 'Units', 'Used for leveling surfaces', '2023-12-21', '2023-12-31', '2023-12-30', 'Alice Johnson', 'Renovation of Office HQ', 'Office Site', '2023-12-31', '2024-05-25', 'Checked Out'),
(31, 'Tools', 'Surveying Equipment', 'SUR-122', 2, 'Sets', 'For land surveying and measuring', '2023-12-22', '2024-01-05', '2024-01-10', 'Bob Lee', 'Bridge Maintenance Project', 'Bridge Site', '2024-01-05', '2024-02-28', 'Checked Out'),
(32, 'Consumables', 'Glue', 'GLU-223', 30, 'Bottles', 'Used for bonding materials', '2023-12-23', '2024-01-10', '2024-01-15', 'David Lee', 'Airport Expansion', 'Airport Site', '2024-01-10', '2024-12-31', 'Checked Out'),
(33, 'Tools', 'Pressure Washer', 'PRE-324', 5, 'Units', 'Used for cleaning surfaces', '2023-12-24', '2024-01-10', '2024-01-15', 'Charlie White', 'Road Paving Project', 'Highway Site', '2024-01-10', '2023-11-10', 'Checked Out'),
(34, 'Consumables', 'Wire', 'WIR-425', 200, 'Meters', 'Used for electrical wiring', '2023-12-25', '2024-01-10', '2024-01-15', 'Eve Turner', 'Bridge Maintenance Project', 'Bridge Site', '2024-01-10', '2024-02-28', 'Checked Out'),
(35, 'Tools', 'Drill', 'DRI-526', 8, 'Units', 'Used for drilling holes', '2023-12-26', '2024-01-15', '2024-01-20', 'John Doe', 'Construction of Building A', 'Site A', '2024-01-15', '2024-03-15', 'Checked Out'),
(36, 'Consumables', 'Sand', 'SAN-627', 100, 'Bags', 'Used for construction', '2023-12-27', '2024-01-20', '2024-01-25', 'Bob Lee', 'Renovation of Office HQ', 'Office Site', '2024-01-20', '2024-05-25', 'Checked Out'),
(37, 'Tools', 'Tamping Rammer', 'TAM-728', 3, 'Units', 'Used for compacting soil', '2023-12-28', '2024-01-25', '2024-02-05', 'Alice Johnson', 'Road Paving Project', 'Highway Site', '2024-01-25', '2023-11-10', 'Checked Out');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `manager` varchar(255) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `tools` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tools`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `manager`, `creator`, `startDate`, `endDate`, `tools`) VALUES
(1, 'Construction of Building A', 'Alice Johnson', 'Admin User', '2023-12-01', '2024-03-15', '[\"Excavator\", \"Hammer Drill\", \"Cement Mixer\"]'),
(2, 'Renovation of Office HQ', 'Bob Smith', 'Project Team A', '2024-01-10', '2024-05-25', '[\"Ladder\", \"Paint Sprayer\", \"Power Saw\"]'),
(3, 'Bridge Maintenance Project', 'Catherine Lee', 'Site Manager', '2023-11-15', '2024-02-28', '[\"Jackhammer\", \"Safety Harness\", \"Scaffolding\"]'),
(4, 'Road Paving Project', 'David Lee', 'Construction Head', '2023-08-20', '2023-11-10', '[\"Paver\", \"Roller\", \"Concrete Mixer\"]'),
(5, 'Airport Expansion', 'Eve Turner', 'Airport Authority', '2023-06-01', '2024-12-31', '[\"Crane\", \"Excavator\", \"Concrete Pump\"]'),
(6, 'Highway Widening Project', 'John Doe', 'Construction Team B', '2023-07-15', '2024-02-20', '[\"Backhoe\", \"Paver\", \"Grader\"]'),
(7, 'Water Treatment Plant', 'Sarah White', 'Engineering Department', '2024-02-01', '2024-12-01', '[\"Excavator\", \"Cement Mixer\", \"Concrete Pump\"]'),
(8, 'Dam Repair Project', 'Michael Black', 'Waterworks Team', '2023-09-05', '2024-01-30', '[\"Bulldozer\", \"Welding Machine\", \"Scaffolding\"]'),
(9, 'Bridge Construction Project', 'Rachel Green', 'Site Engineer', '2023-11-01', '2024-06-15', '[\"Crane\", \"Jackhammer\", \"Welding Machine\"]'),
(10, 'Subway Tunnel Construction', 'Tom Harris', 'Project Team C', '2023-05-10', '2024-10-15', '[\"Tunnel Boring Machine\", \"Excavator\", \"Drill Rig\"]');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `category_id`, `created_at`) VALUES
(17, 'Welding Machine', 4, '2025-01-04 05:54:38'),
(18, 'Angle Grinder', 4, '2025-01-04 05:54:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(3, 'Ronald Labrador', 'ronald@gmail.com', '$2a$10$sHMsgYDfou81v3B2/ATRke6T77U7XD3u262EaO5arcX.Ppbdj0mR6'),
(5, 'Nolly Alvarado', 'nolly@gmail.com', '$2a$10$eL6Qe4EZCrpIZmwztrliGeEujDRfCc1kfuixxheYu378jsI.7mXHu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
