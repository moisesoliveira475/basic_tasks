let taskCount = 0;

// Função para criar elementos
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

const taskInput = document.getElementById(`task-input`);

// Função para criar item na lista de tarefas
function createTaskListItem(taskInputValue) {
    const taskListItem = createElement(`div`, taskInputValue, `task-list-item`);
    const removeButton = createElement(`button`, `Remover`, `btn-rm-tasks`, () => {
    removeTaskListItem(taskListItem);
});
    taskListItem.appendChild(removeButton);
    return taskListItem
}
// Função para remover item da lista de tarefas
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
// Função para adicionar tarefa
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
// função para atualização do contador de tarefas
function updateTaskCount() {
    const taskCountElement = document.getElementById(`task-count`);
    taskCountElement.textContent = taskCount;
}
// 
taskInput.addEventListener(`keydown`, (event) => {
    if (event.key === `Enter` && taskInput.value.trim() !== ``) {
        addTask()
    }
});