# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"

  # ============================================================
  # VM1 - Máquina para testes / acesso à API
  # ============================================================
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"

    # Endereço IPv4 privado - Classe C
    vm1.vm.network "private_network", ip: "192.168.56.10"

    # Ambas as infraestruturas devem ser executadas em um provedor Virtualbox
    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "api-filmes-vm1"
      vb.memory = 1024 # 1024 MB de memória principal
      vb.cpus = 1
    end

    # Instala curl para testar a rota GET na VM2
    vm1.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y curl
      echo "============================================"
      echo "VM1 pronta para testes!"
      echo "Execute: curl http://192.168.56.11:8080/api/filmes"
      echo "============================================"
    SHELL
  end

  # ============================================================
  # VM2 - Máquina que executa o backend (Node.js / Express)
  # ============================================================
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"

    # Endereço IPv4 privado - Classe C
    vm2.vm.network "private_network", ip: "192.168.56.11"

    # Ambas as infraestruturas devem ser executadas em um provedor Virtualbox
    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "api-filmes-vm2"
      vb.memory = 1024 # Quantidade de memória necessária para o backend
      vb.cpus = 1
    end

    # Sincronizar a pasta da sua aplicação com a pasta vagrant_data dentro da VM2
    vm2.vm.synced_folder ".", "/vagrant_data"

    # Instalar as dependências necessárias para executar sua aplicação
    vm2.vm.provision "shell", inline: <<-SHELL
      # Instala Node.js 22.x (LTS)
      curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
      apt-get install -y nodejs

      # Instala as dependências e inicia
      cd /vagrant_data
      npm install

      # Inicia a aplicação em background usando npm start
      nohup npm start > /tmp/api-filmes.log 2>&1 &

      echo "============================================"
      echo "VM2 provisionada com sucesso!"
      echo "API rodando em http://192.168.56.11:8080"
      echo "============================================"
    SHELL
  end

end
