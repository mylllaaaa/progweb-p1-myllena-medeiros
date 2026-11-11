Livros

1. POST http://localhost:3000/livros

Body:
{
  "titulo": "Duna",
  "autor": "Frank Herbert"
}

2. PUT http://localhost:3000/livros/1

Body:
{
  "titulo": "Duna: Edição Especial",
  "autor": "Frank Herbert"
}


Playlists

1. POST http://localhost:3000/playlists

Body: 
{
  "livroId": 1,
  "usuarioId": 1
}

2. PUT http://localhost:3000/playlists/1

Body: 
{
  "livroId": 1,
  "usuarioId": 2
}

Testando Erros

Enviar um livro repetido (mesmo título e autor, inclusive com diferenças entre maiúsculas e minúsculas) deve retornar 409:

Body:
{
  "titulo": "duna",
  "autor": "FRANK HERBERT"
}


Criar playlist com livroId que não existe deve retornar 422:

{
  "livroId": 999,
  "usuarioId": 1
}