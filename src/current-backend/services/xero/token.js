const {XeroClient} = require('xero-node')
const TokenSet = require('../../models/token')
const xero = require('./init')


const getXeroTokenSet = async (uid) => {
  try{
    const xeroTokenSet = await TokenSet.findOne({provider:"XERO", uid}).select('-provider -_id -__v -uid')
    if(xeroTokenSet){
      return xeroTokenSet.token
    }else{
      throw new Error("Authorize XERO")
    }
  }catch(e){
    console.log(e)
    throw e
  }
  
}

const refreshXeroTokenSet = async (tokenSet) => {
  const clientId = process.env.XERO_CLIENT_ID
  const clientSecret = process.env.XERO_CLIENT_SECRET
  const newXeroClient = new XeroClient()
  const newTokenSet = await newXeroClient.refreshWithRefreshToken(clientId, clientSecret, tokenSet.refresh_token)
  return newXeroClient.readTokenSet()
}

const setXeroTokenSet = async (uid) => {
  // gets the token from db
  try{
    // bring the token for user from database and check whether its ok
    let check = await getXeroTokenSet(uid)
    // if tokenSet is not avialable return
    if(!check){
      console.log("XERO Token Set not found please process with authorization first")
      throw new Error("XERO Token Set not found please process with authorization first");
    }

    xero.setTokenSet(check)
    check = xero.readTokenSet()

  
    if(check.access_token && !check.expired()){
      console.log("Xero token set")
      return
    }

    let tokenSet = check
    
    // if tokenSet is expired , refresh it
    let {expires_at} = tokenSet
    const expiryDate = new Date(expires_at*1000) 
    if(expiryDate <= new Date()){
      const newTokenSet = await refreshXeroTokenSet(tokenSet)
      const ts = await TokenSet.findOne({provider:"XERO", uid})
      ts.token = newTokenSet
      // saves the new token
      await ts.save()
      // set the token now
      xero.setTokenSet(newTokenSet)
      console.log("Xero token successfully updated and set")
      return
    }else {
      throw new Error("Please authenticate XERO again!")
    }
  }catch(e){
    console.log(e)
    throw e
  }
  
}


const generateNewXeroToken = async (url, uid) => {
  try {
    // calling apiCallback will setup all the client with
    // and return the orgData of each authorized tenant
    const tokenSet = await xero.apiCallback(url);
    await xero.updateTenants(false)
    console.log('xero.config.state: ', xero.config.state)
    // this is where you can associate & save your
    // `tokenSet` to a user in your Database
    console.log(tokenSet)
    // updates the pre-existing token
    const ts = await TokenSet.findOne({provider:"XERO", uid})
    if(ts){
      ts.token = tokenSet
      // saves the new token
      await ts.save()
      return ts;
    }else{
      const newTs = await TokenSet.create({provider:"XERO", uid, token : tokenSet})
      return newTs
    }
    
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  setXeroTokenSet,
  generateNewXeroToken
}