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
                auth={this.props.auth}
              /> : ''
            }{isPrivate ?
              <Main
                documents={this.props.privateDocuments}
                auth={this.props.auth}
              /> : ''
            }{isRole ?
              <Main
                documents={this.props.roleDocuments}
                auth={this.props.auth}
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const currentState = state.manageDocuments;
  let roleDocuments = [];
  let privateDocuments = [];
  const publicDocuments = currentState.documents.filter(
    doc => doc.access === 'public');
  if (state.auth.isLoggedIn && state.auth.user.roleId !== 1) {
    roleDocuments = currentState.documents.filter(
        doc => doc.access === 'role'
                && doc.ownerRoleId === state.auth.user.roleId
      );
    privateDocuments = currentState.documents.filter(
          doc => doc.ownerId === state.auth.user.id);
  } else if (state.auth.isLoggedIn && state.auth.user.roleId === 1) {
    roleDocuments = currentState.documents.filter(
        doc => doc.access === 'role');
    privateDocuments = currentState.documents.filter(
          doc => doc.access === 'private');
  }
  return {
    publicDocuments,
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    roleDocuments,
    privateDocuments,
    auth: state.auth,
    documentDetails: currentState.documentDetails
  };
};
export default connect(mapStateToProps, null)(DocumentPanel);
