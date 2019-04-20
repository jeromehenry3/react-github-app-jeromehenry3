import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from 'semantic-ui-react';
import LatestRepoList from 'src/containers/LatestRepoList';
import UserCard from './UserCard';

import './styles.scss';


const Welcome = ({ userData }) => {

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <UserCard {...userData} />
          </Grid.Column>
          <Grid.Column width={10} className="vertical-centered">
            <LatestRepoList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
