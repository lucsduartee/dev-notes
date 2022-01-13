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
Podemos criar middlewares globais onde, no caso, usariamos em todas ou boa parte das rotas.
Para isso criamos um módulo com esse middleware e exportamos ele. Um exemplo seria um middleware de autenticação:
```js
/* auth-middleware.js */
const validUser = {
  username: 'MestreCuca',
  password: 'MinhaSenhaSuperSeguraSqn'
};

const authMiddleware = (req, res, next) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res.status(401).json({ message: 'Username or password can`t be blank!' });
  }

  if (username !== validUser.username || password !== validUser.password) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  next();
};

module.exports = authMiddleware;


/* index.js */
const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./auth-middleware'); // <-- importando o módulo (middleware)

const app = express();
app.use(bodyParser.json());

// Esta rota não passa pelo middleware de autenticação!
app.get('/open', function (req, res) {
  res.send('open!')
});

app.use(authMiddleware); // <-- usando o middleware globalmente
// rotas abaixo...
```
Todas as rotas abaixo do `.use(auth)` receberão esse middleware.
Podemos passar informações de um middleware para outro, para isso, basta antes de usar a função next()
criamos uma chave no objeto `req` com a informação que gostaríamos de passar adiante:
```js
/* auth-middleware.js */
const validUsers = [
  { username: 'MestreCuca', password: 'MinhaSenhaSuperSeguraSqn' },
  { username: 'McRonald', password: 'Senha123Mudar' },
  { username: 'Burger Queen', password: 'Senha123Mudar' },
  { username: 'UpWay', password: 'Senha123Mudar' },
];

const authMiddleware = (req, res, next) => {
  const { username, password } = req.headers;

  if (!username && !password) {
    return res.status(401).json({ message: 'Username and password can`t be blank!' });
  }

  const foundUser = validUsers.find((user) => user.username === username);

  if (!foundUser) return res.status(401).json({ message: 'Invalid credentials!' });

  if (!(username === foundUser.username  && password === foundUser.password)) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  req.user = foundUser; // Aqui estamos passando o usuário encontrado para o próximo middleware.

  next();
};

module.exports = authMiddleware;

/* index.js */
// ...
app.use(authMiddleware);

// ...

app.post('/recipes', validateName, function (req, res) {
  const { id, name, price } = req.body;
  const { username } = req.user; // Aqui estamos acessando o usuário encontrado no middleware de autenticação.
  recipes.push({ id, name, price, chef: username });
  res.status(201).json({ message: 'Recipe created successfully!'});
});
// ...
```

# Roteado rotas com o Middleware Router
Para rotear rotas para nossa aplicação, podemos criar uma espécie de roteador utilizando o `express.Router()`:
1. Criamos um arquivo que conterá as rotas relativas a um `path`.
2. Importamos o express e instanciamos, depois criamos o roteador `const router = express.Router()`.
3. Definimos nossas rotas como sempre, mas ao invés de usar `app.METODO` utilizamos `router.METODO`.
4. Exportamos o módulo(roteador) que acabamos de criar.
5. Importamos nosso roteador no `index.js`
6. Utilizamos o roteador: `app.use('/path_relativo_as_rotas_definidas_no_router', routerImportado)`

Exemplo prático disso:
```js
/* recipesRouter.js */
const express = require('express');
const router = express.Router();

const recipes = [
  { id: 1, name: 'Lasanha', preco: 40.0, tempoDePreparo: 30 },
  { id: 2, name: 'Macarrão a Bolonhesa', preco: 35.0, tempoDePreparo: 25 },
  { id: 3, name: 'Macarrão com molho branco', preco: 35.0, tempoDePreparo: 25 },
];

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name || name === '') return res.status(400).json({ message: 'Invalid data!'});

  next();
};

router.get('/', function (req, res) {
  res.status(200).json(recipes);
});

router.get('/pesquisar', function (req, res) {
  const { name, maxPrice } = req.query;
  const filteredRecipes = recipes.filter((r) => r.name.includes(name) && r.preco < parseInt(maxPrice));
  res.status(200).json(filteredRecipes);
});

router.get('/:id', function (req, res) {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === parseInt(id));
  if (!recipe) return res.status(404).json({ message: 'Recipe not found!'});

  res.status(200).json(recipe);
});

router.post('/', function (req, res) {
  const { id, name, price } = req.body;
  recipes.push({ id, name, price});
  res.status(201).json({ message: 'Recipe created successfully!'});
});

router.put('/:id', function (req, res) {
  const { id } = req.params;
  const { name, price } = req.body;
  const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipeIndex === -1) return res.status(500).json({ message: 'Recipe not found!' });

  recipes[recipeIndex] = { ...recipes[recipeIndex], name, price };

  res.status(204).end();
});

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipeIndex === -1) return res.status(500).json({ message: 'Recipe not found!' });

  recipes.splice(recipeIndex, 1);

  res.status(204).end();
});

module.exports = router;

/* index.js */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Esta rota não passa pelo middleware de autenticação!
app.get('/open', function (req, res) {
  res.send('open!')
});

const recipesRouter = require('./recipesRouter');

/* Todas as rotas com /recipes/<alguma-coisa> entram aqui e vão para o roteador. */
app.use('/recipes', recipesRouter);

// app.all('*', function (req, res) {
//  return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
// });

app.listen(3001, () => { console.log('Ouvindo na porta 3001'); });
```

# Middlewares de erro
Recebem 4 parâmetros: `function (err, req, res, next) { }`. É válido ressaltar alguns pontos importantes sobre esse middlewares de erro:
- Middlewares de erro sempre devem vir depois de rotas e outros middlewares.
- Middlewares de erro sempre devem receber quatro parâmetros.

É utilizado da seguinte maneira:
```js
app.use(middleware1);
app.get('/', */ ... */);
app.use(function (err, req, res, next) {
  res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
});
```
É possivel também passar o erro pra um próximo middleware:

```js
app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  /* passa o erro para o próximo middleware */
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.json({ error: err });
});
```
