const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
  type:{
    type:String, 
    required:[true, "type of account is required"],
    uppercase:true
  },
  active:{
    type:Boolean,
    required:[true, "status of account is required"]
  },
  name:{
    type:String,
    required:[true, "name of id is required"]
  },
  aid:{
    type:String,
    required:[true, "account id is reuqired"],
    unique:[true, "account must have a unique identifier"]
  },
  class:{
    type:String,
    uppercase:true
  },
  provider:{
    type:String,
    uppercase:true,
    enum : ["QUICKBOOKS", "XERO"]
  }
})

module.exports = new mongoose.model("Account", AccountSchema)