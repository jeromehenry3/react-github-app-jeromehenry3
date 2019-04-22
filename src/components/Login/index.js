import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Button, Checkbox, Form, Message, Input,
} from 'semantic-ui-react';


import './styles.scss';

const Login = ({
  loginInput, stayConnected, loginMessage, changeInput,
  onSubmitForm, toggleStayConnectedCheckbox, status,
}) => {
  const handleChangeInput = event => changeInput(event.target.value);
  const handleSubmit = () => (loginInput !== '') && onSubmitForm();
  const connecting = status === 'connecting';
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
          <Input type="password" placeholder="Token Github" loading={connecting} disabled={connecting} onChange={handleChangeInput} value={loginInput} />
        </Form.Field>
        <Form.Field>
          <Checkbox label="Rester connecté" onChange={toggleStayConnectedCheckbox} disabled={connecting} checked={stayConnected} />
        </Form.Field>
        <Button type="submit" loading={connecting} disabled={connecting}>Envoyer</Button>
        {loginMessage && <Message>{loginMessage}</Message>}
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
  loginMessage: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Login;
