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
