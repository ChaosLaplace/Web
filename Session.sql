SET CHARSET utf8;

use node;
 
DROP TABLE IF EXISTS `Session`;

CREATE TABLE `Session`
(
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `User` longtext NOT NULL COMMENT '帳號',
  `Password` longtext NOT NULL COMMENT '密碼',
  `create_time` datetime NOT NULL COMMENT '作成日時',
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;