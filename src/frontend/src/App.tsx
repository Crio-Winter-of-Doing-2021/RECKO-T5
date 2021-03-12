import DashBoard from './components/Pages/Dashboard'
import Navbar from './components/templates/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AdminPage from './components/Pages/Admin';

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={DashBoard} />
          <Route path="/admin" component={AdminPage} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
