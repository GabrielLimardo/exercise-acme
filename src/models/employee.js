class Employee {
    constructor() {
        this._workDays = [];
        this._salary = 0;
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    setWorkDayS(workDays) {
        this._workDays = workDays;
    }
    getWorkDays() {
        return this._workDays;
    }
    setSalary(salary) {
        this._salary = salary;
    }
    getSalary() {
        return this._salary;
    }
}

module.exports = Employee;