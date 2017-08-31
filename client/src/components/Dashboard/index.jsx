import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import Footer from '../footer';
import Sidebar from '../Sidebar';
import DocumentPanel from '../Documents/DocumentPanel';
import { loadAllDocument } from '../../actions/documentActions';


/**
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  /**
   * Hook Method
   * @returns {none} updates state before component mounts
   * @memberOf Dashboard
   */
  componentWillMount() {
    this.props.loadAllDocument();
  }
  /**
   * @returns {Object} Jsx
   * @memberOf Dashboard
   */
  render() {
    return (
      <div>
        <Sidebar />
        <Nav />
        <div
          className="col s9 push-s3"
          id="none"
        >
          <div className="row">
            <DocumentPanel params={this.props.params} />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  loadAllDocument: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

export default connect(null, { loadAllDocument })(Dashboard);
