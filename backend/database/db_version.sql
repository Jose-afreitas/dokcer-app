-- 06/12/2022
CREATE TABLE IF NOT EXISTS ecommerce.imagens_produtos (
id_imagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_produto INT,
caminho VARCHAR(255),
FOREIGN KEY (id_produto) REFERENCES produtos (id_produto)
);



-- 08/12/2022


DROP TABLE products
DROP TABLE products
DROP TABLE orders
DROP TABLE users


CREATE TABLE IF NOT EXISTS `ecommerce`.`products` (
  `productId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `price` FLOAT(11) NOT NULL,
  `productImage` VARCHAR(255),
  PRIMARY KEY (`productId`),
   UNIQUE KEY (name))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `ecommerce`.`orders` (
  `orderId` INT(11) NOT NULL AUTO_INCREMENT,
  `productId` INT(11) NOT NULL,
  `quantity` SMALLINT(6) NOT NULL,
  PRIMARY KEY (`orderId`),
  INDEX `fk_orders_products_idx` (`productId` ASC),
  CONSTRAINT `fk_orders_products`
    FOREIGN KEY (`productId`)
    REFERENCES `ecommerce`.`products` (`productId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE ecommerce.users (userId 
INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(100)  NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
 UNIQUE KEY (email)
);

CREATE TABLE IF NOT EXISTS ecommerce.productImage (
imageId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
productId INT,
path VARCHAR(255),
FOREIGN KEY (productId) REFERENCES products (productId)
);