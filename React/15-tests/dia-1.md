# React Test Library e Jest
[Documentação](https://testing-library.com/)
---
## Começando com testes

O React possui uma própria biblioteca para a realização de testes, que no caso é a _React Test Library_, conehcida também pela abreviação _RTL_. Com ela podemos testar uma quantidade semi-infinita de coisas, como por exemplo, se um determinado texto está contido no _Document_ renderizado por um componente. Veja o exemplo a seguir:

```js
// App.test.js || App.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Componente principal', () => {
  it('Mostrar o nome do banco', () => {
    render(<App />);
    expect(screen.getByText('Algum Texto')).toBeInTheDocument();
  });
});
```
Agora vamos analizar cada esse trecho de código.
- **Imports**: nele importamos o _React_ pois precisamos renderizar um component React, no nosso caso o `App`. Na linha 2, trazer duas funções da `'@testing-library/react'`, a `render` e a `screen`, que são funções que permitem renderizar o componente dentro do teste, e outra que acessa a _DOM_.
- **Estrutura do Teste**: possui um `describe` no qual agrupa um conjunto de testes referentes a um mesmo contexto, recebe por parâmetro uma `string` contendo o nome do teste e uma função com o corpo do teste. Na implementação desta função, temos um `it` que se refere à um determinado teste dentro do contexto, e também por parâmetro uma string descrevendo o que está sendo testado e uma função com a execução do teste.
- **O Teste**: primeiramente o componente `App` é renderizado, por meio da função `render()`, logo na linha abaixo, está o teste em si. Nessa linha é verificado se a string `Algum Texto` está contida no conteúdo renderizado no _DOM_. Podemos ler da seguinte maneira:
> Ou Screen, procura pelo texto "Algum Texto" aí na DOM. Eu espero que esse texto esteja no Documento.
Podemos ter um describe dentro do outro, sem problemas.

## Testando funções

Precisamos garantir também que as funções contidas na nossa aplicação sejam executadas da maneira correta e que seus retornos sejam conforme o esperado.  
Suponhamos que exista uma função que eleva qualquer número ao quadrado, `calculaQuadrado(numero)`. Para testá-la, podemos chamá-la dentro de um `it`:

```js
import calculaQuadrado from './calculaQuadrado';
it('retorna o quadrado de um número',  () => {
  const quadrado = calculaQuadrado(5);
  expect(quadrado).toBe(25);
});
```
É válido ressaltar que o teste funciona para qualquer tipo de implementação dessa função `calculaQuadrado`, ela pode o retorno dela pode ser tanto `numero * numero` como também pode ser `Math.pow(numero, 2)`. O teste deve ser independente da implementação.

## Testanto componentes React

Uma das maneira de garantir, testar, que certa informação sempre seja renderizada é utilizando os **snapshots**. Gosto de pensar neles como se fossem imagem ideais do nosso código, que são usadas para comparar com o que de fato está sendo renderizado. Vamos supor que tenhamos um componente da seguinte maneira:

```jsx
import React, { Component } from 'react';

class Greeting extends React.Component {
  render() {
    const { props: { name, age, city} } = this;
    return (
      <div>
        <p>{name}</p>
        <p>{age}</p>
        <p>{city}</p>
      </div>
    );
  }
}

export default Greeting;
```

Esse componente recebe três parâmetros. Para garantir que esse componente sempre seja renderizado dessa forma, utilizamos o test Snapshot. Veja a implementação desse teste:

```js 
import React from 'react';
import { render } from '@testing-library/react';
import Greetings from './Greetings';

describe('Componente de saudações', () => {
  it('O snapshot do componente deve permanecer o sempre o mesmo', () => {
    const { container } = render(
      <Greetings 
        name="Fulano"
        age="27"
        city="Terra do Nunca"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
```
O `container` contém o retorno da renderização da função `render()`.
Assim que esse teste for executado, ele criará um diretório `snapshots` contendo um arquivo `snap` com esse elemento criado no teste: 
```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Componente de transação do extrato O snapshot do componente deve permanecer sempre o mesmo 1`] = `
<div>
  <p>
    Fulano
  </p>
  <p>
    27
  </p>
  <p>
   Terra do Nunca
  </p>
</div>
`;
```

## React Testing Library

O _RTL_ permite simular a interação do usuário da maneira mais próxima da realidade! Podemos imaginar uma situação em que temos um determinado componente, que renderizar um número inicial, e a partir desse número podemos incrementar ou decrementar em uma unidade esse valor:

```jsx
// ...
<div>
  <label>
    Incrementar
    <input 
      type="radio"
      name="maisoumenos"
      value="incrementar"
      onChange={handleChange}
      data-testid="maisoumenos"
      checked={action.type === 'incrementar'}
    />
  </label>
