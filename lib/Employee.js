/**
 *  Filename: Manager.js
 *  Desc: defines and exports Employee class to represent an Employee 
 *  within a team
 */
const ROLE = 'Employee';

class Employee {


    // Allow for constructors with 1 -3 args:
    // 
    constructor(name = "", id = 0, email = "") {
        this.name = name;
        this.id = id;
        this.email = email;
        
    }

    // Accessor functions for privacy
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return ROLE;
    }

}


console.log('loading module Employee');

// TODO: Decide: Should return only the get methods so can't directly 
// modify object?
module.exports = Employee;
