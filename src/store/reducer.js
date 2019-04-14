/**
 * Initial State
 */
const initialState = {
  input: '',
  message: '',
  results: false,
  resultsPage: false,
  query: false,
  searchStatus: 'normal',
  view: 'search',
};

/**
 * Types
 */
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const FETCH_MORE_RESULTS = 'FETCH_MORE_RESULTS';
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
    case SUBMIT_FORM:
      return {
        ...state,
        input: '',
        results: false,
        message: 'recherche en cours...',
        searchStatus: 'ajax-waiting',
        query: state.input,
        resultsPage: false,
      };
    case RECEIVED_DATA:
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
    case FETCH_MORE_RESULTS:
      return {
        ...state,
        searchStatus: 'ajax-waiting',
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

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
