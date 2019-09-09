var db = require("./CRUD_obj");
var inquirer = require("inquirer");
require("dotenv").config();

var bamazon = () => {
    var session = new db.session(
        `localhost`,
        3306,
        process.env.USERNAME,
        process.env.PASSWORD,
        `bamazon`
    );
    return session;
} 

bamazon().prettify('products');

setTimeout(() => {
    inquirer.prompt([
        {
            type: `input`,
            name: `product`,
            message: `id of your product: `
        },{
            type: `input`,
            name: `volume`,
            message: `amount: `
        }
    ]).then((answers) => {

        bamazon().read(`products`).then((data) => {
            
            // console.log(data);

            let answerId = parseInt(answers.product);
            
            data.forEach(item => {
                
                if (item.item_id === answerId) {
                    
                    if (item.stock_quantity >= answers.volume) {
                        
                        bamazon().update(`products`, 
                        `stock_quantity = ${item.stock_quantity - answers.volume}`,
                        `item_id = ${item.item_id}`);

                        console.log(`Total cost is: ${item.price * answers.volume}`);

                    } else {

                        console.log(`insufficient quantity! Get outta' here!`)

                    }
                }
            });
        });
    
    });

}, 500);
