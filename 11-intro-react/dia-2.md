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
