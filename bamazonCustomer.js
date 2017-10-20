var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection to sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // username
  user: "root",
  // password
  password: "",
  database: "bamazon"
});

// connect to mysql server and sql database
connection.connect(function(error) {
  if (error) throw error;
  // call info function to show products
  allInfo();
  // end function to stop connect and return
  connection.end();
});

// display item_id, product_name, price
function allInfo() {
  connection.query("SELECT item_id, product_name, price FROM products",
  function(error, results) {
    if (error) throw error;
    console.log(results);
    // run the function to prompt user
    promptCustomer();
  });
};

// function to prompt user of purchase
function promptCustomer() {
	inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the item ID you would like to buy?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units would you like to buy?"
      }
    ])
    .then(function(answer) {
    	var id = answer.id;
    	var units = answer.units;
    	console.log(id);
    	console.log(units);
    	connection.query("SELECT stock_quantity FROM products WHERE item_id = " + id + ";",
    		function(error, results) {
    			if (error) throw error;
    			console.log(results);
		});
    });
};

// function if quantity is 0

// function to update quantity


