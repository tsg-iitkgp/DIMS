import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import About from './screens/About';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Logout from './screens/Logout';
import Requests from './screens/Requests';
import Transactions from './screens/Transactions';
import Welcome from './screens/Welcome';


export default function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/requests" component={Requests} />
        <PrivateRoute exact path="/transactions" component={Transactions} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/private" component={About} />
      </Switch>
    </Router>
  );
}
