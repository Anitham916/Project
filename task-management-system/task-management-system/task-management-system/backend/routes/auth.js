const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Employee = require('../models/employees');

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, role} = req.body;
        let user = null;
        let passwordCheck = false;

        if(role === 'admin'){
          user = await User.findOne({ email });
          passwordCheck =  bcrypt.compareSync(password, user.password)
        }
        else{
           user =  await Employee.findOne({ email });
           passwordCheck =  password === user.employee_id
        }
        if (!user || !passwordCheck) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.json({
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            role : role
          });
          
    } catch (error) {
        res.status(500).json({ message: error });
    }
});
module.exports = router;
