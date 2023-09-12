import * as React from 'react';
import './App.css';

import MexcChart from "./components/mexcChart";
import { getData } from './components/api/creator';

const App = () => {
	return (
		<div className={ 'App' }>
			<a onClick={() => getData()}>Gaydad</a>
			<MexcChart></MexcChart>
		</div>
	);
};

export default App;
