const {XeroClient} = require('xero-node')
const TokenSet = require('../../models/token')
const xero = require('./init')

const getXeroTokenSet = async () => {
  const xeroTokenSet = await TokenSet.findOne({provider:"XERO"}).select('-provider -_id -__v')
  return xeroTokenSet.token
}

const refreshXeroTokenSet = async (tokenSet) => {
  const clientId = process.env.XERO_CLIENT_ID
  const clientSecret = process.env.XERO_CLIENT_SECRET
  const newXeroClient = new XeroClient()
  const newTokenSet = await newXeroClient.refreshWithRefreshToken(clientId, clientSecret, tokenSet.refresh_token)
  return newXeroClient.readTokenSet()
}

const setXeroTokenSet = async () => {
  // gets the token from db
  try{
    let tokenSet = await getXeroTokenSet()
    // if tokenSet is not avialable return
    if(!tokenSet){
      console.log("Token Set not found please process with authorization first")
      return;
    }
    // console.log(tokenSet)
    // if tokenSet is expired , refresh it
    let {expires_at} = tokenSet
    if(new Date(expires_at*1000) <= new Date()){
      const newTokenSet = await refreshXeroTokenSet(tokenSet)
      await TokenSet.deleteMany({provider:"XERO"})
      const DBTokenSet = new TokenSet({token:newTokenSet, provider:"XERO"})
      // saves the new token
      const ts = await DBTokenSet.save() 
      // set the token now
      ts.provider = undefined
      ts._id = undefined
      ts.__v = undefined
      xero.setTokenSet(ts.token)
      console.log("token set successfully updated and set")
      return
    }
    // console.log(new Date())
    xero.setTokenSet(tokenSet)
    console.log("token set successfully set")
    return
  }catch(e){
    console.log(e)
    throw new Error(e)
  }
  
}

const generateNewXeroToken = async (url) => {
  try {
    // calling apiCallback will setup all the client with
    // and return the orgData of each authorized tenant
    const tokenSet = await xero.apiCallback(url);
    await xero.updateTenants(false)
    console.log('xero.config.state: ', xero.config.state)
    // this is where you can associate & save your
    // `tokenSet` to a user in your Database
    console.log(tokenSet)
    // removes the pre-existing token
    await TokenSet.deleteMany({provider:"XERO"})
    const DBTokenSet = new TokenSet({token: tokenSet, provider:"XERO"})
    // saves the new token
    const ts = await DBTokenSet.save()
    return ts;
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

module.exports = {
  setXeroTokenSet,
  generateNewXeroToken
}