/*
 * Npm import
 */
import { createStore } from 'redux';

/*
 * Local import
 */
// Reducer
import reducer from 'src/store/reducer';

/*
 * Code
 */
const devTools = [];
if (window.devToolsExtension) {
  devTools.push(window.devToolsExtension());
}

// createStore
const store = createStore(reducer, ...devTools);

/*
 * Export
 */
export default store;
