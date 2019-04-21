import { connect } from 'react-redux';

/**
 * Local import
 */
import RepoContents from 'src/components/Search/RepoContents';

// Action Creators
import { starRepo } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  repoData: state.repoData,

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  starRepo: (url) => {
    dispatch(starRepo(url));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoContents);
