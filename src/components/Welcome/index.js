import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import LatestRepoList from 'src/containers/LatestRepoList';
import UserCard from './UserCard';


const Welcome = ({ userData, repos }) => {

  return (
    <Container>
      <UserCard {...userData} />
      <LatestRepoList />
    </Container>
  );
};

Welcome.propTypes = {
  userData: PropTypes.object.isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default Welcome;
