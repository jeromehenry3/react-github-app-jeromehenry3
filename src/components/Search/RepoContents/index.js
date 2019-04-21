import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Table, Icon, Button, Label,
} from 'semantic-ui-react';

import './styles.scss';
// importé depuis https://github.com/ozh/github-colors/blob/master/LICENSE
import Colors from './colors.json';

class RepoContents extends Component {
  componentDidMount() {
    window.scrollTo(0, 0); // resets scroll position when mounting
  }

  totalBytes = () => {
    const { languages } = this.props.data;
    return Object.values(languages).reduce((a, b) => a + b);
  }

  languageRate = (lang) => {
    const { languages } = this.props.data;
    const rate = Math.round(languages[lang] * 100 / this.totalBytes());
    return rate >= 1 ? rate : '< 1';
  }

  goBack = () => {
    console.log(window.history);
    window.history.back();
  }

  handleStar = () => {
    const { starRepo, data } = this.props;
    console.log(data);
  };

  render() {
    const { data } = this.props;
    console.log(data, this.totalBytes());

    return (
      <Fragment>
        <Button onClick={this.goBack}>Retour</Button>
        <Icon name={data.starred ? 'star' : 'star outline'} onClick={this.handleStar} />
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><span>Git Repository </span>
                {
                  data.languages !== {} && Object.keys(data.languages).map(language => (
                    <Label
                      key={language}
                      style={{ borderBottom: `2px solid ${Colors[language].color}` }}
                    >{language} {this.languageRate(language)} %
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
  }
}

RepoContents.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RepoContents;
