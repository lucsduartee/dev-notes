const readlineSync = require('readline-sync');

const readName = () => {
  const name = readlineSync.question('Digite seu nome: ');
  return name;
};

const sayWeigth = () => {
  const weight = readlineSync.questionFloat('Digite seu peso: ');
  return weight;
};

const sayHeight = () => {
  const height = readlineSync.questionFloat('Digite sua altura: ');
  return height;
};

module.exports = {
  readName,
  sayWeigth,
  sayHeight,
};
