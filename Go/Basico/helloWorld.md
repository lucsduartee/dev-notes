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
Há uma função dentro do pacote `fmt` que se chama `.Scanf()` que serve para ler a entrada do usuário:

```go
package main

import "fmt"

func main() {
	var number int
	fmt.Println("Digite um número")
	fmt.Scanf("%d", &number)
}
```
A função `.Scanf()` recebe como parâmetro um modificador, que indica qual o tipo da variável ela está recebendo e depois o `&nomeDaVariavel` que é o endereço de memória da variável.  
Há um shorthand para a função `.Scanf()`, que é o `.Scan()`. Usando ela, eu não preciso passar o modificador como parâmetro: 
```go
package main

import "fmt"

func main() {
	var number int
	fmt.Println("Digite um número")
	fmt.Scan(&number)
}
```
Porém seu eu passar algo diferente do tipo declarado, o programa mesmo assim compila, mas a variável receberá o valor default de acordo com o seu tipo.

## Controlando o fluxo da aplicação

### If, else if, else

A síntaxe para condicionais é muito parecida com as outras linguagens, mudando o fato de que a expressão avaliada tem q necessariamente ser um valor `booleano` e ela não precisar estar entre parênteses: 

```go
package main

import "fmt"

func main() {
	nome := "da Silva"

	if nome == "da Silva" {
		fmt.Println("Nome é igual da Silva")
	} else if nome == "do Silva" {
		fmt.Println("Nome é igual do Silva")
	} else {
		fmt.Println("Nome muito diferente")
	}
}
```

### switch, case e default

Outra maneira de controlar o fluxo da nossa aplicação, com o switch:

```go
package main

import "fmt"

func main() {
	nome := "da Silva"

	switch nome {
		case "da Silva":
			fmt.Println("Nome é igual da Silva")
		case "do Silva":
			fmt.Println("Nome é igual do Silva")
		default:
			fmt.Println("Nome muito diferente")
	}
}
```

## Introdução às funções

É uma boa prática em Go, assim como em outras linguagens de programação, modularizar o seu código, ou seja, criar funções que sejam bem definidas e que não tenham 1000 funções.  
Para declarar uma função em Go, eu faço da seguinte maneira: `func nomeDaFuncao() {}` caso eu não espere nenhum retorno. Caso eu espere retorno, a declaração precisa ser feita da seguinte forma: `func nomeDaFuncao() tipoDeRetorno {}`. Exemplo:

```go
// Sem retorno
func imprimeNumero() {
	a := 2
	fmt.Println(a)
}

// Com retorno
func retornaNumero() int {
	a := 1
	return a
}
```
Para executar a função basta: `nomeDaFuncao()`.

Há um pacote do Go que se chama `"os"`, ele pode ser usado para interromper o fluxo do nosso programa, fazendo com que ele possa retornar um valor. Por convenção, funções que são executadas corretamente retornam `0` e funções que retornam algo inesperado retornam `-1`. Usando o pacote `"os"` posso fazer isto da seguinte maneira:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("Digite o numero 2")
	var num int
	fmt.Scan(&num)

	if num == 2 {
		os.Exit(0)
	} else {
		os.Exit(-1)
	}
}
```

Há funções que podem devolver mais de um valor, e para capturar o resultado dela, fazemos da seguinte maneira:
```go
func devolveIddENome () (string, int) {
	nome := "fulano"
	idd := 51

	return nome, idade
}

nome, idade := devolveIddENome()
```
E se eu tiver um retorno que não é necessariamente interrssante para mim? Eu posso usar o caractere _underscore_ para "settar" aquele retorno como nulo. Utilizando o exemplo acima, vamos supor que eu quero somente o valor da idade e não do nome, basta eu fazer da seguinte maneira: 
```go
_, idade = devolveIddENome() 
```
Dessa forma, o primeiro retorno que seria o nome vai ser ignorado.

## Fazendo requisições para web

O Go possui um pacote chamado `"net/http"` que possui funções como `.Get()` e `.Post()` que são úteis para requisições web. Abaixo, um exmplo usando o `.Get()` que tem como retorno duas variáveis, uma `resposta` e um `erro`, e recebe por parâmetro uma url:

```go
	resp, _ := http.Get(site) // estou ocultando o retorno do erro com o underscore
	fmt.Println(resp) // Me retorna um negócio com o resultado da requisição http
	if resp.StatusCode == 200 { // um dos retornos é o Status Code da requisição http
		fmt.Println("Site:", site, "foi carregado com sucesso")
	} else {
		fmt.Println("Site:", site, "está com problemas. Status Code:", resp.StatusCode)
	}
