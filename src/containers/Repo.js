import { connect } from 'react-redux';

/**
 * Local import
 */
import Repo from 'src/components/Repo';

// Action Creators
import { resetRedirection, getRepoData } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  repoURL: state.repoURL,
  status: state.status,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getRepoData: (url) => {
    dispatch(getRepoData(url));
  },
  resetRedirection: () => {
    dispatch(resetRedirection());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Repo);
