-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 19. Feb 2025 um 11:29
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `doenerbrudi`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `businessName` varchar(70) NOT NULL,
  `businessLocation` varchar(70) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `appointments`
--

INSERT INTO `appointments` (`id`, `businessName`, `businessLocation`, `createdAt`) VALUES
(1, 'test', 'test street', '2025-02-14 10:39:54'),
(2, 'test2', 'test2 street', '2025-02-14 10:44:51'),
(3, 'test2', 'test2 street', '2025-02-14 10:44:57'),
(4, 'test4', 'test2 street', '2025-02-14 10:46:31'),
(5, 'undefined', 'test2 street', '2025-02-14 10:45:22'),
(6, 'name', 'test2 street', '2025-02-14 10:49:43'),
(7, 'name', 'test2 street', '2025-02-14 10:49:56'),
(8, 'name', 'test2 street', '2025-02-14 10:50:02'),
(9, 'name', 'test2 street', '2025-02-14 11:31:56'),
(10, 'name2', 'test2 street', '2025-02-14 11:46:48'),
(11, 'undefined', 'undefined', '2025-02-18 07:49:41'),
(12, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 07:52:50'),
(13, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 07:56:57'),
(14, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 07:58:50'),
(15, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 08:00:27'),
(16, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 08:01:54'),
(17, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 08:05:06'),
(18, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 08:05:55'),
(19, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 09:51:33'),
(20, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 09:52:48'),
(21, 'Sipan Grill', 'Neuwerkstraße 39, 99084 Erfurt', '2025-02-18 11:59:52');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointmentstable`
--

CREATE TABLE `appointmentstable` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `appointmentId` int(11) NOT NULL,
  `appointmentDate` varchar(30) NOT NULL,
  `accepted` tinyint(4) NOT NULL DEFAULT 0,
  `creatorId` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `appointmentstable`
--

INSERT INTO `appointmentstable` (`id`, `userId`, `appointmentId`, `appointmentDate`, `accepted`, `creatorId`, `active`) VALUES
(1, 1, 9, '2025-02-20', 0, 1, 1),
(3, 3, 9, '2025-02-20', 0, 1, 1),
(4, 1, 10, '2025-02-21', 0, 3, 1),
(5, 3, 10, '2025-02-21', 0, 3, 1),
(6, 1, 16, '2025-02-18T08:01:49.033Z', 0, 1, 1),
(8, 1, 17, '2025-02-18T08:05:01.500Z', 0, 1, 1),
(9, 1, 18, '2025-02-18T08:05:52.238Z', 0, 1, 1),
(10, 3, 18, '2025-02-18T08:05:52.238Z', 0, 1, 1),
(11, 1, 19, '2025-02-19T12:52:00.000Z', 0, 1, 1),
(12, 3, 19, '2025-02-19T12:52:00.000Z', 0, 1, 1),
(13, 1, 20, '2025-02-18T09:52:29.356Z', 0, 1, 1),
(15, 1, 21, '2025-02-18T11:59:49.300Z', 0, 1, 1),
(16, 3, 21, '2025-02-18T11:59:49.300Z', 0, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `chattable`
--

CREATE TABLE `chattable` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `chatId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `friendlist`
--

CREATE TABLE `friendlist` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `friendId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `friendlist`
--

INSERT INTO `friendlist` (`id`, `userId`, `friendId`) VALUES
(1, 3, 1),
(2, 1, 3),
(3, 1, 4),
(4, 4, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `friendrequest`
--

CREATE TABLE `friendrequest` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `friendrequest`
--

INSERT INTO `friendrequest` (`id`, `senderId`, `receiverId`, `accepted`, `timestamp`) VALUES
(1, 1, 5, 0, '2025-02-18 11:26:07'),
(2, 1, 5, 0, '2025-02-18 11:27:00'),
(3, 1, 5, 0, '2025-02-18 11:28:18'),
(4, 1, 5, 0, '2025-02-18 11:46:18'),
(5, 1, 5, 0, '2025-02-18 12:00:05');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `appointmentId` int(11) NOT NULL,
  `appointmentDate` timestamp NULL DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `accepted` tinyint(1) NOT NULL DEFAULT 0,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chatId` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `messagetext` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `lastlogin` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `nickname`, `lastlogin`, `createdAt`, `deleted`) VALUES
(1, 'test', 'password123', 'test@test.de', 'test', NULL, '2025-02-12 10:25:40', 0),
(3, 'JohnDoe', 'passwort123', 'john@doe.de', 'DoeMan', NULL, '2025-02-12 11:06:13', 0),
(4, 'Test2', 'pw123', 'test2@test.de', 'tester', NULL, '2025-02-12 12:16:36', 0),
(5, 'username', 'new', 'newguy@gmail.com', NULL, NULL, '2025-02-18 11:14:25', 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `appointmentstable`
--
ALTER TABLE `appointmentstable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `appointmentId` (`appointmentId`);

--
-- Indizes für die Tabelle `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `chattable`
--
ALTER TABLE `chattable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `chatId` (`chatId`);

--
-- Indizes für die Tabelle `friendlist`
--
ALTER TABLE `friendlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `friendId` (`friendId`);

--
-- Indizes für die Tabelle `friendrequest`
--
ALTER TABLE `friendrequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `senderId` (`senderId`),
  ADD KEY `receiverId` (`receiverId`);

--
-- Indizes für die Tabelle `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `history_ibfk_1` (`appointmentId`);

--
-- Indizes für die Tabelle `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chatId` (`chatId`),
  ADD KEY `senderId` (`senderId`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT für Tabelle `appointmentstable`
--
ALTER TABLE `appointmentstable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT für Tabelle `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `chattable`
--
ALTER TABLE `chattable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `friendlist`
--
ALTER TABLE `friendlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `friendrequest`
--
ALTER TABLE `friendrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `appointmentstable`
--
ALTER TABLE `appointmentstable`
  ADD CONSTRAINT `appointmentstable_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `appointmentstable_ibfk_2` FOREIGN KEY (`appointmentId`) REFERENCES `appointments` (`id`);

--
-- Constraints der Tabelle `chattable`
--
ALTER TABLE `chattable`
  ADD CONSTRAINT `chattable_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `chattable_ibfk_2` FOREIGN KEY (`chatId`) REFERENCES `chat` (`id`);

--
-- Constraints der Tabelle `friendlist`
--
ALTER TABLE `friendlist`
  ADD CONSTRAINT `friendlist_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `friendlist_ibfk_2` FOREIGN KEY (`friendId`) REFERENCES `user` (`id`);

--
-- Constraints der Tabelle `friendrequest`
--
ALTER TABLE `friendrequest`
  ADD CONSTRAINT `friendrequest_ibfk_1` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`);

--
-- Constraints der Tabelle `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`appointmentId`) REFERENCES `appointmentstable` (`appointmentId`),
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints der Tabelle `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chatId`) REFERENCES `chat` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
