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

## Manipulando tabelas
Válido diferenciar alguns tipos de aspas no _SQL_:

- Backticks: são utilizados para identificar tabelas e colunas, e faz-se necessárias quando o identificador for uma palavra reservada do MySQL, ou quando o nome da coluna ou tabela tiver espaços em branco.

- Aspas simples: Utilizadas para o tipo strings

### INSERT
Permite inserir dados em uma tabela, a síntaxe básica dessa operação é a seguinte:
```sql
INSERT INTO NOMEDATABELA (COLUNA1, COLUNA2)
VALUES ('VALORCOLUNA1', 'VALORCOLUNA2');
```
Essa operação insere uma linha na tabela com os valores nas suas respectivas colunas.
É possível ainda inserir mais de uma linha em apenas uma _query_. Isso da seguinte maneira:
```sql
INSERT INTO NOMEDATABELA (COLUNA1, COLUNA2) VALUES
('VALOR_1', 'VALOR_2'),
('VALOR_3', 'VALOR_4'),
('VALOR_5', 'VALOR_6');
```
Podemos ainda incrementar à nossa _query_ um parâmetro _IGNORE_, que permite quem em caso de rerro na execução da _query_, esse erro é relevado e não há interrupção na execução.
VAmos utillizar um exemplo em que estamos tentando inserir em nossa tabela um registro já existente, para previnir um erro, fazemos a seguinte _query_:
```sql
INSERT IGNORE INTO NOMETABELA (COL1, COL2) VALUES
(3, 'VALUE1'),
(4, 'VALUE2');
```
Se algum desses registros já existirem em nossa tabela, um erro não será gerado por conta da presença do `INGNORE`.

Com o `INSERT` é possível também inserir dados em um tabela à partir de outra tabela, da seguinte maneira:
```sql
INSERT INTO TABELA_A (COLUNA1, COLUNA2)
SELECT TABELA_B.COLUNA1, TABELA_B.COLUNA2
FROM TABELA_B;
```

### UPDATE
Com o `UPDATE` podemos alterar registros em uma tabela, premitindo assum fazermos correções. A síntaxe desse comando é:
```sql
UPDATE NOMEDATABELA
SET PROP_A_SER_MODIFICADA = 'NOVO_VALOR'
WHERE CONDITION;
```
É muito importante que o `WHERE` esteja presente, caso ele não se faça presente, toda a tabela é alterada.

É possível ainda alterar mais de uma coluna ao mesmo tempo tempo, utilizando a seguinte _query_:
```sql
UPDATE NOMEDATABELA
SET COLUNA1 = 'NOVO_VALOR', COLUNA2 = 'OUTRO_NOVO_VALOR'
WHERE CONDITION;
```
Podemos também alterar dados massivamente de diversas maneiras, duas delas estarão listdas abaixo:
```sql
UPDATE NOMEDATABELA
SET NOMEDACOLUNA = 'NOVO_VALOR'
WHERE NOMEDACOLUNA2 IN (VALUE1, VALUE2, VALUE3, ...);

UPDATE NOMEDATABELA
SET NOMEDACOLUNA = (
	CASE NOMEDACOLUNA2
		WHEN VALUE1 THEN 'NOVO_VALOR'
		WHEN VALUE2 THEN 'NOVO_VALOR2'
		WHEN VALUE3 THEN 'NOVO_VALOR3'
		ELSE NOMEDACOLUNA
	END
);
```
### Manipulação de Strings
Há algumas funções do `SQL` que nos ajudam a deixar as informações coerentes, normalizadas e da maneira correta no momento do cadastro no banco de dados.
AS principais funções para manipulação de string são:
```sql
-- Converte o texto da string em caixa baixa
SELECT LCASE('Uma string qualquer');

-- Converte o texto da string em caixa alta
SELECT UCASE('Uma string qualquer');

-- Substitui as ocorrências de uma substring em um string
SELECT REPLACE('Uma string qualquer', 'qualquer', 'específica');

-- Retorna a parte da esquerda ou da direita de uma string de acordo com um numero especificado
SELECT LEFT||RIGHT('Uma string qualquer', 3);

-- Retorna o tamanho de uma string em caracteres ou em bytes
SELECT CHAR_LENGTH||LENGTH('Uma string qualquer');

-- Extrai a parte de uma string de acordo com o índice de um caractere inicial e a qtd de caracteres para extrair
-- Se a quantidade de caracteres para ser extraido não for especificada, então a string será extraída do índice incial definido
-- até o seu final
SELECT SUBSTRING('Uma string qualquer', 5, 2);
```

### Condicionais
É possível utilizar IF e CASE no `SQL`:
A síntaxe do IF é `-- SELECT IF (CONDICAO, VALOR_SE_VERDADEIRO, VALOR_SE_FALSO);` e a síntaxe do CASE é:
```sql
SELECT coluna1, coluna2,...
	CASE
		WHEN condicao1 THEN valor_se_verdadeiro
		WHEN condicao2 THEN valor_se_verdadeiro
	ELSE valor_default
END AS nome_da_coluna_resultante
FROM nome_do_database;
```

### Funções Matemáticas do MySQL
- Operações básicas:
```sql
SELECT 3 + 3;
SELECT 3 - 3;
SELECT 3 * 3;
SELECT 3 / 3;
```