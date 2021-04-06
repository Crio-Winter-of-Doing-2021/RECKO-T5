const Journal = require('../models/journal')
/* 
  # when the request for journals come, check the time since user data for journals is updated. if it is more than 1 hr update the data. then send the data from database.
  this way only users who are active will have their databases updated.
  also create an endpoint to update or sync data with xero and quickbooks manually given to user. This method can be used for accounts aswell. 
  
  # When user logs in , update the database with their data and apply a scheduler for every hour, when user logs out clear the set interval
*/

const queryJournals = async (query, uid) => {
  try{
    const {limit, offset} = query
    const journals = Journal.find({uid: uid}).limit(parseInt(limit)).skip(parseInt(offset))
    const totalNumber = Journal.countDocuments({uid:uid})
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
      const journals = await queryJournals(query, req.user._id)
      res.send(journals)
    }catch(e){
      console.log(e)
      res.status(400).json({error:e})
    }
  }
  
}

module.exports = new JournalController()