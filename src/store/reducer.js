/**
 * Initial State
 */
// import { initialState } from 'src/data/initialState';
// d0a136a291cc0267e5b6158aa374039a8ee83192
const initialState = {
  input: '', // values: '' || string
  isUserConnected: false,
  displayLogoutModal: false,
  loginInput: 'd0a136a291cc0267e5b6158aa374039a8ee83192',
  loginMessage: '',
  message: '', // values: '' || string
  repoData: false, // details of a repo, values: false || object
  results: false, // values: false || object
  resultsPage: false, // values: false || int >= 1
  query: false, // values: false || string
  repoURL: '',
  redirect: false,
  status: 'normal', // values: normal, ajax-waiting, ajax-waiting-repo, connecting
  stayConnected: false,
  token: '',
  userData: undefined,
  userRepos: [],
  starred: [],
  view: 'search', // values: search, repo-contents
};

/**
 * Types
 */
export const CHANGE_INPUT = 'CHANGE_INPUT';
export const CHANGE_LOGIN_INPUT = 'CHANGE_LOGIN_INPUT';
export const CHANGE_LOGIN_MESSAGE = 'CHANGE_LOGIN_MESSAGE';
export const CONNECT_USER = 'CONNECT_USER';
export const TOGGLE_LOGOUT_MODAL = 'TOGGLE_LOGOUT_MODAL';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const RECEIVED_DATA = 'RECEIVED_DATA';
export const SHOW_REPO = 'SHOW_REPO';
export const RESET_REDIRECTION = 'RESET_REDIRECTION';
export const FETCH_MORE_RESULTS = 'FETCH_MORE_RESULTS';
export const GET_REPO_DATA = 'GET_REPO_DATA';
export const STAR_REPO = 'STAR_REPO';
export const STORE_REPO_DATA = 'STORE_REPO_DATA';
export const STORE_USER_DATA = 'STORE_USER_DATA';
// export const TOGGLE_REPO_STAR = 'TOGGLE_REPO_STAR'; TODO
export const TOGGLE_STAY_CONNECTED_CHECKBOX = 'TOGGLE_STAY_CONNECTED_CHECKBOX';
/**
 * Traitements
 */
// To filter only wanted fields in an object (used in action storeUserData)
const filterFieldsInObject = (initialObject, fieldsToKeep) => {
  const filteredData = Object.keys(initialObject)
    .filter(key => fieldsToKeep.includes(key))
    .reduce((object, key) => {
      return {
        ...object,
        [key]: initialObject[key],
      };
    }, {});
  return filteredData;
};
  // To filter the fields in collection of objects (array of repos)
  // Not meant to filter at more than one level of deepness (on dit comme ça ? :) )
const filterFieldsInArrayOfObjects = (initialArray, fieldsToKeep) => initialArray.map(
  object => filterFieldsInObject(object, fieldsToKeep),
);


/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case SUBMIT_FORM: // manages state after 'first' query sent to the API
      return {
        ...state,
        results: false,
        message: 'recherche en cours...',
        status: 'ajax-waiting',
        view: 'search',
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
          items: [...state.results.items, ...action.data.items],
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
        status: 'repo loaded',
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
        token: state.loginInput.trim(),
        loginInput: '',
        loginMessage: 'connexion en cours',
      };
    case TOGGLE_LOGOUT_MODAL:
      return {
        ...state,
        displayLogoutModal: !state.displayLogoutModal,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        loginMessage: 'vous avez été déconnecté(e).',
      };
    case SHOW_REPO:
      return {
        ...state,
        repoURL: action.repoURL,
        redirect: true,
        status: 'opening repo',
      };
    case STAR_REPO:
      return {
        ...state,
        starred: [
          state.repoData.data,
          ...state.starred,
        ],
        repoData: {
          ...state.repoData,
          starred: true,
        },
      };
    case RESET_REDIRECTION:
      return {
        ...state,
        redirect: false,
      };
    case CHANGE_LOGIN_MESSAGE:
      return {
        ...state,
        loginMessage: action.text,
      };
    case TOGGLE_STAY_CONNECTED_CHECKBOX:
      return {
        ...state,
        stayConnected: !state.stayConnected,
      };
    case STORE_USER_DATA:
      // {
      //   const { login,  }
      // }
      return {
        ...state,
        isUserConnected: true,
        userData: { ...action.userData },
        userRepos: [...action.repos],
        starred: [...action.starred],
      };

    default:
      return state;
  }
};

/**
 * Action Creators
 */

export const changeInput = input => ({
  type: CHANGE_INPUT,
  input,
});
export const submitForm = input => ({
  type: SUBMIT_FORM,
  input,
});
export const receivedData = (data) => { // Data d'une requête de repos
  const reposFieldsToFilter = ['id', 'name', 'full_name', 'owner', 'description', 'url', 'html_url', 'language'];
  const filteredItems = filterFieldsInArrayOfObjects(data.items, reposFieldsToFilter);
  const newData = { ...data, items: filteredItems };
  return {
    type: RECEIVED_DATA,
    data: newData,
  };
};
export const fetchMoreResults = (query, pageNumber) => ({
  type: FETCH_MORE_RESULTS,
  query,
  pageNumber,
});
export const getRepoData = repoURL => ({
  type: GET_REPO_DATA,
  repoURL,
});
export const storeRepoData = (repoData) => {
  const fieldsToFilter = ['id', 'name', 'full_name', 'private', 'language', 'description', 'url', 'created_at', 'updated_at', 'owner'];
  return {
    type: STORE_REPO_DATA,
    repoData: {
      ...repoData,
      data: filterFieldsInObject(repoData.data, fieldsToFilter),
    },
  };
};
export const starRepo = url => ({
  type: STAR_REPO,
  url,
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
export const logout = () => ({
  type: LOGOUT_USER,
});
export const redirect = repoURL => ({
  type: SHOW_REPO,
  repoURL,
});
export const resetRedirection = () => ({
  type: RESET_REDIRECTION,
});
export const toggleLogoutModal = () => ({
  type: TOGGLE_LOGOUT_MODAL,
});
export const changeLoginMessage = text => ({
  type: CHANGE_LOGIN_MESSAGE,
  text,
});
export const toggleStayConnectedCheckbox = () => ({
  type: TOGGLE_STAY_CONNECTED_CHECKBOX,
});

export const storeUserData = ({ userData, repos, starred }) => {
  // Fields to filter userData from the API to keep only the fields we want
  const userFieldsToFilter = ['login', 'id', 'avatar_url', 'name', 'company', 'bio', 'public_repos', 'total_private_repos'];
  const reposFieldsToFilter = ['id', 'name', 'full_name', 'private', 'language', 'description', 'url', 'created_at', 'updated_at', 'owner'];
  const starredFieldsToFilter = ['id', 'name', 'full_name', 'private', 'language', 'description', 'url', 'owner'];
  return {
    type: STORE_USER_DATA,
    userData: filterFieldsInObject(userData, userFieldsToFilter),
    repos: filterFieldsInArrayOfObjects(repos, reposFieldsToFilter),
    starred: filterFieldsInArrayOfObjects(starred, starredFieldsToFilter),
  };
};


/**
 * Selectors
 */
export const latestUpdatedRepos = state => (
  state.userRepos.sort((a, b) => (
    new Date(b.updated_at) - new Date(a.updated_at)
  ))
    .slice(0, 5)
);
export const lastStarsRepos = state => (
  state.starred.sort((a, b) => (
    new Date(b.updated_at) - new Date(a.updated_at)
  ))
    .slice(0, 5)
);
/**
 * Export
 */
export default reducer;
