# Host: localhost  (Version: 5.5.53)
# Date: 2018-01-29 21:02:38
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "goodsinfo"
#

DROP TABLE IF EXISTS `goodsinfo`;
CREATE TABLE `goodsinfo` (
  `goodsid` char(16) NOT NULL,
  `goodsname` varchar(30) NOT NULL,
  `goodscount` int(11) DEFAULT NULL,
  `goodsprice` float DEFAULT NULL,
  PRIMARY KEY (`goodsid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "goodsinfo"
#

/*!40000 ALTER TABLE `goodsinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `goodsinfo` ENABLE KEYS */;

#
# Structure for table "shoppingcar"
#

DROP TABLE IF EXISTS `shoppingcar`;
CREATE TABLE `shoppingcar` (
  `username` varchar(20) NOT NULL,
  `goodsid` char(16) NOT NULL,
  `goodscount` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "shoppingcar"
#

/*!40000 ALTER TABLE `shoppingcar` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingcar` ENABLE KEYS */;

#
# Structure for table "vip"
#

DROP TABLE IF EXISTS `vip`;
CREATE TABLE `vip` (
  `username` varchar(20) NOT NULL,
  `userpass` varchar(16) NOT NULL,
  `usersex` char(2) DEFAULT NULL,
  `userage` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

#
# Data for table "vip"
#

/*!40000 ALTER TABLE `vip` DISABLE KEYS */;
INSERT INTO `vip` VALUES ('','',NULL,NULL),('12321321321','12345',NULL,NULL),('15249000260','123456',NULL,NULL),('19992299191','987654',NULL,NULL);
/*!40000 ALTER TABLE `vip` ENABLE KEYS */;
