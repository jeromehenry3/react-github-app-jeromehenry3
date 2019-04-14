import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Icon, Button, Label,
} from 'semantic-ui-react';

// importé depuis https://github.com/ozh/github-colors/blob/master/LICENSE
import Colors from './colors.json';

const RepoContents = ({ data, changeView }) => {
  const toggleView = () => {
    changeView('search');
  };

  return (
    <Fragment>
      <Button onClick={toggleView}>Retour</Button>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><span>Git Repository </span>
              {
                Object.keys(data.languages).map(language => (
                  <Label
                    key={language}
                    style={{ borderBottom: `2px solid ${Colors[language].color}` }}
                  >{language}
                  </Label>
                ))
              }
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {
            data.filesList.map(({ type, name, sha }) => (
              <Table.Row key={sha}>
                <Table.Cell collapsing>
                  <Icon name={type === 'file' ? 'file outline' : 'folder'} />
                  {name}
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </Fragment>
  );
};

RepoContents.propTypes = {
  data: PropTypes.object.isRequired,
  changeView: PropTypes.func.isRequired,
}

export default RepoContents;
