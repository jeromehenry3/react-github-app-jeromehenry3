/**
 * Initial State
 */
const initialState = {
  input: '', // values: '' || string
  message: '', // values: '' || string
  repoData: false, // details of a repo, values: false || object
  results: false, // values: false || object
  resultsPage: false, // values: false || int >= 1
  query: false, // values: false || string
  searchStatus: 'normal', // values: normal, ajax-waiting, ajax-waiting-repo
  view: 'search', // values: search, repo-contents, welcome, about
};

/**
 * Types
 */
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const FETCH_MORE_RESULTS = 'FETCH_MORE_RESULTS';
export const GET_REPO_DATA = 'GET_REPO_DATA';
export const STORE_REPO_DATA = 'STORE_REPO_DATA';
/**
 * Traitements
 */

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VIEW:
      return {
        ...state,
        view: action.view,
      };
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case SUBMIT_FORM: // manages state after 'first' query sent to the API
      return {
        ...state,
        input: '',
        results: false,
        message: 'recherche en cours...',
        searchStatus: 'ajax-waiting',
        query: state.input,
        resultsPage: false,
      };
    case RECEIVED_DATA: // manages state after receiving data from the API
      return {
        ...state,
        message: '',
        searchStatus: 'normal',
        results: state.results ? {
          ...state.results,
          items: [...state.results.items, ...action.data.items],
        } : action.data,
        resultsPage: state.resultsPage ? state.resultsPage + 1 : 1,
      };
    case FETCH_MORE_RESULTS: // manages state after sending query by infinite scroll system
      return {
        ...state,
        searchStatus: 'ajax-waiting',
      };
    case GET_REPO_DATA:
      return {
        ...state,
        searchStatus: 'ajax-waiting-repo',
      };
    case STORE_REPO_DATA:
      return {
        ...state,
        repoData: action.repoData,
        view: 'repo-contents',
        searchStatus: 'normal',
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const changeView = view => ({
  type: CHANGE_VIEW,
  view,
});
export const changeInput = input => ({
  type: CHANGE_INPUT,
  input,
});
export const submitForm = input => ({
  type: SUBMIT_FORM,
  input,
});
export const receivedData = data => ({
  type: RECEIVED_DATA,
  data,
});
export const fetchMoreResults = (query, pageNumber) => ({
  type: FETCH_MORE_RESULTS,
  query,
  pageNumber,
});
export const getRepoData = url => ({
  type: GET_REPO_DATA,
  url,
});
export const storeRepoData = repoData => ({
  type: STORE_REPO_DATA,
  repoData,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
