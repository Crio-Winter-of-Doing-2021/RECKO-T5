const mongoose = require("mongoose")
const {ObjectId} = require('mongoose').Schema.Types

const EmployeeSchema = new mongoose.Schema({
  uid:{
    type: ObjectId,
    ref:"User",
    required:[true, "User id is required"]
  },
  eid:{
    type : String,
    required:[true, "Every employee must have an ID."],
    trim:true,
  },
  active:{
    type:Boolean
  },
  firstName:{
    type:String
  },
  lastName:{
    type:String
  }
})

EmployeeSchema.index({ uid: 1, eid: 1 }, { unique: true });


module.exports = new mongoose.model("Employee", EmployeeSchema)