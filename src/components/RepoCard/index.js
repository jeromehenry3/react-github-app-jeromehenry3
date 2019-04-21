import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

const RepoCard = ({ id, owner, name, description, onClick }) => (
  <Card key={id} onClick={onClick}>
    <Image src={owner.avatar_url} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
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
};



export default RepoCard;
