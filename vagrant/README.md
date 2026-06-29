# Monitoramento com Netdata

Este projeto configura o monitoramento de uma VM utilizando o **Netdata**, uma ferramenta de monitoramento em tempo real, com alertas de CPU via e-mail.

---

## Pré-requisitos

- [Vagrant](https://www.vagrantup.com/) instalado
- [VirtualBox](https://www.virtualbox.org/) instalado
- [Ansible](https://docs.ansible.com/) instalado na máquina host

---

## Subindo a infraestrutura

Para criar e iniciar as VMs definidas no Vagrantfile:

```bash
vagrant up
```

---

## Acessando a VM

Para acessar a VM onde o monitoramento será configurado:

```bash
vagrant ssh vm2
```

---

## Executando o playbook de monitoramento

Antes de executar, edite o arquivo `data/configurar-monitoramento.yml` e preencha as variáveis de e-mail com seus dados:

```yaml
vars:
  netdata_alert_email: "seuemail@exemplo.com"   # E-mail que receberá os alertas
  smtp_server: "smtp.gmail.com"                  # Servidor SMTP
  smtp_port: "587"                               # Porta SMTP
  smtp_user: "seuemail@gmail.com"                # Usuário SMTP
  smtp_password: "sua_senha_de_app"              # Senha de app do Gmail
```

> **Nota:** Se usar o Gmail, é necessário gerar uma [Senha de App](https://myaccount.google.com/apppasswords) na sua conta Google.

Para executar o playbook:

```bash
ansible-playbook data/configurar-monitoramento.yml
```

---

## Visualizando os dados coletados

O Netdata oferece um **dashboard web em tempo real** acessível pelo navegador. Após a execução do playbook, abra o seguinte endereço:

```
http://192.168.56.11:19999
```

### O que é possível visualizar no dashboard:

| Métrica              | Descrição                                           |
|----------------------|-----------------------------------------------------|
| **CPU**              | Uso de CPU por processo, por core e total            |
| **Memória**          | Uso de RAM, swap e cache                             |
| **Disco**            | Leitura/escrita, espaço utilizado e IOPS             |
| **Rede**             | Tráfego de entrada/saída por interface               |
| **Processos**        | Lista de processos ativos e consumo de recursos      |
| **Alertas**          | Alertas configurados e histórico de notificações     |

### Navegação no dashboard:

1. Acesse `http://192.168.56.11:19999` no navegador
2. O painel principal mostra um resumo geral do sistema
3. No menu lateral, navegue entre as seções (CPU, Memória, Disco, Rede, etc.)
4. Clique em qualquer gráfico para ver detalhes e ajustar o intervalo de tempo
5. Em **Alarms** (canto superior direito), visualize os alertas ativos e o histórico

---

## Testando o alerta de CPU

Para verificar se o alerta de CPU a 80% está funcionando, utilize a ferramenta **stress-ng** (já instalada pelo playbook):

### Na VM (após `vagrant ssh vm2`):

```bash
stress-ng --cpu 4 --timeout 120s
```

Este comando irá estressar 4 cores de CPU por 2 minutos. O comportamento esperado é:

1. O uso de CPU sobe acima de 80%
2. O Netdata detecta o uso elevado (verificação a cada 10 segundos)
3. Um alerta do tipo **warning** é acionado
4. Se configurado corretamente, um **e-mail de alerta** é enviado para o endereço configurado
5. Se o uso ultrapassar 95%, um alerta **crítico** é acionado

### Verificando os alertas no dashboard:

Acesse `http://192.168.56.11:19999` e clique no ícone de **sino/alarme** no canto superior direito para ver os alertas ativos.

### Verificando os logs de alerta:

```bash
sudo cat /var/log/netdata/health.log
```

---

## Estrutura do playbook

O playbook `configurar-monitoramento.yml` executa as seguintes tarefas:

1. **Atualiza o cache do apt** e instala dependências (curl, wget, stress-ng, msmtp)
2. **Instala o Netdata** via script oficial (com canal estável e telemetria desabilitada)
3. **Configura o msmtp** como agente de envio de e-mail para as notificações
4. **Cria a regra de alerta** para CPU acima de 80% (warning) e 95% (crítico)
5. **Configura o destinatário de e-mail** para receber os alertas do Netdata
6. **Reinicia o Netdata** para aplicar todas as configurações

---

## Portas utilizadas

| Serviço  | Porta  | Descrição                        |
|----------|--------|----------------------------------|
| Netdata  | 19999  | Dashboard web de monitoramento   |

---

## Solução de problemas

### O dashboard não abre?

```bash
# Verifique se o Netdata está rodando
sudo systemctl status netdata

# Reinicie se necessário
sudo systemctl restart netdata
```

### E-mail de alerta não está chegando?

```bash
# Teste o envio de e-mail manualmente
echo "Teste de envio" | msmtp seuemail@exemplo.com

# Verifique os logs do msmtp
sudo cat /var/log/msmtp.log
```