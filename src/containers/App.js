import { connect } from 'react-redux';

import App from 'src/components/App';

// Action Creators
// import { changeView } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  view: state.view,
  message: state.message,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // changeView: (view) => {
  //   dispatch(changeView(view));
  // },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
