import React from 'react';
import { Container } from 'semantic-ui-react';

const About = () => (
  <div id="about">
    <Container>
      <h1>Application de recherche de repos sur Github.</h1>
      <p>
      Cette application vous permet de rechercher des repositories sur Github
      , en faisant appel à son API.
      </p>
      <p>Vous pouvez aussi y voir vos derniers repos, et gérer vos favoris.</p>
      <p>Application codée avec amour par Jérôme, avec l'aide de React et de semantic ui.</p>
    </Container>
  </div>
);

export default About;
