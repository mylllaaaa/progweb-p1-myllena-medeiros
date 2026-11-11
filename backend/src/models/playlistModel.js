let playlists = [];
let proximoId = 1;

export const playlistModel = {
  listar() {
    return playlists;
  },

  buscarPorId(id) {
    return playlists.find((playlist) => playlist.id === id) ?? null;
  },

  existeParaLivro(livroId) {
    return playlists.some((playlist) => playlist.livroId === livroId);
  },

  inserir({ livroId, usuarioId }) {
    const agora = new Date().toISOString();
    const nova = {
      id: proximoId++,
      livroId,
      usuarioId,
      dataCriacao: agora,
      dataEdicao: agora,
    };
    playlists.push(nova);
    return nova;
  },

  atualizar(id, dados) {
    const indice = playlists.findIndex((playlist) => playlist.id === id);
    if (indice === -1) return null;
    playlists[indice] = {
      ...playlists[indice],
      ...dados,
      id,
      dataEdicao: new Date().toISOString(),
    };
    return playlists[indice];
  },

  remover(id) {
    const antes = playlists.length;
    playlists = playlists.filter((playlist) => playlist.id !== id);
    return playlists.length < antes;
  },
};
