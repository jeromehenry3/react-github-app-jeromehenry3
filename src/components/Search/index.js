import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'src/containers/Search/SearchBar';
import ReposResults from 'src/containers/Search/ReposResults';
// import RepoContents from 'src/containers/Search/RepoContents';
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
