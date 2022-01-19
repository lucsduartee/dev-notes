const express = require('express');
const Author = require('./models/Author');

const app = express();
const PORT = 3000;

app.get('/authors', async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
});

app.listen(PORT, () => console.log(`running on port ${PORT}`));
