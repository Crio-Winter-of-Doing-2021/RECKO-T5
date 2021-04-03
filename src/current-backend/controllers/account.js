const Account = require('../models/account')
const QUICKBOOKS = require('../services/quickbooks')
const XERO = require('../services/xero')


const queryAccounts = async (query) => {
  try{
    const {limit, offset} = query
    const accounts = Account.find().limit(parseInt(limit)).skip(parseInt(offset))
    const totalNumber = Account.countDocuments()
    return Promise.all([accounts, totalNumber]).then((vals) => {
      return ({
        accounts:vals[0],
        numberOfAccounts:vals[1]
      })
    })
  }catch(e){
    console.log(e)  
    throw e
  }
}
class AccountController{
  async getAccounts(req, res){
    try{
      const {query} = req 
      const accounts = await queryAccounts(query)
      res.send(accounts)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
  async createAccount(req, res){
    try{
      const account = req.body
      const {provider} = req.query 
      if(provider === "XERO"){
        try{
          const acc = await XERO.createAccount(account)
          // if success store the account in db
          const newAcc = new Account(acc)
          await newAcc.save()
          res.send(acc)
          return
        }catch(e){
          res.status(e.response.statusCode).json({error:e.response.body.Elements[0].ValidationErrors[0].Message})
        }
      }
      else if(provider === "QUICKBOOKS"){
        try{
          const acc = await QUICKBOOKS.createAccount(account) 
          // if success store the account in db
          const newAcc = new Account(acc)
          await newAcc.save()
          res.send(acc)
          return
        }catch(e){
          res.status(400).json({error:e.Fault.Error[0].Message})
        }
        
      }
      else{
        res.status(400).json({error:"Please provide a proper provider"})
        return;
      }
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
}

module.exports = new AccountController()