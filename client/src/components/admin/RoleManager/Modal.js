import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SimpleModal } from 'react-mf-modal/themes/materialize';
import PropTypes from 'prop-types';
import { saveRole } from '../../../actions/roleActions';

/**
 * @class Modal
 * @extends {Component}
 */
class Modal extends Component {
  /**
   * Creates an instance of RoleManager.
   * @param {Object} props
   * @memberof RoleManager
   */
  constructor(props) {
    super(props);
    this.state = {
      role: { title: '' }
    };
    this.onChange = this.onChange.bind(this);
    this.createRole = this.createRole.bind(this);
  }
  /**
   * Function to handle onchange event on text input
   * @param {Object} e: browser onchange event
   * @memberOf RoleManager
   * @returns {none} Updates state
   */
  onChange(e) {
    const title = e.target.name;
    const role = this.state.role;
    role[title] = e.target.value;
    this.setState({ role });
  }
  /**
   * Function to handle creation of new roles
   * @param {Object} e: browser event
   * @memberOf RoleManager
   * @returns {none} handles form onChange event
   */
  createRole(e) {
    e.preventDefault();
    const currentRoles = this.props.roles.map(role => role.title);
    const newRole = this.state.role.title;
    if (currentRoles.includes(newRole)) {
      swal({  //eslint-disable-line
        title: 'Invalid Operation',
        text: 'This Role already exist',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Undo',
        closeOnConfirm: true
      });
    } else if (newRole === undefined) {
        swal({  //eslint-disable-line
        title: 'Invalid Operation',
        text: 'Please Enter a role title',
        type: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Undo',
        closeOnConfirm: true
      });
    } else {
      this.props.saveRole(this.state.role)
        .then(() => {
          swal( //eslint-disable-line
            'Nice',
            'Role saved succefully',
            'success'
          );
        })
        .catch(() => {
          swal({  //eslint-disable-line
            title: 'Invalid Operation',
            text: 'Please Enter a valid role title',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Undo',
            closeOnConfirm: true
          });
        });
    }
    this.props.resolve('Ok');
  }

  /**
   * @returns {Object} Jsx
   * @memberOf Modal
   */
  render() {
    return (
      <SimpleModal
        title="Add Role"
        onSubmitClick={this.createRole}
        resolve={this.props.resolve}
        dismiss={this.props.dismiss}
      >
        <div className="col s8 push-s2">
          <div>
            <label htmlFor="newRole">New Role Title</label>
            <input
              id="role"
              type="text"
              icon="person_otline"
              placeholder="Add a role title here"
              onChange={this.onChange}
              name="title"
              value={this.state.role.title}
            />
          </div>
        </div>
      </SimpleModal>);
  }
}

Modal.propTypes = {
  dismiss: PropTypes.func.isRequired,
  resolve: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  saveRole: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  roles: state.manageRoles.roles
});

export default connect(mapStateToProps,
  { saveRole })(Modal);
