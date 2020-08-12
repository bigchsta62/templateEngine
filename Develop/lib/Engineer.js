const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.
//HINT: This class should inherit from Employee.
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email, github);
    this.github = github;
    this.role = "Engineer";
  }

  getGithub() {
    return this.github;
  }
}

// const Alice = new Employee(alice)

module.exports = Engineer;
