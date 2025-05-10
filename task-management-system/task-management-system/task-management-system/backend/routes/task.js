const express = require('express');
const router = express.Router();
const Task = require('../models/tasks'); // Make sure your model is named Task

// Create Task
router.post('/tasks', async (req, res) => {
  try {
    const {
      title,
      project,
      modules,
      assignee,
    } = req.body;

    const newTask = new Task({
      title,
      project,
      modules,
      assignee,
    });

    await newTask.save();
    var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arunadevi5553aruna@gmail.com',
            pass: 'bgip ookx gfqw kqtd'
        }
        });

        var mailOptions = {
        from: 'arunadevi5553aruna@gmail.com',
        to: 'aruna9750devi@gmail.com',
        subject: 'Sending Email using Node.js',
        html: '<h1>Task Created</h1><p>Task Title: ' + title + '</p><p>Project: ' + project + '</p><p>Modules: ' + modules + '</p><p>Assignee: ' + assignee + '</p>'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201).json({ message: 'Task added successfully' });
        }
        });
        
    } catch (error) {
        res.status(500).json({ message: error });
    }
}); 

// Get All Tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('project').populate('assignee');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Update Task
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    


    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Delete Task
router.delete('/task/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});


// Get Task Stats
router.get('/tasks-stats', async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ status: 'Pending' });
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });

    const tasksStats = {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
    };

    res.status(200).json(tasksStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});




module.exports = router;
