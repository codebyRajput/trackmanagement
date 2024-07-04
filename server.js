const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Whatiscar123@',
    database: 'trackmanagement'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Get All Machines
app.get('/machines', (req, res) => {
    const sql = 'SELECT * FROM failure_register';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add New Machine
app.post('/machines', (req, res) => {
    const newMachine = req.body;
    const sql = 'INSERT INTO failure_register SET ?';
    db.query(sql, newMachine, (err, result) => {
        if (err) throw err;
        res.json({ status: 'Machine Added', id: result.insertId });
    });
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
