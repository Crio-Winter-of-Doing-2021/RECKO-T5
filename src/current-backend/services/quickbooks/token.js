const TokenSet = require('../../models/token')
const oauthClient = require('../quickbooks-ouath-client')


const getQuickBooksTokenSet = async (uid) => {
  try{
    const quickBooksTokenSet = await TokenSet.findOne({provider:"QUICKBOOKS", uid}).select('-provider -_id -__v -uid')
    if(quickBooksTokenSet){
      return quickBooksTokenSet.token
    }else{
      throw new Error("Authorize QUICKBOOKS")
    }
    // console.log(quickBooksTokenSet.token)
  }catch(e){
    console.log(e)
    throw e
  }
  
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

const setQuickBooksTokenSet = async (uid) => {
  // gets the token from db
  try{
    const ts = await getQuickBooksTokenSet(uid)
    if(!ts){
      console.log("QUICKBOOKS Token Set not found please process with authorization first")
      throw new Error("QUICKBOOKS Token Set not found please process with authorization first")
    }

    const check = oauthClient.setToken(ts)
    if(check.accessToken && check.isAccessTokenValid()){
      console.log("QUICKBOOKS token set")
      return;
    }
    // if tokenSet is expired , refresh it
    if(!oauthClient.isAccessTokenValid()){
      const newTokenSet = await refreshQuickBooksTokenSet(oauthClient.getToken())
      const updateTS = await TokenSet.findOne({provider:"QUICKBOOKS", uid})
      updateTS.token = newTokenSet
      // saves the new token
      await updateTS.save()
      // set the token now
      console.log("Quickbook token successfully updated and set")
      // console.log(ts)
      return
    }
    else{
      throw new Error("Please authorize QUICKBOOKS again!")
    }
  }catch(e){
    console.log(e)
    throw e
  }
}

const generateNewQuickBooksToken = async (url, uid) => {
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
    const ts = await TokenSet.findOne({provider:"QUICKBOOKS", uid})
    if(ts){
      ts.token = tokenSet
      await ts.save()
      return ts
    }

    const createTS = await TokenSet.create({token: tokenSet, provider:"QUICKBOOKS", uid}) 
    return createTS;
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