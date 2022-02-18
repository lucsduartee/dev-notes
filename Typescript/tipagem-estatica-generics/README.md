# Tipos do Typescript

## Enum ou enumeração
Representam um conjunto dse valores que estão relacionados, sequencialmente ou não. Pode ser utilizado
para criar um conjunto de constantes para uso com variaveis e propriedades.
Podem representar um status de um conta no banco por exempo, onde cada status pode ser atrelado a
um numero, por exemplo:

```ts
enum AccountStatus {
  Active,
  Inactive,
  Paused,
}

let newAccountStatus: AccountStatus = AccountStatus.Inactive
console.log(newAccountStatus); // ==> output: 1
```
Ainda podemos dizer atribuir um valor a uma chave do enum

```ts
enum AccountStatus {
  Active = 2,
  Inactive,
  Paused,
}

let newAccountStatus: AccountStatus = AccountStatus.Inactive
console.log(newAccountStatus); // ==> output: 3
```
Os enums dão acesso aos valores e chaves pelas próprias chaves e valores

```ts
enum AccountStatus {
  Created = 5,
  Active = 10,
  Inactive,
  Paused,
  Deleted = 20,
}

const ok = AccountStatus.Created;
const indiceOk = AccountStatus["Created"];
const stringDeleted = AccountStatus[20];

console.log(ok); // ==> output: 5
console.log(indiceOk); // ==> output: 5
console.log(stringDeleted); // ==> output: Deleted
```
Ou ate mesmo de dias da semana

```ts
enum weekdays {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
}
```

## Arrays e Tuplas

- Arrays: são um conjunto de valores do mesmo tipo
```ts
let dogs: string[] = ['Scooby', 'Nina', 'Pandora']
```

- Tuplas: são um conjunto de valores cujo ordem e tipo são fixas
```ts
let fullName: [string, string] = ["Jane", "Doe"];
let person: [string, number] = ["Jane Doe", 35];
let car: [string, string, number] = ["Ford", "F400", 10];
```
## Type Aliases
São como se fossem ou marcassem a assinatura de um tipo. Por exemplo, uma coordenada (x, y)
```ts
type Point = {
  x: number;
  y: number;
};
```
Tem também a Type Unions, que é a união de tipos:
```ts
function retornarCPF(cpf: number | string){
  console.log("Seu CPF é: " + cpf);
}
```
## Classes
São abstrações que representam algo do mundo real, tanto em atributos quanto em comportamentos.
Por exmplo, uma classe de DvdMovie.
```ts
enum Category {
  Terror = "Terror",
  Comedia = "Comedia",
  Action = "Action",
}

class DvdMovie {
  name: string;
  releaseYear: number;
  category: Category;

  constructor(name: string, releaseYear: number, category: Category) {
    this.name = name;
    this.releaseYear = releaseYear;
    this.category = categoty;
  }

  play(): void {
    console.log('play...');
  }
}
```

## Interface
A interface parece muito com o type aliases, mas nela é possível adicionar comportamentos e extende-la para novas interfaces
```ts
interface Employee {
  firstName: string;
  lastName: string;
  fullName(): string;
}

let employee: Employee = {
  firstName : "John",
  lastName: "Doe",
  fullName(): string {
      return this.firstName + " " + this.lastName; // usamos o "this" para acessar as propriedades da interface
  }
}

interface Teacher extends Employee {
  firstName: string;
  lastName: string;
  subject: string;
  fullName(): string;
  sayHello(): string;
}

let teacher: Teacher = {
    firstName: "John",
    lastName: "Doe",
    subject: "Matemática",
    fullName(): string {
        return this.firstName + " " + this.lastName;
    },
    sayHello(): string {
        return `Olá, eu sou ${this.fullName()} e leciono ${this.subject}`;
    }
}
```

## Generics
Os Genercs permitem dar previsibilidade do que posso trabalhar com uma interface
```ts
type Person {
  name: string,
  height: number,
  age: number,
}

const main = async () => {
  const res = await axios.get<Person>('url');
  log(res.data.(name || height || age));
}
```