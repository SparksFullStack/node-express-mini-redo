const express = require('express');
const db = require('./data/db');
const { find, findById, insert, update, remove } = db;

const port = process.env.PORT || 3000;

const server = express();
server.listen(port, () => console.log(`The server is listening on port ${port}`));

// GET to /api/users
server.get('/api/users', (req, res) => {
    find()
        .then(response => res.json(response))
        .catch(err => {
            res
                .status(500)
                .json({ error: 'The users information could not be retrieved.' });
        })
})

// GET to /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    if (!id) res.status(404).json({ error: 'There was no ID provided with your request' });
    findById(id)
        .then(response => {
            if (!response[0]){
                res
                    .status(404)
                    .json({ message: 'The user with the specified ID does not exist.' });
            } else {
                res
                    .status(200)
                    .json(response[0]);
            } 
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: 'The user information could not be retrieved.' });
        })
})
// POST to /api/users

// DELETE to /api/users/:id

// PUT to /api/users/:id
