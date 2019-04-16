/**
 * Initial State
 */
const initialState = {
  input: '', // values: '' || string
  isUserConnected: false,
  loginInput: '',
  message: '', // values: '' || string
  repoData: false, // details of a repo, values: false || object
  results: false, // values: false || object
  resultsPage: false, // values: false || int >= 1
  query: false, // values: false || string
  status: 'normal', // values: normal, ajax-waiting, ajax-waiting-repo
  stayConnected: false,
  token: '',
  view: 'search', // values: search, repo-contents
};

/**
 * Types
 */
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const CHANGE_LOGIN_INPUT = 'CHANGE_LOGIN_INPUT';
export const CONNECT_USER = 'CONNECT_USER';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const FETCH_MORE_RESULTS = 'FETCH_MORE_RESULTS';
export const GET_REPO_DATA = 'GET_REPO_DATA';
export const STORE_REPO_DATA = 'STORE_REPO_DATA';
/**
 * Traitements
 */

// const newItems = [...action.data.items].filter(
//   item => state.results.items.find(arrayItem => arrayItem.id !== item.id)
// );
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
        status: 'ajax-waiting',
        query: state.input,
        resultsPage: false,
      };
    case RECEIVED_DATA: // manages state after receiving data from the API
      return {
        ...state,
        message: '',
        status: 'normal',
        results: state.results ? {
          ...state.results,
          items: [...state.results.items, ...action.data.item],
        } : action.data,
        resultsPage: state.resultsPage ? state.resultsPage + 1 : 1,
      };
    case FETCH_MORE_RESULTS: // manages state after sending query by infinite scroll system
      return {
        ...state,
        status: 'ajax-waiting',
      };
    case GET_REPO_DATA:
      return {
        ...state,
        status: 'ajax-waiting-repo',
      };
    case STORE_REPO_DATA:
      return {
        ...state,
        repoData: action.repoData,
        view: 'repo-contents',
        status: 'normal',
      };
    case CHANGE_LOGIN_INPUT:
      return {
        ...state,
        loginInput: action.value,
      };
    case CONNECT_USER:
      return {
        ...state,
        status: 'connecting',
        token: action.token,
        stayConnected: action.stayConnected,
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
export const changeLoginInput = value => ({
  type: CHANGE_LOGIN_INPUT,
  value,
});
export const connectUser = (token, stayConnected) => ({
  type: CONNECT_USER,
  token,
  stayConnected,
});

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
