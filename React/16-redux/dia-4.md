# Action Assíncronas
---
## Recaptulando o que vimos até aqui:
O trânsito de dados em uma aplicação que tem o **redux** como estado global, depende diretamente de três entidades:  
1. **`store`**: Onde se encontra o estado da aplicação. Entenda como um armazém.
2. **`actions`**: Ações responsáveis por transportar as informações de alteração do estado, juntamente com o tipo da alteração.
3. **`reducer`**: Responsável pelo gerenciamento do estado, ele é quem faz as devidas alterações de acordo com uma `action`.

## `redux-thunk`
Para poder utilizar `actions` assíncronas é necessário utilizar o pacote _redux-thunk_. Ele é um **middleware**, que captura as `actions` enviadas pela `store` antes mesmo delas chegarem no `reducer`. Para utilizá-lo é necessário instalar via `npm install redux-thunk`. Uma vez instalado, o _thunks_ precisa ser incorporado ao `store` por meio da função `applyMiddleware()` do **Redux**:

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from 'path/to/rootReducer';

const store = createStore(reducer, composeWithDevtools(applyMiddleware(thunk)));
```
O `thunk` nada mais é que uma função que será retornada por uma outra função com mais lógica adicionada a ela.

## Estrutura do thunks

O _thunks_ deve ser chamado quando estamos declarando a **ActionCreator**:

```js
export const TIPO_DA_ACTION = 'TIPO_DA_ACTION';

export const nomeDaAction = (payload) => ({
  type: TIPO_DA_ACTION,
  payload,
})

export const nomeDoThunk = () => async (dispatch) => {
  const response = await chamadaDaAPI();
  const payload = {
    // obj com o retorno da api
  };
  dispatch(nomeDaAction(payload))
}
```
Dessa forma, o _thunk_ está configurado. Agora quando vamos na aplicação chamar o `dispatch` no `mapDispatchToProps`, ao invés de disparar a **ActionCreator**, a gente dispara o **thunk**.