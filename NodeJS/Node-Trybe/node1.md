# Introdução ao Node.js
O __Node.js__ surgiu da engine __V8__ do Google, que é responsável por ler e executar instruções que escrevemos em JavaScript,
digamos que é uma espécie de interpretador de código.

## Conceitos iniciais de Node
- _Módulo_: Um módulo é um pedaço de código presente em um ou mais arquivos, dentro de seu próprio escopo, quer dizer,
as suas variáveis, funções, classes e outras coisas só são acessíveis dentro daquele módulo. Um módulo é isolado do restante do código.
Há 3 tipos de módulos em __node__, os _internos_, _locais_ e _de terceiros_.
  - _Internos_: São nativos do próprio __node__, alguns exemplo de módulos bastante utilizados são:
    - fs: API para interação com sistemas de arquivos.
    - url: Provê utilitários para ler e manipular URLs.
    - querystring: Disponibiliza ferramentas para leitura e manipulação de parâmetros de URLs.
    - util: Fornece ferramentas e funcionalidas comumente úteis a pessoas programadoras.
  
  - _Locais_: São definidos juntamente à aplicação. São pedaços de código que possuem funcionalizades que foram isoladas em arquivos diferentes.

  - _de Terceiros_: Módulos criados por outras pessoas de disponibilizados para uso via `npm`.

## Importando e exportando módulos
Existem dois sistemas de módulos difundidos na comunidade JS, os _Módulos ES6_ e os _Módulos CommonJS_.
- __ES6__: Módulos importados e exportados via `import/export`. O __Node__ não suporta nativamente esse sistema de módulos, então é necessário o uso de transpiladores, como o _Babel_, ou supersets de linguagem, como o _Typescript_ para a disponibilização desse recurso.

- __CommonJS__: Sistemas de módulos implemantado nativamente no _Node_, sem a necessidade de supersets ou transpiladores.

### Exportando módulos com o CommonJS
Para exportar algo com esse sistemas de módulos, utilizamos uma variável global chamada `module.exports`, e atribuimos a ela um valor que gostaríamos de exportar:
```js
const name = 'Alfredo';

module.exports = name;
```
O `module.exports` pode receber qualquer valor que seja válido em _JavaScript_, isso inclui variáveis, objetos, funções, classe...