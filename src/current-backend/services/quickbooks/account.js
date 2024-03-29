const getQuickBooksClient = require('./init')
const {setQuickBooksTokenSet} = require('./token')
const oauthClient = require('../quickbooks-ouath-client/index')



const getAllAccounts = async (uid) => {
  try{
    await setQuickBooksTokenSet(uid)
    const {access_token, refresh_token} = oauthClient.getToken()
    // await refreshQuickBooksTokenSet(oauthClient.getToken())
    const qbo = getQuickBooksClient(access_token, refresh_token)
    return new Promise((resolve, reject) => {
        qbo.findAccounts({}, (err,queryResponse)=>{
          if(err) {
            console.log(err)
            // throw err
            reject(err)
          }else{
            const accounts = queryResponse.QueryResponse.Account; 
            const mappedData = accounts.map((acc) => ({
              aid:acc.Id,
              name:acc.Name,
              type:acc.AccountType,
              active:acc.Active,
              class:acc.Classification,
              provider:"QUICKBOOKS",
              uid
          }))
            // console.log(callback)
            resolve(mappedData)
          }  
      })
    })
  }catch(e){
    console.log(e)
    throw e
  }
}

const createAccount = async (account, uid) => {
  try{
    await setQuickBooksTokenSet(uid)
    const {access_token, refresh_token} = oauthClient.getToken()
    // await refreshQuickBooksTokenSet(oauthClient.getToken())
    const qbo = getQuickBooksClient(access_token, refresh_token)
    return new Promise((resolve, reject) => {
        qbo.createAccount(account, (err,queryResponse)=>{
          if(err) {
            console.log(err)
            // throw err
            reject(err)
          }else{
            const acc = queryResponse; 
            const mappedData = {
              aid:acc.Id,
              name:acc.Name,
              type:acc.AccountType,
              active:acc.Active,
              class:acc.Classification,
              provider:"QUICKBOOKS",
              uid
            }
            resolve(mappedData)
          }  
      })
    })
  }catch(e){
    console.log(e)
    throw e
  }
}

module.exports = {
  getAllAccounts,
  createAccount
}