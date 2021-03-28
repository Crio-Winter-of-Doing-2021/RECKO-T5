const express = require('express')
const app = express()
const {PORT, __prod__} = require('./constants')

const cors = require('cors')
const session = require('express-session')

const database_connection = require('./services/mongodb')
require('dotenv').config()

const XERO = require('./services/xero')
const QUICKBOOKS = require('./services/quickbooks')

const {setQuickBooksTokenSet} = require('./services/quickbooks/token')
const oauthClient = require('./services/quickbooks-ouath-client')
const getQuickBooksClient = require('./services/quickbooks/init')

const API = require('./routers')


// schedule jobs here : 
const Scheduler = require('./scheduled_jobs')
Scheduler()

// middleware 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {httpOnly:true},
}))

// main API 
app.use('/', API)



app.get('/quickbook/employee',async (req, res)=> {
  try{
    await setQuickBooksTokenSet()
    const {access_token, refresh_token} = oauthClient.getToken()
    // await refreshQuickBooksTokenSet(oauthClient.getToken())
    const qbo = getQuickBooksClient(access_token, refresh_token)
    qbo.findEmployees({}, (err,accounts)=>{
      if(err) {
        // console.log(err)
        res.send(err)
      }
      else {
        res.json({accounts})
      }
      // console.log()
    })
    // qbo.createEmployee
  }catch(e){
    console.log(e)
    res.json({error:e})
  }
})

app.get('/quickbook/account',async (req, res)=> {
  try{
    await setQuickBooksTokenSet()
    const {access_token, refresh_token} = oauthClient.getToken()
    // await refreshQuickBooksTokenSet(oauthClient.getToken())
    const qbo = getQuickBooksClient(access_token, refresh_token)
    qbo.findAccounts({}, (err,accounts)=>{
      if(err) {
        // console.log(err)
        res.send(err)
      }
      else {
        const mappedData = accounts.QueryResponse.Account.map((acc) => ({
            aid:acc.Id,
            name:acc.Name,
            type:acc.AccountType,
            active:acc.Active,
            class:acc.Classification
        }))

        res.send(mappedData)
      }
      // console.log()
    })
  }catch(e){
    console.log(e)
    res.json({error:e})
  }
})

app.get('/quickbook/journal', async(req, res)=> {
  try{
    const journals = await QUICKBOOKS.getAllJournals()
    res.send(journals)
  }catch(e){
    console.log(e)
    res.json({error:e})
  }
  
})

app.get('/xero/account' ,async (req, res) => {
  try {
    // to get a specific account
    const {id} = req.query
    if(id){
      const account = await XERO.getAnAccount(id)
      res.json(account)
    }else{
      // to get all the accounts
      const accounts = await XERO.getAllAccounts()
      res.json(accounts)
    }
  } catch (e) {
    console.log(e)
    res.json({error: e});
  }
});

app.post('/xero/account', async (req, res)=> {
  try{
    const account = req.body
    const newAccountId = await XERO.createAccount(account)
    res.json({id:newAccountId})
  }catch(e){
    console.log(e)
    res.json({error:e})
  }
})

app.get("/xero/employee", async (req, res) => {
  try {
    const {id} = req.query
    // to get an id
    if(id){
      const employee = await XERO.getAnEmployee(id)
      res.json(employee)
    }
    // to get all employees
    else{
      const employees = await XERO.getAllEmployees()
      res.json(employees)
    }
  } catch (e) {
    console.log(e)
    res.json({error: e});
  }
});

app.get('/xero/journal' , async (req, res) => {
  try{
      const response = await XERO.getAllJournals()
      res.json(response)
  }catch(e){
    // console.log(e)
    res.json({error:e})
  }
})

app.get('/xero/manualjournal' , async (req, res) => {
  try{
    const manualJournals = await XERO.getAllManualJournals()
    res.json(manualJournals)
  }catch(e){
    console.log(e)
    res.json({error:e})
  }
})

app.post('/xero/manualjournal', async (req, res) => {
  const manualJournal = req.body
  try{
    console.log(manualJournal);
    const newManualJournalID = await XERO.createManualJournals(manualJournal)
    res.json({id:newManualJournalID})
  }catch(e){
    console.log(e)
    res.json({error:e})
  }
})

// PORT 
app.listen(PORT, ()=>{
  console.log("server started at port :", PORT);
})
