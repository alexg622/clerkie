const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const utils = require("../utils/utils")

// get route returns all recurring transactions
router.get("/", async (req, res) => {
  utils.sessionTimeout(res) // timesout session after 10 seconds with 504 status code
  let tGroupedByName = await utils.groupByName(Transaction) // groups transactions by name
  let tParsedByLength = await utils.parseByLength(tGroupedByName) // makes sure to be recurring transactions by that name have at least three in histroy
  let tParsedByPrice = await utils.parseByPrice(tParsedByLength) // returns transactions in that name category that are within $30 of average price of all transactions in that name category
  let mostRecent = await utils.getMostRecent(tParsedByPrice) // returns most recent transaction and all recurring
  return res.json(mostRecent)
})

// post route takes all transactions, adds them to the database and returns recurring transactions for that user
router.post('/', async (req, res) => {
  let userId = req.body[0].user_id // get userId for line 21 function's groupByNameAndUserId
  utils.sessionTimeout(res) // timesout session after 10 seconds with 504 status code
  await utils.createNewTransactions(req) // creates new transactions if not already in database
  let tGroupedByName = await utils.groupByNameAndUserId(Transaction, userId) // groups transactions by name and userId
  let tParsedByLength = await utils.parseByLength(tGroupedByName) // makes sure to be recurring there has to be at least three transactions in history
  let tParsedByPrice = await utils.parseByPrice(tParsedByLength) // makes sure recurring transactions are within $30 or average price of all recurring transactions by that name
  let recurringTrans = await utils.getMostRecent(tParsedByPrice) // gets most recent transaction and formats output to satisfy tests
  if (recurringTrans[0] !== undefined) {
    return res.json(utils.mySort(recurringTrans)) // returns output as long as it is not undefined
  }
})

module.exports = router
