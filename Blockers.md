# Windows Users

## Vagrant up hangs at "default: SSH auth method: password"

You may receive this output after trying to run `vagrant up`:

    Timed out while waiting for the machine to boot. This means that
    Vagrant was unable to communicate with the guest machine within
    the configured ("config.vm.boot_timeout" value) time period.

    If you look above, you should be able to see the error(s) that
    Vagrant had when attempting to connect to the machine. These errors
    are usually good hints as to what may be wrong.

    If you're using a custom box, make sure that networking is properly
    working and you're able to connect to the machine. It is a common
    problem that networking isn't setup properly in these boxes.
    Verify that authentication configurations are also setup properly,
    as well.

    If the box appears to be booting properly, you may want to increase
    the timeout ("config.vm.boot_timeout") value.

If you receive this output after `vagrant up`, check if the logs for your VM contain this line - because if they do, then Microsoft Hyper-V is running on your host PC:

`{timestamp} HM: HMR3Init: Attempting fall back to NEM: VT-x is not available`

Many third-party virtualisation applications (including VirutalBox) don't work together with Hyper-V. 

To disable Hyper-V on Windows, go to Control Panel > Programs & Features > Turn Windows Feature On/OFF.

Disable all *three* of these and then restart your PC:

- Virtual Machine Platform
- Windows Hypervisor Platform
- Windows Subsystem for Linux