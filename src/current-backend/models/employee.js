const mongoose = require("mongoose")

const externalLink = new mongoose.Schema({
  url:{
    type:String
  },
  description:{
    type:String
  }
})

const EmployeeSchema = new mongoose.Schema({
  eid:{
    type : String,
    required:[true, "Every employee must have an ID."],
    trim:true
  },
  status:{
    type:String
  },
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  externalLink:{
    type:externalLink
  }
})

module.exports = new mongoose.model("Employee", EmployeeSchema)