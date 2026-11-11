import { livroModel } from '../models/livroModel.js';
import { playlistModel } from '../models/playlistModel.js';
import { erro } from '../utils/erro.js';

function validarId(id, campo = 'ID') {
  if (!Number.isInteger(id) || id < 1) throw erro(400, `${campo} deve ser um inteiro positivo`);
}

function validarDados({ livroId, usuarioId } = {}) {
  validarId(livroId, 'livroId');
  validarId(usuarioId, 'usuarioId');
  if (!livroModel.buscarPorId(livroId)) {
    throw erro(422, 'O livro informado não existe');
  }
  return { livroId, usuarioId };
}

export const playlistService = {
  listar() {
    return playlistModel.listar();
  },

  buscarPorId(id) {
    validarId(id);
    const playlist = playlistModel.buscarPorId(id);
    if (!playlist) throw erro(404, 'Playlist não encontrada');
    return playlist;
  },

  criar(dados) {
    return playlistModel.inserir(validarDados(dados));
  },

  atualizar(id, dados = {}) {
    const atual = this.buscarPorId(id);
    const playlist = validarDados({
      livroId: dados.livroId ?? atual.livroId,
      usuarioId: dados.usuarioId ?? atual.usuarioId,
    });
    return playlistModel.atualizar(id, playlist);
  },

  remover(id) {
    this.buscarPorId(id);
    playlistModel.remover(id);
  },
};
