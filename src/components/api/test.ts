// import { getExchangeServerTime, getSymbols, getKlines, subscribeKline, unsubscribeKline, checkInterval } from './helpers'

import axios from 'axios';
import binanceWS from './helpers';
import { ResolutionString } from '../../charting_library';
import { getData } from './creator';


const configurationData = {
	supports_marks: false,
	supports_timescale_marks: false,
	supports_time: true,
	supported_resolutions: [
		'1', '3', '5', '15', '30', '60', '120', '240', '1D', '3D', '1W', '1M'
	]
};

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
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData)) // callback must be called asynchronously.
	}

	searchSymbols(
		userInput : string,
		exchange : string,
		symbolType : string,
		onResultReadyCallback : any,
	) {
		// console.log('[searchSymbols]: Method call');
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
		// onResultReadyCallback(symbols);
	}

	getBars(symbolInfo: any, resolution: ResolutionString, periodParams: any, onResult: any, onError: any, ) {
		// const interval = this.ws.tvIntervals[resolution]
		// // if (!interval) {
		// // 	onErrorCallback('Invalid interval')
		// // }
		//

		const klines = getData()
		console.log(klines);
		onResult(klines, {noData: false})
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
		// 			onSymbolResolvedCallback({
		// 										 name: symbol.symbol,
		// 										 description: symbol.baseAsset + ' / ' + symbol.quoteAsset,
		// 										 ticker: symbol.symbol,
		// 										 exchange: 'Binance',
		// 										 listed_exchange: 'Binance',
		// 										 type: 'crypto',
		// 										 session: '24x7',
		// 										 minmov: 1,
		// 										 pricescale: pricescale(symbol),
		// 										 // timezone: 'UTC',
		// 										 has_intraday: true,
		// 										 has_daily: true,
		// 										 has_weekly_and_monthly: true,
		// 										 currency_code: symbol.quoteAsset
		// 									 })
		// 		}, 0)
		// 		return
		// 	}
		// }
		// // minmov/pricescale will give the value of decimal places that will be shown on y-axis of the chart
		// //
		// onResolveErrorCallback('not found')
	}

	subscribeBars(symbolInfo: any, resolution: any, onRealtimeCallback: any, subscriberUID: any, onResetCacheNeededCallback: any) {
		// this.ws.subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
	}

	unsubscribeBars(subscriberUID: any) {
		// this.ws.unsubscribeFromStream(subscriberUID)
	}
}