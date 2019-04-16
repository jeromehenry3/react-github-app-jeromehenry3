import axios from 'axios';
import {
  SUBMIT_FORM, receivedData, FETCH_MORE_RESULTS, GET_REPO_DATA, storeRepoData, CONNECT_USER,
} from './reducer';

const ajaxMiddleware = store => next => (action) => {
  switch (action.type) {
    case SUBMIT_FORM:

      next(action);
      axios.get(`https://api.github.com/search/repositories?q=${action.input}`) // ajouter objet de requete
        .then((response) => {
          const { data } = response;
          store.dispatch(receivedData(data));
        })
        .catch((error) => {
          console.log('erreur ajaxMiddleware/SUBMIT_FORM: ', error);
        });
      break;

    case FETCH_MORE_RESULTS:
      next(action);
      console.log('middleware: fetchMoreResults. pageNumber : ', action.pageNumber);
      axios.get(`https://api.github.com/search/repositories?q=${action.query}&page=${action.pageNumber}`)
        .then((response) => {
          const { data } = response;
          store.dispatch(receivedData(data));
        })
        .catch((error) => {
          console.log('erreur ajaxMiddleware/FETCH_MORE_RESULTS: ', error);
        });
      break;

    case GET_REPO_DATA:
      next(action);
      console.log('GETREPODATA middleware');
      axios.get(`${action.url}/contents`)
        .then((response) => {
          const files = response.data.filter( elem => elem.type === 'file');
          const folders = response.data.filter( elem => elem.type === 'dir');
          const filesList = [...folders, ...files];
          // store.dispatch(storeRepoList(list));
          axios.get(`${action.url}/languages`)
            .then((response2) => {
              const languages = response2.data;
              store.dispatch(storeRepoData({ filesList, languages }));
            })
            .catch((error) => {
              console.log('erreur ajaxMiddleware/GET REPO DATA', error);
            });
        })
        .catch((error) => {
          console.log('erreur ajaxMiddleware/GET REPO DATA', error);
        });
      break;
    case CONNECT_USER:
      next(action);
      axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${store.getState().loginInput}`,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log('error in CONNECT USER action');
        });
        
      break;
    default:
      return next(action);
  }
};

export default ajaxMiddleware;
