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
    	var id = answer.id;
    	var units = answer.units;
    	console.log(id);
    	console.log(units);
    	connection.query("SELECT * FROM products WHERE item_id = " + id + ";",
    	function(error, results) {
    		if (error) throw error;
    		var quantity = parseInt(results[0].stock_quantity);
    		var price = parseInt(results[0].price);
    		var cost = units * price;
    		console.log(quantity);
    		if (quantity === 0) {
    			noInventory();
    		} else {
    			console.log("Total Cost: $" + cost + " Dollars");
    			updateInventory(id, units, quantity);
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
function updateInventory(id, units, quantity) {
	console.log("update");
	console.log(id, units, quantity);
	var updateQuantity = quantity - units;
	console.log(updateQuantity);
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
              console.log("Updated successfully!");
            }
          );
	end();
};

// function to stop connection and return
function end() {
  	connection.end();
};
