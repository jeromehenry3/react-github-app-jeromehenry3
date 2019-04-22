import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'src/containers/SearchBar';
import ReposResults from 'src/containers/ReposResults';

import './styles.scss';

const Search = ({ results }) => (
  <div id="search">
    <SearchBar />
    {results && <ReposResults results={results} />}
  </div>
);

Search.propTypes = {
  results: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};
export default Search;
