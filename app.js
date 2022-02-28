const readline = require('readline');
const fs = require('fs');
const { calculateEmployeePayment, showPayment: printPayment } = require('./src/controller/employeeController');

//started the process by reading the input
const Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

console.log('ACME company payment system \n use your document (.txt) with the information of your employees.\n');


// reads the path to the file to work with test file
Interface.question("Enter the file path if you want to use the default copy and paste the following path (test.txt)=> ", (path) => {
    let filepath = path;

    //read the file
    fs.readFile(filepath, 'utf8', function(err, data) {
        if (err) {
            console.log( '\n',err.message);
            Interface.close();
            throw err;
        }

        //calls the function to calculate the payment corresponding to the employees.
        const employees = calculateEmployeePayment(data);
        if (employees != null) {
            printPayment(employees);
        }
        Interface.close();
    });
});

// goodbye message and end the process
Interface.on('close', function() {
    console.log('\n Thank you for use ACME company payment system \n ');
    process.exit(0);
});