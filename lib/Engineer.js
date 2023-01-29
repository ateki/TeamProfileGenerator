/**
 *  Filename: Engineer.js
 *  Desc: defines and exports Engineer class - type of Employee 
 */
const Employee = require('./Employee');

const ROLE = "Engineer";

class Engineer extends Employee {

    constructor(name="", id=0, email="", github="") {
        super(name, id, email);

        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return ROLE;
    }

}

console.log('loading module Engineer');
module.exports = Engineer;