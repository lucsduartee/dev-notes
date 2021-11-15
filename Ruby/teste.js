function caixa(values) {
  let count = 0;
  while (values !== 89) {
    values = parseInt(values
      .toString()
      .split('')
      .reduce((acc, ele) => acc + Math.pow(parseInt(ele), 2), 0)
      .toString())
    count += 1
  }
  return count
}

console.log(caixa(35));