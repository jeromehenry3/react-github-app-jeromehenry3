import { connect } from 'react-redux';

/**
 * Local import
 */
import Nav from 'src/components/Nav';

// Action Creators

const mapStateToProps = state => ({
  isUserConnected: state.isUserConnected,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
