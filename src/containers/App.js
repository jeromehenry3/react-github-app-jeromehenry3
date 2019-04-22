import { connect } from 'react-redux';

import App from 'src/components/App';

// Action Creators


const mapStateToProps = state => ({
  message: state.message,
  isUserConnected: state.isUserConnected,
  displayLogoutModal: state.displayLogoutModal,
  results: state.results,
  repoURL: state.repoURL,
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
