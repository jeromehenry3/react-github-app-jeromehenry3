import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Button, Checkbox, Form,
} from 'semantic-ui-react';

import './styles.scss';

const Login = ({
  loginInput, stayConnected, changeInput, onSubmitForm, toggleStayConnectedCheckbox,
}) => {
  const handleChangeInput = event => changeInput(event.target.value);

  const handleSubmit = () => (loginInput !== '') && onSubmitForm();

  return (
    <Container>
      <h1>Bienvenue sur l'appli de recherche sur Github !</h1>
      <p>Pour vous connecter au service, veuillez entrer votre token personnel Github.</p>
      <p>C'est un code, unique et personnel, 
      qui permet de se logger sans avoir à saisir mail ou mdp.
      </p>
      <p>Pour créer le votre: <a href="https://github.com/settings/tokens">https://github.com/settings/tokens</a></p>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Token personnel Github</label>
          <input placeholder="Token Github" onChange={handleChangeInput} value={loginInput} />
        </Form.Field>
        <Form.Field>
          <Checkbox label="Rester connecté" onChange={toggleStayConnectedCheckbox} checked={stayConnected} />
        </Form.Field>
        <Button type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
};

Login.propTypes = {
  loginInput: PropTypes.string.isRequired,
  stayConnected: PropTypes.bool.isRequired,
  changeInput: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  toggleStayConnectedCheckbox: PropTypes.func.isRequired,
};

export default Login;
