const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const {getJson} = require('serpapi');
require('dotenv').config();

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'RefSear'
});

app.use(express.json());
app.use(cors());

app.get('/' , (req, res) => {
    res.json('Hello World');
});

app.get('/login', (req, res) => {
    const q = 'SELECT * FROM login';
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
});

app.post('/login', (req, res) => {
    const q = 'INSERT INTO login (`username`, `password`) VALUES (?)';
    const values = [
        req.body.username,
        req.body.password
    ];
    db.query(q, [values], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json("Account add successfully");
        }
    })
});

//Google Scholar
// app.get('/search', (req, res) => {
//     const query = req.query.q || 'biology'; // Puedes modificar esta línea para tomar un parámetro de consulta

//     getJson({
//         engine: "google_scholar",
//         q: query,
//         api_key: process.env.SERPAPI_API_KEY
//     }, (json) => {
//         if (json.error) {
//             res.status(500).json({ error: json.error });
//         } else {
//             res.json(json.organic_results);
//         }
//     }).catch(err => {
//         console.error("Error:", err);
//         res.status(500).json({ error: "Failed to fetch data from SerpApi" });
//     });
// });

app.listen(8800, () => {
    console.log('Server started on port 8800');
});