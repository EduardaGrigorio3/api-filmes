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

---

## Infraestrutura com Vagrant

O projeto inclui um `Vagrantfile` que provisiona duas máquinas virtuais usando o **VirtualBox** como provedor.

### Arquitetura

| Máquina | Memória | IP Privado (Classe C) | Função |
|---------|---------|----------------------|--------|
| **VM1** | 1024 MB | `192.168.56.10` | Nó de controle Ansible |
| **VM2** | 1024 MB | `192.168.56.11` | Nó gerenciado — executa a aplicação Node.js |

- A pasta do projeto é sincronizada com `/vagrant_data` dentro da **VM1**.
- A **VM1** possui o Ansible instalado e configurado para gerenciar a **VM2**.
- A **VM2** é configurada automaticamente pelo playbook Ansible.

### Pré-requisitos

1. Instalar o [Vagrant](https://developer.hashicorp.com/vagrant/downloads)
2. Instalar o [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

### Passo a passo para executar a infraestrutura

1. Acesse a pasta do projeto:

```bash
cd api-filmes
```

2. Inicie as duas VMs:

```bash
vagrant up
```

> O Vagrant irá baixar a box `generic/ubuntu2204` (se ainda não existir), criar as VMs no VirtualBox e executar o provisionamento automaticamente. A VM1 terá o Ansible instalado e chave SSH configurada para acessar a VM2.

3. Verifique o status das VMs:

```bash
vagrant status
```

A saída esperada é:

```
vm1                       running (virtualbox)
vm2                       running (virtualbox)
```

---

## Automação com Ansible

A **VM1** funciona como **nó de controle** do Ansible, e a **VM2** como **nó gerenciado**.

### Arquivos de configuração

| Arquivo | Descrição |
|---------|-----------|
| `ansible.cfg` | Configuração do Ansible (inventário, usuário, escalação de privilégio) |
| `hosts` | Inventário com o endereço da VM2 |
| `configura-node.yaml` | Playbook para instalação e configuração da aplicação na VM2 |

### O que o playbook faz

O playbook `configura-node.yaml` executa as seguintes tarefas na VM2:

1. Atualiza o cache do apt
2. Instala dependências do sistema (git, curl, ca-certificates, gnupg)
3. Adiciona o repositório do Node.js 22.x
4. Instala o Node.js
5. Clona o repositório da aplicação em `/opt/api-filmes`
6. Instala as dependências do Node.js (`npm install`)
7. Cria um serviço systemd para a aplicação
8. Inicia a aplicação e verifica se está respondendo na porta 8080

### Como executar o playbook

1. Acesse a **VM1** via SSH:

```bash
vagrant ssh vm1
```

2. Navegue até a pasta compartilhada:

```bash
cd /vagrant_data
```

3. Execute o playbook:

```bash
ansible-playbook configura-node.yaml
```

4. Verifique se a aplicação está rodando na VM2:

```bash
curl http://192.168.56.11:8080/api/filmes
```

5. A resposta esperada é a lista de filmes em formato JSON:

```json
[
  {"id":1,"nome":"Perna Longa (Bugs Bunny)","ano":1940,"descricao":"..."},
  {"id":2,"nome":"Popeye","ano":1929,"descricao":"..."},
  {"id":3,"nome":"Tom e Jerry","ano":1940,"descricao":"..."}
]
```

> A API armazena os dados em memória. Você pode adicionar filmes usando POST e depois consultar novamente com GET.

5. Para sair da VM1:

```bash
exit
```

### Comandos úteis do Vagrant

| Comando | Descrição |
|---------|-----------|
| `vagrant up` | Inicia e provisiona todas as VMs |
| `vagrant halt` | Desliga todas as VMs |
| `vagrant destroy` | Remove todas as VMs |
| `vagrant ssh vm1` | Acessa a VM1 via SSH |
| `vagrant ssh vm2` | Acessa a VM2 via SSH |
| `vagrant status` | Verifica o status das VMs |
| `vagrant provision` | Executa o provisionamento novamente |

### Comandos úteis do Ansible

| Comando | Descrição |
|---------|-----------|
| `ansible-playbook configura-node.yaml` | Executa o playbook de configuração |
| `ansible webservers -m ping` | Testa conectividade com a VM2 |
| `ansible webservers -m shell -a "node --version"` | Verifica a versão do Node.js na VM2 |
| `ansible webservers -m shell -a "systemctl status api-filmes"` | Verifica o status do serviço |