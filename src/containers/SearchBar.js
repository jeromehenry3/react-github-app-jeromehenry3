import { connect } from 'react-redux';

/**
 * Local import
 */
import SearchBar from 'src/components/Search/SearchBar';

// Action Creators
import { changeInput, submitForm } from 'src/store/reducer';

const mapStateToProps = state => ({
  input: state.input,
});

const mapDispatchToProps = dispatch => ({
  changeInput: (inputChangeEvent) => {
    dispatch(changeInput(inputChangeEvent.target.value));
  },
  onSubmitForm: (input) => {
    dispatch(submitForm(input));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
