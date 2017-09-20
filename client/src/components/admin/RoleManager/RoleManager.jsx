import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Modal, Button } from 'react-materialize';
import { loadRoles, saveRole } from '../../../actions/roleActions';
import Nav from '../../Nav';
import RoleContainer from './RoleContainer';


/**
 * @class RoleManager
 * @extends {Component}
 */
class RoleManager extends Component {
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
   * Hook Method
   * @returns {none} none
   * @memberOf RoleManager
   */
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.loadRoles();
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
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
  }
  /**
   * @returns {Object} Jsx
   * @memberOf RoleManager
   */
  render() {
    return (
      <div>
        <Nav />
        <RoleContainer data={this.props.roles} />
        <Modal
          actions={
            [
              <Button
                style={{ marginLeft: '2em' }}
                className="btn-save"
                waves="light"
                modal="close"
                flat
              >Close
              </Button>,
              <Button
                id="save-role"
                waves="light"
                flat
                className="btn-save"
                onClick={this.createRole}
              >Save
              </Button>
            ]
          }
          trigger={
            <a
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i
                className="material-icons"
                data-tool-tip="add new role"
              >add</i>
            </a>
          }
        >
          <Row>
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
          </Row>
        </Modal>
      </div>
    );
  }
}
RoleManager.propTypes = {
  user: PropTypes.object.isRequired,
  loadRoles: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  saveRole: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  roles: state.manageRoles.roles,
  user: state.auth.user
});

export default connect(mapStateToProps,
  { loadRoles, saveRole })(RoleManager);
