import { connect } from 'react-redux';

/**
 * Local import
 */
import Login from 'src/components/Login';

// Action Creators
import { changeLoginInput, connectUser, toggleStayConnectedCheckbox } from 'src/store/reducer';

const mapStateToProps = state => ({
  loginInput: state.loginInput,
  stayConnected: state.stayConnected,
  loginMessage: state.loginMessage,
});

const mapDispatchToProps = dispatch => ({
  changeInput: (value) => {
    dispatch(changeLoginInput(value));
  },
  onSubmitForm: (input) => {
    dispatch(connectUser(input));
  },
  toggleStayConnectedCheckbox: (stayConnected) => {
    dispatch(toggleStayConnectedCheckbox(stayConnected));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
