import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentList from './DocumentList';

/**
 * Holds the DocumentList components
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf DocumentPanel
   */
  render() {
    const docs = this.props.documents.slice(0, 12);
    return (
      <div className="row">
        <div className="col s12">
          <p />
          <p />
          <DocumentList
            Docs={docs}
          />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  documents: PropTypes.array.isRequired
};

export default Main;
