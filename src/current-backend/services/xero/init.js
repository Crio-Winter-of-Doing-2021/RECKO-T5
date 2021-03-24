const {XeroClient} = require('xero-node')
const {PORT} = require('../../constants')
require('dotenv').config()


const clientId = process.env.XERO_CLIENT_ID
const clientSecret = process.env.XERO_CLIENT_SECRET

const scopes = "offline_access openid profile email accounting.transactions accounting.transactions.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read files files.read assets assets.read projects projects.read payroll.employees payroll.payruns payroll.payslip payroll.timesheets payroll.settings";

const xero =  new XeroClient({
  clientId,
  clientSecret,
  redirectUris: [`http://localhost:${PORT}/api/xero/callback`],
  scopes: scopes.split(" "),
  state: "imaParam=look-at-me-go",
  httpTimeout: 3000, // ms (optional)
})

module.exports = xero