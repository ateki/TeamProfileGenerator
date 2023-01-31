/**
 *   File: validate-utils.ks
 *   Desc:  Input Validation Functions for use in inquirer prompts
 * 
 */

 function validateName(answer, role){
    // TODO: Add check for no numbers
    if (!answer || answer.trim().length === 0) {
        return `Please provide the name of the ${role}.`;
    }
    return true;
}

function validateId(answer, role) {
    
    if (!answer || isNaN(answer) || answer.trim().length === 0 || answer <0) {
        // Expecting numerical id:  no whitespace or non numerical chars allowed.
        return `Please provide a numerical id of the ${role} (expecting a numerical id with no spaces) ).`;
    }
    return true;

}

function validateEmail(answer, role) {
    //TODO: Ensure domain part is not just numerical
    const REGEXP_VALID_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!answer || !answer.match(REGEXP_VALID_EMAIL)) {
        return `Please provide a valid email for the ${role}. (name@domain.com)`;
    }
    return true;
}


module.exports = {validateEmail, validateId, validateName }