import { livroModel } from '../models/livroModel.js';
import { playlistModel } from '../models/playlistModel.js';
import { erro } from '../utils/erro.js';

function validarId(id) {
  if (!Number.isInteger(id) || id < 1) throw erro(400, 'ID deve ser um inteiro positivo');
}

function validarDados({ titulo, autor } = {}) {
  if (typeof titulo !== 'string' || !titulo.trim()) {
    throw erro(400, 'Campo "titulo" é obrigatório');
  }
  if (typeof autor !== 'string' || !autor.trim()) {
    throw erro(400, 'Campo "autor" é obrigatório');
  }
  return { titulo: titulo.trim(), autor: autor.trim() };
}

export const livroService = {
  listar() {
    return livroModel.listar();
  },

  buscarPorId(id) {
    validarId(id);
    const livro = livroModel.buscarPorId(id);
    if (!livro) throw erro(404, 'Livro não encontrado');
    return livro;
  },

  criar(dados) {
    const livro = validarDados(dados);
    if (livroModel.existeTituloAutor(livro.titulo, livro.autor)) {
      throw erro(409, 'Já existe um livro com este título e autor');
    }
    return livroModel.inserir(livro);
  },

  atualizar(id, dados = {}) {
    const atual = this.buscarPorId(id);
    const livro = validarDados({
      titulo: dados.titulo ?? atual.titulo,
      autor: dados.autor ?? atual.autor,
    });
    if (livroModel.existeTituloAutor(livro.titulo, livro.autor, id)) {
      throw erro(409, 'Já existe um livro com este título e autor');
    }
    return livroModel.atualizar(id, livro);
  },

  remover(id) {
    this.buscarPorId(id);
    if (playlistModel.existeParaLivro(id)) {
      throw erro(409, 'Remova as playlists deste livro antes de removê-lo');
    }
    livroModel.remover(id);
  },
};
