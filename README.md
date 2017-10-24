# Bamazon

## Project: A simulation of an e-commerce store like Amazon using the node.

## Challenge 1: Customer View

In this scenario, we are going to look at the application from a customer's point of view.  When the node application runs, it will display the information that is loaded in the MySQL database.  The application will list the following columns:

	* item_ID (unique ID for each product)
	* product_name (Nam of product)
	* price (cost to customer)

Once the products are displayed, the customer will be given a prompt on which item to buy.  They must select the item by its corresponding ID number.  After the ID is chosen, another prompt will ask the customer how many units of the product they would like to purchase.  When the customer enters a quantity, the application calculates the total cost and displays it to the customer.  On the back end, the application removes the units from the MySQL database.

![Challenge 1](images/challenge1.png)