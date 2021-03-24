const Journal = require('../models/journal')

const queryJournals = async (params) => {
  try{
    const journals = await Journal.find(params)
    return journals
  }catch(e){
    console.log(e)  
    throw e
  }
}
class JournalController{
  async getJournals(req, res){
    try{
      const {params} = req 
      const journals = await queryJournals(params)
      res.send(journals)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
}

module.exports = new JournalController()