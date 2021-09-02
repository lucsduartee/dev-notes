# Componentes React

Há duas maneira de definirmos um componente:

- por meio de função:

```jsx
function Greeting(props) {
  return (<h1>Hello, {props.name}</h1>);
}

export default Greeting;
```

- por meio de classe:

```jsx
import React from 'react';

class Greeting extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name}</h1>);
  }
};

export default Greeting;
```

Nesse caso, o _class component_ `Greeting` possui como propriedade um objeto chamado `props`, que nesse caso, contém um nome que será passado como parâmetro na hora de chamar o componente. Exemplificando `<Greeting name="Augusto" />`, faz com que o componente tenha `prop = { name: 'Augusto' }`.

## Abstraindo as `props`...

As `props` são importantes pois com elas consigo passar valores para os componentes, desta maneira consigo usá-los em diferentes contextos e de diversas formas. Para entender melhor, pense nas `props` como parâmetros de uma função convencional.

## Criando components dinamicamente

Vamos supor que eu quero renderizar uma lista de taferas a ser executada. Para isso, pensemos no seguinte código:

```jsx
// Task.jsx
import React from 'react';

class Task extends React.Component {
  render() {
    return (<li>{this.props.task}</li>);
  }
}

export default Task;

// App.jsx
import React from 'react';
import Task from './components/Task';

class App extends React.Component {
  render() {
    const task1 = 'Limpar casa';
    const task2 = 'Arrumar o guarda-roupa';
    const task3 = 'Levar o doguinho para passear';
    //imagina mais mil tarefas...
    const taskN = 'Unificar a Relatividade Geral e Mecânica Quântica';

    return (
      <ol>
        <Task task={task1} />
        <Task task={task1} />
        <Task task={task1} />
        //imagina chamar Task mais 1000 vezes
        <Task task={taskN} />
      </ol>
    );
  }
}
```
Nosso código fica totalmente contraintuitivo e não escalável. Para isso, podemos utilizar as _HOFs_ para nos auxiliar em situações desse tipo. Refatorando o código acima, teremos:

```jsx
// Task.jsx
import React from 'react';

class Task extends React.Component {
  render() {
    return (<li key={this.props.key}>{this.props.task}</li>);
  }
}

export default Task;

// App.jsx
import React from 'react';
import Task from './components/Task';

class App extends React.Component {
  render() {
    const tasks = ['Limpar casa', 'Arrumar o guarda-roupa', 'Levar o doguinho para passear', 'Unificar a Relatividade Geral e Mecânica Quântica'];

    return (
      <ol>
        {tasks.map((task, id) => <Task task={task} key={id}/>)}
      </ol>
    );
  }
}
```

Desta forma, nosso código fica muito mais compacto e dinâmico, criando **n** conforme o tamanho da minha lista de tarefas. 

## Checagem de tipos, PropTypes

A checagem de tipos é importante dentro do React, pois previne situações nas quais é passado alguma `prop` cujo o tipo não é esperado. Isto é feito da seguinte forma:

```jsx
import React from 'react';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name} {this.props.lastName}</h1>);
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
  lastName: PropTypes.string,
};

export default Greeting;
```
Vamos entender o que está sendo feito aqui.
1. Primeiro importamos o `prop-types` no component.
>_Obs: Pode ser que seja necessário utlizar o `npm install --save-dev prop-types` caso não tenha utilizado o `create-react-app` para inicializar o aplicativo **React**_. 
2. Depois fazemos a verificação dos tipos, antes de exportar o componente:
```jsx
Greeting.propTypes = {
  name: PropTypes.string,
  lastName: PropTypes.string,
};
```
Acima estamos _'settando'_ que as _props_ `name` e `lastName` sejam do tipo `string`. O `PropTypes` pode vir acompanhado de outros parâmetros, como: `.number`, `.bool`, `.func`, `.object`, `.array`.  
Além disso, é possível dizer que uma `prop` é obrigatória utilizando o `.isRequired`:
```jsx
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string,
};
```
Desta forma garantimos que _props_ essenciais para o funcionamento do componente sejam passadas.
