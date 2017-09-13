import React from 'react';
import App from './containers/AppContainer';
import Auth from './components/Auth/Auth';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/auth" component={Auth} />
      </div>
    </Router>
  )
};

export default Routes;
