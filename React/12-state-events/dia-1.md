# Componentes com estado e eventos

Um estado representa a configuração de um componente em um determinado momento. Em outras palavras, é um _momento de algo que pode mudar ao longo do tempo_.  
Estado é importante, pois com ele é possível dar dinamismo para as páginas em **React**.

---

## Introdução a estados e eventos

Como gerenciar o estado? Se liga nesse trecho de código: 

```jsx
import React from 'react';

class MeuBotaoDeCompras extends React.Component {
  constructor() {
    super();
    this.state = {
      numeroDeCliques = 0,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((estadoAnterior, _props) => ({
      numeroDeCliques: estadoAnterior.numeroDeCliques + 1
    }))
  }

  render() {
    return <button onClick={this.handleClick}>{ this.state.numeroDeCliques} </button>
  }
}
```
Dentro do construtor da classe eu defino meu atributo `this.state` que é um objeto, e nele eu defino o que quero guardar no estado do componente. É válido ressaltar que o evento aqui não é associado a um `eventListener`. O evento é declarado diretamente no `target`, e recebe como valor um método do nosso componente.

## Entendendo a estrutura de uma classe do Javascript

- `constructor()`: É um método que "constrói" uma classe. Traduzindo para outras palavras, é como se o `constructor()` dissesse qual a estrutura (atributos) daquela classe. No _React_ em particular, usamos o métodos `super()` dentro do `constructor()`, já que o nosso componente está herdando da classe `Component`.

- `this`: Refere-se ao próprio componente.

- `bind()`: Utilizado para passar um objeto como referência para um método.

