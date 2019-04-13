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
import Search from 'src/components/Search';
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
    {(view === 'search') && <Search />}
    {message && <AppMessage message={message} negative={(message !== 'recherche en cours...')} /> }
    {(view === 'welcome') && <Welcome />}
  </div>
);

App.propTypes = {
  view: PropTypes.string.isRequired,
};

export default App;
