import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import LogoutModal from 'src/containers/LogoutModal';

import './styles.scss';

const Nav = ({ isUserConnected, toggleLogoutModal }) => (
  <Menu pointing secondary>
    <Menu.Item name="welcome" as={NavLink} exact to="/">Bienvenue</Menu.Item>
    {isUserConnected && <Menu.Item name="search" as={NavLink} to="/search">Rechercher</Menu.Item>}
    <Menu.Item name="about" as={NavLink} to="/about">A propos</Menu.Item>

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
