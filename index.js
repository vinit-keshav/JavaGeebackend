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
// const redis = require('redis');

// app.use(cors());
// app.use(bodyParser.json());
// // Create Redis client
// const client = redis.createClient({
//     host: process.env.REDIS_HOST || '127.0.0.1',
//     port: process.env.REDIS_PORT || 6379
// });

// // Event listener for successful connection
// client.on('connect', () => {
//     console.log('Redis client connected successfully');
// });

// // Event listener for errors
// client.on('error', (err) => {
//     console.error('Redis connection error:', err);
// });

// // Event listener for reconnect attempts
// client.on('reconnecting', () => {
//     console.log('Attempting to reconnect to Redis...');
// });

// // Optionally, you can test the connection manually like this
// client.ping((err, result) => {
//     if (err) {
//         console.error('Error pinging Redis:', err);
//     } else {
//         console.log('Redis ping response:', result); // Should return "PONG" if connected
//     }
// });

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
// // app.post('/api/compile', async (req, res) => {
// //     const { code, className } = req.body;
// //     const javaCode = code || `
// //         public class ${className || 'Temp'} {
// //             public static void main(String[] args) {
// //                 System.out.println("Hello, World!");
// //             }
// //         }
// //     `;

// //     const program = {
// //         script: javaCode,
// //         language: "java",
// //         versionIndex: "4",
// //         clientId: process.env.JDOODLE_CLIENT_ID,
// //         clientSecret: process.env.JDOODLE_CLIENT_SECRET,
// //     };

// //     try {
// //         const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
// //         const data = response.data;

// //         if (data.error) {
// //             res.json({
// //                 success: false,
// //                 output: data.error,
// //             });
// //         } else {
// //             res.json({
// //                 success: true,
// //                 output: data.output,
// //             });
// //         }
// //     } catch (error) {
// //         console.error('Error compiling code:', error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'Failed to compile code',
// //         });
// //     }
// // });
// app.post('/api/compile', async (req, res) => {
//     const { code, className } = req.body;
//     const javaCode = code || `
//         public class ${className || 'Temp'} {
//             public static void main(String[] args) {
//                 System.out.println("Hello, World!");
//             }
//         }
//     `;
    
//     const cacheKey = `compile:${javaCode}`;

//     // Check if the result is in Redis cache
//     client.get(cacheKey, async (err, cachedResult) => {
//         if (err) {
//             console.error('Redis error:', err);
//             return res.status(500).json({ success: false, message: 'Redis error' });
//         }

//         // If cached result exists, return it
//         if (cachedResult) {
//             return res.json({ success: true, output: cachedResult });
//         }

//         // Otherwise, compile the code using JDoodle API
//         const program = {
//             script: javaCode,
//             language: "java",
//             versionIndex: "4",
//             clientId: process.env.JDOODLE_CLIENT_ID,
//             clientSecret: process.env.JDOODLE_CLIENT_SECRET,
//         };

//         try {
//             const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
//             const data = response.data;

//             // Cache the result in Redis with a TTL of 1 hour (3600 seconds)
//             if (!data.error) {
//                 client.setex(cacheKey, 3600, data.output);
//             }

//             res.json({
//                 success: !data.error,
//                 output: data.output || data.error,
//             });
//         } catch (error) {
//             console.error('Error compiling code:', error);
//             res.status(500).json({
//                 success: false,
//                 message: 'Failed to compile code',
//             });
//         }
//     });
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


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const session = require('express-session');
// const nodemailer = require('nodemailer');
// const jwt = require('jsonwebtoken');
// const redis = require('redis');
// const UserModel = require("./signupp.js");
// const CodeModel = require("./code.js");


// const app = express();

// // CORS configuration
// const corsOptions = {
//     origin: process.env.CORS_ORIGIN, // Add your frontend URL here
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
//     credentials: true, // Allow cookies and authorization headers
// };

// app.use(cors(corsOptions)); // Use CORS with the specified options
// app.use(bodyParser.json());

// // Create Redis client
// // const client = redis.createClient({
// //     socket: {
// //         host: process.env.REDIS_HOST ,
// //         port: process.env.REDIS_PORT
// //     }
// // });
// const client = redis.createClient({
//     url: process.env.REDIS_URL
// });


