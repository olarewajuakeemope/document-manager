import React from 'react';
import { Row } from 'react-materialize';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PropTypes from 'prop-types';

injectTapEventPlugin();

/**
 * Replace with appropriate info on completion
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * @returns {Object} Jsx
   * @memberOf App
   */
  render() {
    return (
      <div>
        <Row>
          <div className="content">
            {this.props.children}
          </div>
        </Row>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
