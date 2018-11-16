exports.createNewTransactions = function(req) {
  req.body.forEach(trans => {
    Transaction.findOne({trans_id: trans.trans_id})
      .then(result => {
        console.log(result)
        console.log(trans.trans_id);
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
