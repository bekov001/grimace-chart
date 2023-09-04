import * as React from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';

const App = () => {
	return (
		<div className={ 'App' }>
			<header className={ 'App-header' }>
				<h1 className={ 'App-title' }>
					MEXC
				</h1>
			</header>
			<TVChartContainer />
		</div>
	);
};

export default App;
