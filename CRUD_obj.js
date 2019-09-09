var mysql = require("mysql");
var PrettyTable = require("prettytable");
var util = require("util");

class CRUD {

    constructor(host, port, user, password, database) {

        this.connection = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        });

        this.connection.connect();

    }


    /**
     * creates row
     *
     * @param {string} table
     * @param {string} colNames "(col1, col2, col3)"
     * @param {array} values 
     * 
     * @example
     * create('songs', '(title, artist, genre)', [["Crooked Teeth", "Death Cab for Cutie", "Alt Rock"]]);
     */

    create(table, columns, values) {

        this.connection.query(`INSERT INTO ${table} ${columns} VALUES ?`, [values], function (err, result) {

            if (err) throw err;

        });

        this.connection.end();

    }


    /**
     * reads table and outputs all values
     *
     * @param {string} table "table"
     * @param {string} whereCondition "Where col = value"
     * 
     * @example
     * read('songs','WHERE song = "All the Small Things"');
     */

    read(table, columns = "*", whereCondition = "") {

        var data = {"values": []}

        let promise = new Promise((resolve, reject) => {

            var query = util.promisify(this.connection.query).bind(this.connection);

            (async () => {
            
                try {
                    
                    var rows = await query(`SELECT ${columns} FROM ${table} ${whereCondition}`);
                    
                    resolve(rows);
                
                } catch(err) {

                    console.log(`${err}`);

                }
            
            })()

        });

        this.connection.end();

        return promise;

    }


    /**
     * deletes row
     *
     * @param {string} table 
     * @param {string} codition `col1 = "value"`
     * 
     * @example
     * deleteItem('songs', 'title = "Cringe"');
     */

    deleteItem(table, condition) {

        this.connection.query(`DELETE FROM ${table} WHERE ${condition}`, function (err, result) {

            if (err) throw err;

        });

        this.connection.end();

    }


    /**
     * updates database
     *
     * @param {string} table
     * @param {string} assignment `col1 = "value"`
     * @param {string} condition `col1 = "value"`
     * 
     * @example
     * update('songs', 'genre="Rock"', 'title="Crooked Teeth"');
     */

    update(table, assignment, condition) {

        this.connection.query(`UPDATE ${table} SET ${assignment} WHERE ${condition}`, function (err, result) {

            if (err) throw err;

        });

        this.connection.end();

    }


    prettify(table, columns = "*", whereCondition = "") {

        this.read(table, columns, whereCondition).then((data) => {

            var rows = [];
    
            var headers = Object.keys(data[0]);
    
            data.forEach(row => {
    
                var dataRow = [];
    
                headers.forEach(key => {
    
                    dataRow.push(row[key]);
    
                });
    
                rows.push(dataRow);
    
            });
    
            var pt = new PrettyTable();
    
            pt.create(headers, rows);
    
            pt.print();

        })

    }

}

module.exports = {
    session: CRUD
}









