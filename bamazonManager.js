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
  // call prompt function to ask manager
  promptManager();
});


function promptManager() {
    inquirer
    .prompt({
      name: "filter",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.filter) {
        case "View Products for Sale":
          products();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          newProduct();
          break;
      }
    });
};


function products() {
    console.log("view products");
    connection.query("SELECT * FROM products",
      function(error, results) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
          console.log("ID " + results[i].item_id + " | " + results[i].product_name + " | $" + results[i].price + " | " + results[i].stock_quantity + " units left");
        }
      end();
    });
};


function lowInventory() {
    console.log("low inventory");
    end();
};


function addInventory() {
    console.log("add inventory");
    end();
};


function newProduct() {
    console.log("new products");
    end();
};


// function to stop connection and return
function end() {
    connection.end();
};