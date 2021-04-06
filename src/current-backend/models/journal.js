const mongoose = require("mongoose")
const {ObjectId} = require('mongoose').Schema.Types

const JournalSchema = new mongoose.Schema({
  uid:{
    type: ObjectId,
    ref:"User",
    required:[true, "User id is required"]
  },
  jid:{
    type:String,
    trim:true,
    required:[true, 'a unique id for a journal is required, to avoid duplication'],
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

JournalSchema.index({ uid: 1, jid: 1 }, { unique: true });

module.exports = new mongoose.model("Journal", JournalSchema)
