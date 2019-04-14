import { connect } from 'react-redux';

/**
 * Local import
 */
import Search from 'src/components/Search';

// Action Creators
// import { changeInput, submitForm } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  results: state.results,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
