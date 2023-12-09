import express, { json } from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'game',
    password: '9942',
    port: 7777,
});

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: 'GET,POST',
    }
));
app.use(json());

app.get('/api/get/game_results', async (req, res) => {
    try {
        const { rows } = await pool.query('select * from game_results');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching Game Results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/post/game_results', async (req, res) => {
    try {
        const { player1Name, player2Name, player1TotalWins, player2TotalWins, overall } = req.body;
        await pool.query(`insert into game_results (player1_name, Player2_name, Player1_wins, Player2_wins, Overall) values ('${player1Name}', '${player2Name}', '${player1TotalWins}', '${player2TotalWins}', '${overall}')`);
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
