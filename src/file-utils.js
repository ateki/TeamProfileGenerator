/**
 * File:  file-utils.js
 * Desc:  Provides file and directory utilities: 
 *       functionality to write to file as well as check filepath exists.
 */

const fs = require("fs");



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
   /*  console.log(`
        writeToFile entered with ${filePathName}
        ${html}
    `); */


    fs.writeFile(filePathName, html, (err) =>
      err ? console.error(err) : console.log(`Success! Your team profile  has been saved to ${filePathName}`)
    ); 
  }


  
module.exports = {checkOutputDirExists, writeToFile }