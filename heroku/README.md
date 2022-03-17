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