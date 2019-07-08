/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';


/**
 * Local import
 */
// Composants
import About from 'src/components/About';
import AppMessage from 'src/components/AppMessage';
import Login from 'src/containers/Login';
import Nav from 'src/containers/Nav';
import ReposResults from 'src/containers/ReposResults';
import Repo from 'src/containers/Repo';
import Welcome from 'src/containers/Welcome';

// Styles et assets
import './app.sass';

/**
 * Code
 */
const App = ({ message, isUserConnected }) => (
  <div id="app">
    <Nav />
    {isUserConnected
      ? <Route exact path="/github-app/" component={Welcome} />
      : <Route exact path="/github-app/" component={Login} /> }
    <Route path="/github-app/about" component={About} />
    <Route
      path="/github-app/search"
      render={() => (
        isUserConnected ? (<ReposResults />) : (<Redirect to="/github-app/" />)
      )}
    />
    <Route
      path="/github-app/repo/:owner/:repoURL"
      render={({ match, ...rest }) => (
        (isUserConnected)
          ? (<Repo match={match} {...rest} />)
          : (<Redirect to="/" />)
      )}
    />
    {message && <AppMessage message={message} />}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
  isUserConnected: PropTypes.bool.isRequired,
};

export default App;
