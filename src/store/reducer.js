/**
 * Initial State
 */
const initialState = {
  view: 'search',
};

/**
 * Types
 */
const CHANGE_VIEW = 'CHANGE_VIEW';

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

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;
