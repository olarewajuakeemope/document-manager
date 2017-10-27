import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loadAllDocument } from '../../../actions/documentActions';
import Nav from '../../Nav'; //eslint-disable-line
import MainContainer from './MainContainer';


/**
 * @class DocumentManager
 * @extends {Component}
 */
class DocumentManager extends Component {
  /**
   * Hook Method
   * @returns {none} none
   * @memberOf DocumentManager
   */
  componentWillMount() {
    if (this.props.user.roleId === 1) {
      this.props.loadAllDocument().catch(() => {
        browserHistory.push('/');
      });
    } else {
      localStorage.removeItem('jwtToken');
      browserHistory.push('/login');
    }
  }
  /**
   * @returns {Object} Jsx
   * @memberOf DocumentManager
   */
  render() {
    return (
      <div>
        <Nav />
        <MainContainer />
      </div>
    );
  }
}
DocumentManager.propTypes = {
  user: PropTypes.object.isRequired,
  loadAllDocument: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps,
  { loadAllDocument })(DocumentManager);
