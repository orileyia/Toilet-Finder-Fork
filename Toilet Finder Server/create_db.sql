create table `users` (
	`id` int PRIMARY KEY AUTO_INCREMENT,
 	`username` varchar(30) NOT NULL,
 	`email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
);

CREATE TABLE `user_tokens` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `expiry` datetime NOT NULL,
  `user_id` int(11),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

create table `toilets` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `creator_id` int not null,
  `longitude` DECIMAL NOT NULL,
  `latitude` DECIMAL NOT NULL,
  `rating` INT NOT NULL,
  `price` FLOAT NOT NULL,
  foreign key (`creator_id`) references users(`id`)
);