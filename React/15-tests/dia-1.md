# React Test Library e Jest
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