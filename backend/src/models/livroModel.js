let livros = [];
let proximoId = 1;

export const livroModel = {
  listar() {
    return livros;
  },

  buscarPorId(id) {
    return livros.find((livro) => livro.id === id) ?? null;
  },

  existeTituloAutor(titulo, autor, ignorarId = null) {
    return livros.some(
      (livro) =>
        livro.id !== ignorarId &&
        livro.titulo.toLocaleLowerCase() === titulo.toLocaleLowerCase() &&
        livro.autor.toLocaleLowerCase() === autor.toLocaleLowerCase(),
    );
  },

  inserir({ titulo, autor }) {
    const novo = { id: proximoId++, titulo, autor };
    livros.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const indice = livros.findIndex((livro) => livro.id === id);
    if (indice === -1) return null;
    livros[indice] = { ...livros[indice], ...dados, id };
    return livros[indice];
  },

  remover(id) {
    const antes = livros.length;
    livros = livros.filter((livro) => livro.id !== id);
    return livros.length < antes;
  },
};
