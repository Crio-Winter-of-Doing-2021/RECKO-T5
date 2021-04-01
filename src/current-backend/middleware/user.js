const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isUserLoggedIn = async (req, res, next) => {
  try{
    const {user} = req.cookies
    if(user){
      const _id = jwt.verify(user,process.env.JWT_SECRET)
      const getUser = await User.findOne({_id})
      if(getUser){
        // setting the user to use in further controllers
        req.user = getUser
        next()
      }else{
        res.status(403).json({error:"You must login to access this data"})
      }
    }else{
      res.status(403).json({error:"You must login to access this data"})
    }
  }catch(e){
    res.status(403).json({error:"Login again! Your JWT must have expired"})
  }
  
} 

const isUserAdmin = (req, res, next) => {
  if(req.user){
    if(req.user.admin){
      next()
    }else{
      res.status(403).json({error:"You are not an admin"})
    }
  }else{
    res.status(400).json({error:"Please login!"})
  }
}

module.exports = {
  isUserLoggedIn,
  isUserAdmin
}