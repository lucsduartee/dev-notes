## Tipos de variáveis em Ruby

- Variáveis simples:
```rb 
a = 1 
```
- Instância: Variável de escopo da classe
```rb
@a = 1
```
- Classe: Variável para o escopo da classe e para classes que herdam dela
```rb
@@a = 1
```
- Global:
```rb
$a = 1
```
- Constante:
```rb
CONSTANTE = 1
```

## Condicionais em Ruby

- If, elsif, else:
  O `if` no Ruby é muito versátil, é possível usá-lo de diversas maneiras, abaixo estarão listadas alguns exemplos de uso:
  ```rb
  puts "Hello World" if (condition)
  if (condition) then puts "Hello World" end
  ```
  Essa são algumas maneiras. Também é possivel utilizar o `if elsif`:
  ```rb
  if condition
    # ação
  elsif condition
    # ação
  else
    # ação
  end
  ```
- Unless:
  É como se fosse a negação do `if`. Exemplificando:
  ```rb
  if a == 2
    # ação caso a seja igual a dois

  unless a == 2
    # ação é executada caso a seja diferente de 2
  ```
- Case, when:
  Similar ao switch case:
  ```rb
  case a
    when condition
      # ação
    when condition2
      # ação
    else
      # ação
    end
  ```
- Ternário: `a = condition ? retorno1 : retorno2`

## Tratamento de Strings

- Concatenação: Há diversas maneiras de concatenar strings em Ruby, as mais utilizadas são:
  ```rb
  "o valor da variável é: #{value}", "+", String.concat('alguma_coisa')
  ```
- Substring: Pega um pedaço da string original:
  ```rb
  a = 'Lucas'
  a[1,2] # => 'uc'
  ```
- Replace:
  ```rb
  'Lucas'.gsub('L', 'u') # => 'uucas'
  ```
- Capitalize: Torna a primeira letra maiúscula
  ```rb
  'lucas'.capitalize # => 'Lucas'
  ```
- Center: Coloca uma quantidade x de espaços antes e depois de uma string:
  ```rb
  'Lucas'.center(3) # => '   Lucas   '
  ```
- Delete: Deleta um caracter correspondente:
  ```rb
  'Lucas'.delete('L') # => 'ucas'
  ```
- Upcase e Downcase: auto-explicativo
- Empty?: Verifica se a string tá vazia
- Blank: Verifica se está vazia ou nula
- Present?: Verifica se está diferente de vazia e nula
- Include?: Verifica se uma string contem um determinado dado
- Index: Retorna o iídice de uma substring

E muitos outros que é possível ver na documentação

## Operadores lógicos

Os mais utilizados são:

Operador | Significado
---------|--------------
== | Comparação
\> | Maior
\< | Menor
a <=> b | a == b retorna 0, a < 1 retorna 1, se a > 1 retorna -1
<= | Menor ou igual
\>= | Maior ou igual
!= | Diferente
! | Not
NOT | Not
&& | e
AND | e
\|\| | ou
OR | ou
Dado.eql?() | é igual?
~= | 'Lucas' ~= /L/ retorna true, 'Lucas' ~= /W/ retorna false
!~ | Inverso do de cima


## Loopings
Há diversas maneiras de fazer loop no __Ruby__:

- while:
  ```rb
  index = 0;
  while condition
    # expressão
  end
 
  # ou ainda

  action_to_executed while condition
  puts "index é #{index += 1}" while index < 5;
  ```
- until: Parecido com o while
  ```rb
  until condition
    # expressão
  end
  ```
- loop: serve para fazer um loop infinito até que uma condição seja satisfeita
  ```rb
  loop do
    # expressão
    break if condition
  end
  ```
Esses comandos também aceitam dentro deles um `next if condition`, esse comando é similar ao `continue` de outras linguagens.

- X.times: executa um loop X vezes, X pertence aos Inteiros:
  ```rb
  10.times do |index|
    # expressão
  end

  # Ou ainda em uma linha

  10.times { |i| # ação }
  ```
- for: ele é similar as outras linguagens:
  ```rb
  for in 1..3
    # expressão
  end
  ```
- each: utilizado quando temos um array ou um range. Parece um `forEach` do JS.
  ```rb
  Array.each { |element| # ação }
  (1..5).each { |element| # ação }
  ```
- map: utilizado com array também e retorna um outro array baseado em um processamento:
  ```rb
  Array.map { |element| # ação}
  ```
- select: é similar ao `filter` do JS:
  ```rb
  Array.select { |element| # condition_to_return }
  ```

## Hash (Objetos) em Ruby
Eles são como os objetos em JS, podem ser declarados de maneiras diferentes. Veremos abaixo:
  ```rb
    a = { chave: valor }
    
    b = {}
    b[chave] = valor

    c = { chave => valor }

    d = { :chave : valor }

    e = { :chave => valor }
    puts e[:chave]
  ```

## Funções
Válido lembrar que funções em Ruby possuem retorno automático
  ```rb
  # Sem parâmetros.
  def function_name
    # implemantation
  end

  # Com parâmetros
  def function_name(param)
    # implementation using param
  end
  function_name(algo) || function_name algo

  # Com parâmetro default
  def function_name(param=default_value)
    # implementation using param
  end
  function_name(algo) || function_name algo

  # Rest Params: define um array sem quantidade definida de parametros
  def function_name(*args)

  end
  ```