const soma = require('./soma');
const { subtrai } = require('./calculadora');
const calculadora = require('./calculadora');
const questions = require('./questions');
const imc = require('./imc');
const fs = require('fs');

// testando módulos de calcular
console.log(soma(5 ,5));
console.log(subtrai(5 ,5));
console.log(calculadora.soma(6, 6));


// testando módulos do imc
const main = async () => {
  const name = questions.readName();
  const weigth = questions.sayWeigth();
  const height = questions.sayHeight();
  const imcValue = imc(weigth, height);
  
  const message = `Nome: ${name}, Peso: ${weigth}, Altura: ${height}, Imc: ${imcValue}\n`;
  
  // fs.appendFileSync('imc.txt', message);
  await fs.promises.appendFile('imc.txt', message);
}

main();
