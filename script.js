let taskCount = 0;

function addTask() {
    const taskInput = document.getElementById(`task-input`);
    const taskList = document.getElementById(`task-list`);

    if (taskInput.value.trim() !== ``) {
        taskCount ++;
        const taskListItem = document.createElement(`div`)
        taskListItem.classList.add(`task-list-item`);
        taskListItem.textContent = taskInput.value;
        taskList.appendChild(taskListItem)
        updateTaskCount();
        taskInput.value = ``;
        console.log(taskList)
    }
}
function updateTaskCount() {
    const taskCountElement = document.getElementById(`task-count`);
    taskCountElement.textContent = taskCount;
}

const taskList = document.querySelector(`div.task-list-item`);

function rmTasks() {
    taskList.value = ``
}