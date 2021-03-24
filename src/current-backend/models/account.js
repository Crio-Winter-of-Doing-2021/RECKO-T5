const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
  aid:{
    type : String,
    required:[true, "Every account entry must have an ID."],
    trim:true
  },
  code:{
    type : String,
    required:[true, "Every account entry must have code."],
    trim:true
  },
  name:{
    type : String,
    required:[true, "Every account entry must have code."],
    trim:true
  },
  type:{
    type:String,
    enum:["BANK", "CURRENT", "CURRLIAB", "DEPRECIATN", "DIRECTCOSTS", "EQUITY", "EXPENSE", "FIXED", "INVENTORY", "LIABILITY", "NONCURRENT", "OTHERINCOME", "OVERHEADS", "PREPAYMENT", "REVENUE", "SALES", "TERMLIAB", "PAYGLIABILITY", "SUPERANNUATIONEXPENSE", "SUPERANNUATIONLIABILITY", "WAGESEXPENSE"],
    required:[true, "Every account entry must type."],
    trim:true,
    uppercase:true
  },
  bankAccountNumber:{
    type : String,
    trim:true
  },
  status:{
    type:String,
    enum:["ACTIVE", "ARCHIVED"]
  },
  description:{
    type:String
  },
  bankAccountType:{
    type:String,
    enum: ["BANK", "CREDITCARD", "PAYPAL"]
  },
  currencyCode:{
    type:String
  },
  enablePaymentsToAccount:{
    type:Boolean
  }
})

module.exports = new mongoose.model("Account", AccountSchema)