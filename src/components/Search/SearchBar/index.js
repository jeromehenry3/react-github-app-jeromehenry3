import React from 'react';
import { Input, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './styles.scss';

const SearchBar = ({ input, changeInput, onSubmitForm }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    (input !== '') && onSubmitForm(input);
  };

  return (
    <Container>
      <form
        action="#"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Entrez votre recherche."
          onChange={changeInput}
          value={input}
        />
      </form>
    </Container>
  );
};

SearchBar.propTypes = {
  input: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default SearchBar;
