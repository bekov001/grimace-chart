import React from 'react';
import { TVChartContainer } from './TVChartContainer';
import axios from 'axios';


const MexcChart = () => {
    return (
        <div>
			<header className={ 'App-header' }>
				<h1 className={ 'App-title' }>
					MEXC
				</h1>
			</header>
			<TVChartContainer />
        </div>
    );
};

export default MexcChart;