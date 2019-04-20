import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import SearchBar from 'src/containers/Search/SearchBar';
import ReposResults from 'src/containers/Search/ReposResults';
// import RepoContents from 'src/containers/Search/RepoContents';
import './styles.scss';

const Search = ({ view, results, repoData }) => (
  <div id="search">
    <SearchBar />
    {/* <Container> */}
      {results && <ReposResults results={results} />}
      {/* {(view === 'repo-contents') && repoData && <RepoContents />} */}
    {/* </Container> */}
  </div>
);

Search.propTypes = {
  results: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  view: PropTypes.string.isRequired,
  repoData: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};
export default Search;
