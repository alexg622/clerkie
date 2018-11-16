const axios = require("axios")

let data = [
  {name: "YMCA", date: "2018-08-10T08:00:00.000Z", amount: 69, trans_id: "dslakfjldskafj", user_id: "lskdjfsdlkfj"},
  {name: "YMCA", date: "2018-11-10T08:00:00.000Z", amount: 75, trans_id: "dsldsfdsfdssdf", user_id: "lskdjfsdlkfj"},
  {name: "YMCA", date: "2018-12-10T08:00:00.000Z", amount: 75, trans_id: "dsldssdfsdfssdf", user_id: "lskdjfsdlkfj"},
  {name: "Macy's", date: "2018-12-10T08:00:00.000Z", amount: 7100, trans_id: "dsldsyuirfssdf", user_id: "lskdjfsdlkfj"},
  {name: "JCPenny's", date: "2018-12-10T08:00:00.000Z", amount: 7100, trans_id: "dsldsyui897sdf", user_id: "lskdjfsdlkfj"},
  {name: "Equinox", date: "2018-12-10T08:00:00.000Z", amount: 7100, trans_id: "dsl1234syui897sdf", user_id: "lskdjfsdlkfj"}
]

axios.post("http://localhost:1984/", data)
