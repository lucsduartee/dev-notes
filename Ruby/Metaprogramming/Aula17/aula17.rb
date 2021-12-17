require 'byebug'

a = "Lucas"
debugger

def a.new_method
  "#{self} é mto zica"
end

puts a.new_method

# Outro exemplo:

class Car
  def initialize(name="Default")
    @name = name
  end

  attr_acessor :name, :doors, :dashboard, :whell
  attr_reader :pneu

  def show(type="Default type")
    "Type: #{type} - Model: #{self.name}"
  end
end

fiesta = Car.new
corsa = Car.new

def fiesta.show
  # implementação nova
end

def corsa.show
  # implementação nova
end