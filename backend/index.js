const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
//const {getJson} = require('serpapi');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8800;

//OPENAI API Key
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


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

//Chat gpt API
app.post('/Chat', async (req, res) => {
    const messages = req.body.messages;
  
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages
      });
  
      const botResponse = completion.choices[0].message;
      res.json(botResponse);
    } catch (error) {
      res.status(500).send(error);
    }
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

app.listen(PORT, () => {
    console.log('Server started...');
});