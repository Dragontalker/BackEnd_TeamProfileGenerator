const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
}

// Testing import:
const jared = new Employee('Jared', 1, 'jared@fakemail.com');

console.log(jared.getName());
console.log(jared.getId());
console.log(jared.getEmail());
jared.getRole();
