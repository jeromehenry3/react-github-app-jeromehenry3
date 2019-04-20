import { connect } from 'react-redux';

/**
 * Local import
 */
import Welcome from 'src/components/Welcome';

// Action Creators
// import { } from 'src/store/reducer';
// import { latestUpdatedRepos } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  userData: state.userData,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
