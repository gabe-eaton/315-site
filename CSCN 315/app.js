// app.js
import Task from './objects.js';

class TaskManager {
    constructor() {
        this.tasks = [];
        this.taskListElement = document.getElementById('taskList');
        this.taskForm = document.getElementById('taskForm');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });
    }

    addTask() {
        const titleInput = document.getElementById('titleInput');
        const descriptionInput = document.getElementById('descriptionInput');
        const dueDateInput = document.getElementById('dueDateInput');

        const title = titleInput.value;
        const description = descriptionInput.value;
        const dueDate = dueDateInput.value ? new Date(dueDateInput.value) : null;

        const task = new Task(title, description, dueDate);
        this.tasks.push(task);
        this.renderTasks();

        // Reset form
        titleInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';
    }

    renderTasks() {
        this.taskListElement.innerHTML = '';
        this.tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            if (task.isCompleted) taskElement.classList.add('completed');

            taskElement.innerHTML = `
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <small>Due: ${task.dueDate ? task.dueDate.toLocaleDateString() : 'No due date'}</small>
                <div>
                    <button onclick="completeTask('${task.id}')">Complete</button>
                    <button onclick="deleteTask('${task.id}')">Delete</button>
                </div>
            `;

            this.taskListElement.appendChild(taskElement);
        });
    }

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.markAsCompleted();
            this.renderTasks();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.renderTasks();
    }
}

// Initialize the Task Manager when the page loads
const taskManager = new TaskManager();

// Expose methods globally for inline event handlers
window.completeTask = (taskId) => taskManager.completeTask(taskId);
window.deleteTask = (taskId) => taskManager.deleteTask(taskId);