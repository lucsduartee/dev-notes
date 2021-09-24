# Criando Rotas Servidor Backend
## Instalando algumas dependências
- Express: `yarn add express` ou por npm. Responsável pelo servidor.
- Nodemon: `yarn add nodemon -D` ou por npm. Responsável pelo "live server"
- Sucrase: `yarn add sucrase` ou por npm. Responsável por permitar usar o import/export assim como no _React_.
  - Para utilizar o sucrase, na raíz do projeto preciso criar um arquivo `nodemon.json` com o seguinte conteúdo:

  ```
  {
    "execMap": {
      "js": "node -r sucrase/register"
    }
  }
  ```
## Criando rotas
Dentro de routes eu crio a princípio um arquivo com um nome `index.js` e dentro dele escrevemos o seguinte: 

```js
import { Router } from 'express';

const routes = new Router();
routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'conected'});
});

export default routes;
```

Dentro de um arquivo `app.js` criamos uma classe App que recebe no seu construtor um server, que provém do próprio `express()`, um `middlewares()`, a as `routes()`:

```js
import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
```

E dentro de um arquivo `server.js`: 
```js
import app from './app';

app.listen(3000, () => {
  console.log('ouvindo a porta 3000');
});
```
Neste está sendo chamado nossa instância da classe App, que foi exportada como padrão do `app.js` e inicializada com o seu atributo `server`. Como esse atributo `server` é tudo do `express()` então posso utilizar o `listen()` que recebe como parâmetro uma `port` e uma função.