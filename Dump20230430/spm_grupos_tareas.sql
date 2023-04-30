CREATE DATABASE  IF NOT EXISTS `spm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spm`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: spm
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `grupos_tareas`
--

DROP TABLE IF EXISTS `grupos_tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos_tareas` (
  `idgrupo` int NOT NULL,
  `conexion` int NOT NULL,
  `idtarea` int NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `fechaCumplimiento` date NOT NULL,
  `observacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idgrupo`,`conexion`,`idtarea`),
  KEY `tarea_idx` (`idtarea`),
  CONSTRAINT `grupo` FOREIGN KEY (`idgrupo`) REFERENCES `grupos` (`idGrupos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tarea` FOREIGN KEY (`idtarea`) REFERENCES `tareas` (`idTareas`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos_tareas`
--

LOCK TABLES `grupos_tareas` WRITE;
/*!40000 ALTER TABLE `grupos_tareas` DISABLE KEYS */;
INSERT INTO `grupos_tareas` VALUES (1,154187,2,1,'2023-05-25','asd'),(1,164544,1,1,'2023-05-25','prueba2'),(1,215245,1,1,'2023-04-25','pruebas');
/*!40000 ALTER TABLE `grupos_tareas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30 12:42:39
