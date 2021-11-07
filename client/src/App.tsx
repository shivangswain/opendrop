import React from 'react';
import { Route, Switch } from 'react-router-dom';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import './App.css';

import Header from './components/Header';
import Home from './screens/Home';
import Transfers from './screens/Transfers';
import Status from './components/Status';
import { Router } from './config';

const App: React.FC = () => {
	return (
		<Router>
			<div className="app">
				<Header />
				<Status />
				<Switch>
					<Route path="/:networkName">
						<Transfers />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
