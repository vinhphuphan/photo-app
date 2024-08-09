CREATE DATABASE  IF NOT EXISTS `pinterest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pinterest`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: pinterest
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `photo_id` int NOT NULL,
  `comment_date` datetime NOT NULL,
  `content` text NOT NULL,
  `parent_comment_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_user_comment` (`user_id`),
  KEY `fk_photo_comment` (`photo_id`),
  KEY `fk_comment_replies` (`parent_comment_id`),
  CONSTRAINT `comments_parent_comment_id_fkey` FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_photo_comment` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`photo_id`),
  CONSTRAINT `fk_user_comment` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,5,1,'2024-07-06 04:10:55','Look beautiful!!!',NULL),(2,5,1,'2024-07-06 04:22:25','I love it <3',NULL),(5,6,1,'2024-07-06 05:51:30','You are right!',1),(6,8,1,'2024-07-08 05:51:30','Dangerous!!',NULL),(9,5,5,'2024-07-24 09:48:22','Stunning!!!',NULL),(20,6,1,'2024-07-26 04:20:44','Nice pic',NULL),(21,6,1,'2024-07-26 04:20:58','Absolutely!',20),(24,6,31,'2024-08-04 03:47:06','I love this',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `following_id` int NOT NULL,
  `followed_id` int NOT NULL,
  PRIMARY KEY (`following_id`,`followed_id`),
  KEY `idx_following` (`following_id`),
  KEY `idx_followed` (`followed_id`),
  CONSTRAINT `followers_followed_id_fkey` FOREIGN KEY (`followed_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `followers_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (5,6),(6,5),(8,5);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `photo_path` varchar(255) NOT NULL,
  `photo_description` text,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `fk_user_photo` (`user_id`),
  CONSTRAINT `fk_user_photo` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'Tiger','https://cdn.pixabay.com/photo/2023/12/07/19/45/tiger-8436227_1280.jpg','Nature image',5),(2,'Polynesia','https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg','French polynesia, Tahiti image',5),(3,'Shopping street','https://cdn.pixabay.com/photo/2023/04/14/09/03/shopping-street-7924559_1280.jpg','Pedestrian zone, Downtown image',5),(4,'London Big Ben','https://media.istockphoto.com/id/1594359572/photo/london-big-ben-and-traffic-on-westminster-bridge.jpg?s=2048x2048&w=is&k=20&c=P2WAB-IVe3qLVZPnkeBUhs9Saz9gMtevYvOqNYAKm4A=','London Big Ben and traffic on Westminster Bridge',5),(5,'Hot air balloons','https://cdn.pixabay.com/photo/2019/10/19/12/21/hot-air-balloons-4561267_1280.jpg','Hot air balloons, Adventure, Travel image. ',5),(6,'Vineyards','https://cdn.pixabay.com/photo/2019/07/14/10/48/vineyards-4336787_1280.jpg','Vineyards, Vines, Wine image',6),(7,'Cow','https://cdn.pixabay.com/photo/2023/09/28/21/22/highland-cattle-8282564_1280.jpg','Highland cattle, Cow, Scotland image',6),(8,'Italy Street','https://images.unsplash.com/photo-1713793812520-cc09fb00d44e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Matera, Province of Matera, Italy',6),(9,'Lake','https://images.unsplash.com/photo-1721296378509-4d534a597dca?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Lake at night',5),(10,'Galaxy','https://images.unsplash.com/photo-1504333638930-c8787321eee0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',' My backyard in Petaluma, California',5),(11,'United Kingdom','https://plus.unsplash.com/premium_photo-1673002094195-f18084be89ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D','Isle of Skye, United Kingdom',5),(12,'Viet Nam Nature','https://cdn.pixabay.com/photo/2018/03/25/10/10/travel-3258965_1280.jpg','Travel, Nature, Light image. Free for use.',5),(13,'Vineyards','https://cdn.pixabay.com/photo/2019/07/14/10/48/vineyards-4336787_1280.jpg','Vineyards, Vines, Wine image',6),(14,'Viet Nam sea','https://cdn.pixabay.com/photo/2017/03/20/07/44/vietnam-2158400_1280.jpg','beautiful view',6),(15,'Train','https://cdn.pixabay.com/photo/2018/10/19/12/14/train-3758523_1280.jpg','Train, Transportation, Winter image',6),(16,'Winding road','https://cdn.pixabay.com/photo/2016/07/30/00/03/winding-road-1556177_960_720.jpg','Winding road, Sunset, Mountains image',5),(17,'Norway valley','https://cdn.pixabay.com/photo/2023/03/30/11/58/norway-7887613_1280.jpg','Norway, Landscape, Valley image',5),(18,'Iceland  River','https://cdn.pixabay.com/photo/2020/12/09/04/01/iceland-5816353_1280.jpg','Iceland, River, Cliffs image',6),(19,'Ocean','https://cdn.pixabay.com/photo/2018/04/27/08/56/water-3354063_1280.jpg','Water, Travel, Ocean image',5),(20,'Ho Chi Minh city','https://cdn.pixabay.com/photo/2016/04/23/19/03/ho-chi-minh-city-1348092_960_720.jpg','Ho-chi-minh-city, Saigon, Vietnam image',5),(21,'Scooter','https://cdn.pixabay.com/photo/2016/10/17/21/26/scooter-1748646_1280.jpg','Scooter, Moped, Travel image',5),(22,'Ocean','https://cdn.pixabay.com/photo/2018/04/27/08/56/water-3354063_1280.jpg','Water, Travel, Ocean image',5),(28,'Hotel','https://res.cloudinary.com/dqls70svr/image/upload/v1720065431/node40/manuel-moreno-DGa0LQ0yDPc-unsplash_acondt.jpg','A hotel with beautiful view',5),(29,'Pool','https://res.cloudinary.com/dqls70svr/image/upload/v1720065907/node40/edvin-johansson-rlwE8f8anOc-unsplash_zwwxbe.jpg','A pool with beautiful view',5),(31,'My wife','https://res.cloudinary.com/dqls70svr/image/upload/v1722663250/node40/trang1_hrisug.jpg','Trang - văn phòng',5),(32,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722663886/node40/hinh_cuoi_leccih.jpg','Viet Nam, photographer Long',5),(33,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722663997/node40/3ce526d5914e34106d5f23_mkittd.jpg','Viet Nam, took by photographer Long',5),(34,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664030/node40/04bf587ceee74bb912f624_yehnsn.jpg','Viet Nam, took by photographer Long',5),(35,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664057/node40/7f1998012f9a8ac4d38b20_tv0hsv.jpg','An vat',5),(36,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664093/node40/31f33ed889432c1d755221_ynjwex.jpg','An vat',5),(37,'Thit nuong nha Le Niem','https://res.cloudinary.com/dqls70svr/image/upload/v1722664522/node40/48530930beab1bf542ba17_bzokrw.jpg','Thit nuong nha Le Niem',5),(38,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664547/node40/da6ba44c13d7b689efc622_mu13xe.jpg','Viet Nam, took by photographer Long',5),(39,'Du lich Quy Nhon','https://res.cloudinary.com/dqls70svr/image/upload/v1722664587/node40/866f9e3a29a18cffd5b016_e3rbje.jpg','Du lich Quy Nhon',5),(40,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664620/node40/a980b416028da7d3fe9c30_g8ieym.jpg','Chup hinh Quan 1',5),(41,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664696/node40/e6d0c35775ccd09289dd29_z6nobe.jpg','Viet Nam, took by photographer Long',5),(42,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664760/node40/eeacf64640dde583bccc26_rs3cxb.jpg','Viet Nam, took by photographer Long',5),(43,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664796/node40/received_270058437352797_q5sfzj.jpg','Du lich Da Lat',5),(44,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722664821/node40/85acb75901c2a49cfdd328_xtitdu.jpg','Viet Nam, took by photographer Long',5),(45,'Cafe buoi sang','https://res.cloudinary.com/dqls70svr/image/upload/v1722666256/node40/0ecc4c31973d3c63652c_tsao2q.jpg','Cafe buoi sang',5),(46,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722666504/node40/290f1fd0a94b0c15555a25_jdcrec.jpg','Viet Nam, Ho Chi Minh.',5),(47,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722666560/node40/dbb5994f2fd48a8ad3c527_lphzw5.jpg','Viet Nam, HCMC, took by photographer Long.',5),(48,'Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722666597/node40/62305cb9b8621b3c4273_blvnyg.jpg','Trang',5),(49,'Phu Trang','https://res.cloudinary.com/dqls70svr/image/upload/v1722666649/node40/d4b39798759ba5c5fc8a2_ywowdm.jpg','Karaoke',5),(50,'CyberSoft Nodejs Certificate','https://res.cloudinary.com/dqls70svr/image/upload/v1722666951/node40/cybersoft_hchuxo.png','Vinh Phu successfully completed the trainning program of professional nodejs developer',5);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `reactionType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `photo_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reactions_user_id_fkey` (`user_id`),
  KEY `reactions_photo_id_fkey` (`photo_id`),
  CONSTRAINT `reactions_photo_id_fkey` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`photo_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (2,5,'haha','2024-07-30 12:50:25.820',1),(14,6,'thanks','2024-07-31 05:35:16.813',1),(15,6,'haha','2024-07-31 14:49:44.101',5),(16,6,'love','2024-08-04 03:46:59.684',31),(17,6,'haha','2024-08-08 05:27:23.810',29);
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_photos`
--

