import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import RepoContents from 'src/containers/Search/RepoContents';
import {
  Container,
} from 'semantic-ui-react';

import SearchBar from 'src/containers/Search/SearchBar';

class Repo extends Component {
  componentDidMount() {
    const { resetRedirection, getRepoData, match } = this.props;
    resetRedirection();

    getRepoData(`${match.params.owner}/${match.params.repoURL}`);
  }

  render() {
    const { status } = this.props;

    return (
      <div id="repo">
        <SearchBar />
        <Container>
          {(status !== 'repo loaded') ? (<p>
            please wait
          </p>) : (<RepoContents />)}
        </Container>
      </div>
    );
  }
}

Repo.propTypes = {
  resetRedirection: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  getRepoData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default Repo;
