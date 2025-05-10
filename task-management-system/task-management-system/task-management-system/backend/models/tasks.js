const mongoose = require('mongoose');

// Module schema for task
const moduleSchema = new mongoose.Schema({
    title: String,
    description: String,
});

// Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Reference to the Project model
        required: true,
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Reference to the Employee model for assignee
        required: true, // Assignee is required
    },
    modules: {
        type: [moduleSchema], // Array of module schemas
        required: true, // Modules are required
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'], // Task status options
        default: 'Pending', // Default status
    },
});

module.exports = mongoose.model('Task', taskSchema);