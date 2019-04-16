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
import Nav from 'src/components/Nav';
import Search from 'src/containers/Search';
import Welcome from 'src/components/Welcome';

// Styles et assets
import './app.sass';

/**
 * Code
 */
const App = ({ message }) => (
  <div id="app">
    <Nav />
    <Route exact path="/" component={Login} />
    <Route path="/about" component={About} />
    <Route path="/search" component={Search} />
    {message && <AppMessage message={message} negative={(message !== 'recherche en cours...')} />}
    {/* {(view === 'about') && <About />}
    {(view === 'search' || (view === 'repo-contents')) && <Search />}
    {message && <AppMessage message={message} negative={(message !== 'recherche en cours...')} />}
    {(view === 'welcome') && <Welcome />} */}
  </div>
);

App.propTypes = {
  view: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default App;
