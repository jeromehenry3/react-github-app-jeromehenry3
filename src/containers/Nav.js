import { connect } from 'react-redux';

/**
 * Local import
 */
import Nav from 'src/components/Nav';

// Action Creators
import { toggleLogoutModal } from 'src/store/reducer';

const mapStateToProps = state => ({
  isUserConnected: state.isUserConnected,
  results: state.results,
});

const mapDispatchToProps = dispatch => ({

  toggleLogoutModal: () => {
    dispatch(toggleLogoutModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
