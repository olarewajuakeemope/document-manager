import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from './Main';

/**
 * Holds components involved in displaying documents
 * @class DocumentPanel
 * @extends {Component}
 */
class DocumentPanel extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf DocumentPanel
   */
  render() {
    const urlParam = this.props.params.doctype;

    const isPublic = (urlParam === undefined || urlParam === 'publicDocs');
    const isPrivate = urlParam === 'privateDocs';
    const isRole = urlParam === 'roleDocs';

    return (
      <div className="content">
        <div className="row">
          <div id="public" className="col s12">
            {isPublic ?
              <Main
                documents={this.props.publicDocuments}
              /> : ''
            }{isPrivate ?
              <Main
                documents={this.props.privateDocuments}
              /> : ''
            }{isRole ?
              <Main
                documents={this.props.roleDocuments}
              /> : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

DocumentPanel.propTypes = {
  params: PropTypes.object.isRequired,
  publicDocuments: PropTypes.array.isRequired,
  privateDocuments: PropTypes.array.isRequired,
  roleDocuments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  let roleDocuments = [];
  let privateDocuments = [];

  const stateDocuments = state.manageDocuments.documents;
  const authDetails = state.auth;
  const user = authDetails.user;
  const isLoggedIn = authDetails.isLoggedIn;

  const publicDocuments = stateDocuments.filter(
    doc => doc.access === 'public');

  if (isLoggedIn && user.roleId !== 1) {
    roleDocuments = stateDocuments.filter(
      doc => doc.access === 'role'
            && doc.ownerRoleId === user.roleId
    );

    privateDocuments = stateDocuments.filter(
      doc => doc.ownerId === user.id);
  } else if (isLoggedIn && user.roleId === 1) {
    roleDocuments = stateDocuments.filter(
      doc => doc.access === 'role');

    privateDocuments = stateDocuments.filter(
      doc => doc.access === 'private');
  }

  return {
    publicDocuments,
    user,
    isLoggedIn,
    roleDocuments,
    privateDocuments
  };
};
export default connect(mapStateToProps, null)(DocumentPanel);
