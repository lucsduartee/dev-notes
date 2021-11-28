# Curso 1 de SQL com PostgreSQL

## Primeiros passos
- Para entrar a primeira vez tem que usar o comando `$ sudo su postres`
- Mudar a senha `/password`
- Para logar em algum usuário `$ psql -U<username> -h<host>`, por exemplo: `$ psql -Upostgres -hlocalhost`

## Comando básicos
Já dentro do console do __Postgres__:
- Criando um Databse:
  ```sql
  CREATE DATABASE <DBname>
  ```
- Deletando um Database:
  ```sql
  DROP DATABASE <DBname>
  ```
- Criando uma tabela: Uma tabela pode recever diferentes tipos de dados.
  ```sql
  CREATE TABLE <tableName> (
    field1 datatype,
    field2 datatype,
    field3 datatype,
    field4 datatype,
    field5 datatype,
    .
    .
    .
    fieldN datatype
  );
  ```
- Selecionando campos (todos) de uma tabela:
  ```sql
  SELECT * FROM <tableName>;
  ```
- Popular uma tabela:
  ```sql
  INSERT INTO <tableName> (
    field1,
    field2,
    field3,
    .
    .
    .
    fieldN
  ) VALUES (
    value1,
    value2,
    value3,
    .
    .
    .
    valueN
  );
  ```
- Alterando dados de uma tabela:
  ```sql
  UPDATE <tableName>
    SET field1 = newValue
        field2 = newValue
        .
        .
        .
        fieldN = newValue
    WHERE <condition>
  ```
- Excluindo registros de uma tabela:
  ```sql
  DELETE FROM <tableName> WHERE <condition>
  ```
- Filtrando dados:
  ```sql
  SELECT <fields> FROM <tableName>
    WHERE <condition>;

  SELECT <fields> FROM <tableName>
    WHERE <field> (LIKE || NOT LIKE) 'alguma-coisa'
  ```
- Operadores:  
É possível fazer diversos filtros utilizando o `SELECT` e `WHERE`.
O **SQL** possui diversas operadores lógicos que nos auxiliam nas nossas consultas:

Operador | Significado
---------|------------
<> ou != | Diferente
"_alavra"| Qualquer caractere
"%"      | Qualquer coisa
\>=      | Maior ou Igual
\<=      | Menor ou Igual
\>       | Maior
\<       | Menor
AND \|\| OR | E ou OU

- Trabalhando com relacionamentos:

**Chave Primária**: Garantia que um campo seja único. Faz com que o valor seja único na tabela, tem que ser um valor não nulo e único.
  ```sql
  CREATE TABLE <tableName> (
    id INTEGER PRIMARY KEY
  );
  ```
**Chave Estrangeira**: É uma chave que relaciona duas tabelas, criando dessa meneira restrições à certas operações, como deleção, adição, e atualização de dados.
  ```sql
  CREATE TABLE <tableName> (
    field_id INTEGER PRIMARY,
    FOREIGN KEY (field_id)
      REFERENCES <tableName2> (field_tableName2)
  );
  ```
Abaixo temos uma estrutura básica de um banco de dados de uma escola. Nela temos a criação de 4 tabelas, onde 3 delas são de aluno, categoria e curso e a última é uma tabela de relacionamento entre aluno e curso, que possui uma chave primaria composta:

```sql
CREATE DATABASE escola;

CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
	primeiro_nome VARCHAR(255) NOT NULL,
	ultimo_nome VARCHAR(255) NOT NULL,
	data_nascimento DATE NOT NULL
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	categoria_id INTEGER NOT NULL REFERENCES categoria(id)
);

CREATE TABLE aluno_curso (
	aluno_id INTEGER NOT NULL REFERENCES aluno(id),
	curso_id INTEGER NOT NULL REFERENCES curso(id),
	PRIMARY KEY (aluno_id, curso_id)
);
```
Na linha 134 e 135 estamos utilizando uma síntaxe menos verbosa para a criação de uma chave estrangeira.