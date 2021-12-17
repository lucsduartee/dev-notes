# Metaprogramming: módulos

## Clonando métodos criados em runtime (Herança por comportamento)
Podemos clonar métodos que foram criados em objetos utilizando o `clone`:
> Veja exemplo 1
Dessa maneira eu pego tanto o estado de `x` quanto o comportamento que ele possui e passo para `y`

Existe também o `dup` mas ele duplica apenas o estado e não o comportamento:
```rb
x = "Algo"
b = x.dup
puts b # => "Algo"
```

## Herança com <<
Utilizando esse operador podemos definir métodos para uma variável criada, passando como herança para uma classe, a própria variavel.
> Veja exmplo 2