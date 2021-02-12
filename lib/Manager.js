const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}

// Testing import:
const jared = new Manager('Jared', 1, 'jared@fakemail.com', 1111);

console.log(jared.getName());
console.log(jared.getId());
console.log(jared.getEmail());
console.log(jared.getRole());
console.log(jared.getOfficeNumber());