import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';
import Nav from '../Nav';

/**
 * Class to handle Editor component
 * @export
 * @class Editor
 * @extends {Component}
 */
class Editor extends Component {
  /**
   * Creates an instance of Editor.
   * @param {Object} props
   * @memberof Editor
   */
  constructor(props) {
    super(props);

    const { title } = this.props.document;
    const { access } = this.props.document;
    const { content } = this.props.document;
    const { editMode } = this.props;
    const { id } = this.props.document;

    this.state = editMode ?
      {
        access,
        content,
        id,
        title
      } :
      {
        content: '',
        access: '0',
        title: ''
      };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Funtion to handle closing the editor
   * @param {Object} e - browser click event
   * @returns {None} none
   * @memberof Editor
   */
  handleClose(e) { // eslint-disable-line
    e.preventDefault();
    browserHistory.push('/');
  }

  /**
   * Funtion to handle content change on the editor
   * @param {Object} e - browser keyboard input event
   * @returns {None} none
   * @memberof Editor
   */
  handleEditorChange(e) {
    this.setState(
      {
        content: e.target.getContent()
      }
    );
  }

  /**
   * Funtion to handle text change on input editors around the editor
   * @param {Object} e - browser keyboard input event
   * @returns {None} none
   * @memberof Editor
   */
  handleTextChange(e) {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({ [field]: value });
  }

  /**
   * Funtion to handle change on Select button
   * @param {Object} event - browser keyboard input event
   * @returns {None} none
   * @memberof Editor
   */
  handleSelect(event) {
    this.setState({ access: event.target.value });
  }

  /**
   * Funtion to handle submission of created documents
   * @param {Object} e - browser click event
   * @returns {None} none
   * @memberof Editor
   */
  handleSubmit(e) { // eslint-disable-line
    e.preventDefault();

    const { editMode } = this.props;
    if (editMode) {
      return this.handleUpdate(e);
    }

    const { title, content, access } = this.state;
    const data = {
      title,
      content,
      access,
    };
    this.props.actions.saveDocument(data)
      .then(() => toastr.success('Document saved succesfully'))
      .catch(() => toastr.error('Something Went Wrong', 'Please login Again'));
  }

  /**
   * Funtion to handle Updating created documents
   * @param {Object} e - browser click event
   * @returns {None} none
   * @memberof Editor
   */
  handleUpdate(e) {
    e.preventDefault();

    const { document } = this.props;
    const { user } = this.props;

    if (document.ownerId === user.id || user.roleId === 1) {
      const { title, content, id, access } = this.state;
      const data = {
        title,
        content,
        access,
        id
      };
      this.props.actions.updateDocument(data)
        .then(() => {
          toastr.success('Document updated succesfully');
        }).catch(() => toastr.error('Document could not be updated!'));
    } else {
      toastr.error(
        `You currently do not have edit access ${document.title}`
      );
    }
  }
  /**
   * Render funtion to render the Component
   * @returns {Object} jsx Object
   * @memberof Editor
   */
  render() {
    return (
      <div>
        <Nav />
        <Row>
          <Input
            id="doc-title"
            s={4}
            name="title"
            label="Document Title"
            validate
            icon="subtitles"
            value={this.state.title}
            onChange={this.handleTextChange}
          />
          <Input
            s={4}
            type="select"
            id="access"
            value={this.state.access}
            onChange={this.handleSelect}
          >
            <option
              value="0"
              disabled
            >
                  Select Access
            </option>
            <option value="private">
                  Private
            </option>
            <option value="public">
                  Public
            </option>
            <option value="role">
                  Role
            </option>
          </Input>
        </Row>
        <TinyMCE
          id="tiny"
          content={this.state.content}
          onChange={this.handleEditorChange}
          placeholder="feel free to place new content here"
          config={{
            plugins: 'link image code',
            toolbar: `undo redo
                       | bold italic |
                        alignleft aligncenter alignright | code`
          }}
        />
        <Button
          id="cancel"
          className="btn-cancel"
          waves="light"
          modal="close"
          flat
          onClick={this.handleClose}
        >
            Close
        </Button>
        <Button
          id="save"
          waves="light"
          flat
          className="btn-save"
          onClick={this.handleSubmit}
        >
            Save
        </Button>

      </div>
    );
  }
}

Editor.contextTypes = {
  router: PropTypes.object
};

Editor.propTypes = {
  actions: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { document } = state.manageDocuments;
  const { editMode } = state.manageDocuments;
  const { user } = state.auth;

  return {
    document,
    editMode,
    user
  };
};


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(documentActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Editor);
