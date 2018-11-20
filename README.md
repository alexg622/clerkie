# clerkie

When transactions are sent to the root route the application will first add any transactions that are not already in the database to the database. It will then find all of the transactions from that user and group them by company name. After that it will weed out the transactions of a certain name that don't have more than three. It will then find the averages for all transactions of a certain name, and weed out the ones that are not within $30 of the average price. Lastly, the application will find the most recent transaction and format everything to satisfy the tests as well as alphabetize them. 


![](https://github.com/alexg622/piano/blob/master/images/codeThree.png?raw=true)
