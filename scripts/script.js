class Node {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class SingleLinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }

    add(data) {
        const newNode = new Node(data)
        if (!this.head) {
            this.head = newNode
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.size++
    }

    remove(data) {
        if (!this.head) return;

        if (this.head.data === data) {
            this.head = this.head.next
            this.size--
            return;
        }

        let current = this.head;
        while (current.next && current.next.data !== data) {
            current = current.next
        }

        if (current.next) {
            current.next = current.next.next
            this.size--
        }
    }

    clearAll() {
        this.head = null
        this.size = 0
    }

    show() {
        let tasks = []
        let current = this.head
        while (current) {
            tasks.push(current.data)
            current = current.next
        }
        return tasks;
    }
}

const toDoList = new SingleLinkedList();

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => toDoList.add(task))
}

function saveTasks() {
    const tasks = toDoList.show();
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTask() {
    const taskInput = document.getElementById('taskInput')
    const task = taskInput.value.trim()
    if (task) {
        toDoList.add(task)
        taskInput.value = ''
        saveTasks()
        renderList(true)
    }
}

function renderList(isNewTask = false) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''

    const tasks = toDoList.show()

    if (!tasks.length) {
        taskList.innerHTML = "No tasks yet!"
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task

        if (isNewTask && index === tasks.length - 1) {
            li.classList.add('new-task')
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeTask(task, li);

        li.appendChild(deleteButton)

        taskList.appendChild(li)
    });
}

function removeTask(task, liElement) {
    toDoList.remove(task)
    liElement.classList.add('removed');
    setTimeout(() => {
        saveTasks()
        renderList()
    }, 500)
}

function clearAllTasks() {
    toDoList.clearAll()
    saveTasks()
    renderList()
}

window.onload = function () {
    loadTasks()
    renderList()
}

const addTaskButton = document.getElementById("addTaskButton")
addTaskButton.addEventListener("click", () => addTask())