// Creates a new transaction if it isn't already there, and skips the ones that are
exports.createNewTransactions = async function(req) {
  let promises = req.body.map(async trans => {
    return Transaction.findOne({trans_id: trans.trans_id})
    .then(async result => {
      if (result === null) {
        const newTrans = new Transaction({
          trans_id: trans.trans_id,
          user_id: trans.user_id,
          name: trans.name,
          amount: trans.amount,
          date: trans.date
        })
        await newTrans.save().catch(err => console.log(err))
      }
    })
  })
  return Promise.all(promises).then(newData => newData)
}

// Groups all the transactions by their name
exports.groupByName = async function(Transaction) {
  let result = {}
  await Transaction.find().then(transactions => {
    transactions.map(transaction => {
      let name = transaction.name.split(" ")[0] //gets first word of name in case it has a transaction id after it
      result[name] = result[name] || []
      result[name].push(transaction)
    })
  })
  return result
}

// groups all transactions by userId and then name
exports.groupByNameAndUserId = async function(Transaction, user_id) {
  let result = {}
  await Transaction.find({user_id}).then(transactions => {
    transactions.map(transaction => {
      let name = transaction.name.split(" ")[0] //gets first word of name in case it has a transaction id after it
      result[name] = result[name] || []
      result[name].push(transaction)
    })
  })
  return result
}

// Makes sure that to be a recurring transaction there has to be at least three transactions from that company's name
exports.parseByLength = function (transactions) {
  let result = Object.assign({}, transactions)
  Object.keys(transactions).map(transaction => {
    if (transactions[transaction].length < 3) delete result[transaction]
  })
  return result
}

// Gets the average price from all transactions of a certain name
const getAveragePrice = function (transactions) {
  let averagePrices = {}
  Object.keys(transactions).map(transaction => {
    averagePrices[transaction] = {}
    let average = 0
    let counter = 0
    transactions[transaction].map(values => {
      counter ++
      average += values.amount
    })
    averagePrices[transaction]["average"] = average/counter
  })
  return averagePrices
}

// Returns transactions that are within $30 of the average price of all transactions of that name
exports.parseByPrice = async function (transactions) {
  let averagePrices = await getAveragePrice(transactions)
  let result = Object.assign({}, transactions)
  Object.keys(transactions).map(transaction => {
    transactions[transaction].map((values, idx) => {
      if (!(values.amount > (averagePrices[transaction]["average"]-30) && values.amount < (averagePrices[transaction]["average"]+30))) {
        result[transaction].splice(idx, 1)
      }
    })
  })
  return result
}

// gets the most recent transaction and returns the recurring transactions in the format to satisfy the tests
exports.getMostRecent = function (transactions) {
  let mostRecentArr = []
  let arr = []
  let keys = Object.keys(transactions).map(transaction => transaction)
  keys.forEach(key => {
    let mostRecent = {}
    for (let i=0; i<transactions[key].length-1; i++) {
      if (transactions[key][i].date > transactions[key][i+1].date) {
        let oldDate = new Date(transactions[key][i].date)
        let theDate = new Date(transactions[key][i].date)
        theDate.setMonth(oldDate.getMonth() + 1)
        mostRecent = {name: transactions[key][i].name, user_id: transactions[key][i].user_id, next_date: theDate, next_amt: transactions[key][i].amount, transactions: transactions[key]}
      } else {
        let oldDate = new Date(transactions[key][i+1].date)
         let theDate = new Date(transactions[key][i+1].date)
        theDate.setMonth(oldDate.getMonth() + 1)
        mostRecent = {name: transactions[key][i+1].name, user_id: transactions[key][i+1].user_id, next_date: theDate, next_amt: transactions[key][i+1].amount, transactions: transactions[key]}
      }
    }
    mostRecentArr.push(mostRecent)
  })
  return mostRecentArr
}

