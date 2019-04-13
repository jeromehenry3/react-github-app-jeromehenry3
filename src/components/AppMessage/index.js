import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';

import './styles.scss';

const AppMessage = ({ message, negative }) => (
  <Message icon negative={negative}>
    {(message === 'recherche en cours...') && <Icon name="circle notched" loading />}
    <Message.Content>
      <Message.Header>{message}</Message.Header>
    </Message.Content>
  </Message>
);

AppMessage.propTypes = {
  message: PropTypes.string.isRequired,
  negative: PropTypes.bool.isRequired,
};

export default AppMessage;
