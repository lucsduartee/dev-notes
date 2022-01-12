# Hello World em Express
Primeiro precisamos instalar o _Express_, utilizando o npm: `npm i express`.
Para criar nosso _hello world_, fazmos da seguinte maneira:
```js
const express = require('express');

const app = express(); //1

app.get('/hello', handleHelloWorldRequest); //2

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
}); //3

function handleHelloWorldRequest(req, res) {
  res.status(200).send('Hello World!'); //4
}
```
O que cada linha está fazendo?
- 1. Cria a aplicação _Express_.
- 2. Quando uma requisição com o método __GET__ for feita para o path `/hello`, executa a função `handleHelloWorldRequest`.
- 3. Diz ao _Express_ para criar um servidor na porta 3001 e escutar por requisições nessa porta.
- 4. Quando uma requisição for tratada com o método __GET__ no path `/hello`, envia o status 200 e a mensagem "Hello World!".

Agora, utilizando o comando `node index.js` ou setando um script para isso do tipo `npm start` podemos subir nosso servidor.
Toda vez que fizermos uma alteração no codigo precisaríamos reinicializar o servidor sempre, para previnir ese trabalho existe um
framework chamado nodemon, no qual podemos settar um script para seu funcionamento e desta maneira não precisariamos ficar
reiniciando o servidor:
```json
{
  //...
  "scripts": {
    "dev": "nodemon index.js",
  }
}
```
Para instalar o _nodemon_ utilizamos o comando `npm i nodemon -D`.

# Rotas com Express
Criar uma rota significa direcionar uma requisição para determinada parte do nosso sistema.
No Express, uma rota possui a seguinte estrutura: `app.METODO(path, callback)`, onde a callback recebe até 3 parâmetros:
- _request_: contém informações enviadas pelo cliente ao servidor.
- _response_: permite o envio de informações do servidor de volta para o cliente.
- _next_: é uma função que diz ao Express que aquela callback acabou de ser executada e ela deve prosseguir para uma próxima callback.

```js
const express = require('express');
const app = express();

/* Rota com caminho '/', utilizando o método GET */
app.get('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/', utilizando o método POST */
app.post('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/', utilizando o método PUT */
app.put('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/', utilizando o método DELETE */
app.delete('/', function (req, res) {
  res.send('hello world');
});

/* Rota com caminho '/' para qualquer método HTTP */
app.all('/', function (req, res) {
  res.send('hello world');
});

/* Ou podemos encadear as requisições para evitar repetir o caminho */
app
  .route('/')
  .get(function (req, res) {
        // Requisições para rota GET `/` são resolvidas aqui!
    res.send('hello world get');
  })
  .post(function (req, res) {
        // Requisições para rota POST `/` são resolvidas aqui!
    res.send('hello world post');
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

# Primeira API
Abaixo temos um código de uma simples API que podemos construir:
```js
const express = require('express');

const app = express();

const recipes = [
  {id: 1, name: 'Lasanha', price: 50.0, waitTime: 32},
  {id: 2, name: 'Macarrão', price: 30.0, waitTime: 20},
  {id: 3, name: 'Churrasco', price: 55.0, waitTime: 40},
];

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});
```
Podemos também passar parãmetros para uma rota, o _express_ nos permite fazer isso.
Se liga:
```js
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const recipe = recipes.find(recipe => recipes.id === .parseInt(id));

  if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
  res.status(200).json(recipe);
});
```
# Query strings
Aqui podemos definir na url uma espécie de Query onde podemos criar filtros ou pesquisar por coisas específicas.
Essas urls são aquelas do tipo: `/cadeiras?t=gamer&precoMinimo=300`. O que vem depois do interroagação é chamado de query string.
É possível passar qualquer coisa depois nesse query string desde que siga o padrão `<chave>=<valor>` e podemos contaner utilizando o `&`.
```js
app.get('/recipes/search', (req, res) => {
  const { name, maxPrice } = req.query;
  const filtredRecipes = recipes.filter(r => r.name.includes(name) && r.price < parseInt(maxPrice));
  res.status(200).json(filtredRecipes);
});
```

# Body de uma requisição
Ao invés de sempre passar dados pela url, podemos passar dados pelo corpo da requisição. É uma maneira de mandarmos dados
comprimidos que serão descomprimidos apenas no servidor. Assim podemos mandar dados sensíveis, por exemplo.
Para isso devemos utilizar um framework que fará essa compresão (_parseador_), chamado __body-parser__: `npm i body-parser`.
E utilizamos ele da seguinte maneira:
```js
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
```