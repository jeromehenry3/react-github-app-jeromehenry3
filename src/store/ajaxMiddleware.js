import axios from 'axios';
import { SUBMIT_FORM, receivedData } from './reducer';

const ajaxMiddleware = store => next => (action) => {
  // Je veux chercher à agir dés que l'action 'changeStatus: loading' est interceptée
  switch (action.type) {
    case SUBMIT_FORM:
      // Je vais laisser passer cette action, pour que mon reducer
      // puisse changer de status, et suite à ça
      // je vais faire une requête
      next(action);
      axios.get(`https://api.github.com/search/repositories?q=${action.input}`) // ajouter objet de requete
        .then((response) => {
          const { data } = response;
          console.log(data);
          store.dispatch(receivedData(data));
          // Je dispose désormais des datas qui m'intéressent.
          // Je veux émettre une nouvelle action pour informer
          // mon reducer que j'ai reçu les datas
          // store.dispatch(receivedData(data));
        })
        .catch((error) => {

        });
      break;
    default:
      return next(action);
  }
};

export default ajaxMiddleware;