// // Event listener for Redis errors
// client.on('error', (err) => {
//     console.error('Redis Client Error:', err);
// });

// // Connect Redis client
// (async () => {
//     await client.connect();
//     console.log('Redis client connected successfully');
// })();

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
//     const authenticateJWT = (req, res, next) => {
//         const token = req.headers.authorization?.split(' ')[1];
    
//         if (token) {
//             jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//                 if (err) {
//                     return res.status(401).json({ message: 'Authentication failed' });
//                 }
//                 req.user = decoded;  // Attach the decoded token (which contains _id) to req.user
//                 next();
//             });
//         } else {
//             res.status(401).json({ message: 'No token provided' });
//         }
//     };
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
// // app.post('/api/compile', async (req, res) => {
// //     const { code, className } = req.body;
// //     const javaCode = code || `
// //         public class ${className || 'Temp'} {
// //             public static void main(String[] args) {
// //                 System.out.println("Hello, World!");
// //             }
// //         }
// //     `;

// //     // Measure time before calling the JDoodle API
// //     console.time('JDoodle API Execution Time');

// //     const program = {
// //         script: javaCode,
// //         language: "java",
// //         versionIndex: "4",
// //         clientId: process.env.JDOODLE_CLIENT_ID,
// //         clientSecret: process.env.JDOODLE_CLIENT_SECRET,
// //     };

// //     try {
// //         const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
// //         const data = response.data;

// //         console.timeEnd('JDoodle API Execution Time'); // Log the time taken

// //         res.json({
// //             success: !data.error,
// //             output: data.output || data.error,
// //         });
// //     } catch (error) {
// //         console.error('Error compiling code:', error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'Failed to compile code',
// //         });
// //     }
// // });
// app.post('/api/compile', async (req, res) => {
//     const { code, className } = req.body;
//     const javaCode = code || `
//         public class ${className || 'Temp'} {
//             public static void main(String[] args) {
//                 System.out.println("Hello, World!");
//             }
//         }
//     `;

//     const cacheKey = `compile:${javaCode}`;

//     // Measure time before Redis lookup
//     console.time('Redis Cache Lookup Time');

//     // Check if the result is in Redis cache
//     const cachedResult = await client.get(cacheKey);

//     if (cachedResult) {
//         console.timeEnd('Redis Cache Lookup Time'); // Log time taken for cache retrieval
//         return res.json({ success: true, output: cachedResult });
//     }

//     // If no cache, measure JDoodle API call
//     console.time('JDoodle API Execution Time');

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

//         console.timeEnd('JDoodle API Execution Time'); // Log time taken for JDoodle API call

//         if (!data.error) {
//             // Cache the result in Redis for 1 hour
//             await client.setEx(cacheKey, 3600, data.output);
//         }

//         res.json({
//             success: !data.error,
//             output: data.output || data.error,
//         });
//     } catch (error) {
//         console.error('Error compiling code:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to compile code',
//         });
//     }
// });

// // Compile Java code using JDoodle API and Redis caching
// // app.post('/api/compile', async (req, res) => {
// //     const { code, className } = req.body;
// //     const javaCode = code || `
// //         public class ${className || 'Temp'} {
// //             public static void main(String[] args) {
// //                 System.out.println("Hello, World!");
// //             }
// //         }
// //     `;
    
// //     const cacheKey = `compile:${javaCode}`;

// //     // Check if the result is in Redis cache
// //     const cachedResult = await client.get(cacheKey);
    
// //     if (cachedResult) {
// //         return res.json({ success: true, output: cachedResult });
// //     }

// //     // Otherwise, compile the code using JDoodle API
// //     const program = {
// //         script: javaCode,
// //         language: "java",
// //         versionIndex: "4",
// //         clientId: process.env.JDOODLE_CLIENT_ID,
// //         clientSecret: process.env.JDOODLE_CLIENT_SECRET,
// //     };

// //     try {
// //         const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
// //         const data = response.data;

// //         if (!data.error) {
// //             // Cache the result in Redis with a TTL of 1 hour (3600 seconds)
// //             await client.setEx(cacheKey, 3600, data.output);
// //         }

