const mongoose = require('mongoose')

const passwordValidator = (pass) => {
  return pass.length > 5
}

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "username is required"]
  },
  email:{
    type:String,
    required:[true, "user email is required"],
    unique:[true, "user email must be unique"]
  },
  password:{
    type:String,
    required:[true, "password is required"],
    validate:[passwordValidator, "Password must be of length > 5"]
  },
  admin:{
    type:Boolean,
    required:[true, "Specify user role"],
    default:false
  }
})

module.exports = new mongoose.model(UserSchema, "User");
