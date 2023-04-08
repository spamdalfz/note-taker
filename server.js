const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Use the 'public' folder for static files

// Routes //
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});


app.get('/api/notes', async (req, res) => {
    try {
        const data = await fs.readFile('./db/db.json', 'utf8');
        const notes = JSON.parse(data);
        res.json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading notes');
    }
});

app.post('/api/notes', async (req, res) => {
    try {
        const data = await fs.readFile('./db/db.json', 'utf8');
        const notes = JSON.parse(data);
        const newNote = {
            ...req.body,
            id: Date.now().toString(),
        };
        notes.push(newNote);
        await fs.writeFile(
            './db/db.json',
            JSON.stringify(notes, null, 2)
        );
        res.json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Catch-all for any unmatched GET requests 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});