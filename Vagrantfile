# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "generic/ubuntu2204"

  # VM2 - Nó gerenciado (onde a aplicação será instalada via Ansible)
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"
    vm2.vm.network "private_network", ip: "192.168.56.11"

    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "api-filmes-vm2"
      vb.memory = 1024 
      vb.cpus = 1
    end

    vm2.vm.provision "shell", inline: <<-SHELL
      echo "============================================"
      echo "VM2 pronta para ser configurada pelo Ansible"
      echo "============================================"
    SHELL
  end

  # VM1 - Nó de controle (Ansible instalado aqui)
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"
    vm1.vm.network "private_network", ip: "192.168.56.10"

    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "api-filmes-vm1"
      vb.memory = 1024 
      vb.cpus = 1
    end

    vm1.vm.synced_folder ".", "/vagrant_data"

    # Instalar Ansible e configurar acesso SSH à VM2
    vm1.vm.provision "shell", inline: <<-SHELL
      apt-get update
      apt-get install -y software-properties-common
      add-apt-repository --yes --update ppa:ansible/ansible
      apt-get install -y ansible curl

      # Gerar chave SSH para o vagrant se conectar à VM2
      sudo -u vagrant ssh-keygen -t rsa -b 2048 -f /home/vagrant/.ssh/vm2_key -N "" -q <<< y 2>/dev/null || true

      # Copiar a chave pública para a VM2 usando sshpass
      apt-get install -y sshpass
      sudo -u vagrant sshpass -p "vagrant" ssh-copy-id -i /home/vagrant/.ssh/vm2_key.pub -o StrictHostKeyChecking=no vagrant@192.168.56.11

      # Configurar o ansible.cfg no home do vagrant
      cp /vagrant_data/ansible.cfg /home/vagrant/ansible.cfg
      chown vagrant:vagrant /home/vagrant/ansible.cfg

      echo "============================================"
      echo "VM1 - Nó de controle Ansible configurado!"
      echo "Para executar o playbook:"
      echo "  vagrant ssh vm1"
      echo "  cd /vagrant_data"
      echo "  ansible-playbook configura-node.yaml"
      echo "============================================"
    SHELL
  end

end
