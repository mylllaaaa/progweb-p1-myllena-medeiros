// Camada de UI das playlists. Mesmo molde da livroView, com um <select> a mais.
const el = {
  form: document.querySelector('#form-playlist'),
  livro: document.querySelector('#pl-livro'),
  salvar: document.querySelector('#pl-salvar'),
  cancelar: document.querySelector('#pl-cancelar'),
  carregando: document.querySelector('#playlists-carregando'),
  erro: document.querySelector('#playlists-erro'),
  erroMsg: document.querySelector('#playlists-erro-msg'),
  recarregar: document.querySelector('#playlists-recarregar'),
  vazio: document.querySelector('#playlists-vazio'),
  sucesso: document.querySelector('#playlists-sucesso'),
  linhas: document.querySelector('#playlists-linhas'),
};

const dataHora = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

// id → rótulo, para mostrar o livro da playlist sem outra requisição
let tituloDoLivro = new Map();

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto;
  td.className = classe;
  return td;
}

function botao(texto, acao, id, classe) {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = texto;
  b.className = `btn btn-sm ${classe}`;
  b.dataset.acao = acao;
  b.dataset.id = id;
  return b;
}

function linha(playlist, editandoId) {
  const tr = document.createElement('tr');
  if (playlist.id === editandoId) tr.className = 'editando';

  const livro = tituloDoLivro.get(playlist.livroId)
    ?? `livro #${playlist.livroId} (removido)`;

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', playlist.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', playlist.id, 'btn-outline-danger'),
  );

  tr.append(
    celula(playlist.id),
    celula(livro),
    celula(`#${playlist.usuarioId}`),
    celula(dataHora.format(new Date(playlist.dataCriacao)), 'numero text-nowrap'),
    acoes,
  );
  return tr;
}

export const playlistView = {
  // Preenche o <select> com os livros que existem agora
  preencherLivros(livros) {
    tituloDoLivro = new Map(livros.map((l) => [l.id, `${l.titulo} (${l.autor})`]));
    const escolhido = el.livro.value;

    const opcoes = livros.map((l) => new Option(tituloDoLivro.get(l.id), l.id));
    el.livro.replaceChildren(new Option('Selecione…', ''), ...opcoes);

    // mantém a escolha, se o livro ainda existir
    if (tituloDoLivro.has(Number(escolhido))) el.livro.value = escolhido;
  },

  render({ status, playlists, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...playlists.map((p) => linha(p, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Criar playlist';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(playlist) {
    el.form.livroId.value = playlist.livroId;
    el.form.usuarioId.value = playlist.usuarioId;
    el.form.usuarioId.focus();
  },

  limparForm() {
    el.form.reset();
  },

  aoEnviar(fn) {
    el.form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      fn(Object.fromEntries(new FormData(el.form)));
    });
  },

  aoCancelar(fn) {
    el.cancelar.addEventListener('click', fn);
  },

  aoRecarregar(fn) {
    el.recarregar.addEventListener('click', fn);
  },

  aoClicarNaLista({ editar, remover }) {
    el.linhas.addEventListener('click', (evento) => {
      const alvo = evento.target.closest('button[data-acao]');
      if (!alvo) return;
      const id = Number(alvo.dataset.id);
      if (alvo.dataset.acao === 'editar') editar(id);
      if (alvo.dataset.acao === 'remover') remover(id);
    });
  },
};
