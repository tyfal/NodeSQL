var db = require("./CRUD_obj");
var inquirer = require("inquirer");

bamazon = new db.session();

bamazon.read('products', 'item_id, product_name, price');
