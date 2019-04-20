import { connect } from 'react-redux';

/**
 * Local import
 */
import RepoContents from 'src/components/Search/RepoContents';

// Action Creators
import { changeView } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  data: state.repoData,

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeView: (view) => {
    dispatch(changeView(view));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoContents);
