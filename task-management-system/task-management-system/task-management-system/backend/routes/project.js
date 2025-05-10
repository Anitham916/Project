const express = require('express');
const router = express.Router();
const Project = require('../models/projects');

// Create a new project
router.post('/project', async (req, res) => {
  try {
    const { title, client, modules, domain, user } = req.body;

    // Validate and map modules with user field
    const formattedModules = modules.map((mod) => ({
      title: mod.title,
      description: mod.description,
    }));

    const newProject = new Project({
      title,
      client,
      domain,
      modules: formattedModules,
      user,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing project
router.put('/project/:id', async (req, res) => {
  try {
    const { title, client, modules, domain, user } = req.body;

    const formattedModules = modules.map((mod) => ({
      title: mod.title,
      description: mod.description,
      user: mod.user,
    }));

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        client,
        domain,
        modules: formattedModules,
        user,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Project statistics
router.get('/project-stats', async (req, res) => {
  try {
    const totalProject = await Project.countDocuments();
    res.status(200).json({ totalProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a project
router.delete('/project/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
