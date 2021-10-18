# Testes em Redux
---
## Testando Redux
De maneira análoga à que fazíamos com teste do `React-Router`, que precisamos criar uma função `renderWithRedux`, pois a nossa aplicação está englobada pelo <Provider store={store} />. Essa função tem a seguinte estrutura:

```js
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../reducers';

const createMockStore = (initialState) => (
  createStore(combineReducers({ reducer }), initialState, applyMiddleware(thunk))
);

const renderWithRedux = (
  component, { initialState, store = createMockStore(initialState) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store});

export default renderWithRedux;
```