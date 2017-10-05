import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

injectTapEventPlugin();

/**
 * Replace with appropriate info on completion
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @returns {Object} Jsx
   * @memberOf App
   */
  render() {
    return (
      <div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(App);
