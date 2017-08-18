import React from 'react';
import { Row } from 'react-materialize';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();


class App extends React.Component {
  constructor(props) {
    super(props);
  }
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

export default App;
