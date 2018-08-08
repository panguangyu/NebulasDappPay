/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : wallet-job

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-06-30 17:11:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pay
-- ----------------------------
DROP TABLE IF EXISTS `pay`;
CREATE TABLE `pay` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tradeid` bigint(11) DEFAULT NULL,
  `nas` varchar(255) DEFAULT NULL,
  `sellerWallet` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tradeid` (`tradeid`),
  UNIQUE KEY `tradeid_2` (`tradeid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pay
-- ----------------------------
INSERT INTO `pay` VALUES ('1', '1530341760', '0.00001', 'n1LncwcBLt4biFggrdP93KzM3DCzpZyB41V');
INSERT INTO `pay` VALUES ('2', '1530342111', '0.02', 'n1LncwcBLt4biFggrdP93KzM3DCzpZyB41V');
INSERT INTO `pay` VALUES ('3', '1530346228', '0.01', 'n1HPBxtXfWmZUEZ5Dqjnn94sWuXkSpbHZ4H');
INSERT INTO `pay` VALUES ('4', '1530348773', '0.001', 'n1MsdXauB5jKKjMjeSXw3FcJbCR275LLaar');
