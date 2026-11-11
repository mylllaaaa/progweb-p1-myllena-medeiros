- - - Livros - - - 

1. POST http://localhost:3000/livros

Body:
{
  "titulo": "Duna",
  "autor": "Frank Herbert"
}

RESPONSE:

{
  "id": 1,
  "titulo": "Duna",
  "autor": "Frank Herbert"
}

2. GET http://localhost:3000/livros

RESPONSE:

[
  {
    "id": 1,
    "titulo": "Duna",
    "autor": "Frank Herbert"
  }
]

3. PUT http://localhost:3000/livros/1

Body:
{
  "titulo": "Duna: Edição Especial",
  "autor": "Frank Herbert"
}

RESPONSE:

{
  "id": 1,
  "titulo": "Duna: Edição Especial",
  "autor": "Frank Herbert"
}

4. GET http://localhost:3000/livros

RESPONSE:

[
  {
    "id": 1,
    "titulo": "Duna: Edição Especial",
    "autor": "Frank Herbert"
  }
]

5. DELETE http://localhost:3000/livros/1

Status: 204 No Content
Size: 0 Bytes
Time: 3 ms




- - - Playlists - - - 

1. POST http://localhost:3000/playlists

Body: 
{
  "livroId": 2,
  "usuarioId": 1
}

RESPONSE:
{
  "id": 1,
  "livroId": 2,
  "usuarioId": 1,
  "dataCriacao": "2026-11-11T22:33:14.678Z",
  "dataEdicao": "2026-11-11T22:33:14.678Z"
}

2. PUT http://localhost:3000/playlists/1

Body: 
{
  "livroId": 2,
  "usuarioId": 2
}

RESPONSE:

{
  "id": 1,
  "livroId": 2,
  "usuarioId": 2,
  "dataCriacao": "2026-11-11T22:33:14.678Z",
  "dataEdicao": "2026-11-11T22:34:18.213Z"
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