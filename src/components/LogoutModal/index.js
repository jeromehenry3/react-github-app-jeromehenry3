import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Header, Icon, Modal,
} from 'semantic-ui-react';

const LogoutModal = ({
  displayLogoutModal, logout, toggleLogoutModal, confirmLogoutToUser,
}) => {
  const handleLogout = () => {
    toggleLogoutModal();
    logout();
    confirmLogoutToUser();
  };
  return (
    <Modal
      open={displayLogoutModal}
      basic
      size="small"
    >
      <Header icon="log out" content="Vous nous quittez déjà ?" />
      <Modal.Actions>
        <Button basic color="red" onClick={handleLogout}>
          <Icon name="remove" /> Se déconnecter
        </Button>
        <Button color="green" onClick={toggleLogoutModal}>
          <Icon name="checkmark" /> Rester connecté(e)
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
LogoutModal.propTypes = {
  logout: PropTypes.func.isRequired,
  toggleLogoutModal: PropTypes.func.isRequired,
  displayLogoutModal: PropTypes.bool.isRequired,
  confirmLogoutToUser: PropTypes.func.isRequired,
};

export default LogoutModal;
