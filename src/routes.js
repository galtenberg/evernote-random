import React from 'react'
import App from './components/App/App'
import Auth from './components/Auth/Auth'
import AuthOut from './components/Auth/AuthOut'
import AuthCallback from './components/Auth/AuthCallback'
import Random from './components/Notes/Random'

import { BrowserRouter as Router, Route } from 'react-router-dom'

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/authout" component={AuthOut} />
        <Route exact path="/auth/callback" component={AuthCallback} />
        <Route exact path="/randomInApp" component={Random} />
        <Route exact path="/random-in-app" component={Random} />
      </div>
    </Router>
  )
}

export default Routes
