import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import About from './screens/About';
import Welcome from './screens/Welcome';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Welcome} />
      </Switch>
    </Router>
  );
}
