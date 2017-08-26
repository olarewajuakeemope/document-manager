import React, { Component } from 'react';
import Nav from '../Nav'; //eslint-disable-line
import Footer from '../footer';
import Sidebar from '../Sidebar';
import DocumentPanel from '../Documents/DocumentPanel';


/**
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
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
            <DocumentPanel />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
