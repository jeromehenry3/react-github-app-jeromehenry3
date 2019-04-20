import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

const UserCard = ({
  public_repos, total_private_repos, avatar_url, name, company, bio
}) => {
  const pub = public_repos >= 2 ? 's' : '';
  const pri = total_private_repos >= 2 ? 's' : '';
  const extra = (
    <>
      <Icon name="world" />
      <span>{public_repos} repo{pub} public{pub} </span>
      <Icon name="privacy" />
      <span>{total_private_repos} repo{pri} privé{pri}</span>
    </>
  );
  return (
    <Card
      image={avatar_url}
      header={name}
      meta={company}
      description={bio}
      extra={extra}
    />
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  public_repos: PropTypes.number.isRequired,
  total_private_repos: PropTypes.number.isRequired,
  avatar_url: PropTypes.string.isRequired,
}

export default UserCard;
