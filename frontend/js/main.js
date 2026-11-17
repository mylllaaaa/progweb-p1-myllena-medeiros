// Ponto de entrada: liga store, service e view. Nenhuma regra mora aqui.
import { criarStore } from './state/store.js';
import { livroService } from './services/livroService.js';
import { playlistService } from './services/playlistService.js';
import { livroView } from './ui/livroView.js';
import { playlistView } from './ui/playlistView.js';
import { aviso } from './ui/aviso.js';

// ===================== LIVROS =====================
const livros = criarStore({
  status: 'carregando', // 'carregando' | 'erro' | 'vazio' | 'sucesso'
  livros: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

// Toda vez que o estado mudar, a view redesenha.
livros.assinar(livroView.render);

async function carregarLivros() {
  livros.set({ status: 'carregando', erro: null });
  try {
    const lista = await livroService.listar();
    livros.set({ status: lista.length ? 'sucesso' : 'vazio', livros: lista });
  } catch (e) {
    livros.set({ status: 'erro', erro: e.message });
  }
}

async function salvarLivro(dados) {
  const { editandoId } = livros.get();
  aviso.limpar();
  livros.set({ salvando: true });
  try {
    if (editandoId) await livroService.atualizar(editandoId, dados);
    else await livroService.criar(dados);

    aviso.sucesso(editandoId ? 'Livro atualizado.' : 'Livro cadastrado.');
    livroView.limparForm();
    livros.set({ editandoId: null });
    await carregarLivros();
  } catch (e) {
    aviso.erro(e.message); // o formulário fica como está, para corrigir
  } finally {
    livros.set({ salvando: false });
  }
}

function editarLivro(id) {
  const livro = livros.get().livros.find((l) => l.id === id);
  livroView.preencherForm(livro);
  livros.set({ editandoId: id });
}

function cancelarEdicaoLivro() {
  livroView.limparForm();
  livros.set({ editandoId: null });
}

async function removerLivro(id) {
  if (!confirm(`Remover o livro #${id}?`)) return;
  aviso.limpar();
  try {
    await livroService.remover(id);
    aviso.sucesso('Livro removido.');
    if (livros.get().editandoId === id) cancelarEdicaoLivro();
    await carregarLivros();
  } catch (e) {
    aviso.erro(e.message); // ex.: 409 "Remova as playlists deste livro..."
  }
}

livroView.aoEnviar(salvarLivro);
livroView.aoCancelar(cancelarEdicaoLivro);
livroView.aoRecarregar(carregarLivros);
livroView.aoClicarNaLista({ editar: editarLivro, remover: removerLivro });


// ===================== PLAYLISTS =====================
const playlists = criarStore({
  status: 'carregando',
  playlists: [],
  erro: null,
  editandoId: null,
  salvando: false,
});

playlists.assinar(playlistView.render);

// As playlists dependem dos livros: mudou a lista de livros,
// refaz o <select> e redesenha os títulos na tabela de playlists.
livros.assinar((estado) => {
  playlistView.preencherLivros(estado.livros);
  playlistView.render(playlists.get());
});

async function carregarPlaylists() {
  playlists.set({ status: 'carregando', erro: null });
  try {
    const lista = await playlistService.listar();
    playlists.set({ status: lista.length ? 'sucesso' : 'vazio', playlists: lista });
  } catch (e) {
    playlists.set({ status: 'erro', erro: e.message });
  }
}

async function salvarPlaylist(dados) {
  const { editandoId } = playlists.get();
  aviso.limpar();
  playlists.set({ salvando: true });
  try {
    if (editandoId) await playlistService.atualizar(editandoId, dados);
    else await playlistService.criar(dados);

    aviso.sucesso(editandoId ? 'Playlist atualizada.' : 'Playlist criada.');
    playlistView.limparForm();
    playlists.set({ editandoId: null });
    await carregarPlaylists();
  } catch (e) {
    aviso.erro(e.message);
  } finally {
    playlists.set({ salvando: false });
  }
}

function editarPlaylist(id) {
  const playlist = playlists.get().playlists.find((p) => p.id === id);
  playlistView.preencherForm(playlist);
  playlists.set({ editandoId: id });
}

function cancelarEdicaoPlaylist() {
  playlistView.limparForm();
  playlists.set({ editandoId: null });
}

async function removerPlaylist(id) {
  if (!confirm(`Remover a playlist #${id}?`)) return;
  aviso.limpar();
  try {
    await playlistService.remover(id);
    aviso.sucesso('Playlist removida.');
    if (playlists.get().editandoId === id) cancelarEdicaoPlaylist();
    await carregarPlaylists();
  } catch (e) {
    aviso.erro(e.message);
  }
}

playlistView.aoEnviar(salvarPlaylist);
playlistView.aoCancelar(cancelarEdicaoPlaylist);
playlistView.aoRecarregar(carregarPlaylists);
playlistView.aoClicarNaLista({ editar: editarPlaylist, remover: removerPlaylist });


// ===================== INÍCIO =====================
carregarLivros();
carregarPlaylists();
