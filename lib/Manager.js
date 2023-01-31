/**
 *  Filename: Manager.js
 *  Desc: defines and exports Manager class - type of Employee 
 */
const Employee = require('./Employee');

const ROLE = "Manager";

class Manager extends Employee {

    constructor(name="", id=0, email="", officeNumber=0) {
        super(name, id, email);

        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return ROLE;
    }
}


module.exports = Manager;