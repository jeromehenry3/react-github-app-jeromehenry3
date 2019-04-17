import { connect } from 'react-redux';

/**
 * Local import
 */
import Welcome from 'src/components/Welcome';

// Action Creators
// import { } from 'src/store/reducer';
import { latestUpdatedRepos } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  userData: state.userData,
  repos: latestUpdatedRepos(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
