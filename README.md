# RECKO-T5
Team ID: RECKO-T5 | Team Members: Akshat Garg &amp; Gyan Prakash Karn

> ## Tech Stack ⚜️

1. ReactJS + Typescript (Chakra UI)
2. Node Js + express
3. MongoDB + mongoose

> ## Major Libraries 🔑

1. xero-node
2. node-quickbooks
3. intuit-oauth

> ## Components of Application 🌿

1. Integration with services  :Uses OAuth 2.0 to authorize user with these services(Xero and Quickbooks) and get their data access. 
2. Shows user data like journals and accounts on the user dashboard, along with sorting, filtering features.
3. Frontend and API's are wrapped with complete authentication with a user model.
4. Data from these services are periodically fetched and saved to our database for persistence and reliability, when user logs In and the requests from frontend are handled by controllers directly talking to out database.
5. Server side pagination is implemented to handle large data and for faster queries.


> ## Frontend 🖥

1. Complete user authentication 
2. Dashboard shows journal data, with sorting and filtering features 
3. User Page shows user info and buttons to authorize with services
4. Accounts page shows accounts of the organisation, also provides a functionality to create a new account.
5. Login and register pages are for user auth
6. <em>Extra features: </em>
  <ul>
  <li>Demographs shows the data in form of graphs like doughnuts and bar graphs</li>
  <li>Pagination</li>
  <li>Add account feature</li>
  </ul>

> ## Backend ⚙️

1. OAuth 2.0 handling for XERO and QUICKBOOKS
2. User Authentication to secure API's
3. Middleware to periodically save the data to database from external services
4. Routes for journals, accounts, employee and user 
5. Server side pagiation of larger data 
6. Error handling 

> ## Running on local system 

1. fill in the sample.env and change its name to .env
2. `sh run_server.sh`
3. `sh run_frontend.sh`
