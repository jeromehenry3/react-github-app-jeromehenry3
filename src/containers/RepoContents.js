import { connect } from 'react-redux';

/**
 * Local import
 */
import RepoContents from 'src/components/Search/RepoContents';

// Action Creators
import { starRepo, unStarRepo } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  repoData: state.repoData,

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  starRepo: (url) => {
    dispatch(starRepo(url));
  },
  unStarRepo: (url) => {
    dispatch(unStarRepo(url));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoContents);
