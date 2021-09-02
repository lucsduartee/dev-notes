# 'Hello World!' no React
O React é uma biblioteca do Javascript para a construção de interfaces de usuário. Foi criada pelos desenvolvedores do Facebook com o objetivo de organizar, componentizar e consequentemente, tornar muito mais eficioente cada parte das aplicações que a utilizam.

A documentação do React pode ser encontrada [**aqui.**](https://pt-br.reactjs.org/)

## Instalando o React
Para iniciar uma aplicação em React, basta utilizar o comando `npx create-react-app testando-meu-computador` e logo em seguida verificar com `npm start` se a aplicação está rodará no browser.

## Utilizando o React
O React é escrito utilizando _JSX_, Javacript Syntax Extension. Um exmplo de código em _JSX_:  
```jsx
const element = <h1>Hello, world!</h1>;  
```
Sem utilizar o _JSX_, o código acima ficaria:  
```js
const element = React.createElement('h1', null, 'Hello, world');
```
Podemos fazer muito mais utilizando o _JSX_, como por exemplo, criar uma função que nos retorna uma saudação:

```jsx
function name (firstname, lastname) {
  return `${fistname} ${lastname}`;
}

const greetings = <h1>Hello, {name('Lucas', 'Roberto')}!</h1>;
```
## O ReactDOM.render
Ele é o responsável por renderizar e atualizar o seu código dentro do HTML, exibindo seus componentes React. Toda vez que o código é alterado, seja por uma função ou interação do usuário, o `ReactDOM.render` compara as mudanças e as aplica somente onde é necessário.

Exemplificando isto, temos uma função `tick` que é chamada a cada _1s_, fazendo com que o `ReactDOM.render` atualize o conteúdo do `root`, nesse mesmo intervalo de tempo:
```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
## Mas e o CSS?

Para utilizar o _CSS_ dentro do _React_, basta importar para o arquivo onde está o componente onde deseja aplicar os estilos, o arquiv `.css`:

```css
/* Style.css */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
```jsx
import React from 'react';
import './Style.css';

function App() {
  return (
    <div className="container">
      //content...
    <div>
  );
}

export default App;
```

## Class Components

A estrutura de um Class Component é a seguinte:

```jsx
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      const element = (
        <h1>Hello, world!</h1>
      );
    )
  }
}

export default App;
```
## Lidando com eventos e o `bind`

Vamos supor que eu tenha um `input` e dentro dele, eu queira capturar um evento. O que eu preciso fazer?  
Dentro do meu _component_ e fora de seu método `render` eu crio um método que será chamado dentro do elemento alvo do evento. Segue um exmplo abaixo:

```jsx
import React from 'react';

class teste extends Component {
  constructor() {
    super():
    //Atributos da classe...
  }
  
  handleAction(event) {
    console.log(event.target.value);
  }
  
  render() { 
    return (
      <form>
        <input
          className="test-input"
          type="text"
          placeholder="Digite aqui"
          onChange={this.handleAction}
        /> 
      </form>
    );
  }
}
 
export default teste;
```
Note que o `handleAction` é chamado juntamente com o `.this` para dizer que este é um método do próprio componente.

Se executarmos esse código ele irá falhar, mas porque? Por causa de um comportamento das classes. Imagine que temos uma classe qualquer do **Javascript**, chamada `Pessoa`, e essa classe possui um método `falar()`:

```js
class Pessoa {
  constructor() {
    this.fala = 'olá';
  }

  falar() {
    console.log(this.fala);
  }
}
```
Agora podemos instanciar essa classe:
e logo em seguida chamar o método `falar()`:

```js
const p = new Pessoa();
p.falar() // olá
```

Agora suponhamos que queremos passar o método falar para um "agente externo" para que o mesmo execute o método:

```js
let agente = p.falar;
agente; // function falar()
```

Bom, pode parecer que está tudo certo, né? O `agente` possui a referência para o método `falar()`. 
Mas o que acontece se eu tentar executar o `agente`? Receberei um erro!!  
```js 
agente() // TypeError: "this is undefined"
```
Esse erro ocorre pois `.this` pertence apenas à classe `Pessoa`.

Abstraindo isto para o nosso exemplo da classe `test`... O evento de `onChange` do nosso `input` está recebendo a referência para `this.handleAction`. Quando ocorrer esse evento, eu terei um erro assim como no exemplo acima, pois o `.this` pertence ao componente e não evento propriamente dito.

há uma maneira de consertar estes problemas decorrente do comportamento do `this`, é aí que entra o método `bind()`. 

Voltando novamente ao nosso problema da classe `Pessoa`. Para resolver aquele b.o. posso fazer o seguinte:

```js
let agente = p.falar.bind(p);
```
O que esta linha está dizendo? 
>Olha, na hora que você for executar o agente, associa ele a uma instância da um determinada classe. Que nesse caso é o p, que é uma instância (objeto) da classe Pessoa, sacou?

Viu só? Eu uso o `bind()` para fazer essa associação. Dentro dele eu passo o objeto que eu quero associar ao meu agente externo.

No caso da nossa classe `test`, eu resolveria o problema da seguinte forma:

```jsx
import React from 'react';

class teste extends Component {
  constructor() {
    super():
    //Atributos da classe...
  }
  
  handleAction(event) {
    console.log(event.target.value);
  }
  
  render() { 
    return (
      <form>
        <input
          className="test-input"
          type="text"
          placeholder="Digite aqui"
          onChange={this.handleAction.bind(this)}
        /> 
      </form>
    );
  }
}
 
export default teste;
```