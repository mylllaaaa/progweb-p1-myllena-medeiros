import { api } from '../api.js';

// Regras do lado do front: limpar e validar ANTES de gastar uma requisição.
// O backend valida de novo: nunca confie só no front.
function preparar({ titulo, autor }) {
  const dados = {
    titulo: (titulo ?? '').trim(),
    autor: (autor ?? '').trim(),
  };
  if (!dados.titulo) throw new Error('Informe o título.');
  if (!dados.autor) throw new Error('Informe o autor.');
  return dados;
}

export const livroService = {
  listar() {
    return api.get('/livros');
  },

  async criar(dados) {
    return api.post('/livros', preparar(dados));
  },

  async atualizar(id, dados) {
    return api.put(`/livros/${id}`, preparar(dados));
  },

  remover(id) {
    return api.delete(`/livros/${id}`);
  },
};
