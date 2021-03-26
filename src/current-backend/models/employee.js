const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
  eid:{
    type : String,
    required:[true, "Every employee must have an ID."],
    trim:true,
    unique:[true, "employee id must be unique"]
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

module.exports = new mongoose.model("Employee", EmployeeSchema)