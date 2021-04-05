const getQuickBooksClient = require('./init')
const {setQuickBooksTokenSet} = require('./token')
const oauthClient = require('../quickbooks-ouath-client/index')



const getAllEmployees = async (uid) => {
  try{
    await setQuickBooksTokenSet(uid)
    const {access_token, refresh_token} = oauthClient.getToken()
    // await refreshQuickBooksTokenSet(oauthClient.getToken())
    const qbo = getQuickBooksClient(access_token, refresh_token)
    return new Promise((resolve, reject) => {
        qbo.findEmployees({}, (err,queryResponse)=>{
          if(err) {
            console.log(err)
            // throw err
            reject(err)
          }else{
            const employees = queryResponse.QueryResponse.Employee; 
            const mappedData = employees.map((emp) => {
              return {
                eid: emp.Id,
                active: emp.Active,
                firstName:emp.GivenName,
                lastName:emp.FamilyName
              }
            })
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
  getAllEmployees
}