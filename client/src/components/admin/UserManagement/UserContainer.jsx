import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserTable from './UserTable';
/**
 * Replace with appropriate info on completion
 * @class UserContainer
 * @extends {Component}
 */
class UserContainer extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf UseManagement
   */
  render() {
    const tableHeaders = [
      { alias: 'ID', sortable: true, dataAlias: 'id' },
      { alias: 'Email', sortable: true, dataAlias: 'email' },
      { alias: 'First Name', sortable: true, dataAlias: 'firstName' },
      { alias: 'Last Name', sortable: true, dataAlias: 'lastName' },
      { alias: 'Action', sortable: false, dataAlias: 'action' }
    ];
    return (
      <UserTable
        tableHeaders={tableHeaders}
        data={this.props.data}
        limit={8}
        total={this.props.data.length}
      />
    );
  }
}


UserContainer.propTypes = {
  data: PropTypes.array.isRequired
};

export default UserContainer;

