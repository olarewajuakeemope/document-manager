import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';

/**
 * Class for Document cards
 * @export
 * @class DocumentCard
 * @extends {Component}
 */
export class DocumentCard extends Component {
  /**
   * Creates an instance of DocumentCard.
   * @param {Object} props
   * @memberof DocumentCard
   */
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
  }
  /**
   * Function to handle editting of documents
   * @param {Object} e - browser click event
   * @returns {None} none
   * @memberof DocumentCard
   */
  editDocument(e) {
    e.preventDefault();
    const formattedDocument = {
      title: this.props.title,
      content: this.props.content,
      access: this.props.access,
      id: this.props.id,
      ownerId: this.props.ownerId,
      date: this.props.date
    };
    this.props.actions.editDocument(formattedDocument);
    this.context.router.push('/editor');
  }
  /**
   * Function to handle deletion of documents
   * @param {Number} id - document id
   * @param {Funtion} callback
   * @returns {None} none
   * @memberof DocumentCard
   */
  deleteDocument(id, callback) {
    if (this.props.ownerId === this.props.auth.user.id
          || this.props.auth.user.roleId === 1) {
          swal({  //eslint-disable-line
        title: 'Are you sure?',
        text: 'This Document will be totally deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#26a69a',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: true
      },
      () => {
        callback(id);
      });
    } else {
      swal({ //eslint-disable-line
        title: 'Sorry!',
        text: `You dont have the access rights
               required to delete ${this.props.title}`,
        type: 'warning',
        showConfirmButton: true
      });
    }
  }
  /**
   * Render function to render the Component
   * @returns {Object} jsx Object
   * @memberof DocumentCard
   */
  render() {
    return (
      <div className="col s3">
        <div className="row">
          <Card>
            <CardHeader
              title={this.props.title}
              subtitle={this.props.access}
              style={{ backgroundColor: '#EEEEEE' }}
            />
            <CardText>
              <p>{this.props.content.replace(/<p*[^>]*>/g, '').slice(0, 30)}...</p>
            </CardText>
            <CardActions>
              <IconButton
                iconClassName="material-icons"
                tooltip="Edit"
                iconStyle={{ color: '#CCCCCC' }}
                onClick={this.editDocument}
              >
      edit
              </IconButton>
              <IconButton
                iconClassName="material-icons"
                tooltip="Delete"
                iconStyle={{ color: '#CCCCCC' }}
                onClick={
                  () => {
                    this.deleteDocument(
                      this.props.id,
                      this.props.actions.deleteDocumentById
                    );
                  }
                }
              >
      delete
              </IconButton>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}


DocumentCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
DocumentCard.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentCard);
