import React, { Component } from "react";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

class App extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default App;