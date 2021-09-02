# Iniciando com a Linguagem
---
## Hello World!

Para dizer que posso executar um programa no computador, devo declarar no início do código que o nosso programa será o principal pacote da aplicação, pois programas em Go podem ter diversos pacotes. Logo em seguida, declaro minha funcão `main`:

```go
package main

import "fmt"

func main(){
  fmt.Println("Hello World")
}
```

Então, para "printar" no Go, precisamos utilizar a biblioteca `"fmt"` (format), e invocar a função `Println()` (print line). É válido ressaltar que a função `Println()` está com letra maiúscula, para indicar que é um função de uma biblioteca externa.

Feito isso, usando o comando `go build nomeDoArquivo.go` no terminal, ele compilará e me retornará um executável `nomeDoArquivo`. Para executar, basta utilizar o comando `./nomeDoArquivo`. É possível compilar e executar ao mesmo tempo, por meio do comando `go run nomeDoArquivo.go`.

## Tipos das variáveis

Para declarar variáveis no _Go_, é necessário seguir a seguinte síntaxe `var <nome da var> <tipo da var> = <valor>`. Se nenhum valor for passado, o Go passa por valor _default_ `0` caso o tipo seja `int`, `" "` string vazia e `0.0` caso os tipos sejam, respectivamente `string` e `float`. Por exemplo: 

```go
package main

import "fmt"

func main() {
  	var nome string = "Lucas"
	var idade int = 32
	var versao float32 = 1.1
	fmt.Println("Olá, sr.", nome, "voce tem", idade, "anos.")
	fmt.Println("Versão do programa", versao)
}
```