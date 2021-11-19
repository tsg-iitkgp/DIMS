import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import About from './screens/About';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Welcome from './screens/Welcome';


export default function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/private" component={About} />
      </Switch>
    </Router>
  );
}
