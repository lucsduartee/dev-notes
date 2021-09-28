# Simulando Comportamentos com _RTL_

Agora vamos relembrar como **mockar**, ou simular, comportamentos de funções como o _Jest_.

```js
let funcaoA = (a, b) => funcaoB(a + b);

//SIMULANDO UMA FUNÇÃO SIMPLES
funcaoA = jest.fn().mockImplemetation((a, b) => console.log('finge que chamou a funcaoB'));
// é equivalente à:
funcaoA = jest.fn((a, b) => console.log(`Finge que chamou a funcaoB`));


//SIMULANDO FUNÇÕES QUE RETORNAM PROMISE
myFunc = jest.fn().mockImplementation((a, b) => new Promise.resolve('simulacao'));
// é equivalente à:
myFunc = jest.fn((a, b) => new Promise.resolve(a + b));
// é equivalente à:
myFunc = jest.fn.mockResolvedValue(a + b);

```

## Mockando um fetch

```jsx
it('verifica se exibe na tela o resultado de uma requisição', async () => {
  const retornoMockado = {
    // conteudo...
    // pode ser uma rray, um objeto como nesse caso, sei lá
  };

  const response = { json: jest.fn().mockResolvedValue(retornoMockado) };
  global.fetch = jest.fn().mockResolvedValue(response);

  const { findByText } = render(<App />);
  await findByText(/* Algo que dependa da resposta da minha API */);
  //ou ainda
  await waitFor(() => getByText(/* Algo que dependa da resposta da minha API */));

})
```
Estamos usando o objeto `global` que nos dá acesso ao `fetch` dentro dos nossos testes.
O Fetch por sua vez nos retorna uma promise que possui uma função `json()` que retorna os nossos
dados da API. Eu poderia reescrever o código da linha 32 e 33 da seguinte maneira: 

```jsx
global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue(retornoMockado);
});

// Ou ainda:

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve({ /* retorno mockado */});
  })
});
```