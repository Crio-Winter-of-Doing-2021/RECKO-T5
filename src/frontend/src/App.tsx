import DashBoard from './components/Pages/Dashboard'
import Navbar from './components/templates/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import AdminPage from './components/Pages/Admin';
import JournalDataContextProvider from './context/journalDataProvider';
import UserContextProvider from './context/userContextProvider';
import { ChakraProvider } from "@chakra-ui/react"
import LoginPage from './components/Pages/Login';
import RegisterPage from './components/Pages/Register';
import AccountPage from './components/Pages/Account';

function App() {
  return (
    <Router>
      <Switch>
      <ChakraProvider>
        <JournalDataContextProvider>
          <UserContextProvider>
            <div className="App">
              <Navbar />
              <ProtectedRoute path="/" component={DashBoard} />
              <ProtectedRoute path="/admin" component={AdminPage} />
              <ProtectedRoute path="/account" component={AccountPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </div>
          </UserContextProvider>
        </JournalDataContextProvider>
        </ChakraProvider>
      </Switch>
    </Router>
  );
}
export default App;
