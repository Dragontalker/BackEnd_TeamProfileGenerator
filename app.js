const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

const employees = [];

const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your team manager?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of your team manager?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the E-mail of your team manager?',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the officer number of your team manager?',
        },
    ])
};

const addManager = async () => {
    let data = await promptManager();
    let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    employees.push(manager);
};

const promptEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your engineer?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of your engineer?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the E-mail of your engineer?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the GitHub user name of your engineer?',
        },
    ])
};

const addEngineer = async () => {
    let data = await promptEngineer();
    let engineer = new Engineer(data.name, data.id, data.email, data.github);
    employees.push(engineer);
};

const promptIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your intern?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the ID of your intern?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the E-mail of your intern?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Which school is your intern from?',
        },
    ])
};

const addIntern = async () => {
    let data = await promptIntern();
    let intern = new Engineer(data.name, data.id, data.email, data.school);
    employees.push(intern);
};

const testHTML = async () => {
    await addManager();
    await addEngineer();
    await addEngineer();
    await addEngineer();
    await addIntern();
    fs.writeFileSync(outputPath, render(employees));
}

testHTML();