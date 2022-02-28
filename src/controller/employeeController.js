// Declaration of modules
const Constants = require('../../constants.js');
const { registerEmployee } = require('../services/paymentServices');

// Separates information for each employee using the Constants.js
 exports.employeeInfo = (info) => {
    return info.match(Constants.regExpDataEmployee);
}

// Validates that the info file has the correct structure
  exports.validification = (info) => {
    if (info == '') return false
    let infoStructure = this.employeeInfo(info);
    let validatedInfo = infoStructure != null ? infoStructure.length : 0;
    let infoSplit = info.split('\n').length;
    return infoSplit == validatedInfo;
}

// Calculates the payment of the employees
exports.calculateEmployeePayment = (info) => {
    let employees = [];
    if (this.validification(info)) {
        let employeesInfo = this.employeeInfo(info);
        employeesInfo.forEach(element => {
            let employee = registerEmployee(element);
            employees.push(employee);
        });
        return employees;
    }
    console.log('\nError in the Employee data')
    return null;
}

// Shows the amount to pay
exports.showPayment = (employees) => {
    employees.forEach(employee => {
        console.log('\nThe amount to pay ' + employee.getName() + ' is: ' + employee.getSalary() + ' USD');
    });
}