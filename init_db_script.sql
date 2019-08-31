CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
						item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
                        product_name VARCHAR(100) NOT NULL,
                        department_name VARCHAR(100) NOT NULL,
                        price DECIMAL(10,2) NOT NULL,
                        stock_quantity INTEGER(10) NOT NULL
						);
                        
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Mug", "Home Goods", 12.99, 11),
		("xbox", "Electronics", 249.99, 5),
        ("Chromecast", "Electronics", 35.00, 10),
        ("Slippers", "Clothing", 24.00, 15),
        ("Eggo Waffles", "Food", 9.99, 8),
        ("Salt Shaker", "Home Goods", 14.99, 3),
        ("Olive Oil (lg)", "Food", 14.99, 4),
        ("iPhone", "Electronics", 399.99, 15),
        ("T-Shirt (Red)", "Clothing", 21.99, 8),
        ("Dorito Chips", "Food", 7.75, 6)