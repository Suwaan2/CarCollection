const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root123', // Replace with your MySQL password
    database: 'signup_db' // Replace with your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Serve static files (e.g., HTML and CSS)
app.use(express.static(__dirname));

// Handle form submission
app.post('/signup', (req, res) => {
    const { fullname, email, username, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.send('Passwords do not match');
    }

    const query = 'INSERT INTO users (fullname, email, username, password) VALUES (?, ?, ?, ?)';
    db.query(query, [fullname, email, username, password], (err, result) => {
        if (err) {
            return res.send('Error occurred: ' + err);
        }
        res.send('User registered successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
