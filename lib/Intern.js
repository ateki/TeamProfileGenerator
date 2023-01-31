
/**
 *  Filename: Intern.js
 *  Desc: defines and exports Intern class - type of Employee 
 */

const Employee = require('./Employee');

const ROLE = "Intern";

class Intern extends Employee {

    constructor(name="", id=0, email="", school="") {
        super(name, id, email);

        this.school = school;
    }

    getSchool() {
        return this.school;
    }
    getRole() {
        return ROLE;
    }
}

module.exports = Intern;