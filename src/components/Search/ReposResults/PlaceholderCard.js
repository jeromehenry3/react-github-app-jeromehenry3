import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const PlaceholderCard = () => (
  <Card key="Loading-card">
    <Placeholder>
      <Placeholder.Image square />
    </Placeholder>
    <Card.Content>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line length="short" />
          <Placeholder.Line length="medium" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length="short" />
        </Placeholder.Paragraph>
      </Placeholder>
    </Card.Content>
  </Card>
)

export default PlaceholderCard;
