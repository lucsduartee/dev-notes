# Iniciando com Ruby

## Hello World em Ruby
Para printar algo no Ruby, eu uso o comando `print`. Pra tirar a zica:
```rb
print "Hello World"
```
Podemo printar também com o comando `puts`. A única diferença é que o `puts` pula uma linha no final do comando.

## Variáveis

Para declarar uma variável fazemos da seguinte forma
```rb
character_name = "Fulano"
character_age = "35"

puts ("there once was a man named " + character_name)
puts ("he was " + character_age + " years old")
```

## Tipos de dados em Ruby

- string: são textos, `name = "alguem"`
- numbers: são números, `age = 18`
- float: números decimais, `height = 1.75`
- boolean: são boleanos, `ismale = true` ou `isfemale = false`
- nil: similar o nulo, `sons = nil`

## Trabalhando com strings

Para usar as pas duplas, devemos usar o seguinte: `\"`
Alguns métodos bem úteis:

- String.upcase(): deixa tudo em caixa alta
- String.downcase(): deixa tudo em caixa baixa
- String.strip(): tira os espaços em branco de uma string
- String.length(): retorna o comprimento da string
- String.include? "algum valor": retorna um boolean indicando se a string contém ou não "algum valor"
- String.index("valor"): retorna o indice em que se encontra a string que recebou como argumento

## Trabalhando com números

Para converter um numero em string, usamos a função `Number.to_s` e para converter uma string em numero usamos `String.to_i`

- Number.abs(): retorna o valor absoluto
- Number.round(): retorna o valor do numero arredondando
- Number.ceil(): retorna o valor do numero arredondando pra cima
- Number.floor(): retorna o valor do numero arredondando pra baixo

Classe `Math`:

- Math.sqrt(Number): retorna a raíz quadrada de um numero
- Math.log(Number): retorna a logarítmo de um numero

## Pegando entrada do usuário

Para pegar a entrada do usuário usamos a seguinte maneira:
```rb
puts "Enter yout name: "
name = gets
puts ("Hello: " + name)
```
Tem que usar a função `gets` ou `gets.chomp()` para não pular uma linha. O `gets` capta até o enter e interpreta como um `\n`.

## Arrays

Para criar um array em Ruby fazemos da seguinte forma:
```rb
friends = Array["alguem", "alguem2", "alguem3"]
```
Você pode colocar diversos tipos de dados dentro de um array também, não necessariamente o array precisa ser todo do mesmo tipo.
Se eu quiser apenas declarar um Array:
```rb
friends = Array.new
```

## Hashes