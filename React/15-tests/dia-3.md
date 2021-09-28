# Testando React Router

Não é possível utilizar o `<BrowserRouter />` com o _RTL_ pois ele preserva o histórico, fazendo com que surja dependências entre um teste e outro.
Para resolver esse problema, precisamos criar uma função chamada `renderWithRouter` para testar nossas rotas.
```jsx
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
export default renderWithRouter;
```
A cada chamada do `renderWithRouter` um novo objeto `history` é criado, dessa maneira garantimos que sempre estamos pegando um histórico limpo.
Agora podemos testar se conforme clicamos em um determinado `<Link />` em nossa página, a navegação é rdirecionada para uma _url_ desejada.
Imaginamos a situação onde temos uma `<BrowserRouter />` englobando nosso `<App />`, e esta é uma aplicação simples com uma página para `<Sobre />`, `<Home />` e `<NotFound />`. Vamos testar se, ao clicar em um `<Link to="/sobre" />` somo redirecionados para essa `url`:

```jsx
import React from 'react';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from './App';

describe('teste da aplicação toda', () => {
  it('deve renderizar o componente sobre', () => {
    const { getByText, history} = renderWithRouter(<App />);

    fireEvent.click(getByText(/Sobre/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  })
})
```
Por meio do `history.location.pathname` consigo acessar a _url_ em que meu navegador se encontra naquele momento. No código acima, estamos testando se ao clicar em um link contendo o texto `Sobre` ou `sobre`, somos redirecionados para uma ulr `/about`.

Outra maneira de verificarmos se estamos na _url_ que gostaríamos, é por meio do `history.push`. Esse método `push` simula um `enter` em uma _url_ digitada no browser:
```jsx
it('deve testar um caminho não existente e renderização no Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const noMatch = getByText(/Página não encontrada/i);
  expect(noMatch).toBeInTheDocument();
})
```