import React, { Component } from 'react';
import { Link } from 'react-router';

class Signin extends Component {
  constructor(props) {
    super(props);
  }

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
