const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const utils = require("../utils/utils")

router.get("/transactionsTesting", async (req, res) => {
  let answer = await utils.groupByName(Transaction)
  let newAnswer = await utils.parseByLength(answer)
  let pricedAnswer = await utils.parseByPrice(newAnswer)
  res.json(pricedAnswer)
})

router.post('/', async (req, res) => {
  let RecurTrans = []
  await utils.createNewTransactions(req)
  let tGroupedByName = await utils.groupByName(Transaction)
  let tParsedByLength = await utils.parseByLength(tGroupedByName)
  let tParsedByPrice = await utils.parseByPrice(tParsedByLength)

  res.json(req.body)
})

module.exports = router



// find all transactions with same name
// in those find ones that have a length greater than 3
// in all transactions that have the same name find similar pricing
// in transactions with same name find consistant dates