// sorts words alphabetically
exports.mySort = function (recurringTrans) {
  counter = true
  while (counter) {
    counter = false
    for(let i=0; i<recurringTrans.length-1; i++) {
      if (recurringTrans[i].name > recurringTrans[i+1].name){
        let prev = recurringTrans[i]
        let next = recurringTrans[i+1]
        recurringTrans[i] = next
        recurringTrans[i+1] = prev
        counter = true
      }
    }
  }
  return recurringTrans
}

// deteles all transactions
exports.deleteTrans = function (Transaction) {
  Transaction.find().then(trans => {
    trans.map(tran => tran.remove())
  })
}

// revisions below
// ________________________________________________________________________________

// sorts transactions by date
exports.sortByDate = function(data) {
  let keys = Object.keys(data)
  keys.map(key => {
    let counter = true
    while(counter) {
      counter = false
      for(let i=0; i<data[key].length-1; i++){
        let firstDate = new Date(data[key][i].date)
        let secondDate = new Date(data[key][i+1].date)
        if (firstDate > secondDate) {
          let prev = data[key][i]
          let next = data[key][i+1]
          data[key][i] = next
          data[key][i+1] = prev
          counter = true
        }
      }
    }
  })
  return data
}

// gets recurring transactions. Weeds out ones that are in the same week, are not within a price of $10, and aren't within 1 day from eachother
exports.getRecurrs = function(data) {
  let keys = Object.keys(data)
  let sortedByDates = exports.sortByDate(data) // sorts transactions by date
  keys.map(key => {
    let idxsToRemove = []
    sortedByDates[key].map((values, idx) => {
      let remove = true // removes if prices are too far apart
      let secondRemove = false // removes if dates are too close
      for(let i=0; i<sortedByDates[key].length; i++) {
        if (i !== idx) {
          let dateOne = new Date(values.date)
          let dateTwo = new Date(sortedByDates[key][i].date)
          let priceOne = values.amount
          let priceTwo = sortedByDates[key][i].amount
          let priceDiff = priceTwo - priceOne
          let difference = dateTwo.getDate() - dateOne.getDate()
          if (dateOne.getYear() === dateTwo.getYear() && dateOne.getMonth() === dateTwo.getMonth() && difference < 6) secondRemove = true // checks to see if are within six days of eachother
          if (!(dateOne.getYear() === dateTwo.getYear() && dateOne.getMonth() === dateTwo.getMonth() && difference < 6)) {
            if (difference <= 1 && (priceDiff < 10 && priceDiff > -10)) { // checks that price is not more that $10 difference
              remove = false
            }
          }
        }

      }
      // pushes idxs to delete into an array
      if (secondRemove === true && remove === false) idxsToRemove.push(idx)
      if (remove === true && secondRemove === false) idxsToRemove.push(idx)
      if (remove && secondRemove) idxsToRemove.push(idx)
    })
    // deletes all bad indexs by iterating over the indexs to delete array in reverse and removing the transaction
    for (let i=idxsToRemove.length-1; i>=0; i--) {
      sortedByDates[key].splice(idxsToRemove[i], 1)
    }
  })
  return sortedByDates
}

// gets the most recent transaction and formats output to satisfy tests. each group of transactions is sorted by date ascending
exports.newGetMostRecent = function (transactions) {
  let mostRecentArr = []
  let keys = Object.keys(transactions)
  keys.map(key => {
    let data = {}
    let idx = transactions[key].length-1
    data["name"] = transactions[key][idx].name
    data["user_id"] = transactions[key][idx].user_id
    data["next_amt"] = transactions[key][idx].amount
    // minuses the very last transaction date from the second to last one's date and then adds the result to the last transaction to get the next date
    data["next_date"] = new Date((new Date(transactions[key][idx].date).getTime() - new Date(transactions[key][idx-1].date).getTime()) + new Date(transactions[key][idx].date).getTime())
    data["transactions"] = transactions[key]
    mostRecentArr.push(data)
  })
  return mostRecentArr
}
