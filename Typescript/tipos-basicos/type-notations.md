## Um pouco sobre a notação de tipos do TS

Abaixo temos alguns exemplo de usos básicos do typescript.

```ts
let name: string = 'Doug'; // Qualquer tipo de string
let age: number = 18; // 18, 18.5, -18, 0xf00d, 0b1010, 0o7744;
let adult: boolean = true; // true | false

// Arrays
let arrayOfNumbers: Array<number> = [1, 2, 3];
let arrayOfNumbers: number[] = [1, 2, 3];
let arrayOfNumbers: Array<string> = ['1', '2', '3'];
let arrayOfNumbers: string[] = ['1', '2', '3'];


// Objetos
let pessoa: { name: string; age: number; adulto?: boolean } = {
  name: 'algumn nome',
  age: 19,
}

let pessoa: Record<string, unknown> = {
  name: 'algumn nome',
  age: 19,
}

let pessoa: {
  chaveA: string,
  chaveB: string,
  chaveC?: string,
  [key: string]: unknown,
} = {
  chaveA: 'Valor A',
  chaveB: 'Valor B',
}

// Funções
function soma(x: number, y: number): number {
  return x + y;
}

const soma: (x: number, y: number) => number = (x, y) => x + y;

function semRetorno(...args: string[]): void {
  console.log(args.join());
}

const pessoa = {
  nome: 'algum Nome',
  exibirNome(): void {
    console.log(this.nome);
  }
}
```