```

## Laços de repetição

Pasmem, mas em Go não temos um o laço `while`. Se quisermos fazer um loop infinito, utilizamos o `for` sem parâmetro algum:

```go
for {
	//bloco de comandos que será executado eternamente
}
```
Posso usar também o for de maneira convencional: 
```go
for index := 0; i < 10; i++ {
	//bloco de comandos que será executado 10 vezes
}
```
Ou ainda de maneira mais resumida:
```go 
for index, item := range slice {
	// bloco de comandos
}
```


## Arrays
Com certeza essa estrutura existe aqui em Go. Eles são declarados da seguinte forma:
`var <nomeDoArray> [<tamanhoDoArray>]<tipoDoArray>`. Exemplo:

```go
var array [5]string // array com tamanho 5 que contém strings
```

Arrays em Go são estruturas engessadas que não podem ser expandidas. No caso do exemplo acima, o array `array` possui apenas 5 espaços. Por isso, nesta linguagem é comum trabalharmos com outra estrutura que é baseada em arrays que se chama `slice`.

```go
func exibeNomes() {
	nomes := []string{"nome1", "nome2",  "nome3", "nome4"}
	fmt.Println(nomes)
}
```
Veja que para declarar um `slice` eu posso usar o shorthand de declaração de variáveis, onde à ela atribuo um `[]<tipoDoArray>{conteudoSeparadoPorVirgula}`.
É possível adicionar elementos no meu slice utilizandoo comando: `append(sliceAlvo, oQueVouAdicionar)`. É importante salientar que devo atribuir esse comando ao próprio `sliceAlvo`. Para descobrir o comprimento do `slice` utilizo `len(nomeDoSlice)`, e é possível saber tamém a capacidade dele: `cap(nomeDoSlice)`.

Há um pacote interesante do Go também, que é o `"time"`. Ele possui uma função que é o .Sleep() o qual pode ser usado para controlar o tempo de execução de um programa. Por exemplo, o código abaixo, a cada iteração do `for`, ele espera 5 segundos:

```go
for i := 0; i < 10; i++ {
	fmt.Println(i)
	time.Sleep(5 * time.Second)
}
```

## Tratando erros

Algumas funções do _Go_ possuem dois retornos, como é o caso do `http.Get()`. No caso, o primeiro retorno é a resposta de requisição http e o segundo retorno é um erro. Normalmente para verificar o erro, o que podemos fazer é sempre printá-lo logo após a execução da funçao:

```go
resp, err := http.Get(url)
if err != nil {
	fmt.Println("Erro:", err)
}
```

## Arquivos em Go

Para abrir um arquivo em _Go_ há diversas maneiras, cada uma delas para um propósito.
Uma delas, para ler um arquivo inteiro, usamos o pacote `io/ioutil` para isso:

```go
package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	arquivo, err := ioutil.ReadFile("nomeDoArquivo.txt")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(string(arquivo))
}
```
Se printarmos o `arquivo` veremos um _array_ de _bytes_, para converter isso em _string_ usamos a função `string(arquivo)`. 

Já para ler um arquivo linha por linha podemos usar dois pacotes em conjunto, que são o `os` e o `bufio`:

```go
package main

import (
	"fmt"
	"bufio"
	"os"
)

func main() {
	arquivo, err := os.Open("nomeDoArquivo")
	
	if err != nil {
		fmt.Println(err)
	}

	leitor := bufio.NewReader(arquivo)
	linha, err := leitor.ReadString('\n')

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(linha)
}
```
Primeiramente abrimos o arquivo com o `os.Open()`, e capturamos tanto o arquivo quanto o erro. Se tentarmos ler o arquivo nessa momento, teremos como retorno um hexadecimal (acho que é o endereço de memória). Para tornar isso legível, usamos a função `bufio.NewReader(arquivo)` e atribuimos esse resultado a um leitor, que possui uma função `.ReadString("<delimitador>")` que recebe por parâmetro um delimitador que diz até onde devemos ler a linha, e atribuimos esse retorno à duas variáveis, uma linha e um erro. Se não houver erro, e printarmos `linha` teremos a informação desejada. É uma boa prática fechar o arquivo após utilizá-lo, para isso usamos o seguinte comando `arquivo.Close()`.

Agora para criar um arquivo, podemos usar também uma função do pacote `os`, no caso,
`.OpenFile()`. Essa função recebe dois parâmetros, que são `("<nomeDoArquivo>", <flags>, <permissões>)`. As `flags` indicam o que eu quero fazer com arquivo, podem ser:

```go
	// Exactly one of O_RDONLY, O_WRONLY, or O_RDWR must be specified.
	O_RDONLY int = syscall.O_RDONLY // open the file read-only.
	O_WRONLY int = syscall.O_WRONLY // open the file write-only.
	O_RDWR   int = syscall.O_RDWR   // open the file read-write.
	// The remaining values may be or'ed in to control behavior.
	O_APPEND int = syscall.O_APPEND // append data to the file when writing.
	O_CREATE int = syscall.O_CREAT  // create a new file if none exists.
	O_EXCL   int = syscall.O_EXCL   // used with O_CREATE, file must not exist.
	O_SYNC   int = syscall.O_SYNC   // open for synchronous I/O.
	O_TRUNC  int = syscall.O_TRUNC  // truncate regular writable file when opened.
```
E sobre as permissões, são as padrão do Linux em formato numérico.
Exemplo prático da criação de um arquivo:

```go
arquivo, err := os.OpenFile("log.txt", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
```

No caso desse comando acima, eu criei um arquivo com o nome de `log.txt`, as flags indicam que posso ler e escrever o arquivo ou criá-lo caso nao exista, e as permissões são `0666`.

Uma vez criado o arquivo, eu posso escrever nele utilizando o `arquivo.WriteString(<string>)`.


## Formatando tempo em GO

Para formatar tempo em _Go_ utilizamos o pacote `"time"` por meio da função `time.Now()`. Essa função me traz como retorno o momento atual, se concatenado com  a função `.Format()` consigo deixar essa saída no formato que eu desejar. O Go possui um jeito peculiar de formatar datas e horários, esse modo pode ser consultado na [documentação](https://golang.org/src/time/format.go). Exemplo para um formato de `dd/mm/aaaa hh:mm:ss`:

```go
time.Now().Format("02/01/2006 15:04:05")
```