import React from 'react';
import EntryCard from './components/EntryCard';
function App() {
  return (
    <div className="App">
     <EntryCard provider="Xero" accountId="abcd-1234" accountName="Akshat" amount="2000" date="12/1/20" type="debit" />
    </div>
  );
}

export default App;
