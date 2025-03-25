// objects.js
class Task {
    /**
     * Constructor for creating a new Task
     * @param {string} title - The title of the task
     * @param {string} description - Detailed description of the task
     * @param {Date} dueDate - Optional due date for the task
     */
    constructor(title, description, dueDate = null) {
        // Unique identifier for the task
        this.id = Date.now().toString();
        
        // Core task properties
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        
        // Task status tracking
        this.isCompleted = false;
        this.createdAt = new Date();
        this.completedAt = null;
    }

    /**
     * Marks the task as completed
     * @returns {void}
     */
    markAsCompleted() {
        if (!this.isCompleted) {
            this.isCompleted = true;
            this.completedAt = new Date();
        }
    }

    /**
     * Updates the task details
     * @param {Object} updates - Object containing properties to update
     */
    update(updates) {
        Object.keys(updates).forEach(key => {
            if (['title', 'description', 'dueDate'].includes(key)) {
                this[key] = updates[key];
            }
        });
    }

    /**
     * Resets the task to its original state
     */
    reset() {
        this.isCompleted = false;
        this.completedAt = null;
    }

    /**
     * Generates a formatted string representation of the task
     * @returns {string} Formatted task details
     */
    toString() {
        return `Task: ${this.title}
Description: ${this.description}
Due: ${this.dueDate ? this.dueDate.toLocaleDateString() : 'No due date'}
Status: ${this.isCompleted ? 'Completed' : 'Pending'}`;
    }

    /**
     * Calculates days remaining until due date
     * @returns {number|null} Days remaining or null if no due date
     */
    getDaysRemaining() {
        if (!this.dueDate) return null;
        const today = new Date();
        const timeDiff = this.dueDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
}

export default Task;