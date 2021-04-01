const Journal = require('../models/journal')

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
}

module.exports = new JournalController()