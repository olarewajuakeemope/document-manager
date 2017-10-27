import React, { Component } from 'react';
import DocumentTable from './DocumentTable'; //eslint-disable-line

/**
 * @class Container
 * @extends {Component}
 */
class MainContainer extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf Container
   */
  render() {
    const tableHeaders = [
      { alias: 'ID', sortable: true, dataAlias: 'id' },
      { alias: 'Title', sortable: true, dataAlias: 'title' },
      { alias: 'Access', sortable: true, dataAlias: 'access' },
      { alias: 'Role', sortable: false, dataAlias: 'ownerRoleId' },
      { alias: '', sortable: false, dataAlias: 'ownerId' },
      { alias: '', sortable: false, dataAlias: 'ownerId' }
    ];
    return (
      <DocumentTable
        tableHeaders={tableHeaders}
        limit={8}
      />
    );
  }
}

export default MainContainer;
