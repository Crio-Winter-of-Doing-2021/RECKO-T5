const Account = require('../models/account')

const queryAccounts = async (params) => {
  try{
    const accounts = await Account.find(params)
    return accounts
  }catch(e){
    console.log(e)  
    throw e
  }
}
class AccountController{
  async getAccounts(req, res){
    try{
      const {params} = req 
      const accounts = await queryAccounts(params)
      res.send(accounts)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
}

module.exports = new AccountController()