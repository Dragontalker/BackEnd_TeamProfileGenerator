const Employee = require("./Employee");

// Testing import:
const jared = new Employee('Jared', 1, 'jared@fakemail.com');

console.log(jared.getName());
console.log(jared.getId());
console.log(jared.getEmail());
jared.getRole();