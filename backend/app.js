import express from 'express';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
    host: 'local',
    user: 'root',
    password: '',
    database: 'db',
});

const PORT = 8800;

app.listen(PORT, ()=> {
    console.log('Server listening on port 8800');
});
//Hey se vale programas bien e
