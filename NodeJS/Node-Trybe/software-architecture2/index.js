const express = require('express');
const bodyParser = require('body-parser');
const Author = require('./controllers/Author');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

app.get('/authors', Author.getAll);

app.get('/authors/:id', Author.findById);

app.post('/authors', Author.create);

app.listen(PORT, () => console.log(`running on port ${PORT}`));
