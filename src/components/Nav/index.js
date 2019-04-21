import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import LogoutModal from 'src/containers/LogoutModal';

import './styles.scss';

const Nav = ({ isUserConnected, toggleLogoutModal, results }) => (
  <Menu pointing secondary>
    <Menu.Item name="welcome" as={Link} to="/">Bienvenue</Menu.Item>
    {isUserConnected && <Menu.Item name="search" as={Link} to="/search">Rechercher</Menu.Item>}
    <Menu.Item name="about" as={Link} to="/about">A propos</Menu.Item>

    <Menu.Menu position="right">
      {isUserConnected && (
        <Menu.Item
          name="Déconnexion"
          onClick={toggleLogoutModal}
        />
      )}
    </Menu.Menu>
    <LogoutModal />
  </Menu>
);

Nav.propTypes = {
  isUserConnected: PropTypes.bool.isRequired,
  toggleLogoutModal: PropTypes.func.isRequired,
};

export default Nav;
