import { connect } from 'react-redux';

import LogoutModal from 'src/components/LogoutModal';

// Action Creators
import { toggleLogoutModal, logout } from 'src/store/reducer';

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoutModal);
