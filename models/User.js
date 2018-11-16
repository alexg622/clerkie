const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'transaction'
    },
  ]
})

module.exports = User = mongoose.model('user', UserSchema)
