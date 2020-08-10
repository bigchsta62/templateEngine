// TODO: Write code to define and export the Employee class
//Employee constructor
//should include name, email, ID, role

class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = "Employee";
  }

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
    return this.role;
  }
}

// const Alice = new Employee(alice)

module.exports = Employee;
