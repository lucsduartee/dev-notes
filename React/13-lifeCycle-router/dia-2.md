# React Router
---

## Single Page Applications
São páginas web que funcionam 100% sem a necessidade de fazer um _reload_. As aplicações _React Router_ são _SPA_.

## props.children
É uma ferramenta muito útil para reutilizar componentes no React, sua aplicação é bem simples, veja no código a seguir:

```jsx
class App extends Component {
  render() {
    return (
      <div className='main'>
        <ComponentePai>
          <p>SUPIMPA</p>
        </ComponentePai>
      </div>
    )
  }
}

const ComponentePai = (props) => {
  return (
    <div>
      {props.children}
    </div>
  )
}
```
Dessa forma, estamos acessando o valor de **SUPIMPA** no **ComponentePai**. Nessa caso como temos apenas uma tag `p` como filha de `ComponentePai` então o `props.children` será um objeto. Mas se tivermos mais de um componente filho dentro do pai, então o `props.children` se torna um array de objetos.

```jsx
class App extends Component {
  render() {
    return (
      <div className='main'>
        <ComponentePai>
          <p>SUPIMPA</p>
          <h1>BACANA</h1>
          <span>INCRÍVEL</span>
        </ComponentePai>
      </div>
    )
  }
}
```

## Utilizando o React Router Dom
Para utilizá-lo precisamos primeiramente instalar: `npm install react-router-dom`.
O _React Router_ possui possui componentes que facilitam a criação de SPA.
Se formos nosso componente App, precisamos encapsular nossas rotas por um componente `< BrowseRouter />` da seguinte maneira:
```jsx
import React from 'react';
import ComponenteA from '/ComponenteA'
import ComponenteB from '/ComponenteB'
import ComponenteC from '/ComponenteC'
import ComponenteD from '/ComponenteD'
import { BrowserRouter, Router } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route path="/componentA" component={ComponentA} />
      <Route path="/componentB" component={ComponentB} />
      <Route path="/componentC"><ComponentC /><Route /> // Notação equivalente à superior
      <Route exact path="/" component={ComponentD} />
    <BrowserRouter />
  )
}
```

Esse trecho de código diz muito sobre como nossa aplicação está sendo "roteada". Veja só!
O `BrowserRouter` engloba todas a rotas, e em cada rota dizemos que:
> Roteie o caminho "tal" para o componente "tal"

Assim, quando for passado para o _Browser_ o caminho "tal" será renderizado o componente "tal. É possível reparar que em um componente `<Route />` que possui como path uma substring comum a todos os outros `paths` é necessário expecificar essa rota com o atributo `exact`. 

## Componente `<Link />` 
Com o componente `<Link />` podemos navegar pela aplicação, assim como navgávamos com a tag `anchor`. Para utilizar o <Link />:

```jsx 
<Link to="/componentA"> Componente A <Link />
```
Isso quer dizer que ao clicar no texto, componente, imagem contida no componente `<Link />` seremos redirecionados à página cujo path dê _match_ com o conteudo do atributo `to=""`.

## Components Route com passagem de props
Podemos passar propriedades para os componentes dentro do `<Route />` da seguinte maneira: 
```jsx
<Router path="/componentA" render={ () => <ComponentA prop1="<..CONTEUDO..>" /> } />
```
Mudamos o atributo `component` para `render` dentro da chamada do `<Router />` passando uma _arrow function_ com a chamada do componente recendo suas props.
Outra grande ferramente é que podemos passar as propriedades do componente `<Router />` como propriedades para o componente renderizado por ele. O que nos dá acesso a propriedades muito interessantes, como: `.history`, `.location` e `.match`. O objeto `.history` armazena o histório de navegação da _SPA_, já que convencionalmente em páginas não _SPA_ o histórico é armazenado no _browser_ por meio de reloads na página.
O `.match` também é muito interessante pois permite passar parâmetros pela `url`. Para fazer uso de parâmetro de URL em Route , é preciso fazer uso da sintaxe `:nome_do_parametro` dentro da propriedade `path` . Ou seja, `<Route path="/movies/:movieId" component={Movie} />` vai definir um parâmetro chamado `movieID` , e o componente Movie é mapeado a qualquer um dos seguintes caminhos de URL :

- `/movies/1`;
- `/movies/2`;
- `/movies/thor`;

## O Componente `<Switch />`
Este componente é usado para encapsular um conjunto de rotas que você definiu via `Route`:

```jsx
<BrowserRouter>
  <Switch>
    <Router /> // path = "contato
    <Router /> // path = "sobre"
  </Switch>
</BrowserRouter>
```
Dada a URL atual da aplicação, o Switch procura de cima para baixo pelo primeiro Route que possuir correspondência entre seu caminho definido na prop path do componente e a URL atual da aplicação.
Todos os filhos de um Switch devem ser Route ou Redirect . Apenas o primeiro filho que corresponder ao local atual será renderizado. Se não houvesse o Switch mais de um componente poderia ser renderizado na mesma rota de forma errada.
## O Componente `<Redirect />`
