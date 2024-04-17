#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let ask = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            choices: ["Add", "Update", "Remove", "Exit"],
            message: "What do you want to do?",
        },
    ]);
    if (ask.action === "Add") {
        while (true) {
            let addTask = await inquirer.prompt([
                {
                    name: "todoInput",
                    type: "input",
                    message: "What do you want to add in your todos?",
                },
            ]);
            if (addTask.todoInput === "" || addTask.todoInput === " ") {
                console.log("Please enter a valid task.");
                continue;
            }
            todos.push(addTask.todoInput);
            console.log("\n\r ====To DO LIST==== \n\r");
            for (let i = 0; i < todos.length; i++) {
                console.log(`${i + 1}: ${todos[i]}`);
            }
            console.log("\n\r ================== \n\r");
            let confirmAddMore = await inquirer.prompt({
                name: "confirm",
                type: "confirm",
                message: "Do you want to add more?",
                default: false,
            });
            if (!confirmAddMore.confirm) {
                break;
            }
        }
    }
    else if (ask.action === "Update") {
        let updateTask = await inquirer.prompt([
            {
                name: "updateInput",
                type: "list",
                choices: todos,
                message: "Select a task to update:",
            },
            {
                name: "newTask",
                type: "input",
                message: "Enter the updated task:",
            },
        ]);
        let indexToUpdate = todos.indexOf(updateTask.updateInput);
        todos[indexToUpdate] = updateTask.newTask;
        console.log("\n\r ====To DO LIST====");
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i + 1}: ${todos[i]}`);
        }
        console.log("\n\r ================== \n\r");
    }
    else if (ask.action === "Remove") {
        let removeTask = await inquirer.prompt([
            {
                name: "removeInput",
                type: "list",
                choices: todos,
                message: "Select a task to remove from your todos:",
            },
        ]);
        let indexToRemove = todos.indexOf(removeTask.removeInput);
        todos.splice(indexToRemove, 1);
        console.log("\n\r ====To DO LIST====");
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i + 1}: ${todos[i]}`);
        }
        console.log("\n\r ================== \n\r");
    }
    else {
        console.log("EXIT...");
        break;
    }
}
