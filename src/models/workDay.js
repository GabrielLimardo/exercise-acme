class WorkDay {

    constructor(day, initHour, endHour) {
        this._day = day;
        this._initHour = initHour;
        this._endHour = endHour;
        this._pay = 0;
        this._prices = [];
    }
    getDay() {
        return this._day;
    }
    getInitHour() {
        return this._initHour;
    }
    getEndHour() {
        return this._endHour;
    }
    setInitHour(initHour) {
        this._initHour = initHour;
    }
    setEndHour(endHour) {
        this._endHour = endHour;
    }

    setPay(pay) {
        this._pay = pay;
    }
    getPay() {
        return this._pay;
    }
    setPrices(prices) {
        this._prices = prices;
    }
    getPrices() {
        return this._prices;
    }
}

module.exports = WorkDay;