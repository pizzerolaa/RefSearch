import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 8800;

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbTest',
});
//if there is a authentication error
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

app.get('/', (req, res) => {
    res.json("Welcome to the backend");
});

app.get('/books', (req, res) => {
    const q = 'SELECT * FROM books';
     db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
     })
});

app.post('/books', (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)";
    const values = [
        "title from backend",
        "desc from backend",
        "cover pic from backend"
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book added successfully");
    })
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
