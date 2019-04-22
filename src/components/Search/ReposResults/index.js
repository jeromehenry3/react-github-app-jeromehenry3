import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import SearchBar from 'src/containers/Search/SearchBar';
import RepoCard from 'src/components/RepoCard';
import PlaceholderCard from './PlaceholderCard';

import './styles.scss';


class ReposResults extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { status, page, results } = this.props;
    const root = document.getElementById('root');
    // A new axios query will be sent if scrolling at 300px from the bottom of the root div :
    // only if the app is not already waiting for results from the API
    // and if there are still more results to be fetched from there
    if (
      (window.scrollY + window.innerHeight >= root.offsetHeight - 500)
      && (status !== 'ajax-waiting')
      && ((page * 30) < results.total_count)
    ) {
      this.launchAjaxScript();
    }
  }

  handleRepoClick = (owner, name) => () => {
    const { redirectToRepo } = this.props;
    // getRepoData(results.items[index]);
    redirectToRepo(`${owner.login}/${name}`);
  }

  launchAjaxScript = () => {
    const { fetchMoreResults, page, query } = this.props;
    const nextPage = page + 1;
    fetchMoreResults(query, nextPage);
  }

  render() {
    const {
      results, page, repoURL, redirect,
    } = this.props;
    if (redirect) return (<Redirect to={`/repo/${repoURL}`} />);
    return (
      <div id="search">

        <SearchBar />
        {results && (
          <Card.Group>
            {results.items.map(data => (
              <RepoCard {...data} onClick={this.handleRepoClick(data.owner, data.name)} />

            ))
            }
            { ((page * 30) < results.total_count)
            && <>
              <PlaceholderCard />
              <PlaceholderCard />
              <PlaceholderCard />
              </>
            }
            { ((page * 30) >= results.total_count)
            && (
              <Message floating>
                <Message.Header>Fin des résultats...</Message.Header>
                <p>Vous n'avez pas trouvé ce que vous cherchiez ? tentez une autre requête.</p>
              </Message>
            )
            }
          </Card.Group>
        )}
      </div>
    );
  }
}


ReposResults.propTypes = {
  results: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      owner: PropTypes.object.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  fetchMoreResults: PropTypes.func.isRequired,
  redirectToRepo: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  query: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  status: PropTypes.string.isRequired,
};


export default ReposResults;
