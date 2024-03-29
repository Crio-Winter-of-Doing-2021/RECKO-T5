// for xero
const XERO = require('../services/xero')
// for quickbooks
const oauthClient = require('../services/quickbooks-ouath-client')
const {generateNewQuickBooksToken} = require('../services/quickbooks/token')
const OAuthClient = require('intuit-oauth')

class OAuthController{
  async XeroAuthorization(req,res){
    try{
      const consentUrl = await XERO.xero.buildConsentUrl()
      res.redirect(consentUrl)
    }catch(e){
      console.log(e)
      res.status(404).json({error:e})
    }
  }
  async XeroCallbackHandler(req,res){
    try {
      // pass the user here aswell to save the new token
      const {user} = req;
      const ts = await XERO.generateNewXeroToken(req.url, user._id)
      res.send(ts);
    } catch (e) {
      console.log(e)
      res.status(res.statusCode);
      res.redirect('/api/xero')
    }
  }
  async QuickBooksAuthorization(req,res){
    try{
      var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId],state:'testState'});
      res.redirect(authUri);
    }catch(e){
      console.log(e)
      res.status(404).json({error:e})
    }
  }
  async QuickBooksCallbackHandler(req,res){
    try {
      const {user} = req;
      const tokenSet = await generateNewQuickBooksToken(req.url, user._id)
      // save this token to the database.
      console.log(tokenSet)
      res.json({tokenSet})
    } catch (e) {
      console.log(e)
      res.status(res.statusCode);
      res.redirect('/api/quickbooks')
    }
  }
}

module.exports = new OAuthController()