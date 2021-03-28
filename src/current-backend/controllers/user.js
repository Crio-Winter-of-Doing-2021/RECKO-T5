const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

// function for jwt encode
const OneDayInSec = 1 * 24 * 60 * 60;
const getToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: OneDayInSec,
  });
  return token;
};

// Cookie params
const __prod__ = process.env.NODE_ENV === "production";

const devCookieConfig = {
   httpOnly: true,
}

const prodCookieConfig = {
  httpOnly: true,
  sameSite: "None",
  secure: __prod__,
};

const cookieConfig = __prod__ ? prodCookieConfig : devCookieConfig

class UserController{
  async register(req, res){
    const user = req.body
    const {name, email, password, admin} = user
    if(!name || !email || !password || !admin){
      res.status(400).json({error:"Please fill all the required fields"})
      return
    }
    try{
      // use bcrypt for hashing before saving
      const hashedPassword = await bcrypt.hash(password,8)
      user.password = hashedPassword
      // create a new user object and save it
      const newUser = new User(user)
      await newUser.save()
      res.status(200).json({message:"New user has been created"})
    }catch(e){
      console.log(e)
      res.status(400).json({error:e.message})
    }
  }

  async login(req, res){
    const credentials = req.body
    const {email, password} = credentials
    if(!email || !password){
      res.status(400).json({error:"fill all required field"})
      return
    }
    try{
      // get the user by email
      const user = await User.find({email})
      if(user){
        // if found, check password using bcrypt
        // use bcrypt here
        const check = await bcrypt.compare(password, user.password)
        if(!check){
          res.status(400).json({error:"invalid credentials"})
          return
        }
        // set cookie and login the user.
        res.cookie("user", getToken(user._id), {
          maxAge: OneDayInSec * 1000,
          ...cookieConfig,
        });
        res.status(200).json({_id: user._id})
      }else{
        res.status(404).json({error:"user not found"})
        return;
      }
    }catch(e){
      console.log(e)
      res.status(500).json({error:e.message})
    }
  }
  async logout(req, res){
    try{
      // destroy the cookie
      res.cookie("user", null, { maxAge: 1, ...cookieConfig });
      res.status(200).json({message:"user successfully logged out"})
    }catch(e){
      console.log(e)
      res.status(500).json({error:"something went wrong"})
    }
  }
}

module.exports = new UserController()