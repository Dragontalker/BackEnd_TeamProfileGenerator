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

// Helper function: addManager. Takes an array as input, then takes user input as an object, and store it back into the array.
const addManager = async (list) => {
    let data = await promptManager();
    let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    list.push(manager);
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

// Similar to addManager.
const addEngineer = async (list) => {
    let data = await promptEngineer();
    let engineer = new Engineer(data.name, data.id, data.email, data.github);
    list.push(engineer);
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

// Similar purpose as addManager and addEngineer.
const addIntern = async (list) => {
    let data = await promptIntern();
    let intern = new Intern(data.name, data.id, data.email, data.school);
    list.push(intern);
};

// This function adds a selecting feature for user, which register their choice among the three provided choices.
const promptTeam = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Choose which roles you want to fill next: ',
            choices: [
                'Need another engineer.',
                'Need to bring another intern on the team.',
                'I am done building my team, build the HTML now!',
            ],
        },
    ])
};

// Helper function: addTeam. Similar to addManager, addEngineer and addInter. However, the next prompt depends on the output from propmptTeam selection. If user made the choice of finish team building, then an html is created.
const addTeam = async (list) => {
    let roleChoice = await promptTeam();
    if (roleChoice.role === 'Need another engineer.') {
        await addEngineer(list);
        addTeam(list);
    } else if (roleChoice.role === 'Need to bring another intern on the team.') {
        await addIntern(list);
        addTeam(list);
    } else {
        fs.writeFileSync(outputPath, render(list));
        console.log('Your HTML file team.html is now ready! Check it under ./dict!')
    }
}

// Main function: all the results are stored in an array called employees. As the acceptance criteria required, first a manager is selected, then the user can choose any combination of engineers and interns, when he/she is done, html is created in desination folder.
const buildHTML = async () => {
    const employees = [];
    console.log('Start your team by choose a team manager!')
    await addManager(employees);
    console.log('Now it is the time to fill the remaining spots!')
    addTeam(employees);
}

buildHTML();
