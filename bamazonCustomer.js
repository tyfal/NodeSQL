var db = require("./CRUD_obj");
var inquirer = require("inquirer");

try {

    bamazon = new db.session();

    bamazon.read('products','WHERE item_id = 9');

} catch(err) {

    console.log(err);

}
