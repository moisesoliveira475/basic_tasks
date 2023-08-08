/**
 * @file This file contains functions to manage a task list.
 * @version 1.0.0
 */

/**
 * @type {number} taskCount - The number of tasks in the list
 */

let taskCount = 0;

/**
 * Creates an HTML element with the specified tag name, text content, class name, and event listener.
 * @param {string} tagName - The tag name of the element to create
 * @param {string} [textContent] - The text content of the element to create
 * @param {string} [className] - The class name of the element to create
 * @param {function} [eventListener] - The event listener function for the element to create
 * @returns {HTMLElement} The created HTML element
 */

function createElement(tagName, textContent, className, eventListener) {
    const element = document.createElement(tagName);
    if (textContent) {
        element.textContent = textContent;
    }
    if (className) {
        element.classList.add(className);
    }
    if (eventListener) {
        element.addEventListener(`click`, eventListener);
    }
    return element
}

/**
 * The input element for adding tasks
 * @type {HTMLInputElement}
 */

const taskInput = document.getElementById(`task-input`);

/**
 * Creates a task list item with the specified task input value.
 * @param {string} taskInputValue - The value of the task input
 * @returns {HTMLElement} The created task list item
 */

function createTaskListItem(taskInputValue) {
    const taskListItem = createElement(`div`, taskInputValue, `task-list-item`);
    const removeButton = createElement(`button`, `Remover`, `btn-rm-tasks`, () => {
    removeTaskListItem(taskListItem);
});
    const finishButton = createElement(`button`, `Concluir`, `btn-finish-task`, () => {
    completeTaskListItem(taskListItem);
    });

    taskListItem.appendChild(finishButton);
    taskListItem.appendChild(removeButton);
    return taskListItem
};

/**
 * Completes the specified task list item.
 * @param {HTMLElement} taskListItem - The task list item to complete
 */

function completeTaskListItem(taskListItem) {
    taskListItem.classList.add(`completed`);
    const completedTaskList = document.getElementById(`completed-task-list`);
    completedTaskList.appendChild(taskListItem);
    taskCount--;
    updateTaskCount();
};

/**
 * Removes the specified task list item.
 * @param {HTMLElement} taskListItem - The task list item to remove
 */

function removeTaskListItem(taskListItem) {
    taskListItem.classList.add(`removing`);
    setTimeout(() => {
        taskListItem.remove();
        taskCount--;
        updateTaskCount();
        if (taskCount === 0) {
            taskListItem.classList.remove(`removing`);
        }
    }, 300);
    if (taskCount === 1) {
        taskListItem.classList.add(`removing`);
    }
}

/**
 * Adds a task to the task list.
 */

function addTask() {
    const taskList = document.getElementById(`task-list`);
    if (taskInput.value.trim() !== ``) {
        taskCount++;
        const taskListItem = createTaskListItem(taskInput.value);
        taskList.appendChild(taskListItem);
        updateTaskCount();
        taskInput.value = ``;
    }
}

/**
 * Updates the task count element with the current task count.
 */

function updateTaskCount() {
    const taskCountElement = document.getElementById(`task-count`);
    taskCountElement.textContent = taskCount;
}

taskInput.addEventListener(`keydown`, (event) => {
    if (event.key === `Enter` && taskInput.value.trim() !== ``) {
        addTask()
    }
});