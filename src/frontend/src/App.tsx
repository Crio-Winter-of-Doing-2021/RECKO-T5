import DashBoard from './components/Pages/Dashboard'
import Navbar from './components/templates/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AdminPage from './components/Pages/Admin';
import JournalDataContextProvider from './context/journalDataProvider';
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <Router>
      <Switch>
      <ChakraProvider>
        <JournalDataContextProvider>
          <div className="App">
            <Navbar />
            <Route path="/" exact component={DashBoard} />
            <Route path="/admin" component={AdminPage} />
          </div>
        </JournalDataContextProvider>
        </ChakraProvider>
      </Switch>
    </Router>
  );
}
export default App;
