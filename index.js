// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});