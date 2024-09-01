// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const { exec } = require('child_process');
// const mongoose = require('mongoose');
// const UserModel = require("./signupp.js")
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// const mongoUri = process.env.DATABASE;
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

//     const nodemailer = require('nodemailer');

//     // Nodemailer transporter setup using Gmail
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });
    
//     const jwt = require('jsonwebtoken');

// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email });
//         if (user && user.password === password) {
//             const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
//                 expiresIn: '1h'
//             });

//             res.json({
//                 status: "success",
//                 token: token,
//                 user: { firstName: user.fullname.split(' ')[0] }
//             });
//         } else {
//             res.status(401).json({ status: "error", message: "Incorrect email or password" });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ status: "error", message: "An error occurred" });
//     }
// });

//     app.post('/api/signup', async (req, res) => {
//     const { email, fullname, password } = req.body; // Extract fullname

//     // Check if the user already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//     const otpExpiration = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

//     // Save user with OTP and fullname
//     const newUser = new UserModel({ email, fullname, password, otp, otpExpires: otpExpiration });
//     await newUser.save();

//     // Send OTP via email
//     const mailOptions = {
//         from: 'vinitkeshavorg@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).json({ message: 'Error sending OTP email', error });
//         } else {
//             res.status(200).json({ message: 'Signup successful, OTP sent to your email' });
//         }
//     });
// });

//     app.post('/api/verify-otp', async (req, res) => {
//         const { email, otp } = req.body;
    
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }
    
//         if (user.otp !== otp) {
//             return res.status(400).json({ message: 'Invalid OTP' });
//         }
    
//         if (Date.now() > user.otpExpiration) {
//             return res.status(400).json({ message: 'OTP has expired' });
//         }
    
//         // OTP is valid, remove it from the database
//         user.otp = null;
//         user.otpExpiration = null;
//         await user.save();
    
//         res.status(200).json({ message: 'OTP verified successfully' });
//     });
        

// const errorDictionary = {
//     "; expected": {
//         type: "Syntax Error",
//         explanation: "It looks like you're missing a semicolon at the end of a statement. In Java, every statement must end with a semicolon.",
//         suggestion: "Add a semicolon at the end of the line.",
//         resources: [
//             { title: "Java Syntax Rules", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html" }
//         ]
//     },
//     "cannot find symbol": {
//         type: "OOP Concept Error",
//         explanation: "This error usually occurs when you're trying to use a variable, method, or class that hasn't been defined.",
//         suggestion: "Check if you've spelled the name correctly or if you need to import a class or define a method/variable.",
//         resources: [
//             { title: "Understanding Java Variables", url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/variables.html" }
//         ]
//     },
//     // Add more error patterns here
// };

// app.post('/api/compile', async (req, res) => {
//     const code = req.body.code;
//     const className = req.body.className || 'Temp'; // Default to 'Temp' if no class name is provided
//     const fileName = `${className}.java`;

//     // Save the code to the specified class name
//     fs.writeFileSync(fileName, code);

//     exec(`javac ${fileName}`, (error, stdout, stderr) => {
//         if (error) {
//             const errorMessage = stderr;
//             let explanation = "Unknown error. Please check your code.";
//             let suggestions = [];
//             let resources = [];

//             for (let [key, value] of Object.entries(errorDictionary)) {
//                 if (errorMessage.includes(key)) {
//                     explanation = value.explanation;
//                     suggestions.push(value.suggestion);
//                     resources = value.resources;
//                     break;
//                 }
//             }

//             // Save the code and its output to MongoDB (optional)
        

//             return res.json({
//                 success: false,
//                 output: errorMessage,
//                 explanation: explanation,
//                 suggestions: suggestions,
//                 resources: resources
//             });
//         }

//         // If compilation is successful, run the compiled program
//         exec(`java ${className}`, (error, stdout, stderr) => {
//             if (error) {
//                 return res.json({
//                     success: false,
//                     output: stderr
//                 });
//             }


