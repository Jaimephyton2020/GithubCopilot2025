// Create web server using express
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Read the file and parse the JSON
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// GET request
app.get('/comments', function (req, res) {
    res.json(comments);
});

// POST request
app.post('/comments', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    // Add the new comment to the array
    comments.push(req.body);

    // Write to the JSON file
    fs.writeFileSync('comments.json', JSON.stringify(comments));

    res.json(req.body);
});

// DELETE request
app.delete('/comments/:id', function (req, res) {
    // Get the id
    var id = req.params.id;

    // Remove the comment from the array
    comments.splice(id, 1);

    // Write to the JSON file
    fs.writeFileSync('comments.json', JSON.stringify(comments));

    res.sendStatus(200);
});

// PUT request
app.put('/comments/:id', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    // Get the id
    var id = req.params.id;

    // Update the comment in the array
    comments[id] = req.body;

    // Write to the JSON file
    fs.writeFileSync('comments.json', JSON.stringify(comments));

    res.json(req.body);
});

// Listen on port 3000
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
