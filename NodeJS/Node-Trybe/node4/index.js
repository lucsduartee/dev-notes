const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const recipes = [
  {id: 1, name: 'Lasanha', price: 50.0, waitTime: 32},
  {id: 2, name: 'Macarrão', price: 30.0, waitTime: 20},
  {id: 3, name: 'Churrasco', price: 55.0, waitTime: 40},
];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/recipes/search', (req, res) => {
  const { name, maxPrice } = req.query;
  const filtredRecipes = recipes.filter(r => r.name.includes(name) && r.price < parseInt(maxPrice));
  res.status(200).json(filtredRecipes);
});

app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find(recipe => recipe.id === parseInt(id));

  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.status(200).json(recipe);
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});
