# clerkie

When transactions are sent to the root route the application will perform the following operations:
* Add any transactions that are not already in the database to the database.
* Find all of the transactions from that user and group them by company name.
* Weed out the transactions that don't have more than three in history.
* Find the average price for all transactions of a certain name, and weed out the ones that are not within $30 of the average price.
* Find the most recent transaction and format everything to satisfy the tests as well as alphabetize them.

Tests
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.45.01%20PM.png?raw=true)

Utils
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.45.30%20PM.png?raw=true)

Transaction Schema
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.45.48%20PM.png?raw=true)

Transaction Routes
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.46.13%20PM.png?raw=true)
