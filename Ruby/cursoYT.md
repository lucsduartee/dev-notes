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

# Orientação a objetos

## Classes
Como definir uma classe em Ruby:
```rb
class NomeClasse
  # getter
  def nome
    @nome
  end

  # setter
  def nome = (value)
    @nome = (value)
  end
end
```
## Construtor
Podemos criar um Constructor da seguinte maneira:
```rb
class Nomeclass
  def initialize(attr1, attr2, ...)
    @attr1 = attr1
    @attr2 = attr2
    .
    .
    .
  end
end
```
Assim se quisessemos criar uma classe `Carro`, por exemplo, faríamos da seguinte maneira:
```rb
class Carro
  def initialize(nome = "Modelo Padrão")
    @nome = nome
  end

  def nome=(value)
    @nome = value
  end

  def nome
    @nome
  end

  def pneu=(value)
    @pneu = value
  end

  def pneu
    @pneu
  end

  def porta=(value)
    @porta = value
  end

  def porta
    @porta
  end

  def painel=(value)
    @painel = value
  end

  def painel
    @painel
  end

  def roda=(value)
    @roda = value
  end

  def roda
    @roda
  end

  def mostrar(marca="Marca padrão")
    puts "Marca: #{marca} - Modelo: #{@nome || self.nome || nome}"
  end
end
```

## Acessors
É possível criar getters e setters de maneira mais fácil utilizando `attr_acessor` e `attr_reader`.
Refatorando a nossa classe acima:
```rb
class Carro
  def initialize(nome = "Modelo padrão")
    @nome = nome
  end

  attr_acessor :nome, :pneu, :porta, :painel, :roda

  def mostrar(marca="Marca padrão")
    puts "Marca: #{marca} - Modelo: #{@nome || self.nome || nome}"
  end
end
```
O `attr_acessor` cria todos os `getters` e `setters`. É como se ele fizesse da seguinte forma:

```rb
def attr_acessor(*args)
  args.each do |props|
    eval("
      def #{props}=(value)
        @#{props} = value
      end

      def #{props}
        @#{props}
      end
    ")
  end
end
```
Se eu não quisesse que um dos atributos, no caso o pneu, por exemplo, tivesse apenas o `setter`:
```rb
class Carro
  def initialize(nome = "Modelo padrão")
    @nome = nome
  end

  attr_acessor :nome, :porta, :painel, :roda
  attr_writer :pneu # é como se fizesse def pneu = (value); @pneu = value; end

  def mostrar(marca="Marca padrão")
    puts "Marca: #{marca} - Modelo: #{@nome || self.nome || nome}"
  end
end
```
Se eu não quisesse que um dos atributos, no caso o pneu, por exemplo, tivesse apenas o `getter`:
```rb
class Carro
  def initialize(nome = "Modelo padrão")
    @nome = nome
  end

  attr_acessor :nome, :porta, :painel, :roda
  attr_reader :pneu # é como se fizesse def pneu; @pneu; end

  def mostrar(marca="Marca padrão")
    puts "Marca: #{marca} - Modelo: #{@nome || self.nome || nome}"
  end
end
```

## Herança
É da seguinte maneira que declaramos uma herança em Ruby:
```rb
# carro.rb
class Carro
  attr_acessor :nome, :portas

end


# fiesta.rb

require_relative 'carro'

class Fiesta < Carro

end
```
## Public, Private e Protected
Public - Acessível fora da classe;
Private - Acessível somente dentro da classe;
Protected - Acessível somente dentro da classe mas é possível acessar por herança;  
Por padrão os métodos e as propriedades são públicas.  
Tudo abaixo de `private`, `protected` e `public`, assim é de acordo com o escopo:  
```rb
class AlgumaClasse

  attr_acessor :attr1, :attr2, ...

  public
  def metodopublic1; end
  def metodopublic2; end
  def metodopublic3; end

  private
  def metodoprivate1; end
  def metodoprivate2; end
  def metodoprivate3; end

  protected
  def metodoprotected1; end
  def metodoprotected2; end
  def metodoprotected3; end
end
```
## Polimorfismo
Polimorfismo é a capacidade da classe filha ter um método com o mesmo nome da classe pai mas com
uma implementação própria. Porém ainda é possível esse método trazer a implementação da classe pai utilizando
o `super`.
```rb
# Dessa primeira maneira estamos sobrescrevendo o método mostrar da classe Carro na classe Ferrari
class Carro
  def mostrar
    puts "classe carro"
  end
end

class Ferrari < Carro
  def mostrar
    puts "classe ferrari"
  end
end

# Dessa maneira estamos trazendo o retorno do método mostrar para destro de uma variável.
# Automaticamente o super pega o retorno da método da classe Pai que corresponde ao escopo em
# que ele foi chamado:

class Carro
  def mostrar
    puts "classe Carro"
  end
end

class Ferrari < Carro
  def mostrar
    mostrar_classe_pai = super # super == "classe carro"
    puts "classe ferrari"
  end
end
```

## Interface, Abstração, Singleton
Interface é uma classe sem uma implementação e sem instâncias.
Abstração é uma classe que possui algumas implementações apenas.
Singleton é uma classe que possui apenas uma instância.

```rb
class GenericInterface
  def initialize
    raise "Classe não pode ser instanciada, somente herdada, e implementada"
  end

  def test1
    raise "Método a ser implementado"
  end

  def test2
    raise "Método 2 a ser implementado"
  end
end

class GenericAbstract
  def initialize
    raise "Classe abstrata, não pode ser instanciada, somente herdada"
  end

  def test1
    raise "Método não implementado"
  end

  def test2
    "Método implementado"
  end
end

# singleton.rb
require 'singleton'

class SingletonClass
  include Singleton

  def test1; "Teste método 1"; end
  def test2; "Teste método 2"; end
end
```
Importando o singleton, e usando ele dentro da nossa classe ele já cria um construtor privado.

## Instalar Gems

Preciso criar um arquivo chamado Gemfile com o seguinte conteúdo:
```gemfile
source 'https://rubygems.org'

gem 'gemname'
```
E depois no terminal utilizar o comando `bundle install` para instalar as dependências.
É possível ainda `lockar` a versão que eu quero da `gem`:
```gemfile
source 'https://rubygems.org'

gem 'gemname', "=x.x.x" # versão igual a x.x.x
gem 'gemname', "~>x.x.x" # versão maior que x.x.x
```
