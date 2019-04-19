import { connect } from 'react-redux';

import LogoutModal from 'src/components/LogoutModal';

// Action Creators
import { toggleLogoutModal, logout, changeLoginMessage } from 'src/store/reducer';

const mapStateToProps = state => ({
  displayLogoutModal: state.displayLogoutModal,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  toggleLogoutModal: () => {
    dispatch(toggleLogoutModal());
  },
  confirmLogoutToUser: () => {
    dispatch(changeLoginMessage('Vous êtes bien déconnecté(e)'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutModal);
