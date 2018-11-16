exports.createNewTransactions = function(req) {
  req.body.forEach(trans => {
    Transaction.findOne({trans_id: trans.trans_id})
      .then(result => {
        if (result === null) {
          const newTrans = new Transaction({
            trans_id: trans.trans_id,
            user_id: trans.user_id,
            name: trans.name,
            amount: trans.amount,
            date: trans.date
          })
          newTrans.save().catch(err => console.log(err))
        }
      })
  })
}

exports.groupByName = async function(Transaction) {
  let result = {}
  await Transaction.find().then(transactions => {
    transactions.map(transaction => {
      result[transaction.name] = result[transaction.name] || []
      result[transaction.name].push(transaction)
    })
  })
  return result
}

exports.parseByLength = function (transactions) {
  let result = Object.assign({}, transactions)
  Object.keys(transactions).map(transaction => {
    if (transactions[transaction].length < 3) delete result[transaction]
  })
  return result
}

const getAveragePrice = (transactions) => {
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

exports.parseByPrice = (transactions) => {
  let averagePrices = getAveragePrice(transactions)
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
