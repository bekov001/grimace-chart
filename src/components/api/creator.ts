import axios from 'axios';
import * as dayjs from 'dayjs';
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export interface ITrade {
	id: string,
	addr1: string,
	addr2: string,
	token1: string,
	token2: string,
	buy: boolean,
	sell: boolean,
	amount: string,
	price: string,
	time: string,
	idOrderAddress1: string,
	idOrderAddress2: string
}


export interface IOrder {
	id: string,
	addr: string,
	amount: string,
	blockedCosts: string,
	buy: boolean,
	orderID: string,
	price: string,
	sell: boolean,
	status: string,
	orderBlocked: boolean,
	time: string,
	token1: string,
	token2: string,
	type: string
}

export interface TVKlines {
	time: number,
	open: number,
	 			high: number,
			low: number,
			close: number,
	 			// volume: number
}

 function to_time(timestamp: string | undefined){
	if (timestamp){
	let date = new Date(parseInt(timestamp) * 1000);

	let datetime = [("0" + date.getDate()).substr(-2), ("0" + ((date.getMonth()) + 1)).substr(-2), date.getFullYear()].join(".")
	var hours = date.getHours();


// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();
let miliseconds = "00" + date.getMilliseconds()

// Will display time in 10:30:23 format
var formattedTime = datetime + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + " " + miliseconds.substring(-2) + " " + "+00:00";
	return formattedTime}
	return ""
 }


export function getRawData(from?: string, to?: string){
	// group
	// let result;

	let data : {
		"token1": string,
		"token2": string,
		"timeStart"?: string,
		"timeEnd"?: string,
	} = {
		"token1": "grimace",
		"token2": "wdoge",
		// timeStart : "05.09.2023 00:00:00 000 +00:00"
	}
	// if (from && parseInt(from) < 1600000000 || to && parseFloat(to) < 1600000000){
	// 	data.timeStart = to_time(from)
	// 	data.timeEnd = to_time(to)
	// }
	// if (from && to){

	// 	data.timeStart = to_time(from)
	// 	data.timeEnd = to_time(to)
	// }


	const promise = axios.post("https://5.53.127.139:5000/exchange/quotes", data
	)

	const dataPromise = promise.then(response => {
		// time_manage(response.data)
		// return []
		return (response.data)
	}).catch(err => (err))
	return dataPromise;

}


export function getData(from?: string, to?: string){
	// group
	// let result;
	
	let data : {
		"token1": string,
		"token2": string,
		"timeStart"?: string,
		"timeEnd"?: string,
	} = {
		"token1": "grimace",
		"token2": "wdoge",
		// timeStart : "05.09.2023 00:00:00 000 +00:00"
	}
	// if (from && parseInt(from) < 1600000000 || to && parseFloat(to) < 1600000000){
	// 	data.timeStart = to_time(from)
	// 	data.timeEnd = to_time(to)
	// }
	// if (from && to){
		
	// 	data.timeStart = to_time(from)
	// 	data.timeEnd = to_time(to)
	// }


	const promise = axios.post("https://5.53.127.139:5000/exchange/quotes", data
	)

	const dataPromise = promise.then(response => {
		// time_manage(response.data)
		// return []
		return group(response.data)
	}).catch(err => (err))
	return dataPromise;

}

function stardard_time(trade: string, minutes: number){
	const date = trade.split(" ")[0]
	const time = trade.split(" ")[1]
	let hours = minutes / 60

	const correct_time = ("0" + (Math.floor(parseInt(time.split(":")[0]) / hours) * hours)).substr(-2) + ":" + ("0" + Math.floor(parseInt(trade.split(":")[1]) / minutes) * minutes).substr(-2)

	return [date, correct_time].join(" ")
}

function add_time(time: string, add: number){
	"support only minutes"
	const data = dayjs(time, "DD.MM.YYYY HH:mm").add(add, "minutes").format("DD.MM.YYYY HH:mm")

	return data
}

function time_manage(trades: ITrade[]){
	const minutes_res = 240;

	trades.sort(function (a, b) {
		return (dayjs(a.time, "DD.MM.YYYY HH:mm:ss SSS Z").isAfter(dayjs(b.time, "DD.MM.YYYY HH:mm:ss SSS Z")) ? 1 : -1)
	});

	let data: {[date: string]: ITrade[]}= {}
	let current_time = stardard_time(trades[0].time, minutes_res)
	data[current_time] = [trades[0]]
	let i = 1

	
	
	
	let now = (stardard_time(dayjs().format("DD.MM.YYYY HH:mm:ss SSS Z"), minutes_res));

	let elem = trades[i]
	while (current_time != now){
		if (i == trades.length){
			elem = trades[0]
		} else {
			elem = trades[i]
		}
		
		// console.log(current_time, add_time(current_time, minutes_res * i))
		if (stardard_time(elem.time, minutes_res) == current_time){
			data[current_time].push(elem)
			i ++;
		} else {
			current_time = add_time(current_time, minutes_res)
			data[current_time] = []
			// data[]
		}

	}


	return data;
	

}


