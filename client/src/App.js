import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            endpoint: 'http://127.0.0.1:3001'
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('data', data => this.setState({ data }));
        socket.on('disconnect', () => this.setState({ data: {} }));
    }

	render() {
        const { random } = this.state.data;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				{random ?
                    <p className="App-intro">Random number: {random}</p>
                    : <p className="App-intro">Waiting for a random number...</p>
                }
			</div>
		);
	}
}

export default App;
