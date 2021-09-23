# Iniciando com o NodeJS
---
Para iniciar um projeto _Node_ no nosso computador, precisamos instalar o Node e o NPM. Logo após isso, deve ir para a pasta onde quero criar ao projeto e utilizar o comando `npm install` para criar o arquivo `package.json` que contém as informações do nosso projeto. Em seguida para inicializarmos um servidor e lidarmos com as rotas, precisamos usar um módulo do _Node_ chamado _Express_ que pode ser instalado da seguinte maneira `npm install express`. Para utilizar o _express_ precisamos importá-lo atribuindo-o a uma constante:

```js
const express = require('express');
```
## Criando rotas

Assim que eu importo o _express_ eu preciso instanciar uma aplicação:

```js
const app = express()
```
Agora que tenho minha aplicação criada posso adicionar a ela um "escutador" do servidor que é uma função que eu psso dois parâmetros, onde o primeiro é a porta que eu estou _settando_ meu server, e o segundo, uma função.

```js
app.listen(3000, () => console.log('servidor na porta 3000'))
```
Se eu executar o meu `index.js` no terminal, já que ele é por default o nosso entry point, então no nosso terminal irá aparecer essa mensagem do console.log.

Para criar uma rota é necessário usar a função `get()` que recebo como parâmentro uma rota, e como segundo parâmentro uma função que contém como argumento `req e res` que são respectivamente, o que eu recebe de uma requisição e o que eu envio para aquela rota que eu _settei_ como primeiro argumento:

```js
app.get('/', (req, res) => /* implementação */ )
```
## Instalando o Nodemon
O Nodemon é útil para não precisar ficar derrubando o server toda vez que tiver uma atualização no código. Para instalá-lo é necessaŕio utilizar o seguinte comando:
`npm install --save-dev nodemon`. Uma vez instalado podemos ir no arquivo `package.json` e na chave scripts, adicionar a chave start da seguinte maneira: `"start": "nodemon index.js"`. E pronto, está configurado o Nodemon.

## Organização do projeto

É boa prática criar pastas para deixar bem definido o papel de cada arquivo do projeto, deixando no nosso `index.js` apenas o necessário. Uma dessas práticas é criar um diretório chamado `controllers` e dentro dele colocar os arquivos `.js` para cada rota da nossa aplicação. E também criar um diretório chamado `config` e nele colocar arquivos ligados à configuração do nosso projeto, como a inicialização do nosso server pelo _express_. Segue uma imagem de como ficaria essa organização:

<img src="../../assets/folders.png" />

```js
// customExpress.js
const express = require('express');
const consign = require('consign');

module.exports = () => {
  const app = express();
  
  consign()
    .include('controllers')
    .into(app);

  return app;
}

// atendimento.js
module.exports = (app) => {
  app.get("/atendimentos", (req, res) => res.send("Server is running"));
};

// index.js
const customExpress = require('./config/customExpress')

const app = customExpress();
app.listen(3000, () => console.log('servidor na porta 3000'));
```
Estamos usando o módulo `consing` para aninhar todas rotas do nosso `controllers`. Observe que, primeiramente chamamos a função `consing()` e logo em seguida passamos para `.include()` o nome do diretório contendo os nossos controllers e dentro de `.into()` a instância da nossa chamada do `express()`.

Utilizando o Postman, podemos ver como nossa API está funcionando e como estão estruturadas os tipos de requisições, bem como seu Header e seu Body.

<img width="525px" src="../../assets/postaman3.png" />
<img width="525px" src="../../assets/postamn1.png" />
<img width="525px" src="../../assets/postman2.png" />

A API já está rodando, porém não consegumos pegar os dados que vêm do servidor e nem retornar dados válidos para quem for consumir a API independentemente se for uma aplicação Web, Mobile, etc. Para resolver esse problema, podemos usar um módulo do _Node_ chamado _body-parser_. Instalamos ele da seguinte maneira `npm install body-parser`, e utilizamos ele dentro do arquivo `customExpress`.

```js
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();
  
  // caso a api seja em json
  app.use(bodyParser.json());
  // caso a api provenha de forms
  app.use(bodyParser.urlencoded({ extended: true }));
  consign()
    .include('controllers')
    .into(app);

  return app;
}
```

## Criando um DataBase com MySQl
Primeiro precisamos instalar o MySQl server no Linux com o comando
`sudo apt install mysql-server` e depois de instalado podemos verificar a instalação com `mysql --version`. Depois de instalado podemos adicionar ao MySQL uma senha de usuário root, com o comando `sudo mysql_secure_installation`. Para verificar se o servidor está rodando no nosso pc, utilizamos o comando `sudo systemctl status mysql` e para iniciá-lo `sudo systemctl start mysql` e para parar `sudo systemctl stop mysql`