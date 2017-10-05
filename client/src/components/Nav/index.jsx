import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Book from 'material-ui/svg-icons/action/book';
import Sidebar from '../Sidebar';
import { logout } from '../../actions/userActions';


/**
 * Class Nav represents Nav-header component
 * @export
 * @class Nav
 * @extends {Component}
 */
class Nav extends Component {
  /**
   * Creates an instance of Nav.
   * @param {Object} props
   * @memberof Nav
   */
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.logout = this.logout.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  /**
   * Function to handle user logouts
   * @param {Object} e (events) - click events
   * @returns {None} none
   * @memberof Nav
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
    browserHistory.push('/login');
  }
  /**
   * render function for Nav component
   * @returns {Object} Jsx Object
   * @memberof Nav
   */
  render() {
    const { isLoggedIn } = this.props.auth;
    let showSidebar = '';
    const styles = {
      title: {
        textDecoration: 'none',
        color: 'white'
      },
    };
    let firstName = '';
    let userInitials = '';
    let signUpComponent = (
      <FlatButton>
        <Link
          style={styles.title}
          id="signup-nav"
          to="/signup"
        >
          SIGNUP
        </Link>
      </FlatButton>
    );
    let loginLogoutComponent = (
      <FlatButton>
        <Link
          style={styles.title}
          to="/login"
        >
            LOGIN
        </Link>
      </FlatButton>
    );
    if (isLoggedIn) {
      showSidebar = <Sidebar />;
      firstName = this.props.auth.user.firstName;

      userInitials = (
        <FlatButton>
          <Link
            style={styles.title}
            id="firstName"
            to="/profile"
          >
            {firstName.toUpperCase()}
          </Link>
        </FlatButton>
      );
      signUpComponent = '';
      loginLogoutComponent = (
        <FlatButton
          onClick={this.logout}
          style={styles.title}
        >
          LOGOUT
        </FlatButton>);
    }

    return (
      <div>
        <AppBar
          showMenuIconButton={isLoggedIn}
          title={
            <Link
              className="brand-logo"
              style={styles.title}
              to="/"
            >
              acedms
            </Link>
          }
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <div>
              <FlatButton
                style={styles.title}
                href="/api-docs"
                icon={<Book />}
              >
                API Docs
              </FlatButton>
              {userInitials}
              {signUpComponent}
              {loginLogoutComponent}
            </div>
          }
        />
        <Drawer
          docked={false}
          width={'20%'}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          {showSidebar}
        </Drawer>
      </div>
    );
  }
}
Nav.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);

