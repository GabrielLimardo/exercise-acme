// Declaration of modules
const employee = require('../models/Employee.js');
const workDay = require('../models/WorkDay.js');
const Constants = require('../../Constants.js');

/**
 * calculates hours worked by pay schedule
 * @param {workDay} objWorkDay instance of WorkHour
 * @returns {Array<Number>} array of hours worked by range
 */
 exports.calculateWorkHours = (objWorkDay) => {
    let key = ['scheduledHours1', 'scheduledHours2', 'scheduledHours3'];
    let hoursPaid = [];
    for (let index = 0; index < key.length; index++) {
        let hours = Constants.schedule[key[index]];
        let minDate = Constants.parseDay(objWorkDay.getDay(), hours[0]);
        let maxDate = Constants.parseDay(objWorkDay.getDay(), hours[1]);
        maxDate = Constants.validatedDate(minDate, maxDate);
        let minutestime = 0;
        let hourstime = 0;
        if (Constants.isBetween(objWorkDay.getInitHour(), minDate, maxDate)) {
            if (objWorkDay.getEndHour().getTime() <= maxDate.getTime()) {
                const dateDiff = new Date(objWorkDay.getEndHour().getTime() - objWorkDay.getInitHour().getTime());
                hourstime = dateDiff.getUTCHours();
                minutestime = dateDiff.getUTCMinutes();

            } else {
                const dateDiff = new Date(maxDate.getTime() - objWorkDay.getInitHour().getTime());
                hourstime = dateDiff.getUTCHours();
                minutestime = dateDiff.getUTCMinutes();
                maxDate.setUTCMinutes(1);
                objWorkDay.setInitHour(maxDate);
            }
        }
        if (minutestime == 59) {
            hourstime++;
        }
        hoursPaid.push(hourstime);
    }
    return hoursPaid;
}

/**
 * Calculates the pay that an employee should receive for the hours worked in the day.
 * @param {workDay} objWorkDay instance of WorkHour
 * @returns {Number} employee's salary
 */
 exports.calculateWorkDay = (objWorkDay) => {
    let tempObjWorkDay = Object.assign(new workDay(), objWorkDay);
    const hoursPaid = this.calculateWorkHours(tempObjWorkDay);
    let sum = 0;
    for (let i = 0; i < hoursPaid.length; i++) {
        const price = objWorkDay.getPrices()[i];
        sum += price * hoursPaid[i];
    }
    return sum;
}

/**
 * creates an instance of the working day object
 * @param {String} data information about hours worked
 * @returns {WorkDay} intance of WorkHour
 */
 exports.createWorkDay = (data) => {
    const hours = data.match(Constants.regExpDataHour);
    const day = data.match(Constants.regExpDataDay);
    let objWorkDay = new workDay(day[0])
    objWorkDay.setPrices(Constants.getPriceDay(objWorkDay.getDay()));
    const initHour = Constants.parseDay(objWorkDay.getDay(), hours[0]);
    let endHour = Constants.parseDay(objWorkDay.getDay(), hours[1]);
    objWorkDay.setInitHour(initHour)
    objWorkDay.setEndHour(Constants.validatedDate(initHour, endHour));
    objWorkDay.setPay(this.calculateWorkDay(objWorkDay));
    return objWorkDay;
}

/**
 * Calculates an employee's salary by adding up the pay for each day's work.
 * @param {workDay} WorkDays instance of WorkHour
 * @returns {Array<Number>} array of hours worked by range
 */

 function getEmployeeSalary(WorkDays) {
    let sum = 0;
    WorkDays.forEach((element) => {
        sum += element.getPay();
    })
    return sum;
}

/**
 * creates an instance of the Employee object
 * @param {String} data employee data
 * @returns {employee} intance of Employee
 */
exports.registerEmployee = (data) => {
    let objEmployee = new employee();
    objEmployee.setName(data.split('=')[0] ? data.split('=')[0] : 'undefine');
    data.match(Constants.regExpDataWorkTime).forEach(element => {
        objEmployee.getWorkDays().push(this.createWorkDay(element));
    });
    objEmployee.setSalary(getEmployeeSalary(objEmployee.getWorkDays()));
    return objEmployee;
}