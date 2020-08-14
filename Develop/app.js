const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
//create output directory fs
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

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
        employees.push(intern);
      }
      if (answers.role.includes("Engineer")) {
        let engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.gitHub,
          answers.role
        );
        employees.push(engineer);
      }
      if (answers.role.includes("Manager")) {
        let manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.phone,
          answers.role
        );
        employees.push(manager);
      }
      if (answers.askAgain) {
        init(employees);
      } else {
        
        fs.writeFileSync(outputPath, render(employees), function (err) {
          if (err) {
            console.log(err);
          } else {
            // console.log("Commit logged!");
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

init();
