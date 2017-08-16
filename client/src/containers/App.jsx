import React, { Component } from "react";
import { Link } from 'react-router';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

class App extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <p><Link to="/login">Login</Link></p>
                <p><Link to="/signup">Signup</Link></p>
                <p><Link to="/editor">editor</Link></p>
                <p><Link to="/documents">documents</Link></p>
                <p><Link to="/users">users</Link></p>
                <p><Link to="/roles">roles</Link></p>
                <p><Link to="/profile">profile</Link></p>
                <p><Link to="/xxxxx">error</Link></p>
                {this.props.children}
            </div>
        );
    }
}

export default App;