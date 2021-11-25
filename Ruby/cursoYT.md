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