import React from 'react';
import { Input, Button } from 'react-materialize';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import toastr from 'toastr';

/**
 * @class Form
 * @extends {React.Component}
 */
class Form extends React.Component {
  /**
   * Creates an instance of Form.
   * @param {Object} props
   * @memberOf Form
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Function to handle onchange event on text input
   * @param {Object} e: browser onchange event
   * @memberOf Form
   * @returns {none} Updates state
   */
  onChange(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  }


  /**
   * Function to handle signup form onSubmit event
   * @param {Object} e: browser event
   * @memberOf Form
   * @returns {none} handles form onChange event
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state.user)
      .then(() => {
        toastr.success(`Welcome, ${this.state.user.firstName}!`);
        this.context.router.push('/');
      }).catch(() => {
        toastr.error(
          '* Email Address Already Exists!'
        );
      });
  }

  /**
   * @returns {Object} Jsx
   * @memberOf Form
   */
  render() {
    return (
      <div
        className="container login-form"
        style={{ paddingTop: '5em' }}
      >
        <form>
          <h3 style={{ textAlign: 'center' }}> SIGN UP</h3>
          <Input
            id="firstName"
            type="text"
            onChange={this.onChange}
            name="firstName"
            icon="person_outline"
            label="FirstName"
            value={this.state.user.firstName}
            s={12}
          />
          <Input
            id="lastname"
            type="text"
            onChange={this.onChange}
            name="lastName"
            icon="person"
            label="Lastname"
            value={this.state.user.lastName}
            s={12}
          />
          <Input
            id="email"
            onChange={this.onChange}
            name="email"
            type="email"
            icon="email"
            label="Email"
            value={this.state.user.email}
            s={12}
          />
          <Input
            id="password"
            type="password"
            onChange={this.onChange}
            name="password"
            value={this.state.user.password}
            icon="lock"
            label="Password"
            s={12}
          />
          <p style={{ textAlign: 'center' }}>
            <Button
              type="submit"
              value="Sign In"
              onClick={this.onSubmit}
            >REGISTER
            </Button>
          </p>
          <div className="input-field col s12" >
            <p className="margin center medium-small sign-up">
                Already have an account?
              <Link to="/login">
                  Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

Form.contextTypes = {
  router: PropTypes.object
};

Form.propTypes = {
  signup: PropTypes.func.isRequired
};
export default Form;
