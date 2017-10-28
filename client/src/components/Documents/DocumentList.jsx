import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DocumentCard from './DocumentCard'; // eslint-disable-line
import DocumentSearch from '../search/DocumentSearch';
/**
 * @class DocumentList
 * @extends {Component}
 */
class DocumentList extends Component {
  /**
   * Render function
   * @returns {Object} Jsx
   * @memberOf DocumentList
   */
  render() {
    if (this.props.Docs.length === 0) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>You Currently Do Not Have Private Documents</h1>
          <p>
            <Link to="/editor">Create Document</Link>
          </p>
        </div>
      )
    }
    return (
      <div>
        <div>
          <DocumentSearch />
          <span style={{ position: 'absolute', top: '12%', left: '80%' }}>
            <Link to="/editor">
              <FloatingActionButton style={{ marginRight: '20px' }}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>
          </span>
        </div>
        <div>
          {this
            .props
            .Docs
            .map((doc, index) => (

              <DocumentCard
                title={doc.title}
                  key={doc.title + index} // eslint-disable-line
                id={doc.id}
                content={doc.content}
                ownerId={doc.ownerId}
                access={doc.access}
                date={doc.createdAt}
              />

            ))
          }
        </div>
      </div>
    );
  }
}

DocumentList.propTypes = {
  Docs: PropTypes.array.isRequired
};


export default DocumentList;
