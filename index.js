require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const UserModel = require("./signupp.js")
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = process.env.DATABASE;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    const nodemailer = require('nodemailer');

    // Nodemailer transporter setup using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const jwt = require('jsonwebtoken');

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user && user.password === password) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.json({
                status: "success",
                token: token,
                user: { firstName: user.fullname.split(' ')[0] }
            });
        } else {
            res.status(401).json({ status: "error", message: "Incorrect email or password" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "error", message: "An error occurred" });
    }
});

    app.post('/api/signup', async (req, res) => {
    const { email, fullname, password } = req.body; // Extract fullname

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiration = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    // Save user with OTP and fullname
    const newUser = new UserModel({ email, fullname, password, otp, otpExpires: otpExpiration });
    await newUser.save();

    // Send OTP via email
    const mailOptions = {
        from: 'vinitkeshavorg@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending OTP email', error });
        } else {
            res.status(200).json({ message: 'Signup successful, OTP sent to your email' });
        }
    });
});

    app.post('/api/verify-otp', async (req, res) => {
        const { email, otp } = req.body;
    
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
    
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    
        if (Date.now() > user.otpExpiration) {
            return res.status(400).json({ message: 'OTP has expired' });
        }
    
        // OTP is valid, remove it from the database
        user.otp = null;
        user.otpExpiration = null;
        await user.save();
    
        res.status(200).json({ message: 'OTP verified successfully' });
    });
        

const errorDictionary = {
    "; expected": {
        type: "Syntax Error",
        explanation: "It looks like you're missing a semicolon at the end of a statement. In Java, every statement must end with a semicolon.",
        suggestion: "Add a semicolon at the end of the line.",
        resources: [
            { title: "Java Syntax Rules", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html" }
        ]
    },
    "cannot find symbol": {
        type: "OOP Concept Error",
        explanation: "This error usually occurs when you're trying to use a variable, method, or class that hasn't been defined.",
        suggestion: "Check if you've spelled the name correctly or if you need to import a class or define a method/variable.",
        resources: [
            { title: "Understanding Java Variables", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html" }
        ]
    },
    // Add more error patterns here
};

app.post('/api/compile', async (req, res) => {
    const code = req.body.code;
    const className = req.body.className || 'Temp'; // Default to 'Temp' if no class name is provided
    const fileName = `${className}.java`;

    // Save the code to the specified class name
    fs.writeFileSync(fileName, code);

    exec(`javac ${fileName}`, (error, stdout, stderr) => {
        if (error) {
            const errorMessage = stderr;
            let explanation = "Unknown error. Please check your code.";
            let suggestions = [];
            let resources = [];

            for (let [key, value] of Object.entries(errorDictionary)) {
                if (errorMessage.includes(key)) {
                    explanation = value.explanation;
                    suggestions.push(value.suggestion);
                    resources = value.resources;
                    break;
                }
            }

            // Save the code and its output to MongoDB (optional)
        

            return res.json({
                success: false,
                output: errorMessage,
                explanation: explanation,
                suggestions: suggestions,
                resources: resources
            });
        }

        // If compilation is successful, run the compiled program
        exec(`java ${className}`, (error, stdout, stderr) => {
            if (error) {
                return res.json({
                    success: false,
                    output: stderr
                });
            }


            res.json({ success: true, output: stdout });

            // Clean up the generated .class file after running the program
            const classFileName = `${className}.class`;
            if (fs.existsSync(classFileName)) {
                fs.unlinkSync(classFileName);
            }
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
