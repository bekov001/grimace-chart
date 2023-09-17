// import { getExchangeServerTime, getSymbols, getKlines, subscribeKline, unsubscribeKline, checkInterval } from './helpers'

import axios from 'axios';
import binanceWS from './helpers';
// import { ResolutionString } from '../../charting_library';
import { getData } from './creator';
import { DATA, cut, get } from './data';




export default class API {

	constructor() {
		// this.binanceHost = 'https://api.binance.com'
		// this.debug = false
		// this.configurationData = {
		// 	supports_marks: false,
		// 	supports_timescale_marks: false,
		// 	supports_time: true,
		// 	supported_resolutions: [
		// 		'1', '3', '5', '15', '30', '60', '120', '240', '1D', '3D', '1W', '1M'
		// 	]
		// };
	}

	onReady(callback: Function)  {
		const configurationData = {
			supports_search: true,
			supports_group_request: false,
			supports_marks: true,
			supports_timescale_marks: true,
			supports_time: true,
			exchanges: [
				{ value: "", name: "All Exchanges", desc: "" },
				{ value: "NasdaqNM", name: "NasdaqNM", desc: "NasdaqNM" },
				{ value: "NYSE", name: "NYSE", desc: "NYSE" }
			],
			symbols_types: [
				{ name: "All types", value: "" },
				{ name: "Stock", value: "stock" },
				{ name: "Index", value: "index" },
				{ name: "Crypto", value: "crypto" }
			],
			supported_resolutions: ["5", "15", "60", "720", "D", "2D", "3D", "W", "3W", "M", "6M"]
		}
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData)) // callback must be called asynchronously.
	}

	searchSymbols(
		userInput : string,
		exchange : string,
		symbolType : string,
		onResultReadyCallback : any,
	) {
		console.log('[searchSymbols]: Method call');
		//
		// const symbols = axios.get("https://api.mexc.com/api/v3/defaultSymbols", {
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		//
		// })
		// console.log(symbols)
		//
		// // const symbols = await getMatchingSymbolsFromBackend(userInput, exchange, symbolType);
		onResultReadyCallback([{
								  symbol: "GRIMACEUSDT",
								  full_name: "GRIMACEUSDT",
								  description: "symbol.baseAsset + ' / ' + symbol.quoteAsset",
								  ticker: "GRIMACEUSDT",
								  exchange: 'mexc',
								  type: 'crypto'
							  }]);
	}

	getBars(symbolInfo: any, resolution: any, periodParams: any, onHistoryCallback: any, onErrorCallback: any, ) {
		// const interval = this.ws.tvIntervals[resolution]
		// // if (!interval) {
		// // 	onErrorCallback('Invalid interval')
		// // }
		console.log('[getBars]: Method call');
		console.log(periodParams);
		let data = cut(periodParams.from, periodParams.to)

		onHistoryCallback(data)
		console.log(data)
		// onHistoryCallback([])
		// // if(symbolInfo.name === 'GRIMACEUSDT' && resolution === '1h'){
		// 	const klines = getData(periodParams.from, periodParams.to).then(data => {
		// 		if (data.length) {
		// 			console.log(data);
		// 			onHistoryCallback(data, {noData: false,})

		// 		} else {
		// 			onHistoryCallback([], {
		// 				noData: true
		// 			});
		// }}).catch((err) => onHistoryCallback([], {nextTime: true}))

			// console.log(klines);
			// onHistoryCallback(klines)
		// }
		// let totalKlines = []
		// const kLinesLimit = 500
		// const finishKlines = () => {
		// 	if (totalKlines.length === 0) {
		// 		onHistoryCallback([], { noData: true })
		// 	} else {
		// 		let historyCBArray = totalKlines.map(kline => ({
		// 			time: kline[0],
		// 			open: parseFloat(kline[1]),
		// 			high: parseFloat(kline[2]),
		// 			low: parseFloat(kline[3]),
		// 			close: parseFloat(kline[4]),
		// 			volume: parseFloat(kline[5])
		// 		}))
		// 		onHistoryCallback(historyCBArray, { noData: false })
		// 	}
		// }
		//
		// const getKlines = async (from, to) => {
		// 	try {
		// 		const data = await this.binanceKlines(symbolInfo.name, interval, from, to, kLinesLimit)
		// 		totalKlines = totalKlines.concat(data)
		// 		if (data.length === kLinesLimit) {
		// 			from = data[data.length - 1][0] + 1
		// 			getKlines(from, to)
		// 		} else {
		// 			finishKlines()
		// 		}
		// 	}
		// 	catch (e) {
		// 		console.error(e)
		// 		onErrorCallback(`Error in 'getKlines' func`)
		// 	}
		// }
		//
		// from *= 1000
		// to *= 1000
		// getKlines(from, to)
	}

	resolveSymbol(symbolName: string, onSymbolResolvedCallback: any, onResolveErrorCallback: any) {
		// this.debug && console.log('👉 resolveSymbol:', symbolName)
		//
		// const comps = symbolName.split(':')
		// symbolName = (comps.length > 1 ? comps[1] : symbolName).toUpperCase()
		//
		// function pricescale(symbol) {
		// 	for (let filter of symbol.filters) {
		// 		if (filter.filterType == 'PRICE_FILTER') {
		// 			return Math.round(1 / parseFloat(filter.tickSize))
		// 		}
		// 	}
		// 	return 1
		// }
		//
		// for (let symbol of this.symbols) {
		// 	if (symbol.symbol == symbolName) {
		// 		setTimeout(() => {
					onSymbolResolvedCallback({
												 name: "GRIMACEUSDT",
												 description: "GRIMACEUSDT",
												 ticker: "GRIMACEUSDT",
												 exchange: 'mexc',
												 listed_exchange: 'mexc',
												 type: 'crypto',
												 session: '24x7',
												 minmov: 1,
												 // timezone: 'UTC',
												 has_intraday: true,
												 has_daily: true,
												 has_weekly_and_monthly: true,
											 })
		// 		}, 0)
		// 		return
		// 	}
		// }
		// // minmov/pricescale will give the value of decimal places that will be shown on y-axis of the chart
		// //
		// onResolveErrorCallback('not found')
	}

	subscribeBars(symbolInfo: any, resolution: any, onRealtimeCallback: any, subscriberUID: any, onResetCacheNeededCallback: any) {
		// const klines = getData().then(data => {
		// 	if (data.length) {
		// 		console.log(data);
		// 		setInterval(onRealtimeCallback(data.slice(-1)[0]), 100)
		//
		// 	} else {
		// 		onRealtimeCallback([], {
		// 			noData: true
		// 		});
		// 	}}).catch(err => console.log(err))
		// const klines = getData()
		// console.log(klines);
		// onResult(klines, {noData: false})
		// this.ws.subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
	}
	//
	unsubscribeBars(subscriberUID: any) {
		// this.ws.unsubscribeFromStream(subscriberUID)
	}
}