DROP TABLE IF EXISTS `saved_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_photos` (
  `user_id` int NOT NULL,
  `photo_id` int NOT NULL,
  `save_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`,`photo_id`),
  KEY `fk_photo_saved_photo` (`photo_id`),
  CONSTRAINT `fk_photo_saved_photo` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`photo_id`),
  CONSTRAINT `fk_user_saved_photo` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_photos`
--

LOCK TABLES `saved_photos` WRITE;
/*!40000 ALTER TABLE `saved_photos` DISABLE KEYS */;
INSERT INTO `saved_photos` VALUES (5,1,'2024-04-24 11:58:01'),(5,5,'2024-07-04 05:42:45'),(5,9,'2024-07-04 04:13:56'),(5,19,'2024-07-04 05:43:09'),(6,1,'2024-04-24 11:58:01'),(6,2,'2024-04-24 11:58:01');
/*!40000 ALTER TABLE `saved_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `birthdate` datetime DEFAULT NULL,
  `avatar` longtext,
  `refresh_token` varchar(255) DEFAULT NULL,
  `sub_google_id` varchar(255) DEFAULT NULL,
  `introduce` longtext,
  `website` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `follower_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `sub_google_id` (`sub_google_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'','','Vĩnh Phú',NULL,'https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg',NULL,'115331492603984619267',NULL,NULL,'vinhphu',0),(6,'phanvinhphu2@gmail.com','$2b$10$W704ks/UkQUb5Tf1D4RmbuH8d0KKKDSXbdLhewS0YuOzQ/SbMl6oS','Thomas Edison','1997-03-06 00:00:00','https://res.cloudinary.com/dqls70svr/image/upload/v1722572379/node40/3d-rendering-avatar_fho7g5.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJpYXQiOjE3MjI2ODIyODcsImV4cCI6MTcyMzU0NjI4N30.xxRst9OtxwM2KzKSEM3gle7aIDW7CMLQ5ZehrEJbof4',NULL,'I love science and creativity. A nice person from Ohio','','thomas_edison',0),(8,'vinhphu.phan@students.mq.edu.au','','Helen',NULL,'https://res.cloudinary.com/dqls70svr/image/upload/v1722573283/node40/cute-business-woman_kantv6.jpg','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE3MjAwNjI3OTIsImV4cCI6MTcyMDkyNjc5Mn0.dJ6UJXAWLggnSYMVYljdqbHi8xPpFdb_7XIWYyplQ6s','106065269130317748753','I am an office girl',NULL,'helen',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-09 10:43:46
