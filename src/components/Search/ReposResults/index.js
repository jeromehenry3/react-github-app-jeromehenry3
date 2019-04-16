import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Message, Responsive } from 'semantic-ui-react';

import PlaceholderCard from './PlaceholderCard';

import './styles.scss';


class ReposResults extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    const { status, page, results } = this.props;
    const root = document.getElementById('root');
    // A new axios query will be sent if scrolling at 300px from the bottom of the root div :
    // only if the app is not already waiting for results from the API
    // and if there are still more results to be fetched from there
    if (
      (window.scrollY + window.innerHeight >= root.offsetHeight - 300)
      && (status !== 'ajax-waiting')
      && ((page * 30) < results.total_count)
    ) {
      this.launchAjaxScript();
    }
  }

  handleRepoClick = url => () => {
    const { getRepoData } = this.props;
    getRepoData(url);
  }

  launchAjaxScript = () => {
    const { fetchMoreResults, page, query } = this.props;
    const nextPage = page + 1;
    fetchMoreResults(query, nextPage);
  }

  render() {
    const { results, page } = this.props;

    return (
      <Card.Group>
        {results.items.map(({
          id, owner, name, description, url,
        }) => (
          <Card key={id} onClick={this.handleRepoClick(url)}>
            <Image src={owner.avatar_url} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>
                <span>{owner.login}</span>
              </Card.Meta>
              <Card.Description>{description}</Card.Description>
            </Card.Content>
          </Card>
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
  getRepoData: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};


export default ReposResults;
