const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//this array is for testing
// const out = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
//create output directory fs
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const Employee = require("./lib/Employee");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// array of questions for user
const questions = [
  {
    name: "name",
    type: "input",
    message: "What is the Employee's First name?",
  },
  {
    name: "id",
    type: "input",
    message: "PLease provide the employee ID",
  },
  {
    name: "email",
    type: "input",
    message: "Please provide the email address",
    validate: function (email) {
      valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      if (valid) {
        console.log("Thank you");
        return true;
      } else {
        console.log(".  Please enter a valid email");
        return false;
      }
    },
  },
  {
    name: "role",
    type: "checkbox",
    message: "What is your Company Role",
    choices: [{ name: "Intern" }, { name: "Engineer" }, { name: "Manager" }],
    validate: function (answer) {
      if (answer.length < 1 || answer.length > 1) {
        return "You must choose 1 role.";
      }
      return true;
    },
  },
  {
    name: "gitHub",
    type: "input",
    message: "What is your GitHub username?",
    when: function (answers) {
      //   console.log(answers.role);
      if (answers.role.includes("Engineer")) {
        return true;
      }
    },
  },
  {
    name: "school",
    type: "input",
    message: "What School are you attending?",
    when: function (answers) {
      //   console.log(answers.role);
      if (answers.role.includes("Intern")) {
        return true;
      }
    },
  },
  {
    name: "phone",
    type: "input",
    message: "What is your Office Phone number?",
    when: function (answers) {
      //   console.log(answers.role);
      if (answers.role.includes("Manager")) {
        return true;
      }
    },
    validate: function (value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }

      return "Please enter a valid phone number";
    },
  },
  {
    type: "confirm",
    name: "askAgain",
    message: "Do you want to enter another employee(just hit enter for YES)?",
    default: true,
  },
];
//Initializes Command Line Interface(CLI)
function init(employees = []) {
  inquirer
    .prompt(questions)
    .then((answers) => {
      if (answers.role.includes("Intern")) {
        let intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school,
          answers.role
        );
        //console.log(intern);
        employees.push(intern);
        // console.log(employees);
      }
      if (answers.role.includes("Engineer")) {
        let engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.gitHub,
          answers.role
        );
        //console.log(engineer);
        employees.push(engineer);
        // console.log(employees);
      }
      if (answers.role.includes("Manager")) {
        let manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.phone,
          answers.role
        );
        //console.log(manager);
        employees.push(manager);
        console.log(employees);
      }
      // fs.appendFile("manager.html", manager)
      if (answers.askAgain) {
        init(employees);
      } else {
        //render function
        
        console.log(employees);
        fs.writeFileSync(outputPath, render(employees) + "\n", function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Commit logged!");
          }
        });
        //end the CLI and push the information to proper documents
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // console.log("couldn't be rendered in the current environment");
      } else {
        // console.log("Something else when wrong");
      }
    });
}
// function to write README file
//   function writeToFile(answers) {
//     const lic = answers.license;
//     let licenseBDG = [];
//     if (lic.includes("MIT License")) {
//       licenseBDG.push(
//         "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
//       );
//     }
//     if (lic.includes("Apache License")) {
//       licenseBDG.push(
//         "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
//       );
//     }
//     if (lic.includes("GPL License")) {
//       licenseBDG.push(
//         "[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)"
//       );
//     }
//     if (lic.includes("NONE")) {
//       licenseBDG.push("None");
//     }

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
