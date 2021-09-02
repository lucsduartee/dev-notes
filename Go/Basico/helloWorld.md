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

## Tipos das variáveis e declarações

Para declarar variáveis no _Go_, é necessário seguir a seguinte síntaxe `var <nome da var> <tipo da var> = <valor>`. Se nenhum valor for passado, o Go passa por valor _default_ `0` caso o tipo seja `int`, `" "` string vazia e `0.0` caso os tipos sejam, respectivamente `string` e `float32 | float64`. Por exemplo: 

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
O Go também possui uma inferência de variáveis, ou seja, não necessáriamente preciso passar o tipo da variável, o Go já faz isso pra mim. Para verificar um tipo de variável eu preciso importando a biblioteca `"reflect"`: 

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	var nome = "Lucas"
	var idade = 32
	var versao = 1.1
	fmt.Println("Olá, sr.", nome, "voce tem", idade, "anos.")
	fmt.Println("Versão do programa", versao)

	fmt.Println("O tipo da variável nome é", reflect.TypeOf(nome)) // string
	fmt.Println("O tipo da variável idade é", reflect.TypeOf(idade)) // int
	fmt.Println("O tipo da variável versão é", reflect.TypeOf(versao)) // float64
}
```
O Go ainda possui um shorthand para a declaração de variáveis. Nesse caso eu posso refatorar o código acima, apenas usando o seguinte operador de atribuição `:=`:

```go
package main

import (
	"fmt"
	"reflect"
)

func main() {
	nome := "Lucas"
	idade := 32
	versao := 1.1
	fmt.Println("Olá, sr.", nome, "voce tem", idade, "anos.")
	fmt.Println("Versão do programa", versao)

	fmt.Println("O tipo da variável nome é", reflect.TypeOf(nome)) // string
	fmt.Println("O tipo da variável idade é", reflect.TypeOf(idade)) // int
	fmt.Println("O tipo da variável versão é", reflect.TypeOf(versao)) // float64
}
```
