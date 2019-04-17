import { connect } from 'react-redux';

/**
 * Local import
 */
import LatestRepoList from 'src/components/Welcome/LatestRepoList';

// Action Creators
// import { } from 'src/store/reducer';
import { latestUpdatedRepos } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  list: latestUpdatedRepos(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LatestRepoList);
