const mongoose = require("mongoose")
const {ObjectId} = require('mongoose').Schema.Types
const AccountSchema = new mongoose.Schema({
  uid:{
    type: ObjectId,
    ref:"User",
    required:[true, "User id is required"]
  },
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

AccountSchema.index({ uid: 1, aid: 1 }, { unique: true });



module.exports = new mongoose.model("Account", AccountSchema)