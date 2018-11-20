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
      let name = transaction.name.split(" ")[0]
      result[name] = result[name] || []
      result[name].push(transaction)
    })
  })
  return result
}

exports.groupByNameAndUserId = async function(Transaction, user_id) {
  let result = {}
  await Transaction.find({user_id}).then(transactions => {
    transactions.map(transaction => {
      let name = transaction.name.split(" ")[0]
      result[name] = result[name] || []
      result[name].push(transaction)
    })
  })
  return result
}

// Makes sure that to be a recurring transaction there has to be at least three transactions from that company's name
exports.parseByLength = async function (transactions) {
  let result = Object.assign({}, transactions)
  Object.keys(transactions).map(transaction => {
    if (transactions[transaction].length < 3) delete result[transaction]
  })
  return result
}

// Gets the average price from all transactions of a certian name
const getAveragePrice = async function (transactions) {
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

// gets the most recent transaction
exports.getMostRecent = async function (transactions) {
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
        mostRecent = {name: transactions[key][i].name, user_id: transactions[key][i].user_id, next_amt: transactions[key][i].amount, next_date: theDate, transactions: transactions[key]}
      } else {
        let oldDate = new Date(transactions[key][i+1].date)
         let theDate = new Date(transactions[key][i+1].date)
        theDate.setMonth(oldDate.getMonth() + 1)
        mostRecent = {name: transactions[key][i+1].name, user_id: transactions[key][i+1].user_id, next_amt: transactions[key][i+1].amount, next_date: theDate, transactions: transactions[key]}
      }
    }
    mostRecentArr.push(mostRecent)
  })
  return mostRecentArr
}

// deteles all transactions
exports.deleteTrans = async function (Transaction) {
  Transaction.find().then(trans => {
    trans.map(tran => tran.remove())
  })
}

// sends status 504 and timeout error message after 10 seconds
exports.sessionTimeout = (res) => {
  setTimeout(() => {
    return res.status(504).json({err: "Your session timedout"})
  }, 100000)
}
