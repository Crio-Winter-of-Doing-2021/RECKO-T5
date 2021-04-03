const TokenSet = require('../../models/token')
const oauthClient = require('../quickbooks-ouath-client')

const getQuickBooksTokenSet = async () => {
  const quickBooksTokenSet = await TokenSet.findOne({provider:"QUICKBOOKS"}).select('-provider -_id -__v')
  // console.log(quickBooksTokenSet.token)
  return quickBooksTokenSet.token
}

const refreshQuickBooksTokenSet = async (tokenSet) => {
  try{
    // console.log("refresh token for refreshing the token : ", tokenSet.refresh_token)
    const authResponse = await oauthClient.refreshUsingToken(tokenSet.refresh_token)
    // const authResponse = await oauthClient.refresh()
    // console.log("refresh token response : ", authResponse)
    // console.log("refreshed token : ", authResponse.token)
    return authResponse.token
  }catch(e){
    console.error('The error message is :' + e.originalMessage);
    console.log("reauthorize quickbooks!")
    throw e
  }
  
}

const setQuickBooksTokenSet = async () => {
  // gets the token from db
  try{
    const check = oauthClient.getToken()
    if(check.accessToken && check.isAccessTokenValid()){
      console.log("QUICKBOOKS token already set")
      return;
    }
    let tokenSet = await getQuickBooksTokenSet()
    // if tokenSet is not avialable return
    if(!tokenSet){
      console.log("QUICKBOOKS Token Set not found please process with authorization first")
      return;
    }
    // console.log("the token set from db " , tokenSet)
    // if tokenSet is expired , refresh it
    oauthClient.setToken(tokenSet)
    // console.log(oauthClient.getToken())
    if(!oauthClient.isAccessTokenValid()){
      const newTokenSet = await refreshQuickBooksTokenSet(oauthClient.getToken())
      await TokenSet.deleteMany({provider:"QUICKBOOKS"})
      const DBTokenSet = new TokenSet({token:newTokenSet, provider:"QUICKBOOKS"})
      // saves the new token
      const ts = await DBTokenSet.save() 
      // set the token now
      console.log("Quickbook token successfully updated and set")
      // console.log(ts)
      return
    }
    console.log("Quickbook token successfully set")
    return
  }catch(e){
    console.log(e)
    throw e
  }
  
}

const generateNewQuickBooksToken = async (url) => {
  try {
    // calling apiCallback will setup all the client with
    // and return the orgData of each authorized tenant
    const authResponse = await oauthClient.createToken(url)
    const tokenSet = authResponse.token
    // const tokenSet = JSON.stringify(authResponse.getJson(), null, 2)
    // save this token to the database.
    console.log(tokenSet)
    // this is where you can associate & save your
    // `tokenSet` to a user in your Database
    // removes the pre-existing token
    await TokenSet.deleteMany({provider:"QUICKBOOKS"})
    const DBTokenSet = new TokenSet({token: tokenSet, provider:"QUICKBOOKS"})
    // saves the new token
    const ts = await DBTokenSet.save()
    return ts;
  } catch (e) {
    console.log(e)
    throw e
  }
}


module.exports = {
  generateNewQuickBooksToken,
  setQuickBooksTokenSet,
  refreshQuickBooksTokenSet
}