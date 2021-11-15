=begin
Dado um número X construa um programa que retorne a contagem
regressiva no formato X...X-1...X-2...0!!!
=end
def count_down(x)
  str = ''
  while x >= 0
      locale = x.to_s
      if x == 0
          str += locale + '!!!'
      else
          str+= locale + '...'
      end
      x -= 1
  end
  return str
end

=begin
Construa um algoritmo que encontre a soma de todos os numeros naturais
múltiplos de 3 ou 5 menores que um dado numero
=end
def multiples_of_3_or_5(roof)
  sum = 0
  index = 0
  until index == roof
      if index % 3 == 0
          sum += index
      elsif index % 5 == 0
          sum += index
      end
      index += 1
  end
  return sum
end

=begin
A série é iniciada com os valores 1,2 e a partir do terceiro elemento realiza-se essa conta
Dessa forma, os 10 primeiros elementos dessa série são: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
A soma dos números pares menosres que 100 dessa série é 44.
Calcule a soma dos números pares entre os elementos dessa série que sejam menores que um dados número.
=end
def even_fibonacci_numbers(roof)
  fib = [1, 2]
  sum = 0
  while fib[fib.length - 1] < roof
    fib << fib[fib.length - 1] + fib[fib.length - 2]
  end
  fib.shift(fib.length - 1).select { |ele| ele % 2 == 0 }.each { |ele| sum += ele }
  return sum
end

def test(values)
  while values.include?(0)
    index_of_zero = values.index(0)
    ant_zero = index_of_zero - 1
    values.shift(values[index_of_zero])
    values.shift(values[ant_zero])
  end
  return values
end

puts test([1, 2, 0, 3, 4])