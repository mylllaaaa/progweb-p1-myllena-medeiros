import { api } from '../api.js';

function preparar({ livroId, usuarioId }) {
  if (!livroId) throw new Error('Selecione o livro.');
  const usuario = Number(usuarioId);
  if (usuarioId === '' || usuarioId == null || !Number.isInteger(usuario) || usuario < 1) {
    throw new Error('Informe o ID do usuário (inteiro positivo).');
  }
  // Formulário só entrega string: convertemos antes de enviar
  return { livroId: Number(livroId), usuarioId: usuario };
}

export const playlistService = {
  listar() {
    return api.get('/playlists');
  },

  async criar(dados) {
    return api.post('/playlists', preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/playlists/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/playlists/${id}`);
  },
};
