# Testes em NodeJs: Moccha, Chai e Sinon

A principal stack de tests que usaremos em testes para backend dentro do Node será `mocha` e `chai`.
Para instalá-las utilizaremos o npm salvando-as como dependências de desenvolvimento:
```npm instal -D mocha chai```
Em testes é necessairo ter em mente escopos de interações. Há algus tipos de testes:
- __Testes unitários__: Escopo limitado a um fragmento de código e interage minimamente com recursos externos. Exemplo,
um teste em uma função que subtrai dois números.
- __Testes de integração__: Junção de diversos escopos, onde cada em teoria possui seu próprio teste. Exemplo, uma teste em uma
calculadora com diversas funções menores já testadas.
- __Testes de Ponta-a-Ponta__: Também chamados de testes End-to-End. Esse tipo de teste pressupõe um fluxo completo de interação com
a aplicação, de ponta a ponta.

## Estruturando testes com Mocha e Chai
O `mocha` segue bastante o padrão de testes já conhecido com Javascript em outros frameworks como Jest. Ele utiliza
das palavras `describe` e `it`:
```js
describe('descrição do teste', () => {
  it('teste tal', () => {
    //
  });
});
```

Já o `Chai` ([doc](https://www.chaijs.com/api/bdd/)) nos fornece diversas maneiras de validar e ferramentas de asserção em nossos testes:
```js
const { expect } = require('chai');

describe('descrição do teste', () => {
  it('teste tal', () => {
    
    expect().equals();
  });
});
```

Para executar os testes precisamos criar um pacote _node_ com o `npm init` e dentro do `package.json` colocamos o seguinte script:
```json
{
  //...
  "scripts": {
    "start": "node index.js",
    "test": "mocha tests",
  },
  //...
}
```
e executamos o teste com os comandos `npm run test` ou simplesmente `npm test`.

Podemos também utilizar a biblioteca `Sinon` para criar uma espécie de dublê de testes. Dessa maneira podemos meio que mockar
valores para o teste. Ele pode ser instalado com o comando `npm install --save-dev sinon`. Um dos tipos de dublê dessa biblioteca
é o `stub`, que é um objeto que podemos utilizar para simular interações com dependências externas ao que estamos testando de fato.
Um exemplo seria a criação de um `stub` para a função de leitura do módulo `fs`.
```js
const fs = require('fs');
const sinon = require('sinon');

sinon.stub(fs, 'readFileSync')
  .returns('Valor a ser retornado');
```