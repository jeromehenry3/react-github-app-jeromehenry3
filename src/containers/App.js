import { connect } from 'react-redux';

import App from 'src/components/App';

// Action Creators


const mapStateToProps = (state, ownProps) => ({
  message: state.message,
  isUserConnected: state.isUserConnected,
  displayLogoutModal: state.displayLogoutModal,
  results: state.results,
  repoURL: state.repoURL,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
