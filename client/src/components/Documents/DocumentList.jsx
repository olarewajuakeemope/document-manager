import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentCard from './DocumentCard';
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
    return (
      <div>
        <DocumentSearch />
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
    );
  }
}

DocumentList.propTypes = {
  Docs: PropTypes.array.isRequired
};


export default DocumentList;
