# Banco de dados SQL

## __Constrains__, chaves primárias e chaves estrangeiras
A criação de regras e restrições em um banco de dados, ditam como os dados podem ou não
ser manipulados em suas tabelas. As principais _constrains_ em SQL são:  
- **NOT NULL**: Garante que um campo não tenha valores nulos, na ausência de um valor 
**DEFAULT**, no momento da inserção de dados é necessária a passagem de valor.
- **UNIQUE**: Garante que o valor passado na tabela é unico.  
- **PRIMARY KEY**: Por definição, não nula e única, identifica a coluna a qual se refere como identificador único na tabela.
- **FOREING KEY**: Permite o relacionamento entre tabelas, de forma que uma **FOREIGN KEY** associa-se com uma **PRIMARY KEY** de outra tabela.  
- **DEFAULT**: Caso nenhuma valor seja passado para a coluna, a _constrait_ colocará um valor padrão já definido.

## Encontrando dados em um banco de dados
Aqui entramos no conceito de _query_, que nada mais são que comandos que nos ajudam a interagir com o banco de dados.
Os principais tipos de _queries_ no SQL são:
- **DDL**: _Data Definition Language_ - São comandos que lidam com o esquema e o modo como os dados devem existir em um banco de dados:
	- _CREATE_: criar databases, tables, índices, viees, functions e triggers.
	- _ALTER_: alteração de estruturas.
	- _DROP_: Deleção de objetos.
	- _TRUNCATE_: Esvazia dados de dentro de uma tabela, mas a persiste no DB.
- **DML**: _Data Manipulation Language_ - Comandos usados para a manipulação de dados:
	- _SELECT_: busca dados dentro de um DB.
	- _INSERT_: insere dados em uma table.
	- _UPDATE_: altera dados de uma table.
	- _DELETE_: exclui dados de uma table.
- **DCL**: _Data Control Language_ - Comandos que garantem direitos, permições e acessos a DBs.
	- _GRANT_: concede acesso.
	- _REVOKE_: remove acessos.
- **TCL**: _Transactional Control Language_ - Lida com as transações dentro de suas pesquisas:
	- _COMMIT_: muda suas alterações de temporárias para permanentes no seu banco de dados.
	- _ROLLBACK_: desfaz o impacto gerado por um comando.
	- _SAVEPOINT_: define pontos de save para poder voltar uma transação.
	- _TRANSACTION_: define escopos, onde e como as transações erão executadas.

### SELECT
Abaixo estão algumas maneiras de se utilizar o comando _SELECT_:

```sql
SELECT 'Lucas';
SELECT 'Lucas', 'Duarte', 'Pontes e Lacerda', 25;
SELECT 'Lucas' AS Nome, 'Duarte' AS Sobrenome, 'Pontes e Lacerda' AS CidadeNatal, 25 AS Idade;
SELECT 13 * 8;
SELECT now() AS DataAtual;

// todas colunas
SELECT * FROM NOMEDOBANCO.NOMEDATABELA;

// coluna específica
SELECT coluna1 FROM NOMEDOBANCO.NOMEDATABELA;

//colunas específicas
SELECT coluna1, coluna2 FROM NOMEDOBANCO.NOMEDATABELA;

// selecionando um banco de dados por padrão
USE NOMEDOBANCO;
SELECT coluna1, coluna2 FROM NOMEDATABELA;
```

### DISTINCT
Filtra os dados sem repetir valores repetidos que estão na tabela
```sql
SELECT DISTINCT coluna FROM NOMEDOBANCO.NOMEDATABELA;
```

### LIMIT x OFFSET y
Esses comandos são como se fossem de paginação.
O _OFFSET_ pula uma quantidade de regitros determinada por `y`.
Já o _LIMIT_ limita a quantidade de registros que vai aparecer.
```sql
SELECT coluna FROM NOMEDOBANCO.NOMEDATABELA LIMIT X OFFSET Y;
```

### COUNT
Conta a quantidade de registros em uma tabela, mas não conta as registros nulos.
```sql
SELECT COUNT(* || coluna1, coluna2, ...) FROM NOMEDOBANCO.NOMEDATABELA;
```

### ORDER BY
Ordena os registros de acordo com uma coluna, pode ser em ordem alfabética por exemplo, crescente e decrescente.
```sql
SELECT * FROM NOMEDOBANCO.NOMEDATABELA ORDER BY NOMECOLUNA1, NOMECOLUNA2, ...;
SELECT * FROM NOMEDOBANCO.NOMEDATABELA ORDER BY NOMECOLUNA1 ASC || DESC, NOMECOLUNA2 ASC || DESC, ...;
```

### CONCAT
Serve para concatenar dados. Se tivermos por exemplo duas colunas, uma de __nome__ e outra de __sobrenome__, poderíamos juntas os dados e formar uma coluna __nomecompleto__:
```sql
SELECT CONCAT(first_name, ' ', last_name) AS 'Nome Completo' FROM NOMEDOBANCO.NOMEDATABELA;
```

