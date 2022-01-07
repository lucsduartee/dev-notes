const soma = require('./soma');
const { subtrai } = require('./calculadora');
const calculadora = require('./calculadora');
const questions = require('./questions');
const imc = require('./imc');

console.log('hello world');

console.log(soma(5 ,5));
console.log(subtrai(5 ,5));
console.log(calculadora.soma(6, 6));
const name = questions.readName();
const weigth = questions.sayWeigth();
const height = questions.sayHeight();

const imcValue = imc(weigth, height);

console.log(`Nome: ${name}, Peso: ${weigth}, Altura: ${height}, Imc: ${imcValue}`);
