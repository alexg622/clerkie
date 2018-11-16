const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const utils = require("../utils/utils")

router.get("/transactions", async (req, res) => {
  let answer = await utils.groupByName(Transaction)
  console.log(answer);
  Transaction.find().then(trans => res.json(answer))
})

router.post('/', (req, res) => {
  let RecurTrans = []
  utils.createNewTransactions(req)
  res.json(req.body)
})

module.exports = router

// find all transactions with same name
// in all transactions that have the same name find similar pricing
// in transactions with same name find consistant dates

// Transaction.find().then(transact => {
//   transact.map(trannil => trannil.remove())
// })
