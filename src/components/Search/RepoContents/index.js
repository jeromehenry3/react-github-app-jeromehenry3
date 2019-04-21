import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Table, Icon, Button, Label,
} from 'semantic-ui-react';

import RepoCard from 'src/components/RepoCard';
import './styles.scss';
// importé depuis https://github.com/ozh/github-colors/blob/master/LICENSE
import Colors from './colors.json';


class RepoContents extends Component {
  componentDidMount() {
    window.scrollTo(0, 0); // resets scroll position when mounting
  }

  totalBytes = () => {
    const { languages } = this.props.repoData;
    return Object.values(languages).reduce((a, b) => a + b);
  }

  languageRate = (lang) => {
    const { languages } = this.props.repoData;
    const rate = Math.round(languages[lang] * 100 / this.totalBytes());
    return rate >= 1 ? rate : '< 1';
  }

  goBack = () => {
    console.log(window.history);
    window.history.back();
  }

  handleStar = () => {
    const { starRepo, unStarRepo, repoData } = this.props;
    const url = repoData.data.full_name;
    // eslint-disable-next-line no-unused-expressions
    repoData.starred
      ? unStarRepo(url)
      : starRepo(url);
  };

  render() {
    const { repoData } = this.props;
    console.log(repoData, this.totalBytes());

    return (
      <Fragment>
        <RepoCard {...repoData.data} />
        <Button onClick={this.goBack}>Retour</Button>
        <Button onClick={this.handleStar}>
          {repoData.starred ? 'Retirer des favoris ' : 'Ajouter aux favoris '}
          <Icon name={repoData.starred ? 'star' : 'star outline'} />
        </Button>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><span>Git Repository </span>
                {
                  repoData.languages !== {} && Object.keys(repoData.languages).map(language => (
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
              repoData.filesList !== [] && repoData.filesList.map(({ type, name, sha }) => (
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
  repoData: PropTypes.object.isRequired,
  starRepo: PropTypes.func.isRequired,
  unStarRepo: PropTypes.func.isRequired,
};

export default RepoContents;
