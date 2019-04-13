import { connect } from 'react-redux';

/**
 * Local import
 */
import SearchBar from 'src/components/Search/SearchBar';

// Action Creators
import { changeInput, submitForm } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  input: state.input,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeInput: (inputChangeEvent) => {
    dispatch(changeInput(inputChangeEvent.target.value));
  },
  onSubmitForm: () => {
    dispatch(submitForm());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