//             res.json({ success: true, output: stdout });

//             // Clean up the generated .class file after running the program
//             const classFileName = `${className}.class`;
//             if (fs.existsSync(classFileName)) {
//                 fs.unlinkSync(classFileName);
//             }
//         });
//     });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const UserModel = require("./signupp.js");
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// const mongoUri = process.env.DATABASE;
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// const nodemailer = require('nodemailer');

// // Nodemailer transporter setup using Gmail
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const jwt = require('jsonwebtoken');

// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email });
//         if (user && user.password === password) {
//             const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
//                 expiresIn: '1h'
//             });

//             res.json({
//                 status: "success",
//                 token: token,
//                 user: { firstName: user.fullname.split(' ')[0] }
//             });
//         } else {
//             res.status(401).json({ status: "error", message: "Incorrect email or password" });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ status: "error", message: "An error occurred" });
//     }
// });


// app.post('/api/signup', async (req, res) => {
//     const { email, fullname, password } = req.body;

//     // Check if the user already exists in the database (after verification)
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiration = Date.now() + 15 * 60 * 1000;

//     // Store OTP and expiration time in memory (or session)
//     // Ideally, this would be in some in-memory store like Redis
//     req.session = { otp, otpExpiration, email, fullname, password };

//     // Send OTP via email
//     const mailOptions = {
//         from: 'vinitkeshavorg@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).json({ message: 'Error sending OTP email', error });
//         } else {
//             res.status(200).json({ message: 'OTP sent to your email' });
//         }
//     });
// });

// app.post('/api/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;

//     // Validate OTP
//     if (req.session.email !== email || req.session.otp !== otp) {
//         return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     if (Date.now() > req.session.otpExpiration) {
//         return res.status(400).json({ message: 'OTP has expired' });
//     }

//     // OTP is valid, store the user in the database
//     const newUser = new UserModel({
//         email: req.session.email,
//         fullname: req.session.fullname,
//         password: req.session.password,
//     });
//     await newUser.save();

//     // Clear session data
//     req.session = null;

//     res.status(200).json({ message: 'OTP verified successfully. You are now registered!' });
// });

// // Compile Java code using JDoodle API
// app.post('/api/compile', async (req, res) => {
//     const { code, className } = req.body;
//     const javaCode = code || `
//         public class ${className || 'Temp'} {
//             public static void main(String[] args) {
//                 System.out.println("Hello, World!");
//             }
//         }
//     `;

//     const program = {
//         script: javaCode,
//         language: "java",
//         versionIndex: "4",
//         clientId: process.env.JDOODLE_CLIENT_ID,
//         clientSecret: process.env.JDOODLE_CLIENT_SECRET,
//     };

//     try {
//         const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
//         const data = response.data;

//         if (data.error) {
//             res.json({
//                 success: false,
//                 output: data.error,
//             });
//         } else {
//             res.json({
//                 success: true,
//                 output: data.output,
//             });
//         }
//     } catch (error) {
//         console.error('Error compiling code:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to compile code',
//         });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const session = require('express-session');
// const UserModel = require("./signupp.js");
// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Session middleware setup
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using HTTPS
// }));

// // MongoDB connection
// const mongoUri = process.env.DATABASE;
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// const nodemailer = require('nodemailer');

// // Nodemailer transporter setup using Gmail
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const jwt = require('jsonwebtoken');

// // Login route
// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email });
//         if (user && user.password === password) {
//             const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
//                 expiresIn: '1h'
//             });

//             res.json({
//                 status: "success",
//                 token: token,
//                 user: { firstName: user.fullname.split(' ')[0] }
//             });
//         } else {
//             res.status(401).json({ status: "error", message: "Incorrect email or password" });
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ status: "error", message: "An error occurred" });
//     }
// });

// // Signup route with OTP generation
// app.post('/api/signup', async (req, res) => {
//     const { email, fullname, password } = req.body;

