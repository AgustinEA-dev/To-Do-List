// Definir el nodo de la lista enlazada
class Node {
    constructor(data) {
        this.data = data; // Datos del nodo (tarea)
        this.next = null; // Siguiente nodo en la lista
    }
}

//Definir la lista enlazada

class SingleLinkedList {
    constructor() {
        this.head = null; // Cabeza de la lista
        this.size = 0; // Número de elementos en la lista
    }

    // Agregar una tarea al final de la lista
    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Eliminar una tarea específica
    remove(data) {
        if (!this.head) return;

        // Si la tarea está en la cabeza
        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;
        while (current.next && current.next.data !== data) {
            current = current.next;
        }

        if (current.next) {
            current.next = current.next.next;
            this.size--;
        }
    }

    // Eliminar todas las tareas
    clearAll() {
        this.head = null;
        this.size = 0;
    }

    // Mostrar todas las tareas (devolverlas como un array)
    show() {
        let tasks = [];
        let current = this.head;
        while (current) {
            tasks.push(current.data);
            current = current.next;
        }
        return tasks;
    }
}

// Crear una instancia de la lista enlazada
const toDoList = new SingleLinkedList();

// Cargar las tareas desde localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => toDoList.add(task));
}

// Guardar las tareas en localStorage
function saveTasks() {
    const tasks = toDoList.show();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para agregar tarea y actualizar la vista
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        toDoList.add(task);
        taskInput.value = ''; // Limpiar el campo de entrada
        saveTasks()
        renderList(true);
    }
}

// Función para renderizar la lista en el HTML
// Función para renderizar la lista en el HTML
function renderList(isNewTask = false) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpiar lista antes de renderizar

    const tasks = toDoList.show();
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        // Si es una tarea nueva, aplicar la clase 'new-task' para animación
        if (isNewTask && index === tasks.length - 1) {
            li.classList.add('new-task');
        }

        // Crear un botón de eliminación
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => removeTask(task, li); // Eliminar tarea al hacer clic

        // Añadir el botón al elemento li
        li.appendChild(deleteButton);

        // Añadir el li a la lista ul
        taskList.appendChild(li);
    });
}

// Función para eliminar una tarea específica
function removeTask(task, liElement) {
    toDoList.remove(task);
    liElement.classList.add('removed');
    setTimeout(() => {
        saveTasks(); // Guardar tareas en localStorage después de eliminar
        renderList(); // Actualizar la vista
    }, 500); // 500ms (el tiempo de la animación de desaparición)
}
// Función para eliminar todas las tareas
function clearAllTasks() {
    toDoList.clearAll();
    saveTasks()
    renderList();
}

// Cargar las tareas cuando se cargue la página
window.onload = function () {
    loadTasks(); // Cargar las tareas desde localStorage
    renderList(); // Renderizar la lista de tareas
}

const addTaskButton = document.getElementById("addTaskButton")
addTaskButton.addEventListener("click", () => addTask())