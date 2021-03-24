const mongoose = require("mongoose")

const JournalSchema = new mongoose.Schema({
  jid:{
    type:String,
    trim:true,
    required:[true, 'a unique id for a journal is required, to avoid duplication'],
    unique:[true, 'jid must be unique to avoid duplication']
  },
  provider:{
    type:String,
    enum : ["XERO", "QUICKBOOKS"]
  },
  accountName:{
    type:String,
    trim:true
  },
  accountId:{
    type:String,
    trim:true
  },
  amount:{
    type:Number
  },
  date:{
    type:Date
  },
  type:{
    type:String,
    uppercase:true,
    enum : ["CREDIT", "DEBIT"]
  },
})


module.exports = new mongoose.model("Journal", JournalSchema)