//     // Check if the user already exists in the database (after verification)
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiration = Date.now() + 15 * 60 * 1000;

//     // Store OTP and expiration time in the session
//     req.session.otp = otp;
//     req.session.otpExpiration = otpExpiration;
//     req.session.email = email;
//     req.session.fullname = fullname;
//     req.session.password = password;

//     // Send OTP via email
//     const mailOptions = {
//         from: 'vinitkeshavorg@gmail.com',
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).json({ message: 'Error sending OTP email', error });
//         } else {
//             res.status(200).json({ message: 'OTP sent to your email' });
//         }
//     });
// });

// // OTP verification route
// app.post('/api/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;

//     // Validate OTP
//     if (req.session.email !== email || req.session.otp !== otp) {
//         return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     if (Date.now() > req.session.otpExpiration) {
//         return res.status(400).json({ message: 'OTP has expired' });
//     }

//     // OTP is valid, store the user in the database
//     const newUser = new UserModel({
//         email: req.session.email,
//         fullname: req.session.fullname,
//         password: req.session.password,
//     });
//     await newUser.save();

//     // Clear session data
//     req.session.destroy();

//     res.status(200).json({ message: 'OTP verified successfully. You are now registered!' });
// });

// // Compile Java code using JDoodle API
// app.post('/api/compile', async (req, res) => {
//     const { code, className } = req.body;
//     const javaCode = code || `
//         public class ${className || 'Temp'} {
//             public static void main(String[] args) {
//                 System.out.println("Hello, World!");
//             }
//         }
//     `;

//     const program = {
//         script: javaCode,
//         language: "java",
//         versionIndex: "4",
//         clientId: process.env.JDOODLE_CLIENT_ID,
//         clientSecret: process.env.JDOODLE_CLIENT_SECRET,
//     };

//     try {
//         const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
//         const data = response.data;

//         if (data.error) {
//             res.json({
//                 success: false,
//                 output: data.error,
//             });
//         } else {
//             res.json({
//                 success: true,
//                 output: data.output,
//             });
//         }
//     } catch (error) {
//         console.error('Error compiling code:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to compile code',
//         });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const session = require('express-session');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
// const UserModel = require("./signupp.js");
// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Session middleware setup
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true if using HTTPS
// }));

// // MongoDB connection
// const mongoUri = process.env.DATABASE;
// mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Nodemailer transporter setup using Gmail
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// // Generate OTP function
// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
// };

// // Signup route with OTP generation
// app.post('/api/signup', async (req, res) => {
//     const { email, fullname, password } = req.body;

//     // Check if the user already exists in the database
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }

//     // Generate OTP
//     const otp = generateOTP();
//     const otpExpiration = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes

//     // Store the new user with OTP and set isVerified to false
//     const newUser = new UserModel({
//         email,
//         fullname,
//         password,
//         otp,
//         otpExpires: otpExpiration,
//         isVerified: false // Initially not verified
//     });

//     await newUser.save();

//     console.log("OTP generated and stored in database:", otp);

//     // Send OTP via email
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Your OTP Code',
//         text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error("Error sending OTP email:", error);
//             return res.status(500).json({ message: 'Error sending OTP email', error });
//         } else {
//             console.log("OTP sent to email:", email);
//             res.status(200).json({ message: 'Signup successful. Please verify your email.' });
//         }
//     });
// });

// app.post('/api/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;

//     // Find the user in the database
//     const user = await UserModel.findOne({ email });

//     if (!user) {
//         return res.status(400).json({ message: 'Invalid request.' });
//     }

//     // Check if the OTP matches and has not expired
//     if (user.otp !== otp) {
//         return res.status(400).json({ message: 'Invalid OTP.' });
//     }

//     if (Date.now() > user.otpExpires) {
//         return res.status(400).json({ message: 'OTP expired.' });
//     }

