import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

const UserCard = ({
  public_repos: publicRepos, total_private_repos: privateRepos,
  avatar_url: avatarURL, name, company, bio,
}) => {
  const pub = publicRepos >= 2 ? 's' : '';
  const pri = privateRepos >= 2 ? 's' : '';
  const extra = (
    <>
      <Icon name="world" />
      <span>{publicRepos} repo{pub} public{pub} </span>
      <Icon name="privacy" />
      <span>{privateRepos} repo{pri} privé{pri}</span>
    </>
  );
  return (
    <Card
      image={avatarURL}
      header={name}
      meta={company}
      description={bio}
      extra={extra}
    />
  );
};

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string,
  bio: PropTypes.string.isRequired,
  public_repos: PropTypes.number.isRequired,
  total_private_repos: PropTypes.number.isRequired,
  avatar_url: PropTypes.string.isRequired,
};

UserCard.defaultProps = {
  company: 'non renseigné',
};

export default UserCard;
