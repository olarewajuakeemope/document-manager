import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { initUsers } from '../../../actions/userActions';
import Nav from '../../Nav'; //eslint-disable-line
import UserContainer from './UserContainer';


/**
 * Class to handle UserManagement component
 * @class UserManagement
 * @extends {Component}
 */
class UserManagement extends Component {
  /**
   * Creates an instance of UserManagement.
   * @param {Object} props
   * @memberof UserManagement
   */
  constructor(props) { //eslint-disable-line
    super(props);
  }

  /**
   * Hook Method
   * @returns {none} none
   * @memberOf UserManagement
   */
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.initUsers().catch(() => {
        browserHistory.push('/');
      });
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
  }

  /**
   * @returns {Object} Jsx
   * @memberOf UseManagement
   */
  render() {
    return (
      <div>
        <Nav />
        <UserContainer data={this.props.users} />
      </div>
    );
  }
}
UserManagement.propTypes = {
  user: PropTypes.object.isRequired,
  initUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  users: state.manageUsers.allUsers
});

export default connect(mapStateToProps,
  { initUsers })(UserManagement);
