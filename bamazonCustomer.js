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
  connection.query("SELECT * FROM products",
  function(error, results) {
    if (error) throw error;
    for (var i = 0; i < results.length; i++) {
    	console.log("ID " + results[i].item_id + " | " + results[i].product_name + " | $" + results[i].price);
    }
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
    	var id = parseInt(answer.id);
    	var units = parseInt(answer.units);
    	connection.query("SELECT * FROM products WHERE item_id = " + id + ";",
    	function(error, results) {
    		if (error) throw error;
    		// calculations
    		var quantity = parseInt(results[0].stock_quantity);
    		var price = parseInt(results[0].price);
    		var cost = units * price;
    		var remaining = quantity - units; // to avoid negative numbers in inventory
    		if (quantity === 0 || remaining < 0) {
    			noInventory(); // re-direct to function for no inventory
    		} else {
    			console.log("Total Cost: $" + cost + " Dollars"); // display total cost
    			updateInventory(id, units, quantity); // re-direct to function to update
    		};
		});
    });
};


// function if quantity is 0
function noInventory() {
	console.log("Insufficient quantity!");
	end(); // end
};


// function to update quantity
function updateInventory(id, units, quantity) {
	var updateQuantity = quantity - units;
	connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updateQuantity
              },
              {
                item_id: id
              }
            ],
            function(error) {
              if (error) throw err;
            }
          );
	end(); // end
};


// function to stop connection and return
function end() {
  	connection.end();
};
