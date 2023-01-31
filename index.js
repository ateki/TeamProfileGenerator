/**
 * File:  index.js
 * Desc:  Main starting point for team profile generator.
 *  
 */


const {addTeamManager, addTeamMembers } = require("./src/team-creator.js");


const MSG_WELCOME = `
    Welcome to Team Profiler. 
    Please build your team`;




/*-----------------------------------------------------------
 *   Main Entry Point
 *-----------------------------------------------------------
 */
function init() {
    console.log(MSG_WELCOME);

     addTeamManager()
        .then(addTeamMembers);

 }



init();