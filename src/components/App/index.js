/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


/**
 * Local import
 */
// Composants
import About from 'src/components/About';
import AppMessage from 'src/components/AppMessage';
import Login from 'src/containers/Login';
import Nav from 'src/containers/Nav';
import ReposResults from 'src/containers/Search/ReposResults';
import Search from 'src/containers/Search';
import Welcome from 'src/containers/Welcome';

// Styles et assets
import './app.sass';

/**
 * Code
 */
const App = ({ message, isUserConnected, results }) => (
  <div id="app">
    <Nav />
    {isUserConnected
      ? <Route exact path="/" component={Welcome} />
      : <Route exact path="/" component={Login} /> }
    <Route path="/about" component={About} />
    {isUserConnected && <Route path="/search" component={Search} />}
    {isUserConnected && results && <Route path="/results" component={ReposResults} />}
    {message && <AppMessage message={message} />}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
  isUserConnected: PropTypes.bool.isRequired,
};

export default App;
