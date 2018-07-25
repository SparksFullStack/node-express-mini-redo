const express = require('express');
const db = require('./data/db');
const { find, findById, insert, update, remove } = db;

const port = process.env.PORT || 3000;

const server = express();
server.listen(port, () => console.log(`The server is listening on port ${port}`));

// GET to /api/users
server.get('/api/users', (req, res) => {
    const users = find()
        .then(response => res.json(response))
        .catch(err => {
            res
                .status(500)
                .json({ error: 'The users information could not be retrieved.' });
        })
})

// GET to /api/users/:id

// POST to /api/users

// DELETE to /api/users/:id

// PUT to /api/users/:id
