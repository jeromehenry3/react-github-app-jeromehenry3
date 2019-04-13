import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

import './styles.scss';

const Nav = ({ view, changeView }) => {
  const handleNavClick = ViewToChangeTo => () => {
    console.log(ViewToChangeTo);
    changeView(ViewToChangeTo);
    // this.props.changeView(event.target.name);
  };

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="welcome"
        active={view === 'welcome'}
        onClick={handleNavClick('welcome')}
      />
      <Menu.Item
        name="search"
        active={view === 'search'}
        onClick={handleNavClick('search')}
      />
      <Menu.Item
        name="à propos"
        active={view === 'about'}
        onClick={handleNavClick('about')}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          // onClick={console.error('onClick logout à gérer')}
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
