// Camada de UI: a única que toca no DOM dos livros.
// Não faz fetch e não valida regra: desenha o estado e avisa dos eventos.
const el = {
  form: document.querySelector('#form-livro'),
  salvar: document.querySelector('#liv-salvar'),
  cancelar: document.querySelector('#liv-cancelar'),
  carregando: document.querySelector('#livros-carregando'),
  erro: document.querySelector('#livros-erro'),
  erroMsg: document.querySelector('#livros-erro-msg'),
  recarregar: document.querySelector('#livros-recarregar'),
  vazio: document.querySelector('#livros-vazio'),
  sucesso: document.querySelector('#livros-sucesso'),
  linhas: document.querySelector('#livros-linhas'),
};

function celula(texto, classe = '') {
  const td = document.createElement('td');
  td.textContent = texto; // dado do usuário entra como TEXTO, nunca como HTML
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

function linha(livro, editandoId) {
  const tr = document.createElement('tr');
  if (livro.id === editandoId) tr.className = 'editando';

  const acoes = celula('', 'text-end text-nowrap');
  acoes.append(
    botao('Editar', 'editar', livro.id, 'btn-outline-primary me-1'),
    botao('Remover', 'remover', livro.id, 'btn-outline-danger'),
  );

  tr.append(celula(livro.id), celula(livro.titulo), celula(livro.autor), acoes);
  return tr;
}

export const livroView = {
  // Desenha a tela a partir do estado: a UI é função do estado.
  render({ status, livros, erro, editandoId, salvando }) {
    el.carregando.classList.toggle('d-none', status !== 'carregando');
    el.erro.classList.toggle('d-none', status !== 'erro');
    el.vazio.classList.toggle('d-none', status !== 'vazio');
    el.sucesso.classList.toggle('d-none', status !== 'sucesso');

    el.erroMsg.textContent = erro ?? '';
    el.linhas.replaceChildren(...livros.map((l) => linha(l, editandoId)));

    el.salvar.disabled = salvando;
    el.salvar.textContent = salvando
      ? 'Salvando…'
      : editandoId ? 'Salvar alterações' : 'Cadastrar livro';
    el.cancelar.classList.toggle('d-none', !editandoId);
  },

  preencherForm(livro) {
    el.form.titulo.value = livro.titulo;
    el.form.autor.value = livro.autor;
    el.form.titulo.focus();
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

  // Delegação: UM listener no <tbody> atende os botões de todas as linhas.
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
