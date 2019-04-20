import { connect } from 'react-redux';

/**
 * Local import
 */
import Welcome from 'src/components/Welcome';

// Action Creators
// import { } from 'src/store/reducer';
import { latestUpdatedRepos, lastStarsRepos } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  userData: state.userData,
  lastReposList: latestUpdatedRepos(state),
  lastStarsList: lastStarsRepos(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
