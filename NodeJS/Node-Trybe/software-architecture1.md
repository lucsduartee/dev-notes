# Arquitetura MSC (Model - Service - Controller)

Agora vamos aprender sobre o que é o padrão arquitetural MSC e qual a funcionalidade de cada uma dessas camadas desse padrão:
- __Model__: Arquivos onde são executadas as operações com o banco de dados (conexões e queries);
- __Service__: Onde estão estruturadas as regras de negócio. Normalmente é quem invoca os métodos definidos no __Model__.
- __Controllers__: camada mais próxima da pessoa usuária ou de uma requisição. Invoca e processa funções definidas na camada
de __Service__.

## A camada __Model__
À camada __Model__ é inputada o papel de abstrair por completo os detalhes de acesso e armazenamento. Apenas ela deve ter interações com
um banco de dados. As outras camadas não devem nem ao menos saber se há ou não um banco de dados, e se houver, não devem nem saber qual o banco utilizado.
O __Model__ deve ser desacoplado do restante da arquitetura, ou seja, não deve ter conhecimento das outras camadas.

## __Model__ com MySQL

### Criando e populando banco de dados
Conexão com o MySQL: `npm i mysql2`