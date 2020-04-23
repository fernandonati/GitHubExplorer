import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';


/*
  See this route: /repository.
  "/repository/:repository+
  using this option bofer the first slash: "/" : blablabla+ i can use anything to
  set a parameter.
*/

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard}  />
        <Route path="/repository/:repository+" component={Repository}  />
    </Switch>
);

export default Routes;
