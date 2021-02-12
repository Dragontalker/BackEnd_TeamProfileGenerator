class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
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
        console.log('Employee');
    }
}

// Test: 
const jared = new Employee('Jared', 1, 'jared@fakemail.com');

console.log(jared.getName());
console.log(jared.getId());
console.log(jared.getEmail());
jared.getRole();