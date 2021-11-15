#include <stdio.h>

void f2(char hello[]) {
  printf("from f2: %p\n", &hello);
  printf("%s\n", hello);
}

void f1(char hello[]) {
  printf("from f1: %p\n", &hello);
  f2(hello);
}

void main() {
  char hello[] = "Hello world";
  printf("%s\n", hello);
  printf("from main: %p\n", &hello);
  f1(hello);

  return;
}