import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoleTable from './RoleTable';

/**
 * @class Container
 * @extends {Component}
 */
class RoleContainer extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf RoleContainer
   */
  render() {
    const tableHeaders = [
      { alias: 'ID', sortable: true, dataAlias: 'id' },
      { alias: 'Title', sortable: false, dataAlias: 'title' },
      { alias: '', sortable: false, dataAlias: 'access' },
      { alias: '', sortable: false, dataAlias: 'delete' },
      { alias: '', sortable: false, dataAlias: 'edit' }
    ];
    return (
      <RoleTable
        tableHeaders={tableHeaders}
        data={this.props.data}
        limit={8}
        total={this.props.data.length}
      />
    );
  }
}

RoleContainer.propTypes = {
  data: PropTypes.array.isRequired
};

export default RoleContainer;
