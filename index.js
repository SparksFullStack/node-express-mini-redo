const express = require('express');
const db = require('./data/db');
const { find, findById, insert, update, remove } = db;

const port = process.env.PORT || 3000;

const server = express();
server.use(express.json());

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
    if (!id) res.status(400).json({ error: 'There was no ID provided with your request' });
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
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    const newUser = { name: name, bio: bio };
    if (!name || !bio) res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    insert(newUser)
        .then(response => {
            res.status(201).json(newUser);
        })
        .catch(err => res.status(500).json({ error: "There was an error while saving the user to the database" }));
})

// DELETE to /api/users/:id

// PUT to /api/users/:id

server.listen(port, () => console.log(`The server is listening on port ${port}`));