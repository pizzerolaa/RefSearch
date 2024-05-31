const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const dplapiKey = process.env.DPL_API_KEY;

const app = express();
const PORT = 8800;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'RefSear'
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

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

let storedPrompts_1 = [];
//Chat gpt API prompts
app.post('/chat/prompts', async (req, res) => {
    const { keywords } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    console.log('Received keywords:', keywords); // Log para verificar palabras clave recibidas

    if (!Array.isArray(keywords)) {
        return res.status(400).json({ error: 'Keywords should be an array' });
    }

    const combinedKeywords = keywords.join(', ');
    const prompt = `Genera 1 prompts corto y conciso que combine las siguientes palabras: ${combinedKeywords}`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an intelligent assistant that generates phrases or prompts to search for educational or scientific content' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 100, // Ajustar max_tokens para que cada respuesta sea corta
                n: 5, // Solicitar 5 respuestas
                stop: null,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        console.log('Response received:', response.data); // Log para verificar respuesta recibida
        const generatedPrompts = response.data.choices.map(choice => choice.message.content.trim());
        const uniquePrompts = [...new Set(generatedPrompts)]; // Eliminar respuestas duplicadas

        // Limpiar los prompts almacenados
        storedPrompts_1 = [];
        // Almacenar los prompts generados
        storedPrompts_1.push(...uniquePrompts);

        res.json({ prompts: uniquePrompts });
    } catch (error) {
        console.error('Error fetching prompts:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/prompts', (req, res) => {
    res.json({ prompts: storedPrompts_1 });
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

app.post('/translate', async (req, res) => {
    const { text, targetLang } = req.body;
  
    const url = 'https://api-free.deepl.com/v2/translate';
    const params = {
      auth_key: dplapiKey,
      text: text,
      target_lang: targetLang,
    };
  
    try {
      const response = await axios.post(url, null, { params });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error al traducir' });
    }
  });

app.listen(PORT, () => {
    console.log('Server started...');
});
