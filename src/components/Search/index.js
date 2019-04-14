import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import SearchBar from 'src/containers/Search/SearchBar';
import ReposResults from 'src/containers/Search/ReposResults';
import './styles.scss';

const Search = ({ results }) => (
  <div id="search">
    <SearchBar />
    <Container>
      {results && <ReposResults results={results} />}
    </Container>
  </div>
);

Search.propTypes = {
  results: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};
export default Search;
