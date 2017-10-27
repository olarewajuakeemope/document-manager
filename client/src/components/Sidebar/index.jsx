import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import ListItem from 'material-ui/List/ListItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PropTypes from 'prop-types';
import MenuList from './MenuList';


/**
 * @class Sidebar
 * @extends {Component}
 */
class Sidebar extends Component {
  /**
   * Hook Method to ensure this runs before component mounts
   * @param {None} none
   * @returns {none} none
   * @memberOf Sidebar
   */
  componentWillMount() {
    this.forceUpdate();
  }
  /**
   * @returns {Object} Jsx
   * @memberOf Sidebar
   */
  render() {
    const { user } = this.props;
    const isAdmin = user.roleId === 1;
    const firstLetter = user.firstName[0].toUpperCase();
    const secondLetter = user.lastName[0].toUpperCase();
    let role = 'Regular-user';
    if (isAdmin) {
      role = 'Admin-user';
    }
    return (
      <div>
        <Link to="/editor">
          <FloatingActionButton style={{ marginRight: '20px' }}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <div>
          {isAdmin
            ? <ListItem
              disabled
              leftAvatar={<Avatar>A</Avatar>}
            />
            : <ListItem
              disabled
              leftAvatar={<Avatar>{firstLetter}{secondLetter}</Avatar>}
            />

          }
        </div>
        <Divider />
        <MenuList role={role} isAdmin={isAdmin} user={user} />
      </div>
    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Sidebar);
