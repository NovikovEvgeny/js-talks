exports = class Test {
	constructor(name) {
		this.name = name;
	}

	getHi() {
		return `${this.name} says hi!`;
	}
}