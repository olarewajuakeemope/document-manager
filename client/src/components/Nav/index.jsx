import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
import { logout } from '../../actions/userActions';


/**
 * Class Nav represents Nav-header component
 * @export
 * @class Nav
 * @extends {Component}
 */
export class Nav extends Component {
  /**
   * Creates an instance of Nav.
   * @param {Object} props
   * @memberof Nav
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

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
    let firstName = '';
    if (isLoggedIn) {
      firstName = this.props.auth.user.firstName;
    }
    return (
      <header>
        <nav>
          <div
            className="nav-wrapper"
            id="left-pad"
          >
            <Link
              className="brand-logo"
              to="/"
            >
             acedms
            </Link>
            <ul
              id="nav-mobile"
              className="right hide-on-med-and-down"
            >
              {isLoggedIn ?
                <li>
                  <Link
                    id="firstName"
                    to="/profile"
                    data-tooltip="Manage Profile"
                  >
                    <i
                      className="fa fa-users"
                      aria-hidden="true"
                    />
                    {firstName.toUpperCase()}
                  </Link>
                </li>
                : ''
              }
              {!isLoggedIn ?
                <li><Link id="signup-nav" to="/signup" >SIGNUP</Link></li>
                : ''
              }
              {!isLoggedIn ?
                <li><Link to="/login">LOGIN</Link></li>
                : <li id="logout">
                  <button onClick={this.logout}>
                    <Link>
                      <i className="fa fa-sign-out" aria-hidden="true" /> LOGOUT
                    </Link>
                  </button>
                </li>
              }
            </ul>
          </div>
        </nav>
      </header>
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

