const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RecurringTransactionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  next_amt: {
    type: Number,
    required: true
  },
  next_date: {
    type: Date,
    required: true
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'transaction'
    },
  ]
})

module.exports = RecurringTransaction = mongoose.model('recurringTransactions', RecurringTransactionSchema)
