# API de Filmes

![Docker Pulls](https://img.shields.io/docker/pulls/eduardagrigorio3/api-filmes)
![Docker Image Size](https://img.shields.io/docker/image-size/eduardagrigorio3/api-filmes/latest)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/EduardaGrigorio3/api-filmes/docker.yml)


## Como executar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
node server.js
```

3. A API estará disponível em:

```bash
http://localhost:8080
```

---

## Rotas disponíveis

### GET /api/filmes

Retorna a lista de filmes cadastrados.

---

### POST /api/filmes

Adiciona um novo filme.

#### Exemplo de body:

```json
{
  "nome": "Rei Leão",
  "ano": 1994,
  "descricao": "Um jovem leão chamado Simba precisa enfrentar seu passado e assumir seu lugar como rei."
}
```

---

### DELETE /api/filmes/:id

Remove um filme pelo ID.

#### Respostas:

- `204` → Filme removido com sucesso
- `404` → Filme não encontrado

---

## Exemplo de uso

Acesse no navegador ou no Postman:

```bash
http://localhost:8080/api/filmes
```

---

## Workflow utilizado

Foi utilizado o **GitHub Flow**.

Nesse modelo, a branch `main` contém a versão principal do projeto. Para cada nova funcionalidade foi criada uma branch separada.

Após o desenvolvimento, as alterações foram integradas à branch principal através de Pull Request e merge.

### Por que escolhi esse workflow?

- Simples de utilizar
- Permite trabalhar com funcionalidades separadas
- Mantém a branch principal organizada e funcional

---

## CI/CD

O projeto utiliza GitHub Actions para:

- Execução automática dos testes
- Verificação de lint
- Verificação de cobertura de testes
- Build da imagem Docker
- Publicação automática da imagem no DockerHub

---

## Cobertura de testes

O projeto possui cobertura de testes superior a 90%.

---

## DockerHub

Imagem publicada no DockerHub:

https://hub.docker.com/r/eduardagrigorio3/api-filmes

### Executar com Docker

1. Baixar a imagem:

```bash
docker pull eduardagrigorio3/api-filmes:latest
```

2. Executar o container:

```bash
docker run -p 8080:8080 eduardagrigorio3/api-filmes
```

3. Acessar a API:

```bash
http://localhost:8080/api/filmes
```