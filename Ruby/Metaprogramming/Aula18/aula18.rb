# exemplo 1
x = "Algma coisa"
def x.mostrar
  puts "#{x}"
end

y = x.clone
y.mostrar # => "Alguma coisa"
puts y # => "Alguma coisa"

# ===================================================

# exemplo 2
a = 'Alguma coisa'
def a.metodo
  1
end
a.metodo

class << a
  def metodo2
    2
  end

  # outros métodos inclusive attr acessors, readers...
end

