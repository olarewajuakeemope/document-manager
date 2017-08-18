import React from 'react';
import { Row, Col } from 'react-materialize';
import Form from './Form';
import Nav from '../../Nav'; // eslint-disable-line
import Footer from '../../footer';


/**
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
  /**
   * @returns {Object} Jsx
   * @memberOf Signup
   */
  render() {
    return (
      <div>
        <Nav />
        <div
          className="col s12"
          id="none"
        >
          <div>
            <Row>
              <Col
                m={3}
              />
              <Col
                m={6}
              >
                <Form />
              </Col>
              <Col
                m={3}
              />
            </Row>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Signup;
