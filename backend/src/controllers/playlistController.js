import { playlistService } from '../services/playlistService.js';

export const playlistController = {
  listar(req, res) {
    res.json(playlistService.listar());
  },

  buscarPorId(req, res) {
    res.json(playlistService.buscarPorId(Number(req.params.id)));
  },

  criar(req, res) {
    res.status(201).json(playlistService.criar(req.body));
  },

  atualizar(req, res) {
    res.json(playlistService.atualizar(Number(req.params.id), req.body));
  },

  remover(req, res) {
    playlistService.remover(Number(req.params.id));
    res.status(204).end();
  },
};
