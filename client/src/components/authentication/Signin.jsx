import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * Replace with appropriate info on completion
 * @class Signin
 * @extends {React.Component}
 */
class Signin extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf Signin
   */
  render() {
    return (
      <div>
        <h1>Inside Signin Component</h1>
        <p><Link to="/signup" >SIGNUP</Link></p>
      </div>
    );
  }
}

export default Signin;
