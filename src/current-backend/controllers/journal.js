const Journal = require('../models/journal')
const XERO = require('../services/xero')
const QUICKBOOKS = require('../services/quickbooks')


const queryJournals = async (query) => {
  try{
    const {limit, offset} = query
    const journals = Journal.find().limit(parseInt(limit)).skip(parseInt(offset))
    const totalNumber = Journal.countDocuments()
    return Promise.all([journals, totalNumber]).then((vals) => {
      return ({
        journals:vals[0],
        numberOfJournals:vals[1]
      })
    })
  }catch(e){
    console.log(e)  
    throw e
  }
}

// gets the journals directly via xero and quickbooks api
const queryJournalsV2 = async () => {
  try{
    const {user} = req
    // get the tokenSet from table using user._id
    // and pass the token Set in getAllJournal function V2
    const xero_journals = XERO.getAllJournals()
    const quickbooks_journals = QUICKBOOKS.getAllJournals()
    return Promise.all([xero_journals, quickbooks_journals]).then(values => {
      return {
        journals : [...values[0], ...values[1]]
      }
    })
  }catch(e){
    console.log(e)
    // send the data through db in case of error
  }
  
}
class JournalController{
  async getJournals(req, res){
    try{
      const {query} = req 
      // console.log(query)
      const journals = await queryJournals(query)
      res.send(journals)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
  async getJournalsV2(req, res){
    try{
      const {query} = req 
      // console.log(query)
      const journals = await queryJournalsV2()
      res.send(journals)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
}

module.exports = new JournalController()