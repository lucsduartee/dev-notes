## Metaprogramming

Maneira como um código manipula a si mesmo ou a um outro código em tempo de execução.
Podemos definir uma variável, que é um objeto, e a ela adicionar um método, veja o exemplo a seguir:
```rb
x = 'O Sol'
def x.sol_quente
  "#{self} está quente"
end
```