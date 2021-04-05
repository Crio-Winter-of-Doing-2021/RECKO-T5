const getQuickBooksClient = require('./init')
const {setQuickBooksTokenSet} = require('./token')
const oauthClient = require('../quickbooks-ouath-client/index')



// const getAllJournals = async (callback) => {
//   try{
//     const mappedData = []
//     await setQuickBooksTokenSet()
//     const {access_token, refresh_token} = oauthClient.getToken()
//     // await refreshQuickBooksTokenSet(oauthClient.getToken())
//     const qbo = getQuickBooksClient(access_token, refresh_token)
//     return new Promise((resolve, reject) => {
//       qbo.findJournalEntries({}, (err,queryResponse)=>{
//         if(err) {
//           console.log(err)
//           // throw err
//           reject(err)
//         }else{
//           const JournalEntry = queryResponse.QueryResponse.JournalEntry; 
//           JournalEntry.map((journal) => {
//             const createTime =new Date(journal.MetaData.CreateTime).getTime() 
//             journal.Line.map(jl => {
//               const record = {
//                 jid : ((createTime).toString(36) + jl.Id + (jl.Amount).toString(36)),
//                 provider:"QUICKBOOKS", 
//                 accountName : jl.JournalEntryLineDetail.AccountRef.name,
//                 accountId : jl.JournalEntryLineDetail.AccountRef.value,
//                 amount : jl.Amount,
//                 date : journal.TxnDate,
//                 type : jl.JournalEntryLineDetail.PostingType
//               }
//               mappedData.push(record)
//             })
//           }) 
//           // console.log(callback)
//           resolve(mappedData)
//         }  
//     })
    
//     })
//   }catch(e){
//     console.log(e)
//     throw e
//   }
// }


const getAllJournals = async (uid) => {
  try{
    const mappedData = []
    await setQuickBooksTokenSet(uid)
    const {access_token, refresh_token} = oauthClient.getToken()
    // await refreshQuickBooksTokenSet(oauthClient.getToken())
    const qbo = getQuickBooksClient(access_token, refresh_token)
    return new Promise((resolve, reject) => {
      qbo.findJournalEntries({}, (err,queryResponse)=>{
        if(err) {
          console.log(err)
          // throw err
          reject(err)
        }else{
          const JournalEntry = queryResponse.QueryResponse.JournalEntry; 
          JournalEntry.map((journal) => {
            const createTime =new Date(journal.MetaData.CreateTime).getTime() 
            journal.Line.map(jl => {
              const record = {
                jid : ((createTime).toString(36) + jl.Id + (jl.Amount).toString(36)),
                provider:"QUICKBOOKS", 
                accountName : jl.JournalEntryLineDetail.AccountRef.name,
                accountId : jl.JournalEntryLineDetail.AccountRef.value,
                amount : jl.Amount,
                date : journal.TxnDate,
                type : jl.JournalEntryLineDetail.PostingType
              }
              mappedData.push(record)
            })
          }) 
          // console.log(callback)
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
  getAllJournals
}