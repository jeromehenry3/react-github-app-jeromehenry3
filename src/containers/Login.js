import { connect } from 'react-redux';

/**
 * Local import
 */
import Login from 'src/components/Login';

// Action Creators
import { changeLoginInput, connectUser } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  loginInput: state.loginInput,
  stayConnected: state.stayConnected,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeInput: (value) => {
    dispatch(changeLoginInput(value));
  },
  onSubmitForm: (input) => {
    dispatch(connectUser(input));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
