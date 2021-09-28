# Conectando o MongoDB ao Backend
## Instalando algumas dependências
- MongoDB: `yarn add mongodb`
- Mongose: `yarn add mongose`

Depois disso precisamos instalar o MongoDB na nossa máquina seguindo os seguintes comando:

### 1. Importando a chave pública utilizada pelo gerenciamento de pacotes:

Abra o terminal e utilize o comando abaixo para importar chave pública GPG do MongoDB .

`wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -`  
Este comando deve retornar um OK .

### 2. Crie o arquivo de lista ( list file ) para o MongoDB

`echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list`

### Por fim: 
```
sudo apt-get update
sudo apt-get install -y mongodb-org
```
## Alguns comandos do MongoDB
- show dbs: Lista os banco de dados na minha máquina
- use _<nome\>_: cria um banco de dados com o _nome_
- db.nome_da_colecao.insertOne({chave: valor});: cria dentro de um DB uma coleção com um determinado nome contendo um objeto com uma chave e valor. 

## Conectando a aplicação ao banco de dados
Dentro da pasta `Models` cria-se um arquivo `mongoConnection.js` com o seguinte conteúdo:

```js
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = '<nome_do_db>';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;
```
Essa é uma configuração padrão mesmo.
Agora precisamos criar uma rota para acessar uma determinada coleção do banco de dados, por exemplo uma coleção de usuários.
Dentro da pasta de Routes no nosso arquivo `index.js`, criamos essa nova rota com o verbo `GET`.

```js
routes.get('usuario', )
```

Agora por sua vez o `routes` precisa chamar o nosso `controller` que é o responsável por fazer a intermediação entre o usuário e o banco de dados. Então dentro da nossa pasta de `controller` criamos um arquivo, sei lá, do tipo `usuario.controller.js` com uma ação que será executada na nossa `route`, pensando nesse caso de usuário, podemos ter uma ação que trará todos os usuários do nosso _BD_:

```js
// usuario.controller.js
const getAll = async (req, res) => {
  
}
```
É válido ressaltar que será uma função assíncrona já que fará uma requisição para o banco de dados.

Preciso criar também dentro da pasta `services` um arquivo do tipo 
`usuarios.services.js` que será responsável por fazer a interação com o banco de dados. Esse arquivo poderia, verificar a conexão pra fazer o pedido para o banco de dados, receber esse retorno e depois mandar para o `controller`, e por fim devolver para o usuário!
O `service` faz a conexão com o bando de dados, por meio do `Model`.

```js
// usuarios.services.js
import { getAll } from '../models/usuario.model';

const allUsers = async () => {
  const users = await getAll();
  return users;
}

const login = async () => null;

export { allUsers, login };
```
Dentro da pasta `Model` criamos uma arquivo que gerenciará essa consultas referentes a um usuário:

```js
// usuario.model.js
import connection from './mongoConnection';

const getAll = async () => {
  const db = await connection();
  return db.collection('usuarios').find().toArray();
};

const login = async () => null;

export { getAll, login };

```
Vemos que nesse arquivo estamos importando a conexão com o banco de dados, que está no arquivo `mongoConnection`. Nesse arquivo `usuario.model.js` dentro da pasta model, terá diversas operações referentes à banco de dados. Podem ser, desde login até trazer todos os usuários, como podemos ver a função `getAll`. Esta função, instancia o _DB_ chamando a `connection()` e retorna para o `service` a coleção de usuários já criada no banco de dados, e a transforma em um array.