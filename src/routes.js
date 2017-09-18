import React from 'react';
import App from './containers/AppContainer';
import Auth from './components/Auth/Auth';
import AuthCallback from './components/Auth/AuthCallback';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/auth/callback" component={AuthCallback} />
      </div>
    </Router>
  )
};

export default Routes;
