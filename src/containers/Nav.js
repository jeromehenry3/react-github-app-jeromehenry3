import { connect } from 'react-redux';

/**
 * Local import
 */
import Nav from 'src/components/Nav';

// Action Creators
import { changeView } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  view: state.view,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeView: (view) => {
    dispatch(changeView(view));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
