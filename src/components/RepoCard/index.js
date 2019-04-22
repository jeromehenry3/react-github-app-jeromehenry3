import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Image, Popup, Icon,
} from 'semantic-ui-react';

import './styles.scss';

const RepoCard = ({
  id, owner, name, description, full_name: fullName, onClick,
}) => (
  <Card key={id} onClick={onClick}>
    <Image src={owner.avatar_url} />
    <Card.Content>
      <Card.Header>{name}
        <Popup
          trigger={(
            <a href={`https://github.com/${fullName}`} target="_blank" rel="noopener noreferrer">
              <Icon name="external" />
            </a>
          )}
          position="top center"
          content="ouvrir dans Github"
        />
      </Card.Header>
      <Card.Meta>
        <span>{owner.login}</span>
      </Card.Meta>
      <Card.Description>{description}</Card.Description>
    </Card.Content>
  </Card>
);

RepoCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  full_name: PropTypes.string.isRequired,
};
RepoCard.defaultProps = {
  onClick: null,
};

export default RepoCard;
