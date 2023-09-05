import * as React from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';
import MexcChart from './components/MexcChart/mexcChart';

const App = () => {
	return (
		<div className={ 'App' }>
			<MexcChart />
			<TVChartContainer />
		</div>
	);
};

export default App;
