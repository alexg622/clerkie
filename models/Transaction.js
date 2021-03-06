const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
  trans_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)
