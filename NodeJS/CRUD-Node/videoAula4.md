# Configurando Lint
Para confiturar o lint, precisamos de 3 extensões instaladas: O ESLint, o Prettier e o EditorConfig for VS Code. E por fim rodar o comando `yarn add eslint`. Depois que a instalação acabar, eu rodo o comando `yarn eslint --init` para enfim poder configurar o meu lint, então vai aparecer umas perguntas que eu vou respondendo de acordo com a configuração que eu quero trabalhar com meu lint.

Podemos juntar o Prettier para trabalhar junto com o lint. Para isso, utilizamos o comando `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`

E por fim, criamos na raíz do projeto um arqivo `.prettierrc` com o conteúdo:
```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```
Precisamos criar também um arquivo `.editorconfig` contendo: 
```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```