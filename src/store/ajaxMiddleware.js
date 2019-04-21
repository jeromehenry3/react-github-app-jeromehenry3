import axios from 'axios';
import {
  SUBMIT_FORM, receivedData, FETCH_MORE_RESULTS, GET_REPO_DATA,
  storeRepoData, CONNECT_USER, storeUserData, changeLoginMessage,
  logout, STAR_REPO, UNSTAR_REPO,
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
  const { token } = store.getState();

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
      const { repoURL } = action;
      next(action);
      axios.all([
        fetchGithubApi(`https://api.github.com/repos/${repoURL}`),
        fetchGithubApi(`https://api.github.com/repos/${repoURL}/contents`),
      ])
        .then(axios.spread((response, contentResponse) => {
          console.log(response, contentResponse);
          const data = { ...response.data };
          const files = contentResponse.data.filter(elem => elem.type === 'file');
          const folders = contentResponse.data.filter(elem => elem.type === 'dir');
          const filesList = [...folders, ...files];

          // returns languages used in this repo
          fetchGithubApi(`https://api.github.com/repos/${repoURL}/languages`)
            .then((responseLanguages) => {
              const languages = responseLanguages.data;
              // checks if repo is starred by user
              fetchGithubApi(`https://api.github.com/user/starred/${repoURL}`)
                .then((responseStarred) => {
                  const starred = responseStarred;
                  console.log('starred query : ', starred);
                  store.dispatch(storeRepoData({
                    data, filesList, languages, starred: true,
                  }));
                })
                .catch((errorStarred) => {
                  // eslint-disable-next-line no-unused-expressions
                  errorStarred.response.status === 404
                    ? store.dispatch(storeRepoData({
                      data, filesList, languages, starred: false,
                    }))
                    : console.log('erreur ajaxMiddleware starred route: ', errorStarred);
                });
            })
            .catch((error) => {
              console.log('erreur ajaxMiddleware/GET REPO DATA', error);
            });
        }))
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
    case STAR_REPO:
      axios.put(`https://api.github.com/user/starred/${action.url}`, {}, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((response) => {
          // eslint-disable-next-line no-unused-expressions
          response.status === 204
            ? next(action)
            : console.log('starring repo status: ', response.message);
        })
        .catch((error) => {
          console.log('error Starring Repo: ', error);
        });
      break;
    case UNSTAR_REPO:
      axios.delete(`https://api.github.com/user/starred/${action.url}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((response) => {
          // eslint-disable-next-line no-unused-expressions
          response.status === 204
            ? next(action)
            : console.log('starring repo status: ', response.message);
        })
        .catch((error) => {
          console.log('error Starring Repo: ', error);
        });
      break;
    default:
      return next(action);
  }
};

export default ajaxMiddleware;
