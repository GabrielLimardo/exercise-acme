// Employee data
const dataName = '[a-zA-Z]+';
const dataDay = '(MO|TU|WE|TH|FR|SA|SU)';
const dataHour = '(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])';
const dataWorkTime = `${dataDay}(${dataHour}-${dataHour})`;
const dataEmployee = `${dataName}=(${dataWorkTime},)*(${dataWorkTime})$`;
const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

// Construction of regular expressions
const regExpDataDay = new RegExp(dataDay, 'g');
const regExpDataHour = new RegExp(dataHour, 'g');
const regExpDataWorkTime = new RegExp(dataWorkTime, 'g');
const regExpDataEmployee = new RegExp(dataEmployee, 'gm');

// Work scheduledHours
const schedule = {
    'scheduledHours1': ['00:01', '09:00'],
    'scheduledHours2': ['09:01', '18:00'],
    'scheduledHours3': ['18:01', '00:00'],
}

// Prices by schedule (weekends and weekdays)
const priceWeekDayHours = [25, 15, 20];
const priceWeekendHours = [30, 20, 25];

// Exports

module.exports.regExpDataDay = regExpDataDay;
module.exports.regExpDataHour = regExpDataHour;
module.exports.regExpDataEmployee = regExpDataEmployee;
module.exports.regExpDataWorkTime = regExpDataWorkTime;
module.exports.schedule = schedule;


// 
exports.parseDay = (day, time) => {
    let date = new Date();
    let hour = time.split(':');
    let numberDay = date.getUTCDay();
    let newNumberDay = days.indexOf(day) - numberDay;
    date.setDate(date.getUTCDate() + newNumberDay);
    date.setUTCHours(hour[0], hour[1], 0, 0);
    return date;
}

// 
exports.isBetween = (date, minDate, maxDate) => {
    return date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime();
}

// 
exports.getPriceDay = (day) => {
    const index = days.indexOf(day);
    return index == 0 || index == days.length - 1 ? priceWeekendHours : priceWeekDayHours;
}

// Validates the date
exports.validatedDate = (initDate, endDate) => {
    if (initDate.getTime() > endDate.getTime()) {
        endDate.setUTCDate(endDate.getUTCDate() + 1);
    }
    return endDate;
}