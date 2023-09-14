import axios from 'axios';


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


export interface TVKlines {
	time: number,
	open: number,
	 			high: number,
			low: number,
			close: number,
	 			// volume: number
}

export function getData(){
	// group
	// let result;
	const data = {
		"token1": "grimace",
		"token2": "wdoge"
	}
	const promise = axios.post("https://5.53.127.139:5000/exchange/quotes", data
	)

	const dataPromise = promise.then(response => {
		return group(response.data)
	})
	return dataPromise;

}

export function sort_by_time(trades: ITrade[]){
	let data: {[time: string]: ITrade[]}= {}

	for (let i = 0; i < 24; i++){
		data[(i < 10 ? "0" : "") + i + ":00:00"] = trades.filter(function (trade) {
			let hour = trade.time.split(" ")[1].split(":")[0];
			return Number(hour) == i;
		})
	}
	return data;

}

export function group(data: ITrade[]){
	const trades = (sort_by_time(data));

	let klines: TVKlines[] = []
	Object.entries(trades).forEach(value => {
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
			console.log("2023-09-14T"+ time)
			klines.push(
				{
					// Date("1995-12-17T03:24:00")
					time: new Date("2023-09-14T" + time).getTime() / 1000,
					open: parseFloat(localTrades[0].price),
					high: parseFloat(max.price),
					low: parseFloat(min.price),
					close: parseFloat(localTrades.slice(-1)[0].price)
					// volume: volume
				}
			)
		}


	})
	// console.log(klines)
	return klines
}

