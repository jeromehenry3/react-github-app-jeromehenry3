import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';


const Nav = ({ view, changeView }) => {
  const handleNavClick = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(changeView);
    // this.props.changeView(event.target.name);
  };

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="welcome"
        active={view === 'welcome'}
        onClick={handleNavClick}
      />
      <Menu.Item
        name="search"
        active={view === 'search'}
        onClick={handleNavClick}
      />
      <Menu.Item
        name="à propos"
        active={view === 'about'}
        onClick={handleNavClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
        />
      </Menu.Menu>
    </Menu>
  );
};

Nav.propTypes = {
  view: PropTypes.string.isRequired,
  changeView: PropTypes.func.isRequired,
};

export default Nav;
