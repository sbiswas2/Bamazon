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
    		var quantity = parseInt(results[0].stock_quantity);
    		console.log(quantity);
    		if (quantity === 0) {
    			noInventory();
    		} else {
    			updateInventory(id, units);
    		};
		});
    });
};

// function if quantity is 0
function noInventory() {
	console.log("Insufficient quantity!");
	end();
};

// function to update quantity
function updateInventory(id, units) {
	console.log("update");
	console.log(id, units);
	end();
};
// function to stop connection and return
function end() {
  	connection.end();
};
