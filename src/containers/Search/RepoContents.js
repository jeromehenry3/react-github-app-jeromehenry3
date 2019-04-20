import { connect } from 'react-redux';

/**
 * Local import
 */
import RepoContents from 'src/components/Search/RepoContents';

// Action Creators

const mapStateToProps = (state, ownProps) => ({
  data: state.repoData,

});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoContents);
