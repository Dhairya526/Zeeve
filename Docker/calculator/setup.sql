CREATE DATABASE `calculator`;

USE `calculator`;

CREATE TABLE IF NOT EXISTS `calculator_1` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `expression` varchar(50) NOT NULL,
  `answer` int(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;