// //         res.json({
// //             success: !data.error,
// //             output: data.output || data.error,
// //         });
// //     } catch (error) {
// //         console.error('Error compiling code:', error);
// //         res.status(500).json({
// //             success: false,
// //             message: 'Failed to compile code',
// //         });
// //     }
// // });

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
// app.post('/api/save-code', authenticateJWT, async (req, res) => {
//     const { name, code, className } = req.body;
//     // console.log('Received data:', { name, code, className });

//     if (!name || !code || !className) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const userId = req.user._id;  // Extract userId from req.user

//     try {
//         const newCode = new CodeModel({ userId, name, code, className });
//         await newCode.save();
//         res.status(200).json({ message: 'Code saved successfully!' });
//     } catch (error) {
//         console.error('Error saving code:', error);
//         res.status(500).json({ message: 'Failed to save code' });
//     }
// });

// app.get('/api/get-codes', authenticateJWT, async (req, res) => {
//     const userId = req.user._id;  // Get the userId from the authenticated user

//     try {
//         // Find all codes that belong to the authenticated user
//         const codes = await CodeModel.find({ userId });
//         res.json(codes);
//     } catch (error) {
//         console.error('Error retrieving codes:', error);
//         res.status(500).json({ message: 'Failed to retrieve codes' });
//     }
// });
// // Start the server
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
const CodeModel = require("./code.js");
const redis = require('redis');
const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Add your frontend URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    credentials: true, // Allow cookies and authorization headers
};

app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(bodyParser.json());

// // Create Redis client
// // const client = redis.createClient({
// //     socket: {
// //         host: process.env.REDIS_HOST ,
// //         port: process.env.REDIS_PORT
// //     }
// // });
const client = redis.createClient({
    url: process.env.REDIS_URL
});


// // Event listener for Redis errors
client.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

// // Connect Redis client
(async () => {
    await client.connect();
    console.log('Redis client connected successfully');
})();


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



const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Authentication failed' });
            }
            req.user = decoded;  // Attach the decoded token (which contains _id) to req.user
            next();
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

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
// app.post('/api/compile', async (req, res) => {
//     const { code, className } = req.body;
//     const javaCode = code || 
//         `public class ${className || 'Temp'} {
//             public static void main(String[] args) {
//                 System.out.println("Hello, World!");
//             }
//         }`
//     ;

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


app.post('/api/compile', async (req, res) => {
    const { code, className } = req.body;
    const javaCode = code || `
        public class ${className || 'Temp'} {
            public static void main(String[] args) {
                System.out.println("Hello, World!");
            }
        }
    `;

    const cacheKey = `compile:${javaCode}`;

    // Measure time before Redis lookup
    console.time('Redis Cache Lookup Time');

    // Check if the result is in Redis cache
    const cachedResult = await client.get(cacheKey);

    if (cachedResult) {
        console.timeEnd('Redis Cache Lookup Time'); // Log time taken for cache retrieval
        return res.json({ success: true, output: cachedResult });
    }

    // If no cache, measure JDoodle API call
    console.time('JDoodle API Execution Time');

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

        console.timeEnd('JDoodle API Execution Time'); // Log time taken for JDoodle API call

        if (!data.error) {
            // Cache the result in Redis for 1 hour
            await client.setEx(cacheKey, 3600, data.output);
        }

        res.json({
            success: !data.error,
            output: data.output || data.error,
        });
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
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        
        // console.log("Generated token:", token); 
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


app.post('/api/save-code', authenticateJWT, async (req, res) => {
    const { name, code, className } = req.body;
    // console.log('Received data:', { name, code, className });

    if (!name || !code || !className) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userId = req.user._id;  // Extract userId from req.user

    try {
        const newCode = new CodeModel({ userId, name, code, className });
        await newCode.save();
        res.status(200).json({ message: 'Code saved successfully!' });
    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).json({ message: 'Failed to save code' });
    }
});


app.get('/api/get-codes', authenticateJWT, async (req, res) => {
    const userId = req.user._id;  // Get the userId from the authenticated user

    try {
        // Find all codes that belong to the authenticated user
        const codes = await CodeModel.find({ userId });
        res.json(codes);
    } catch (error) {
        console.error('Error retrieving codes:', error);
        res.status(500).json({ message: 'Failed to retrieve codes' });
    }
});


// Middleware to authenticate JWT and attach user to req


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});