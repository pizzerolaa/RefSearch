const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

require('dotenv').config()

const dplapiKey = process.env.DPL_API_KEY;

const app = express();
const PORT = 8800;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'refsear'
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/' , (req, res) => {
    res.json('Hello World');
});

app.post('/login', (req, res) => {
    console.log("Iniciando login");
    
    const values = [
        req.body.username,
        req.body.password
    ];

    const q = 'SELECT * FROM login WHERE username = ?';
    
    db.query(q, values[0], (err, results) => {

        console.log("Iniciando query");

        if (err) {
            console.log("Error en la consulta de base de datos", err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }

        if (results.length === 0) {
            // Usuario no encontrado
            res.status(400).json({ error: 'Usuario no encontrado' });
            return;
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const user = results[0];

        if (user.password !== values[1]) {
            // Contraseña incorrecta
            res.status(400).json({ error: 'Contraseña incorrecta' });
            console.log("incorrecta");
            return;
        }

        // Contraseña correcta, se inicia sesión
        res.json({ message: 'Inicio de sesión exitoso', user: { username: user.username } });
    });
});

app.post('/register', (req, res) => {
    const q = 'INSERT INTO login (`username`, `password`) VALUES (?)';
    const values = [
        req.body.username,
        req.body.password
    ];

    const checkEmailSql = 'SELECT * FROM login WHERE username = ?';
    db.query(checkEmailSql, values[0], (err, results) => {
        console.log(values[0]);
        if (err) {
            console.log("error1");
            res.status(400).json({ error: err.message });
            return;
        }

        if (results.length > 0) {
            console.log("error2");
            res.status(400).json({ error: 'Email already exists!' });
            return;
        }

        db.query(q, [values], (err, data) => {
            console.log("entro a push");
            if (err) {
                console.log(err);
            } else {
                res.json("Account add successfully");
            }
        })
    })
});

let storedPrompts_1 = [];
//Chat gpt API prompts
app.post('/chat/prompts', async (req, res) => {
    console.log("Iniciando prompts");
    const { keywords } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    console.log('Received keywords:', keywords); // Log para verificar palabras clave recibidas

    /* if (!Array.isArray(keywords)) {
        return res.status(400).json({ error: 'Keywords should be an array' });
    } */

    /* const combinedKeywords = keywords.join(', '); */
    console.log(keywords);
    const prompt = `Genera un prompt corto pero que sea general y fácil de investigar en Google Scholar que combine las siguientes palabras: ${keywords}`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
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


app.post('/translate', async (req, res) => {
    const { text, targetLang } = req.body;
    
  
    const url = 'https://api-free.deepl.com/v2/translate';
    const params = {
      auth_key: dplapiKey,
      text: text,
      target_lang: targetLang,
    };

    console.log("Intento de traudcicón con " + params.target_lang);

    try {
      const response = await axios.post(url, null, { params });
      res.json(response.data);
      console.log("Se ha traducido");
    } catch (error) {
      res.status(500).json({ error: 'Error al traducir' });
    }
  });

app.listen(PORT, () => {
    console.log('Server started...');
});

async function searchScholarly(query) {
    try {
        const response = await axios.get('http://localhost:5000/scholarly', {
            params: { q: query }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};
  
app.get('/scholarlyy', async (req, res) => {
    try {
        const query = req.query.q;
        const results = await searchScholarly(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/random-prompts', async (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const prompt = 'Genera tres prompts cortos y generales relacionados con educación o ciencia';
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are an intelligent assistant that generates phrases or prompts to search for educational or scientific content' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 200,
          n: 1,
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
  
      const content = response.data.choices[0].message.content.trim();
    const generatedPrompts = content.split('\n').map(prompt => {
      // Elimina los números, puntos, guiones y comillas al inicio y final de cada prompt
      return prompt.replace(/^\d+\.?\s*-?\s*"|"$/g, '').trim();
    }).filter(prompt => prompt !== ''); // Elimina cualquier línea vacía

    res.json({ prompts: generatedPrompts });
    } catch (error) {
      console.error('Error fetching random prompts:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });