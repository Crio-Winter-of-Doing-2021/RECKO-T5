const mongoose = require("mongoose")


const TokenSetSchema = new mongoose.Schema({
  provider:{
    type:String,
    enum:["XERO", "QUICKBOOKS"]
  },
  token:{
    type:Object
  }
})

module.exports = new mongoose.model('TokenSet', TokenSetSchema)