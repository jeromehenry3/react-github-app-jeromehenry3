import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Icon } from 'semantic-ui-react';
import LatestRepoList from 'src/containers/LatestRepoList';


const Welcome = ({ userData, repos }) => {
  const extra = (
    <>
      <Icon name="world" />
      <span>{userData.public_repos} repos publics </span>
      <Icon name="privacy" />
      <span>{userData.total_private_repos} repos privés</span>
    </>
  );
  return (
    <Container>
      { console.log(repos) }
      <Card
        image={userData.avatar_url}
        header={userData.name}
        meta={userData.company}
        description={userData.bio}
        extra={extra}
      />
      <LatestRepoList />
    </Container>
)};

Welcome.propTypes = {
  userData: PropTypes.object.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default Welcome;
