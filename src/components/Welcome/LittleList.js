import React from 'react';
import PropTypes from 'prop-types';
import { List, Header, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const adaptTitle = (cat) => {
  switch (cat) {
    case 'github':
      return 'Mes derniers repos';
    case 'star':
      return 'Mes derniers favoris';
    default:
      return 'Erreur';
  }
};

const LittleList = ({ list, cat }) => (
  <List divided relaxed>
    <Header as="h2">
      <Icon name={cat} />
      <Header.Content>{adaptTitle(cat)}</Header.Content>
    </Header>
    {
      list.map(({ id, name, full_name, updated_at, private: priv, owner }) => (
        <List.Item key={id}>
          {
            (cat === 'star') && <Image avatar src={owner.avatar_url} />
          }
          {
            (cat === 'github' && priv === true) && <List.Icon name="privacy" size="large" verticalAlign="middle" />
          }
          {
            (cat === 'github' && priv === false) && <List.Icon name="world" size="large" verticalAlign="middle" />
          }
          <List.Content>
            <List.Header
              as={Link}
              to={
                {
                  pathname: `/repo/${full_name}`,
                  state: { repoURL: full_name },
                }
              }
            >{name}
            </List.Header>
            <List.Description as="span">{full_name}</List.Description>
          </List.Content>
        </List.Item>))
    }

  </List>
);

LittleList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  cat: PropTypes.string.isRequired,
};

export default LittleList;
