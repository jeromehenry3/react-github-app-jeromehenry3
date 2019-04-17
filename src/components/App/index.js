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
import Search from 'src/containers/Search';
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
      ? <Route exact path="/" component={Welcome} />
      : <Route exact path="/" component={Login} /> }
    <Route path="/about" component={About} />
    {isUserConnected && <Route path="/search" component={Search} />}
    {message && <AppMessage message={message} negative={(message !== 'recherche en cours...')} />}
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
  isUserConnected: PropTypes.bool.isRequired,
};

export default App;
