const express = require('express');
const fs = require('fs');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;

// Middleware //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Use the 'public' folder for static files

// Routes //
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

// Catch-all for any unmatched GET requests 
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => { // Use './db/db.json' as the file path
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        newNote.id = uuidv4(); // Use the uuidv4 function to generate a unique ID
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});