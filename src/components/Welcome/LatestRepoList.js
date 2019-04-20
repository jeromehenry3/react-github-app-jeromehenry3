import React from 'react';
import PropTypes from 'prop-types';
import { List, Header, Icon } from 'semantic-ui-react';

const LatestRepoList = ({ list }) => (
  <List divided relaxed>
    <Header as='h2'>
      <Icon name='github' />
      <Header.Content>Mes derniers repos</Header.Content>
    </Header>
    {
      list.map(({ id, name, full_name, updated_at, private: priv }) => (
        <List.Item key={id}>
          {priv
            ? <List.Icon name='privacy' size='large' verticalAlign='middle' />
            : <List.Icon name='world' size='large' verticalAlign='middle' />
          }
          <List.Content>
            <List.Header as='a'>{name}</List.Header>
            <List.Description as='a'>{full_name}</List.Description>
          </List.Content>
        </List.Item>))
    }

  </List>
);

LatestRepoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default LatestRepoList;
