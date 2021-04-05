const mongoose = require("mongoose")
const {ObjectId} = require('mongoose').Schema.Types

const TokenSetSchema = new mongoose.Schema({
  provider:{
    type:String,
    enum:["XERO", "QUICKBOOKS"]
  },
  token:{
    type:Object
  },
  uid:{
    type:ObjectId,
    ref:"User",
    required:[true, "Token Set must be associated to some user"],
    unique:[true, "user must have a unique access token"]
  }
})

module.exports = new mongoose.model('TokenSet', TokenSetSchema)