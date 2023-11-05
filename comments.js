// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Path: comments.js
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Path: comments.js
// GET method
app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        res.send(comments);
    });
});

// Path: comments.js
// POST method
app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        let newComment = {
            id: uuidv4(),
            name: req.body.name,
            comment: req.body.comment
        };
        comments.push(newComment);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.send(newComment);
        });
    });
});

// Path: comments.js
// PUT method
app.put('/comments/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        let comment = comments.find(comment => comment.id === req.params.id);
        if (comment) {
            comment.name = req.body.name;
            comment.comment = req.body.comment;
            fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
                if (err) throw err;
                res.send(comment);
            });
        } else {
            res.send('Comment not found');
        }
    });
});

// Path: comments.js
// DELETE method
app.delete('/comments/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        let comment = comments.find(comment => comment.id === req.params