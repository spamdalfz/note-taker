const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Use the 'public' folder for static files

// Routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});