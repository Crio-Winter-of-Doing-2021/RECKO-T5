var QuickBooks = require('node-quickbooks')

const getQuickBooksClient = (oauthToken, refreshToken) => {
  const consumerKey = process.env.QUICKBOOKS_CLIENT_KEY
  const consumerSecret = process.env.QUICKBOOKS_CLIENT_SECRET
  const realmId = process.env.QUICKBOOKS_COMPANY_ID
  
  var qbo = new QuickBooks(
    consumerKey,
    consumerSecret,
    oauthToken,
    false, // no token secret for oAuth 2.0
    realmId, // company id
    true, // use the sandbox?
    false, // enable debugging?
    null, // set minorversion, or null for the latest version
    '2.0', //oAuth version
    refreshToken)

    return qbo
}

module.exports = getQuickBooksClient
