const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")
const utils = require("../utils/utils")

router.get("/", (req, res) => res.send("Working"))

router.get("/transactions", (req, res) => {

  // Transaction.find().then(transact => {
  //   transact.map(trannil => trannil.remove())
  // })

  Transaction.find().then(trans => res.json(trans))
})

router.post('/', (req, res) => {
  let RecurTrans = []

  utils.createNewTransactions(req)

  res.json(req.body)
})

module.exports = router
