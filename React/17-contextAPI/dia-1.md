# Context API

O _Context API_ é um recurso nativo do _React_ que permite gerenciar o estado da aplicação evitando o _prop drilling_ e criação de diversas _callbacks_ para coordenar o estado.
---
## React.createContext()

O contexto é um lugar onde coloco um estado que será passado para a nossa aplicação:
```jsx
const MyContext = React.createContext(defaultValue);
```
O `createContext` retorna para a gente um objeto contendo um `Consumer` e um `Provider`.
Uma vez criado um Contexto podemos prover esse contexto para todos os filhos desse provedor:

```jsx
import MyContext from './context/MyContext';

<MyContext.Provider value={/* algum valor*/}>
  <OtherComponents />
  <OtherComponents />
  <OtherComponents />
</MyContext.Provider>
```
Normalmente o que a gente passa dentro do `value` do `Provider` é um objeto contendo propriedades e faunções que podem ser acessadas pelos componentes filhos do `Provider`.
Para consumir esse dados recebidos, utilizamos o `.Consumer`:

```jsx
import MyContext from './context/MyContext';

<MyContext.Consumer>
  {
    (value) => {
      /* renderiza algum jsx utilizando o valor do Context*/
    }
  }
</MyContext.Consumer>
```
Uma outra forma de acessar o value de um determinado `Context` em um componente de classe é por meio da propriedade `.contextType`. Dessa maneira conseguimos acessar o valor do contexto dentro dos métodos do ciclo de vida de inclusice dentro do próprio método `render`:

```jsx
const MyContext = createContext();

class MyComponent extends React.Component {
  componentDidMount() {
    const value = this.context;
    // ...
  }

  render() {
    const value = this.context;
    // ...
  }
}

MyComponent.contextType = MyContext;
```