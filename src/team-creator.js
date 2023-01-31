/**
 * File: team-creator.js
 * 
 * Desc:  Functionality to prompt user for info regarding team, create team and
 * render team profile html as well as outputing to file.
 */

const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");
const inquirer = require("inquirer");
const path = require("path");


const {checkOutputDirExists, writeToFile} = require("./file-utils.js");
const {validateEmail, validateId, validateName } = require("./validate-utils.js");

const render = require("./page-template.js");



const OUTPUT_DIR = path.resolve(__dirname, "../output");  // NOTE ../output as require output in top level dir not in /src
const outputPath = path.join(OUTPUT_DIR, "team.html");


/*-----------------------------------------------------------
 *   User Prompts 
 *    - formatted for use in Inquirer package 
 *-----------------------------------------------------------
 */
 const QUESTIONS_FOR_MANAGER_INFO = [
    {
        name: 'name',
        message: `What is the team manager's name?`,
        type: 'input',
        validate(answer) {   
            return validateName(answer, 'Manager');
        }
    },
    {
        name: 'id',
        message: `What is the team manager's id?`,
        type: 'input',
        validate(answer) {
            return validateId(answer, 'Manager');
        }
    },
    {
        name: 'email',
        message: `What is the team manager's email?`,
        type: 'input',
        validate(answer) {
            return validateEmail(answer, 'Manager');
        }
    },
    {
        name: 'office_number',
        message: `What is the team manager's office number?`,
        type: 'input',
        validate(answer) {
           const REGEXP_VALID_PHONE_NUMBER =  /^[0-9\s]*$/;

            if (!answer  || answer.trim().length === 0   || !answer.match(REGEXP_VALID_PHONE_NUMBER)) {
                // accept mix of whitespace and digits only
                return `Please provide a valid telephone number for team's Manager. (Only numbers and white spaces allowed.)`;
            }
            return true;
        }
    }
];

// Menu prompt to select diff member or exit
const QUESTIONS_ADD_TEAM_MEMBER = [
    {
        name: 'option',
        message: 'Which type of team member would you like to add?',
        type: 'list',
        choices: [
            {
                name: 'Engineer',
                value: 'engineer'
            },
            {
                name: 'Intern',
                value: 'intern'
            },
            {
                name: 'Exit the Course Manager',
                value: 'exit'
            }
        ]
    }
];

const QUESTIONS_FOR_ENGINEER = [
    {
        name: 'name',
        message: `What is the engineer's name?`,
        type: 'input',
        validate(answer) {  
            return validateName(answer, 'Engineer');
        }
    },
    {
        name: 'id',
        message: `What is the engineer's id?`,
        type: 'input',
        validate(answer) {
            return validateId(answer, 'Engineer');
        }
    },
    {
        name: 'email',
        message: `What is the engineer's email?`,
        type: 'input',
        validate(answer) {
            return validateEmail(answer, 'Engineer');
        }
    },
    {
        name: 'github_username',
        message: `What is the eningeer's GitHub username?`,
        type: 'input',
        validate(answer) {
            if (!answer) {
                // TODO: Decide on valid office number format
                return `Please provide a valid GitHub username  for engineer.`;
            }
            return true;
        }
    }
];

const QUESTIONS_FOR_INTERN = [
    {
        name: 'name',
        message: `What is the intern's name?`,
        type: 'input',
        validate(answer) {  
            return validateName(answer, 'Intern');
        }
    },
    {
        name: 'id',
        message: `What is the  intern's id?`,
        type: 'input',
        validate(answer) {
            return validateId(answer, 'Intern');
        }
    },
    {
        name: 'email',
        message: `What is the intern's email?`,
        type: 'input',
        validate(answer) {
            return validateEmail(answer, 'Intern');
        }
    },
    {
        name: 'school',
        message: `What is the intern school/college?`,
        type: 'input',
        validate(answer) {
            if (!answer) {
                // TODO: Decide on valid office number format
                return `Please provide a valid school name for the intern.`;
            }
            return true;
        }
    }
];



/* ---------------------------------------------------------
 * Placeholder for all newly created team members 
 *-----------------------------------------------------------
 */
 let team = [];




/**
 * Displays prompts to collect manager info from user.  User's input answers then used 
 * to create Manager object which is then stored in the global array 'team'.
 * 
 * @returns inquirer prompt promise object
 */
function addTeamManager() {
    return inquirer.prompt(QUESTIONS_FOR_MANAGER_INFO)
        .then(answers => {
            console.log(answers);
            let manager = new Manager(answers.name, answers.id, answers.email, answers.office_number);
            team.push(manager);
           
        }).catch(error => {
            // TODO: processPromptError(error)   put in seperate function for reuse by all functions that use similar
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.error("Apologies: your console environment is not supported.")
              } else {
                // Something else went wrong
                console.error(error);
              }
        })
}

/**
 * Displays prompts to collect engineer info from user.  User's input answers then used 
 * to create Engineer object which is then stored in the global array 'team'.
 * 
 * @returns inquirer prompt promise object
 */
function addEngineer() {

    return inquirer.prompt(QUESTIONS_FOR_ENGINEER)
        .then(answers => {
            console.log(answers);
        
            // create Engineer and add to team
             let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github_username);
             team.push(engineer);

        }).catch(error => {
            // TODO: put in seperate function for reuse by all functions that use similar
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.error("Apologies: your console environment is not supported.")
              } else {
                // Something else went wrong
                console.error(error);
              }
        })
}

/**
 * Displays prompts to collect intern info from user.  User's input answers then used 
 * to create Intern object which is then stored in the global array 'team'.
 * 
 * @returns inquirer prompt promise object
 */
function addIntern() {

    return inquirer.prompt(QUESTIONS_FOR_INTERN)
        .then(answers => {
            console.log(answers);

            // create Intern and add to temp
            let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            team.push(intern);
        }).catch(error => {
            // TODO: put in seperate function for reuse by all functions that use similar
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.error("Apologies: your console environment is not supported.")
              } else {
                // Something else went wrong
                console.error(error);
              }
        })
}



/**
 * Displays menu prompts to let user elect which team role has to be added to team next.
 * This choice then leads to add the selected role to the team.
 * Once new team member, with selected role, is added to team the function repeats to show the menu 
 * again - allowing user to enter more members to team.
 * has been added to team
 * This cycle (of role selection and subsequent creation of role in team) continues
 * until user selects 'exit' option from the menu.
 * 
 * 
 * @returns inquirer prompt promise object
 */
function addTeamMembers() {

    return inquirer.prompt(QUESTIONS_ADD_TEAM_MEMBER)
        .then(choice => {
            console.log(choice);

            if (choice.option === "engineer") {
                return addEngineer()
                    .then(addTeamMembers)

            } else if (choice.option === "intern") {
                return addIntern()
                    .then(addTeamMembers)
            } 
            
            /* console.log(`Team complete.`);
            console.log(team); */

            let outputHtml = render(team);

            checkOutputDirExists(OUTPUT_DIR);
            writeToFile(outputPath, outputHtml);

        }).catch(error => {
            // TODO: put in seperate function for reuse by all functions that use similar
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.error("Apologies: your console environment is not supported.")
              } else {
                // Something else went wrong
                console.error(error);
              }
        });
}



module.exports = {addTeamManager, addTeamMembers }