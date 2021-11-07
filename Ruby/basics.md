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

As hashes são como se fosse objetos ou dicionários.
```rb
states = {
  "Pennsylvania" => "PA",
  "New York" => "NY",
  "Oregon" => "OR",
}
```
Para acessar os valores usamos a seguinte notação: `state["Oregon"]`, dessa forma eu terei como retorno o valor `"OR"`.
Posso declarar a hashe da seguinte forma também:
```rb
states = {
  :Pennsylvania => "PA",
  "New York" => "NY",
  :Oregon => "OR",
  1 => "one",
}
```

## Methods em Ruby (funções)

Para definir um método em Ruby:

```rb
def sayhi
  puts "Hello World"
end

sayhi # Aqui está sendo executada a função
```
Agora uma função com parâmetro:
```rb
def sayhi(name)
  puts ("Hello " + name)
end

sayhi("Mike") # Aqui está sendo executada a função
```
Passando default values para as funções:
```rb
def sayhi(name="fulano", age=-2)
  puts ("Hello " + name + " and " + age.to_s + " years old")
end

sayhi("Mike") # Aqui está sendo executada a função
```
Métodos com retorno:
```rb
def cube(num)
  return num * num * num
end

cube(3) # Aqui está sendo executada a função
```
Ou ainda:
```rb
def cube(num)
  return num * num * num
end

cube(3) # Aqui está sendo executada a função
```
Funções podem retornar mais de uma coisa, para acessar os resultados usamos a notação parecida como se fossemos acessar um array:
```rb
def cube(num)
  return num * num * num, num
end

cube(3)[1] # retorno será 3
```

## If Statements
Operadores lógicos em Ruby são escritos literalmente: `and`, `or` e negação `!`

```rb
if condition
  # excuta algo
elsif condition2
  # executa outra algo
else
  # executa excessão
end
```

## Case Expressions

É o famoso `switch case` 
```rb
def get_day_name(day)
  day_name = ""

  case day
  when "mon"
    day_name = "Monday"
  when "tue"
    day_name = "Tuesday"
  when "wed"
    day_name = "Wednesday"
  else
    day_name = "Invalid abv"
  end

  return day_name
end
```
Aqui o `case` faz o papel do `switch` e o `when` faz o papel do `case`, e o else faz o papel do `default`.

## Loops

Famigerados loops

```rb
index = 1
while index <= 5
  puts index
  index += 1
end
```