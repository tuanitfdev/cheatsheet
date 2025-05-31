# Image Recovery using clonezilla on SystemRescue
startx to start GUI
open terminal in GUI (can open many instances or copy paste or zoom font size for better display)

vim /etc/ssh/sshd_config
Add below config at end of file:
```
#custom here
#Port 22
Port 25555
PasswordAuthentication yes
PermitRootLogin yes
AllowUsers root
```

restart sshd and stop firewall:
```
systemctl restart sshd
systemctl stop iptables
```

Change root password:
```
passwd
1tfnauT#vt
```
ssh and create tmux session to operate all following cmds to prevent lost connection ssh
```
ssh <ssh_profile>
config tmux to allow mouse scroll and copy mode in vi mode:
vim ~/.tmux.conf
```
set -g history-limit 10000
set -g mouse on
set -g mode-keys vi
set -g status-keys vi
```
Note: should create config tmux before creating new session or when create session first, create config will not apply to existed session (so have to run command mode to apply those config again)
if edit tmux.conf in tmux session, then do following:
Any of the following should work:
1/ run tmux source ~/.tmux.conf

or 2/ run tmux set -g prefix C-a

or 3/ press the old prefix (CtrlB), :source ~/.tmux.conf

or 4/ press the old prefix (CtrlB), :set -g prefix C-a

tmux
tmux a #tmux attach last session

Trick to copy vim terminal on terminal win 10:
- hold shift then drag mouse to make text selection then click right mouse button to finish copy to clipboard
- copy system clipboard to ssh terminal in tmux session using shift + insert to paste clipboard content

Note: should create config tmux before creating new session or when create session first, create config will not apply to existed session (so have to run command mode to apply those config again)


install rclone:
```
curl https://rclone.org/install.sh | bash
```
refer rclone config google drive setup at following link:
https://rclone.org/drive/
rclone config

After create google drive mapping mount config, then create mount folder and map rclone mapping to this folder:
(note: 'tdrive' is mapping rclone name below)
17 / Google Drive
   \ (drive)
input 17 or drive to select Google Drive
```
mkdir /home/partimag
chmod 777 -R /home/partimag
rclone mount tdrive:/rclone-image/ /home/partimag --daemon
```


install clonezilla:
```
pacman -Syu --noconfirm
pacman -Syu --noconfirm clonezilla
```

run clonezilla:
```
clonezilla
```

Note:
khi chạy clonezilla, mở gui đợt đầu nên chọn option run shell để ra ngoài shell map drive vào path /home/partimag
xong bấm exit để làm tiếp đợt gui tiếp theo
Không chọn skip trong GUI đợt đầu vì có khả năng nó override path /home/partimag thành ram disk và làm mất mount point trước đó nếu đã setup mount từ trước


# misc
use dd to clone disk to image and compress to xz format:
dd if=/dev/vda status=progress | xz --compress -0 -T0 > /home/partimag/img-ubuntu-dd-only-not-clonezilla.xz

decompress and clone image to disk by dd:
xz --decompress --stdout -T0 /home/partimag/img-ubuntu-dd-only-not-clonezilla.xz | dd of=/dev/vda status=progress




fsarchiver probe simple
mkdir /mnt/linux
mount /dev/vda2 /mnt/linux
mount -o bind /proc /mnt/linux/proc
mount -o bind /dev /mnt/linux/dev
mount -o bind /sys /mnt/linux/sys

chroot /mnt/linux /bin/bash

apt update

Note:
if error connection (failed resolving dns), fix by edit following file
vim /etc/resolv.conf
```
nameserver 8.8.8.8
```
or
echo nameserver 8.8.8.8 > /etc/resolv.conf

apt install grub-pc -y

grub-install --boot-directory=/boot --target=i386-pc /dev/vda --force


Issue if clone failed:
Unmount remote drive:
umount /home/partimag

Force close all processes regarding rclone and clonezilla by using htop, search name 2 processes
rclone or clonezilla, f9 to kill, press '9' to force kill

Nên tạo backup enable check and fix disk error if found.
Split size đừng để số quá lớn nếu muốn ko split nhập tầm 1000000 (1 triệu hoặc 100k) MB
Lúc restore nên để default là size disk giống origin, ko nên tự chỉnh size theo tỷ lệ scale.


rclone ls --human-readable tdrive:/rclone-image
rclone ls --human-readable tdrive:/rclone-image/2024-09-02-03-img-win
rclone ls --human-readable tdrive:/rclone-image/2024-09-01-11-img-ubuntu-22-dev

if vultr vps provider, config network interface get dhcp ip by doing in this article:
https://docs.vultr.com/configure-a-vultr-server-to-use-dhcp-for-dynamic-ip
vim /etc/netplan/10-enp1s0.yaml
```
network:
  version: 2
  renderer: networkd
  ethernets:
    enp1s0:
      dhcp4: yes
```
netplan apply