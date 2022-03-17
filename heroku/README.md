# Heroku

## Preparando um projeto para deploy
O __Heroku__ possui uma CLI para gerenciar as aplicações. É possível fazer os deploys por essa CLI.
Primeiro precisamos de um projeto com um repositório __git__. E precisamos adicionar um remote do heroku nele:
```bash
  heroku create # cria um remote com um nome de um app aleatório
  heroku create nome-de-um-app # cria um remote com um nome de app específico
  heroku create nome-de-um-app --remote nome-do-remote # cria um remote com um nome específico juntamente com um nome de um app especificado tbm
```
Podemos também fazer uma associação de um app heroku que já existe para um remote:
```bash
  heroku git:remote -a meu-deploy-de-testes-29302 --remote heroku-test 
```
E para fazer um deploy, basta fazer um `git push` da sua __branch__ local para a __branch__ master do heroku:
```bash
  git push heroku-origin master # push da master local
  git push heroku-origin branch-nova-feature:master # push da branch da nova feature local
```
## Acompanhando a aplicação
- Listar apps heroku: `heroku apps`
- Ver detalhes de um app específico: `heroku apps:info nome-do-app`
- Setar variáveis de ambiente: `heroku config:set VARIAVEL="valor" --app nome-do-app`
- Listar variáveis de ambiente de um determinado app: `heroku config --app nome-do-app`
- Ver logs de apps: `heroku logs --app nome-do-app`
- Ver logs com qtd de linhas pre-determinadas, onde x é quantidade de linhas mostradas(ultimas linhas) com -n ou --num: `heroku logs -n x --app nome-do-app`
- Ver logs em tempo real com -t ou --tail: `heroku logs -t nome-do-app`
- Remover um app heroku: `heroku destroy --app nome do app --confirm nome-do-app`

## Deploy com Docker

Arquivo de Dockerfile básico:
```dockerfile
FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]
```
Precisamos também de um `heroku.yml`:
```yml
build:
  docker:
    web: Dockerfile

run:
  web: node index.js
```
É possível ler mais sobre o `heroku.yml` na [documentação](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml#heroku-yml-overview)

Depois disso precisamos mudar a stack do Heroku com o comando:
```bash
heroku stack:set container
```
## Adicionando um CI na aplicação

É necessário criar um diretório `.github` na raíz do projeto, e dentro dele um diretório com uma nova pasta chamada `workflows` e um arquivo `main.yml` com uma estrutura mais ou menos dessa forma:
```yml
on: [push, pull_request]

jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
        - name: Verifica o repositório do Git
          uses: actions/checkout@v2

        - name: Instala o node com a versão
          uses: actions/setup-node@v1
          with:
            node-version: 14


        - name: instalando as dependências
          run: npm install

        - name: executando o lint para verificar se a erros
          run: npx eslint .
```
## Coisas legais que dão pra fazer:
Tem mais algumas coisas bacanas que dão para ser feitas com esse esquema de deploy, como por exemplo:
- Fazer um CD com o Heroku:
  - Na aba de deploy do seu app heroku no dashboard deles é possível atrelar seu app a um repositório git, dessa forma é possivel fazer com que toda vez que um commit numa branch master for realizado, ele será deployado automaticamente

- Criar um banco de dados hospedado no [Supabase](https://supabase.com/)

## Criando uma pipeline com Heroku

Primeiro precisamos de um app heroku e com o seguinte comando, adicioná-lo a uma pipeline:
```bash
heroku pipelines:create workflow -a meu-app # workflow se refere ao nome da pipeline, -a aponta pra um app
```
Mais comandos de pipeline:
- Adicionando um app a uma pipeline: `heroku pipelines:add workflow -a meu-app-test`
- Promover um app para um próximo estágio da pipeline: `heroku pipelines:promote -a meu-app`
