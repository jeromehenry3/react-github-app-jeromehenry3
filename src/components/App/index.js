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
import ReposResults from 'src/containers/Search/ReposResults';
import Repo from 'src/containers/Repo';
import Search from 'src/containers/Search';
import Welcome from 'src/containers/Welcome';

// Styles et assets
import './app.sass';

/**
 * Code
 */
const App = ({ message, isUserConnected, results, repoURL }) => (
  <div id="app">
    <Nav />
    {isUserConnected
      ? <Route exact path="/" component={Welcome} />
      : <Route exact path="/" component={Login} /> }
    <Route path="/about" component={About} />
    <Route
      path="/search"
      render={() => (
        isUserConnected ? (<Search />) : (<Redirect to="/" />)
      )}
    />
    <Route
      path="/results"
      render={() => (
        (isUserConnected && results) ? (<ReposResults />) : (<Redirect to="/" />)
      )}
    />
    
    <Route
      path={`/repo/:repoURL`}
      render={() => (
        (isUserConnected) ? (<Repo />) : (<Redirect to="/" />)
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
