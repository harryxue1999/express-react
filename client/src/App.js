import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import io from 'socket.io-client'

class App extends Component {
    constructor() {
        super();
        this.state = { data: {} };
    }

    componentDidMount() {
        const socket = io();
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
				<p className="App-intro">
                    {random ? "Random number:" + random
                        : "Waiting for a random number..."}
                </p>
			</div>
		);
	}
}

export default App;