export function getBuysSells(data: any, address: string){
	const minutes_res = 240;
	let src: any[] = []
	let id = 1
	const {asks, bids, ownOrders} = separate(data, address)
	data.sort(function (a: any, b: any) {
		return (dayjs(a.time, "DD.MM.YYYY HH:mm:ss SSS Z").isAfter(dayjs(b.time, "DD.MM.YYYY HH:mm:ss SSS Z")) ? 1 : -1)
	});

	ownOrders.forEach((item: any, index: number) => {
		const item_time = dayjs(item.time, "DD.MM.YYYY HH:mm:ss SSS Z").format("DD.MM HH:mm")
		const volume = 100
		if (item.buy){
			src.push( {
						  id: id,
						  time: dayjs(stardard_time(item.time, minutes_res), "DD.MM.YYYY HH:mm").valueOf() / 1000,
						  color: "green",
						  label: "Ʌ",
						  text: [item_time + "; price " + item.price + "; vol " + volume],
						  labelFontColor: 'white',
						  minSize: 25,
						  shape: "earningUp",
					  })
		} else {
			src.push( {
						  id: id,
						  time: dayjs(stardard_time(item.time, minutes_res), "DD.MM.YYYY HH:mm").valueOf() / 1000,
						  color: "red",
						  label: "Ʌ",
						  text: [item_time + "; price " + item.price + "; vol" + volume],
						  labelFontColor: 'white',
						  minSize: 25,
						  shape: "earningUp",
					  })
		}

		id ++

	})
	id = 1
	data.forEach((item: any, index: number) => {
		if (item.addr1 == address){
			const item_time = dayjs(item.time, "DD.MM.YYYY HH:mm:ss SSS Z").format("DD.MM HH:mm")
			const volume = 100
			if (item.buy){
				src.push( {
							  id: id,
							  time: dayjs(stardard_time(item.time, minutes_res), "DD.MM.YYYY HH:mm").valueOf() / 1000,
							  color: "green",
							  label: "B",
								text: [item_time + "; price " + item.price + "; vol " + volume],
							  labelFontColor: 'white',
							  minSize: 25,
							  shape: "earningUp",
						  })
			} else {
				src.push( {
							  id: id,
							  time: dayjs(stardard_time(item.time, minutes_res), "DD.MM.YYYY HH:mm").valueOf() / 1000,
							  color: "red",
							  label: "S",
							  text: [item_time + "; price " + item.price + "; vol" + volume],
							  labelFontColor: 'white',
							  minSize: 25,
							  shape: "earningUp",
						  })
			}

			id ++
		}
	})
	return src
}

function separate(orders: IOrder[], address: string){
	let asks: number[][] = [];
	let bids: number[][] = [];
	let ownOrders: string[] = []
	orders.forEach((elem) => {
		if(elem.type === 'limit' && !elem.orderBlocked && elem.status === 'pending'){
			if (elem.addr == address) {
				ownOrders.push(elem.price)
			}

			if (elem.sell){
				asks.push([parseFloat(elem.price), parseFloat(elem.amount)])
			} else {
				bids.push([parseFloat(elem.price), parseFloat(elem.amount)])
			}

		}

	})

	return {asks, bids, ownOrders};
}


export function group(data: ITrade[]){
	const trades = Object.entries(time_manage(data)).sort((a, b) => {
		return (dayjs(a[0], "DD.MM.YYYY HH:mm").isAfter(dayjs(b[0], "DD.MM.YYYY HH:mm")) ? 1 : -1)
	});


	let klines: TVKlines[] = []
	let close = 0.1;
	
	(trades).forEach(value => {
		const [time, localTrades] = value;

		if (localTrades.length > 0){
			const max = localTrades.reduce(
				(prev, current) => {
					return parseFloat(prev.price) > parseFloat(current.price) ? prev : current
				}
			);
			const min = localTrades.reduce(
				(prev, current) => {
					return parseFloat(prev.price) < parseFloat(current.price) ? prev : current
				}
			);
			let volume = localTrades.reduce((a, b) => {
				return a + parseFloat(b.price);
			}, 0);
			close = parseFloat(localTrades.slice(-1)[0].price);

			// dayjs(time, "DD.MM.YYYY HH:mm:ss SSS Z").unix()
			klines.push(
				{
					// Date("1995-12-17T03:24:00")
					time: dayjs(time, "DD.MM.YYYY HH:mm").valueOf(),
					open: parseFloat(localTrades[0].price),
					high: parseFloat(max.price),
					low: parseFloat(min.price),
					close: close
					// volume: volume
				}
			)
		} else {
			klines.push(
				{
					// Date("1995-12-17T03:24:00")
					time: dayjs(time, "DD.MM.YYYY HH:mm").valueOf(),
					open: (close),
					high: (close),
					low: (close),
					close: close
					// volume: volume
				}
			)
		}


	})
	return klines
}
