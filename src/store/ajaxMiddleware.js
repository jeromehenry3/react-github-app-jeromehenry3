import axios from 'axios';
import { SUBMIT_FORM, receivedData, FETCH_MORE_RESULTS } from './reducer';

const ajaxMiddleware = store => next => (action) => {

  switch (action.type) {
    case SUBMIT_FORM:

      next(action);
      axios.get(`https://api.github.com/search/repositories?q=${action.input}`) // ajouter objet de requete
        .then((response) => {
          const { data } = response;
          console.log(data);
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
          console.log('new data :', data);
          store.dispatch(receivedData(data));
        })
        .catch((error) => {
          console.log('erreur ajaxMiddleware/FETCH_MORE_RESULTS: ', error);
        });
      break;
    default:
      return next(action);
  }
};

export default ajaxMiddleware;