</div>

<div>
  <label>
  Decrementar
  <input
    type="radio"
    name="maisoumenos"
    value="decrementar"
    onChange={handleChange}
    data-testid="maisoumenos"
    checked={action.type === 'decrementar'}
  />
  </label>
</div>

<div>
    <button type='submit'>
        Realizar ação
    </button>
</div>
// ...
```
Agora podemos escrever testes para garantir que as interações do usuário disparem as ações desejadas.

```jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('Quando realizo uma ação', () => {
  it('que é do tipo incrementar, há um incremento', () => {
    const { getBytext, getByLabelText } = render(<App />);

    // trazendo valor inicial pelo texto
    const initialValue = getBytext('10');
    // trazendo ação pelo texto da label
    const action = getByLabelText('Incrementar');
    // trazendo o botão pelo texto dele
    const button = getByText('Realizar ação');

    // primeiro testamos se o valor inicial é realmente 10
    expect(initialValue.textContent).toBe('10');

    // agora simulamos os eventos utilizando a função fireEvent
    fireEvent.click(action, { target: { value: 'incrementar' } });
    // simulamos o clique no botão
    fireEvent.click(button);

    // testamos se o novo valor agora é 11
    expect(initialValue.textContent).toBe('11');
  });
});
```
O segundo parâmetro do `click` ou `change` é um `target` cujo o `value` é correspondente ao estado no momento do evento.

## Renderizando componentes
É importante notar que o `render()` do _RTL_ nos dá acesso à algumas funções como getByText, getByLabelText, getByTestId, entre outras. Mas há uma maneira mais clean de fazer essa as mesmas coisas. Essa maneira é usando o objeto `screen`. Refatorando o código acima, temos:

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Quando realizo uma ação', () => {
  it('que é do tipo incrementar, há um incremento', () => {
    render(<App />);

    // trazendo valor inicial pelo texto
    const initialValue = screen.getBytext('10');
    // trazendo ação pelo texto da label
    const action = screen.getByLabelText('Incrementar');
    // trazendo o botão pelo texto dele
    const button = screen.getByText('Realizar ação');

    // primeiro testamos se o valor inicial é realmente 10
    expect(initialValue.textContent).toBe('10');

    // agora simulamos os eventos utilizando a função fireEvent
    fireEvent.click(action, { target: { value: 'incrementar' } });
    // simulamos o clique no botão
    fireEvent.click(button);

    // testamos se o novo valor agora é 11
    expect(initialValue.textContent).toBe('11');
  });
});
```
O próprio `screen` nos dá acesso as mesmas funções fornecidas pelo `render()`.

## Simulando o retorno de API

Para simular o retorno de uma API, precisamos usar um mock do _Jest_. Se por exemplo, temos uma função, que faz requisições para API, vinda de uma módulo, podemos usar uma função do _Jest_, que é a `mock()` para mockar todo o módulo. E usando uma outra função do jest, podemos _settar_ nosso retorno.

```jsx
import api from './api';

jest.mock('./api')

api.nome_da_funcao.mockResolvedValue(/* retorno mockado desejado*/);
```
O objeto `screen` fornece uma função que nos auxilia quando estamos lidando com códigos assíncronos, essa função é a `findByText()`. Ela retorna uma promise, por isso podemos usá-la com `async` e `await` da seguinte forma: 

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import api from './api';
import App from './App';

jest.mock('./api');

decribe('requisiçao para api', () => {
  it('exibir dado por meio da API', async () => {
    api.listaDeNomes.mockResolvedValue([
      {
        "nome": "Roberto",
        "sobrenome": "Carl",
        "data": "10/08/2020",
        "id": 1
      },
      {
        "sobrenome": "Carlito",
        "nome": "Rob",
        "data": "26/09/2020",
        "id": 2
      }
    ])

    render(<App />);
    expect(await screen.findByText('Carlito')).toBeInTheDocument();
  })
})
```
No código acima estamos _mockando_ o retorno da função que traz uma lista de nomes para ser esse array com dois objetos. Na linha 253, eu tenho um `expect` que contém como argumento uma espera de resolução de uma _promise_. O `findByText` espera o retorno da _API_ e só depois procura pelo nome `Carlito`.



























