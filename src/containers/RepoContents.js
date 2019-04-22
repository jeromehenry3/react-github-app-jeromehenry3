import { connect } from 'react-redux';

/**
 * Local import
 */
import RepoContents from 'src/components/Search/RepoContents';

// Action Creators
import { starRepo, unStarRepo } from 'src/store/reducer';

const mapStateToProps = state => ({
  repoData: state.repoData,

});

const mapDispatchToProps = dispatch => ({
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
