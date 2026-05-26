# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"

  # VM1 
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"
    vm1.vm.network "private_network", ip: "192.168.56.10"

    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "api-filmes-vm1"
      vb.memory = 1024 
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

  # VM2
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"
    vm2.vm.network "private_network", ip: "192.168.56.11"

    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "api-filmes-vm2"
      vb.memory = 1024 
      vb.cpus = 1
    end

    vm2.vm.synced_folder ".", "/vagrant_data"

    # Instalar as dependências
    vm2.vm.provision "shell", inline: <<-SHELL
      curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
      apt-get install -y nodejs

      cd /vagrant_data
      npm install

      nohup npm start > /tmp/api-filmes.log 2>&1 &

      echo "============================================"
      echo "VM2 provisionada com sucesso!"
      echo "API rodando em http://192.168.56.11:8080"
      echo "============================================"
    SHELL
  end

end
