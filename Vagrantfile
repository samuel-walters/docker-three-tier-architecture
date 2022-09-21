# At the time of writing, "2.3.0" is the latest version of Vagrant.
# This line can help with compatibility issues.
Vagrant.require_version "= 2.3.0"

# The "2" refers to the version of the configuration object "config".
# The settings within config.vm modify the configuration of the VM.
Vagrant.configure("2") do |config|
    # This configures what box the VM will be brought up against.
    # (A Vagrant Box is a clone of a base operating system image.)
    # Available Vagrant Boxes: https://app.vagrantup.com/boxes/search
    config.vm.box = "generic/ubuntu1804"

    # Latest version of the generic/ubuntu1804 box at the moment.
    config.vm.box_version = "4.1.12"

    # The hostname the VM machine should have.
    config.vm.hostname = "docker-task-host"

    # Sets up a private network.
    # Make sure this static IP does not collide with any other machines on the same network.
    # (For example, use a command like "arp -a" in Windows Command Prompt to list IPs.)
    config.vm.network "private_network", ip: "192.168.50.4"

    # This message shows after "vagrant up".
    config.vm.post_up_message = "Useful instructions here."

    # Configures settings specific to virtualbox
    config.vm.provider "virtualbox" do |v|
        # This name will appear in the VirtualBox GUI.
        v.name = "docker-task-vm"
        # (Set this variable to true when debugging.)
        v.gui = false
        # Sets the host CPU execution cap to 50%. In other words, no matter how much 
        # CPU is used in the VM, no more than 50% will be used on the host machine.
        v.customize ["modifyvm", :id, "--cpuexecutioncap", "50"]
        # (Megabytes - 512 is enough to play around with.)
        v.memory = 512
        # 1 CPU core.
        v.cpus = 1
    end

    # Running Vagrant up will require this plugin at this specific version (current latest version).
    # If it is not present, a prompt will ask the person who ran "vagrant up" if they want to install
    # the plugin. (This plugin "vagrant-docker-compose" allows us to install docker_compose.)
    config.vagrant.plugins = {"vagrant-docker-compose" => {"version" => "1.5.1"}}

    # Install docker and docker compose.
    config.vm.provision :docker
    config.vm.provision :docker_compose

    # Allows folders on the host machine to be synced to the guest machine.
    # (Type "rsync" does a one-time one-way sync from the host to the VM.)
    # (node_modules gets excluded because otherwise "npm install" causes installation errors.)
    # (First parameter is host path, second is VM path.)
    config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: [".git/", ".gitignore", "/server/node_modules/", "/documentation", "Vagrantfile"]
end