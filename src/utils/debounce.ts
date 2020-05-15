export default class Debouncer {
	private time: number;
	private interval: number;

	constructor(interval: number) {
		this.time = new Date().getTime()
		this.interval = interval;
	}

	call(callback: Function): void {
		const now = new Date().getTime();

		if (now - this.time > this.interval) {
			this.time = new Date().getTime();
			callback();
		}
	}
};