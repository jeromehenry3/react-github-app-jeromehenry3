import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RepoContents from 'src/containers/RepoContents';
import AppMessage from 'src/components/AppMessage';
import {
  Container,
} from 'semantic-ui-react';


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
        <Container>
          {(status !== 'repo loaded')
            ? (<AppMessage message="recherche en cours..." />)
            : (<RepoContents />)}
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
