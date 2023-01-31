/**
 * File:  index.js
 * Desc:
 * TODO: Split up 
 */

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const MSG_WELCOME = `
    Welcome to Team Profiler. 
    Please build your team`;




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
           /*  if (!answer || answer.trim().length === 0) {
                return `Please provide the name of the Manager.`;
            }
            return true; */
        }
    },
    {
        name: 'id',
        message: `What is the team manager's id?`,
        type: 'input',
        validate(answer) {
            return validateId(answer, 'Manager');
            /* if (!answer || isNaN(answer) || answer <0) {
                // Expecting numerical id:  no whitespace or non numerical chars allowed.
                return `Please provide a numerical id of the Manager (expecting a numerical id with no spaces) ).`;
            }
            return true; */
        }
    },
    {
        name: 'email',
        message: `What is the team manager's email?`,
        type: 'input',
        validate(answer) {

            return validateEmail(answer, 'Manager');
            /* //TODO: Ensure domain part is not just numerical
            const REGEXP_VALID_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


            if (!answer || !answer.match(REGEXP_VALID_EMAIL)) {
                return `Please provide a valid email for team's Manager. (name@domain.com)`;
            }

            return true; */
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
           /*  if (!answer || answer.trim().length === 0) {
                return `Please provide the name of the  Engineer.`;
            }
            return true; */
        }
    },
    {
        name: 'id',
        message: `What is the engineer's id?`,
        type: 'input',
        validate(answer) {
            return validateId(answer, 'Engineer');
            /* if (!answer || isNaN(answer) || answer <0) {
                // Expecting numerical id:  no whitespace or non numerical chars allowed.
                return `Please provide a numerical id of the Engineer (expecting a numerical id with no spaces) ).`;
            }
            return true; */
        }
    },
    {
        name: 'email',
        message: `What is the engineer's email?`,
        type: 'input',
        validate(answer) {
            
            return validateEmail(answer, 'Engineer');
            /* if (!answer) {
                // TODO: Add regexp for valid email format
                return `Please provide a valid email for engineer.`;
            }
            return true; */
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
           /*  if (!answer || answer.trim().length === 0) {
                return `Please provide the name of the Intern.`;
            }
            return true; */
        }
    },
    {
        name: 'id',
        message: `What is the  intern's id?`,
        type: 'input',
        validate(answer) {
            
            return validateId(answer, 'Intern');

            /* if (!answer || isNaN(answer) || answer <0) {
                // Expecting numerical id:  no whitespace or non numerical chars allowed.
                return `Please provide a numerical id of the Inter (expecting a numerical id with no spaces) ).`;
            }
            return true; */
        }
    },
    {
        name: 'email',
        message: `What is the intern's email?`,
        type: 'input',
        validate(answer) {
            
            return validateEmail(answer, 'Intern');
            /* if (!answer) {
                // TODO: Add regexp for valid email format
                return `Please provide a valid email for intern.`;
            }
            return true; */
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


/*-----------------------------------------------------------
 *   Input Validation Functions 
 *-----------------------------------------------------------
 */

 function validateName(answer, role){
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

/*-----------------------------------------------------------
 *   
 *-----------------------------------------------------------
 */

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
            console.log(`
                answers.name = ${answers.name}
                answers.id = ${answers.id}
                answers.email = ${answers.email}
                answers.office_number = ${answers.office_number}
            `);
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
            console.log(`
                answers.name = ${answers.name}
                answers.id = ${answers.id}
                answers.email = ${answers.email}
                answers.github_username = ${answers.github_username}
            `);
        
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
            console.log(`
                answers.name = ${answers.name}
                answers.id = ${answers.id}
                answers.email = ${answers.email}
                answers.school = ${answers.school}
            `);

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



/** TODO: Rename or call from addTeamMembers() which calls on manager and team prompts
 * Displays the menu prompts to let user decide what team member role has 
 * to be added to team next, or if complete.
 * 
 */
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

// TODO: Rename show   addTeamPlayers which calls showMenuAddToTeam
function showMenuAddToTeam() {

    return inquirer.prompt(QUESTIONS_ADD_TEAM_MEMBER)
        .then(choice => {
            console.log(choice);

            if (choice.option === "engineer") {
                return addEngineer()
                    .then(showMenuAddToTeam)

            } else if (choice.option === "intern") {
                return addIntern()
                    .then(showMenuAddToTeam)
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

/*-----------------------------------------------------------
 *   FILE and DIR utilities
 *   TODO: Move to seperate module
 *-----------------------------------------------------------
 */

/**
 * Ensures filePath for output exists.  If not, will make missing directory.
 * @param {*} filePath 
 */
function checkOutputDirExists(filePath) {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
  }


/** TODO call checkOutputDirExists from within this method thus saving 2 seperate calls.
 *  as current version requires directory to be created.
 * 
 * Writes provided data to file - 
 * @param {Write} filePathName file path and name of file to be writen to
 * @param {*} html - string representing html for Team profile
 */
function writeToFile(filePathName, html) {
/*     console.log(`
        writeToFile entered with ${filePathName}
        ${html}
    `); */


    fs.writeFile(filePathName, html, (err) =>
      err ? console.error(err) : console.log(`Success! Your team profile  has been saved to ${filePathName}`)
    ); 
  }


/*-----------------------------------------------------------
 *   Main Entry Point
 *-----------------------------------------------------------
 */
function init() {
    console.log(MSG_WELCOME);

     addTeamManager()
        .then(showMenuAddToTeam);

 }



init();