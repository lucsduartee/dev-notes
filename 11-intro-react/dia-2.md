# Componentes React

Há duas maneira de definirmos um componente:

- por meio de função:

```jsx
function Greetings(props) {
  return (<h1>Hello, {props.name}</h1>);
}

export default Greetings;
```

- por meio de classe:

```jsx
import React from 'react';

class Greeting extends React.Component {
  render() {
    return (<h1>Hello, {this.props.name}</h1>);
  }
};

```