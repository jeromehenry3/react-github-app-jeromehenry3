import axios from 'axios';
import {
  SUBMIT_FORM, receivedData, FETCH_MORE_RESULTS, GET_REPO_DATA,
  storeRepoData, CONNECT_USER, storeUserData, changeLoginMessage,
  logout,
} from './reducer';

const ajaxMiddleware = store => next => (action) => {
  const fetchGithubApi = (url) => {
    const { token } = store.getState();
    return axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
  };

  switch (action.type) {
    case SUBMIT_FORM:

      next(action);
      fetchGithubApi(`https://api.github.com/search/repositories?q=${action.input}`) // ajouter objet de requete
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
      fetchGithubApi(`https://api.github.com/search/repositories?q=${action.query}&page=${action.pageNumber}`)
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
      fetchGithubApi(`https://api.github.com/repos/${action.repo.owner.login}/${action.repo.name}/contents`)
        .then((response) => {
          console.log(response);
          const files = response.data.filter(elem => elem.type === 'file');
          const folders = response.data.filter(elem => elem.type === 'dir');
          const filesList = [...folders, ...files];

          // returns languages used in this repo
          fetchGithubApi(`https://api.github.com/repos/${action.repo.owner.login}/${action.repo.name}/languages`)
            .then((responseLanguages) => {
              const languages = responseLanguages.data;
              
              fetchGithubApi(`https://api.github.com/user/starred/${action.repo.owner.login}/${action.repo.name}`)
                .then((responseStarred) => {
                  const starred = responseStarred;
                  console.log('starred query : ', starred);
                  store.dispatch(storeRepoData({ filesList, languages, starred: true }));
                })
                .catch((errorStarred) => {
                  // eslint-disable-next-line no-unused-expressions
                  errorStarred.response.status === 404
                    ? store.dispatch(storeRepoData({ filesList, languages, starred: false }))
                    : console.log('erreur ajaxMiddleware starred route: ', errorStarred);
                });
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
      fetchGithubApi('https://api.github.com/user')
        .then((userResponse) => {
          const user = userResponse.data;
          const message = `Fetching repos for user ${user.login}`;
          store.dispatch(changeLoginMessage(message));
          axios.all([
            fetchGithubApi('https://api.github.com/user/repos'),
            fetchGithubApi('https://api.github.com/user/starred'),
          ])
            .then(axios.spread(
              (reposResponse, starredResponse) => {
                store.dispatch(
                  storeUserData({
                    userData: userResponse.data,
                    repos: reposResponse.data,
                    starred: starredResponse.data,
                  }),
                );
              },
            ))
            .catch((error) => {
              console.log('error in axios query from ajaxMiddlewre/CONNECT_USER :', error);
            });
        })
        .catch((error) => {
          console.log('error in CONNECT USER action :', error);
          if (error.response.status === 401) {
            store.dispatch(logout());
            store.dispatch(changeLoginMessage('Le token que vous avez saisi est invalide'))
          }
          else {
            store.dispatch(logout());
            store.dispatch(changeLoginMessage(error.response.message));
          }
        });
      break;
    default:
      return next(action);
  }
};

export default ajaxMiddleware;
