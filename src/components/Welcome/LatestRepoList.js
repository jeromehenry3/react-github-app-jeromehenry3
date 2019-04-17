import React from 'react';
import { List } from 'semantic-ui-react';

const LatestRepoList = ({ list }) => (
  <List divided relaxed>
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
)

export default LatestRepoList;
