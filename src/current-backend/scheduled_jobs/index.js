const updateJournalDatabase = require('./journal')
const updateAccountDatabase = require('./account')
const updateEmployeeDatabase = require('./employee')

const UpdateUserData = async (uid) => {
  return Promise.all([updateJournalDatabase(uid),updateAccountDatabase(uid),updateEmployeeDatabase(uid)]).then(([a, b, c]) => {
    console.log("data stored for userId : " ,uid)
  }).catch(e => {
    console.log(e)
    throw e
  })
}


module.exports = UpdateUserData