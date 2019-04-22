import { connect } from 'react-redux';

/**
 * Local import
 */
import Repo from 'src/components/Repo';

// Action Creators
import { resetRedirection, getRepoData } from 'src/store/reducer';

const mapStateToProps = state => ({
  repoURL: state.repoURL,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
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
