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
  // run the start function to prompt user
  // start();
  // end function to stop connect and return
  connection.end();
});

// display item_id, product_name, price
function allInfo() {
  connection.query("SELECT item_id, product_name, price FROM products",
  function(error, results) {
    if (error) throw error;
    console.log(results);
  });
};

// start function to prompt user of purchase


