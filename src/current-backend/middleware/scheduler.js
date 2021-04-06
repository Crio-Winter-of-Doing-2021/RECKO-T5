const UpdateUserData = require('../scheduled_jobs')

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
const thirtyMinInSec = 30*60
// check for cookie if update cookie is present value is true, call Updater(uid), else next and send data
const ScheduleDataSaving = async (req, res, next) => {
  try{
    const {user} = req
    const {update} = req.cookies
    if(update === undefined || update === true){
      // update 
      await UpdateUserData(user._id)
      // set the cookie as update : false  
      res.cookie("update", false, {
        maxAge: thirtyMinInSec * 1000,
        ...cookieConfig,
      });
    }
    next()
  }catch(e){
    console.log(e)
    res.status(500).json({error:e.message})
  }
}

module.exports = ScheduleDataSaving