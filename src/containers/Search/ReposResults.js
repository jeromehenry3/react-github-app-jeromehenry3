import { connect } from 'react-redux';

/**
 * Local import
 */
import ReposResults from 'src/components/Search/ReposResults';

// Action Creators
import { fetchMoreResults, getRepoData } from 'src/store/reducer';

const mapStateToProps = (state, ownProps) => ({
  results: state.results,
  page: state.resultsPage,
  searchStatus: state.searchStatus,
  query: state.query,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchMoreResults: (query, pageNumber) => {
    dispatch(fetchMoreResults(query, pageNumber));
  },
  getRepoData: (url) => {
    dispatch(getRepoData(url));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReposResults);
