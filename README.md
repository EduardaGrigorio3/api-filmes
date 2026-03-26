# API de Filmes

## Como executar o projeto

1. Instale as dependências:

```
npm install
```

2. Inicie o servidor:

```
node server.js
```

3. A API estará disponível em:

```
http://localhost:8080
```

---

## Rota disponível

### GET /api/filmes

Retorna a lista de filmes cadastrados.

### POST /api/filmes

Adiciona um novo filme.

---

## Exemplo de uso

Acesse no navegador ou no Postman:

```
http://localhost:8080/api/filmes
```

## Workflow utilizado

Foi utilizado o **GitHub Flow**.

Nesse modelo, a branch `main` contém a versão principal do projeto. Para cada nova funcionalidade, como a rota POST, foi criada uma branche separadaa (`feature/post-filme`).

Após o desenvolvimento as alterações foram integradas à branch principal através de merge.

### Por que escolhi esse workflow?

* Simples de utilizar
* Permite trabalhar com funcionalidades separadas
* Mantém a branch principal sempre organizada e funcional

