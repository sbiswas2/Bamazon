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


// give manager choices
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


// list all products
function products() {
    connection.query("SELECT * FROM products",
      function(error, results) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
          console.log("ID " + results[i].item_id + " | " + results[i].product_name + " | $" + results[i].price + " | " + results[i].stock_quantity + " units left");
        }
      end(); // end
    });
};


// show items where inventory is less than 5 units
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",
      function(error, results) {
        if (error) throw error;
        // first check if there are items, if no items have low inventory then display this message
        if (results.length === 0) {
          console.log("All items have sufficient inventory");
        } else {
          // if there are items, then display low inventory
          for (var i = 0; i < results.length; i++) {
            console.log("ID " + results[i].item_id + " | " + results[i].product_name + " | " + results[i].stock_quantity + " units left");
          }
        }
      end(); // end
    });
};


// ask how much inventory to add
function addInventory() {
    console.log("Add More:");
    inquirer
    .prompt([
    {
      name: "id",
      type: "input",
      message: "Select Item ID:",
      validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
    },
    {
      name: "units",
      type: "input",
      message: "Add Units:",
      validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
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
          var newQuantity = quantity + units;
          updateInventory(id, newQuantity); // re-direct to update inventory
        });
    });
};


// update mysql database
function updateInventory(id, newQuantity) {
    connection.query("UPDATE products SET stock_quantity = " + newQuantity +" WHERE item_id = " + id + ";",
      function(error, results) {
        if (error) throw error;
      console.log("Updated Inventory");
      end(); // end
    });
};


// add new product
function newProduct() {
    console.log("add product");
    inquirer
    .prompt([
    {
      name: "name",
      type: "input",
      message: "Product Name:",
    },
    {
      name: "department",
      type: "input",
      message: "Department Name:",
    },
    {
      name: "price",
      type: "input",
      message: "Price:",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      name: "units",
      type: "input",
      message: "Stock Quantity:",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.name,
          department_name: answer.department,
          price: parseInt(answer.price),
          stock_quantity: parseInt(answer.units)
        },
        function(err) {
          if (err) throw err;
          console.log("Your database was updated successfully");
          end(); // end
        }
      );
    });
};


// function to stop connection and return
function end() {
    connection.end();
};