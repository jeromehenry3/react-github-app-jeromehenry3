import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from 'semantic-ui-react';
import LittleList from 'src/components/Welcome/LittleList';
import UserCard from './UserCard';

import './styles.scss';


const Welcome = ({ userData, lastReposList, lastStarsList }) => (
  <Container>
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <UserCard {...userData} />
        </Grid.Column>
        <Grid.Column width={10} className="vertical-centered">
          <LittleList list={lastReposList} cat="github" />
          <LittleList list={lastStarsList} cat="star" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);


Welcome.propTypes = {
  userData: PropTypes.object.isRequired,
};

export default Welcome;
