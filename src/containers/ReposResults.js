import { connect } from 'react-redux';

/**
 * Local import
 */
import ReposResults from 'src/components/Search/ReposResults';

// Action Creators
import { fetchMoreResults, getRepoData, redirect } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  results: state.results,
  page: state.resultsPage,
  status: state.status,
  query: state.query,
  repoURL: state.repoURL,
  redirect: state.redirect,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMoreResults: (query, pageNumber) => {
    dispatch(fetchMoreResults(query, pageNumber));
  },
  getRepoData: (url) => {
    dispatch(getRepoData(url));
  },
  redirectToRepo: (repoURL) => {
    dispatch(redirect(`${repoURL}`));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReposResults);
