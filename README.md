# clerkie

When transactions are sent to the root route the application will perform the following operations:
* Add any transactions that are not already in the database to the database.
* Find all of the transactions from that user and group them by company name.
* Weed out the transactions that don't have more than three in history.
* Sort each possible recurring transaction's group by date ascending.
* Weed out transactions that are within a week of each other.
* Weed out transactions that are not within one day apart and have more than a $10 difference. For example if one transaction is on the fifth of May and the other on the 8th of June it won't count as recurring because the dates are two far apart.
* The transactions are already sorted by date ascending, so the last one is the most recent.
* next_amt is the amount of the most recent transaction.
* next_date is calculated by subtracting the most recent transaction's date from the second to most recent transaction's date and then adding the result back to the most recent transaction's date. For example: data["next_date"] = new Date((dateTwo.getTime() - dateOne.getTime()) + dateTwo.getTime())
* Each recurring transaction group is then sorted alphabetically.
* The application will timeout after 10 seconds.

## Tests
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.45.01%20PM.png?raw=true)


## Utils
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.45.30%20PM.png?raw=true)


## Transaction Schema
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.45.48%20PM.png?raw=true)


## Transaction Routes
![](https://github.com/alexg622/clerkie/blob/master/images/Screen%20Shot%202018-11-20%20at%203.46.13%20PM.png?raw=true)