//     // OTP is correct and not expired; set isVerified to true and clear OTP
//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;

//     await user.save();

//     res.status(200).json({ message: 'OTP verified successfully. You are now registered!' });
// });

// // Compile Java code using JDoodle API
// app.post('/api/compile', async (req, res) => {
//     const { code, className } = req.body;
//     const javaCode = code || `
//         public class ${className || 'Temp'} {
//             public static void main(String[] args) {
//                 System.out.println("Hello, World!");
//             }
//         }
//     `;

//     const program = {
//         script: javaCode,
//         language: "java",
//         versionIndex: "4",
//         clientId: process.env.JDOODLE_CLIENT_ID,
//         clientSecret: process.env.JDOODLE_CLIENT_SECRET,
//     };

//     try {
//         const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
//         const data = response.data;

//         if (data.error) {
//             res.json({
//                 success: false,
//                 output: data.error,
//             });
//         } else {
//             res.json({
//                 success: true,
//                 output: data.output,
//             });
//         }
//     } catch (error) {
//         console.error('Error compiling code:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to compile code',
//         });
//     }
// });
// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ status: "error", message: "User not found" });
//         }

//         if (!user.isVerified) {
//             return res.status(401).json({ status: "error", message: "Please verify your email before logging in." });
//         }

//         if (user.password !== password) {
//             return res.status(401).json({ status: "error", message: "Incorrect email or password" });
//         }

//         const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
//             expiresIn: '1h'
//         });

//         res.json({
//             status: "success",
//             token: token,
//             user: { firstName: user.fullname.split(' ')[0] }
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ status: "error", message: "An error occurred" });
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const session = require('express-session');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const UserModel = require("./signupp.js");
const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Add your frontend URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(bodyParser.json());

// Session middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true if using HTTPS
}));

// MongoDB connection
const mongoUri = process.env.DATABASE;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Nodemailer transporter setup using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate OTP function
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

// Signup route with OTP generation
app.post('/api/signup', async (req, res) => {
    const { email, fullname, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiration = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes

    // Store the new user with OTP and set isVerified to false
    const newUser = new UserModel({
        email,
        fullname,
        password,
        otp,
        otpExpires: otpExpiration,
        isVerified: false // Initially not verified
    });

    await newUser.save();

    console.log("OTP generated and stored in database:", otp);

    // Send OTP via email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 15 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending OTP email:", error);
            return res.status(500).json({ message: 'Error sending OTP email', error });
        } else {
            console.log("OTP sent to email:", email);
            res.status(200).json({ message: 'OTP sent. Please verify your email.' });
        }
    });
});

app.post('/api/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    // Find the user in the database
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid request.' });
    }

    // Check if the OTP matches and has not expired
    if (user.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (Date.now() > user.otpExpires) {
        return res.status(400).json({ message: 'OTP expired.' });
    }

    // OTP is correct and not expired; set isVerified to true and clear OTP
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.status(200).json({ message: 'OTP verified successfully. You are now registered!' });
});

// Compile Java code using JDoodle API
app.post('/api/compile', async (req, res) => {
    const { code, className } = req.body;
    const javaCode = code || `
        public class ${className || 'Temp'} {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
            }
        }
    `;

    const program = {
        script: javaCode,
        language: "java",
        versionIndex: "4",
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    };

    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
        const data = response.data;

        if (data.error) {
            res.json({
                success: false,
                output: data.error,
            });
        } else {
            res.json({
                success: true,
                output: data.output,
            });
        }
    } catch (error) {
        console.error('Error compiling code:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to compile code',
        });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: "error", message: "User not found" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ status: "error", message: "Your email is not verified. Please verify your account." });
        }

        if (user.password !== password) {
            return res.status(401).json({ status: "error", message: "Incorrect email or password" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({
            status: "success",
            token: token,
            user: { firstName: user.fullname.split(' ')[0] }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: "error", message: "An error occurred" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
