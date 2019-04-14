/**
 * Import
 */
import React from 'react';
import PropTypes from 'prop-types';


/**
 * Local import
 */
// Composants
import About from 'src/components/About';
import Search from 'src/containers/Search';
import Nav from 'src/containers/Nav';
import Welcome from 'src/components/Welcome';
import AppMessage from 'src/components/AppMessage';

// Styles et assets
import './app.sass';

/**
 * Code
 */
const App = ({ view, message }) => (
  <div id="app">
    <Nav />
    {(view === 'about') && <About />}
    {(view === 'search' || (view === 'repo-contents')) && <Search />}
    {message && <AppMessage message={message} negative={(message !== 'recherche en cours...')} />}
    {(view === 'welcome') && <Welcome />}
  </div>
);

App.propTypes = {
  view: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default App;
