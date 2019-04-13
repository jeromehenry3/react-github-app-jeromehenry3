/**
 * Initial State
 */
const initialState = {
  input: '',
  message: '',
  results: [],
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
        message: 'recherche en cours...',
        searchStatus: 'ajax-waiting',
      };
    case RECEIVED_DATA:
      return {
        ...state,
        message: '',
        searchStatus: 'normal',
        results: action.data,
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
export const submitForm = () => ({
  type: SUBMIT_FORM,
});
export const receivedData = data => ({
  type: RECEIVED_DATA,
  data,
})

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
