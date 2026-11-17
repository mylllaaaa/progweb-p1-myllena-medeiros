# Telas do Projeto 1 (S4)

Front: `npx http-server -p 5500 -c-1` em `frontend/` · API: `npm run dev` na raiz do repositório (porta 3000)

| Lista | Estado | Como provocar | O que aparece |
|---|---|---|---|
| Livros | carregando | Network → throttling 3G → F5 | spinner "Carregando livros…" |
| Livros | vazio | API recém-iniciada | "Nenhum livro ainda…" |
| Livros | erro | Ctrl+C na API → F5 | "Não consegui falar com a API…" + Tentar de novo |
| Livros | sucesso | cadastrar "Dom Casmurro" / "Machado de Assis" | tabela com 1 linha |
| Livros | erro de regra (409) | cadastrar o mesmo título e autor duas vezes | aviso "Já existe um livro com este título e autor" |
| Livros | erro de regra (409) | remover um livro que tem playlist | aviso "Remova as playlists deste livro antes de removê-lo" |
| Playlists | carregando | Network → throttling 3G → F5 | spinner "Carregando playlists…" |
| Playlists | vazio | sem playlists | "Nenhuma playlist ainda…" |
| Playlists | erro | Ctrl+C na API → F5 | "Não consegui falar com a API…" + Tentar de novo |
| Playlists | sucesso | escolher um livro, usuário 1, criar | tabela com o **título** do livro |
| Playlists | erro de validação (front) | enviar sem livro ou com usuário vazio | aviso vermelho, nenhuma requisição na aba Network |
| Playlists | erro de regra (422) | apagar o livro na API em outra aba e enviar com ele ainda no select | aviso "O livro informado não existe" |

## Camadas
- api: `js/api.js` · services: `js/services/` · state: `js/state/store.js` · ui: `js/ui/`
