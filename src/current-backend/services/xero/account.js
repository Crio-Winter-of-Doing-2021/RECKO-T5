require('dotenv').config()
const {setXeroTokenSet} = require('./token')
const xero = require('./init')
const { AccountType } = require('xero-node')

const xeroTenantId = process.env.XERO_TENANT_ID

const getAllAccounts = async () => {
  try {
    // GET ALL
    await setXeroTokenSet()
    const tenants = await xero.updateTenants()
    const accountsGetResponse = await xero.accountingApi.getAccounts(tenants[0].tenantId);
    const accounts = accountsGetResponse.response.body.Accounts
    const mappedData = accounts.map((acc) => ({
      aid:acc.AccountID,
      name:acc.Name,
      active:acc.Status === "ACTIVE",
      class: acc.Class,
      type:acc.Type,
      provider:"XERO"
    }))
    return mappedData
  } catch(e){
    console.log(e)
    throw e
  }
}
const getAnAccount = async (id) => {
  try {
    await setXeroTokenSet()
    const accountGetResponse = await xero.accountingApi.getAccount(xeroTenantId, id);
    return accountGetResponse
  } catch (e) {
    console.log(e)
    throw e
  }
}
const createAccount = async ({name, code, type, bankAccountNumber, hasAttachments}) => {
  try{
    await setXeroTokenSet()

    if(type === AccountType.BANK && !bankAccountNumber){
      throw new Error("bank account number is required for account of type BANK")
    }
    const account = { name, code, type, bankAccountNumber, hasAttachments};
    const accountCreateResponse = await xero.accountingApi.createAccount(xeroTenantId, account);
    const accountId = accountCreateResponse.body.accounts[0].accountID;
    return accountId
  }catch(e){
    console.log(e)
    throw e
  }
  
}
// all crud operations.

module.exports = {
  getAllAccounts,
  getAnAccount,
  createAccount
}