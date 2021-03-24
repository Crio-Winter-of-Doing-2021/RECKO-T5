const OAuthClient = require('intuit-oauth')
require('dotenv').config()

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_KEY,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: OAuthClient.environment.sandbox,
  redirectUri: "http://localhost:5000/api/quickbooks/callback",
});

module.exports = oauthClient