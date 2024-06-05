# My Anime CheckList ✔️ 📺

<img src="https://raw.githubusercontent.com/jefersongjr/anime-check-list/main/frontend/src/assets/preview.png" alt="Texto Alternativo" width="1000">

##  🚀📋 Sobre:

**My Anime CheckList** é uma aplicação que permite aos usuários gerenciar e acompanhar os animes que estão assistindo. O projeto busca dados de animes em uma base de dados e exibe os lançamentos semanais. Com isso, o usuário pode:

- Selecionar e marcar os animes que já assistiu durante a semana.
- Retirar animes do status de Hiato.
- Excluir animes da lista.

## 🛠️ Construído com: 

 * NestJs
 * Reactjs
 * CSS
 * ESLint
 * Axios
    
## Como Utilizar: 💻🖱️

```

# Clone este repositório
$ git clone git@github.com:jefersongjr/anime-check-list.git

# navegue até a pasta do projeto backend

# Instale as dependências.
$ npm install

# Faça o Build
$ npm run build

# Inicie o servidor
$  npm run start

```
Agora navegue até a pasta do projeto frontend

```
# Instale as dependências.
$ npm install

# Inicie o servidor
$  npm run dev

```
 
### Detalhes de Uso: 💻

### FrontEnd: 

- Certifique-se de que o servidor backend está em execução para que a tabela seja populada corretamente, pois os dados são carregados por meio de requisições ao backend, que acessa uma base de dados.
- Ao utilizar os botões "Editar" e "Excluir", tenha cautela, pois eles alteram diretamente os valores no banco de dados.
- O sistema apenas permite marcar como "visto" os animes que estão sendo lançados semanalmente. No entanto, é possível alterar o status de qualquer anime na lista.
- O botão "Iniciar Nova Semana" permite marcar todos os animes como não vistos, útil para começar uma nova semana de acompanhamento.
- Está nos planos futuros a implementação da função "Criar Anime", que permitirá adicionar novos animes à lista diretamente pelo sistema.

### BackEnd: 

- No BackEnd criei um Crud "Completo", e pode ser criados animes, editados, usando thunderclient ou postman.
- a Rota "GET" : http://localhost:3001/animes, captura todos os animes.
- a Rota "POST" : http://localhost:3001/animes, cria um novo anime.
- a Rota "PUT" : http://localhost:3001/animes/:id, edita um anime por id.
- a Rota "DELETE" : http://localhost:3001/animes/:id, deleta um anime por id.

