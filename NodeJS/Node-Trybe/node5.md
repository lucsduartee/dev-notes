# Middlewares
No __express__, toda e qualquer função passada para uma rota é um _middleware_, que nada mais é uma função que realiza o tratamento de uma request e que pode encerrar uma request ou até mesmo chamar o próximo middleware. Para chamar um próximo Middleware, utilizamos a função `next()`:
```js
app.post('/recipes', (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: 'Invalid data!' });

  next();
}, (req, res) => {
  const { id, name, price } = req.body;
  recipes.push({ id, name, price });
  res.status(201).json({ message: 'Recipe created succesfully' });
});
```
A vantagem em usar middlewares é que podemos reaproveitá-los em diversas rotas, passando-os como argumento.
```js
const validatePrice = (req, res, next) => {
  const { price } = req.body;

  if(price < 0 || typeof price === 'string') return res.status(400).json({ message: 'Invalide Price' });

  next();
}

app.post('/recipes', validatePrice, (req, res) => {
  const { id, name, price } = req.body;
  recipes.push({ id, name, price });
  res.status(200).json({ message: 'Recipe created' });
});

app.put('/recipes/:id', validatePrice, (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const recipesIndex = recipes.findIndex((r) => r.id === +id);
  if(recipesIndex === -1) return res.status(404).json({ message: 'Not Found' });

  recipes[recipesIndex] = { ...recipes[recipesIndex], name, price };
  res.status(204).end();
});
```