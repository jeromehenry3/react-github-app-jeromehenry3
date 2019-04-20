import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import RepoContents from 'src/containers/Search/RepoContents';
import {
  Container, Icon, Button, Label,
} from 'semantic-ui-react';

import SearchBar from 'src/containers/Search/SearchBar';

class Repo extends Component {
  componentDidMount() {
    const { resetRedirection, getRepoData, repoURL, match } = this.props;
    resetRedirection();
    console.log(this.props.match);
    // getRepoData(repoURL);
    getRepoData(`${match.params.owner}/${match.params.repoURL}`);
  }

  render() {
    const { repoURL, status } = this.props;

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
  repoURL: PropTypes.string.isRequired,
  getRepoData: PropTypes.func.isRequired,
};

export default Repo;
