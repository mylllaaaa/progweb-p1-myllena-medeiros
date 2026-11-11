# Modelagem — Projeto 1

**Aluno(a):** Myllena de Sousa Medeiros
**Domínio:** Criação de playlists para livros 

## 1. O domínio

Um usuário pode cadastrar um livro e criar uma playlist para ele. Outros usuários podem visualizar os livros cadastrados e suas playlists relacionadas, podendo também criar suas próprias playlists para o mesmo livro.

O mesmo livro não pode ser cadastrado mais de uma vez, mas um livro pode possuir várias playlists criadas por diferentes usuários. Cada playlist pode conter várias músicas, e uma mesma música pode estar presente em diferentes playlists.

## 2. Entidades

| Entidade | Atributos                                       | Relacionamentos                                           |
| -------- | ----------------------------------------------- | --------------------------------------------------------- |
| Livro    | id, titulo, autor                               | possui várias playlists                                   |
| Usuario  | id, nome, email                                 | cria várias playlists                                     |
| Playlist | id, livroId, usuarioId, dataCriacao, dataEdicao | pertence a um livro e a um usuário; contém várias músicas |
| Musica   | id, titulo, artista                             | pode estar em várias playlists                            |

## 3. Diagrama de classes

```mermaid
  classDiagram direction LR

  class Livro { 
    +id 
    +titulo 
    +autor }

  class Usuario { 
    +id 
    +nome
    +email }

  class Playlist { 
    +id 
    +livroId 
    +usuarioId 
    +dataCriacao 
    +dataEdicao 
    +adicionarMusica(musica) 
    +removerMusica(musica) }

  class Musica { 
    +id 
    +titulo 
    +artista }

  class PlaylistService { 
    +criarPlaylist(livroId, usuarioId) 
    +adicionarMusica(playlistId, musicaId) 
    +removerMusica(playlistId, musicaId) 
    +listarPorLivro(livroId) }

  class LivroRepository { 
    > +buscarPorId(id) 
    +buscarPorTituloEAutor(titulo, autor) +listar() +salvar(livro) }

  class UsuarioRepository { 
    > +buscarPorId(id) 
    +salvar(usuario) }

  class PlaylistRepository { 
    > +buscarPorId(id) 
    +listarPorLivro(livroId) 
    +salvar(playlist) }

  class MusicaRepository { 
    > +buscarPorId(id) 
    +salvar(musica) }

  Usuario "1" --> "0.." Playlist : cria Livro "1" --> "0.." Playlist : possui Playlist "0.." --> "0.." Musica : contem

  PlaylistService ..> LivroRepository : usa PlaylistService ..> UsuarioRepository : usa PlaylistService ..> PlaylistRepository : usa PlaylistService ..> MusicaRepository : usa
````

## 4. Responsabilidades

| Classe                                                                   | Papel            | Único motivo para mudar                   |
| ------------------------------------------------------------------------ | ---------------- | ----------------------------------------- |
| Livro, Usuario, Playlist, Musica                                         | entidades        | as regras do próprio objeto               |
| PlaylistService                                                          | regra de negócio | o processo de criar e alterar playlists   |
| LivroRepository, UsuarioRepository, PlaylistRepository, MusicaRepository | acesso aos dados | a forma de armazenar e recuperar os dados |

## 5. Onde apliquei SRP e DIP

- SRP: nenhuma entidade é responsável por salvar a si mesma. As entidades representam os dados e comportamentos do domínio; guardar e recuperar os dados é responsabilidade dos repositories; e o processo de criação e gerenciamento das playlists fica no PlaylistService.
- DIP: o PlaylistService depende dos contratos dos repositories, recebidos pelo construtor. Ele não sabe se os dados estão armazenados em memória ou em um banco de dados.

6. Fora do escopo (YAGNI)

Login, avaliações de livros, comentários, compartilhamento de playlists, recomendações automáticas e integração com serviços externos de música não entram no Projeto 1.