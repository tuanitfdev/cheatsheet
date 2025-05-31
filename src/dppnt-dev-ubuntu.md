### edit hostname if needed
vim /etc/hostname

### set timezone
```
timedatectl set-timezone "Asia/Ho_Chi_Minh"
timedatectl status
```

### config dns server name and update repo server cache (if aws vps)
```
echo "nameserver 8.8.8.8" | tee /etc/resolv.conf > /dev/null
apt update
```

### install net tools if not exists
```
apt install -y net-tools
```

### setup static ip address
- edit file /etc/netplan/0x-....yaml like following template
```
network:
  ethernets:
    ens33:
      dhcp4: false
      addresses: [192.168.175.20/24]
      routes:
        - to: default
          via: 192.168.175.2
      nameservers:
        addresses: [8.8.8.8,8.8.8.4]
  version: 2
```
replace ens33 with appropriate name (check ifconfig to know exactly)


- apply and test change:
netplan try


### setup bashrc
#### edit ~/.bashrc

Uncomment following lines
```
force_color_prompt=yes

if [ -f /etc/bash_completion ] && ! shopt -oq posix; then
    . /etc/bash_completion
fi
```
Replace line like following:
```
case "$TERM" in
    xterm-color) color_prompt=yes;;
esac
```
To
```
case "$TERM" in
    xterm-color|\*-256color) color_prompt=yes;;
esac
```
Or use sed like following:
```
sed -i 's/xterm-color)/xterm-color|\*-256color)/g' /root/.bashrc
```

update [HH:mm:ss] at bash prompt, edit following lines in .bashrc
old:
```
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
```
new: (attention inserted [\t] after ':' in PS1 var below)
```
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:[\t]\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:[\t]+($debian_chroot)}\u@\h:\w\$ '
fi
```

#### edit /etc/bash.bashrc
Uncomment this:
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

(NOT WORKING, not change prompt format)
Replace this:
if ! [ -n "${SUDO_USER}" -a -n "${SUDO_PS1}" ]; then
  PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
To this: (attention [\t] after ':' in PS1 var)
if ! [ -n "${SUDO_USER}" -a -n "${SUDO_PS1}" ]; then
  PS1='${debian_chroot:+($debian_chroot)}\u@\h:[\t]\w\$ '
fi

(NOT WORKING, not change prompt format)
uncomment this:
case "$TERM" in
xterm*|rxvt*)
    PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME}: ${PWD}\007"'
    ;;
*)
    ;;
esac
Replace to this: (Attention to [\t] after ':')
case "$TERM" in
xterm*|rxvt*)
    PROMPT_COMMAND='echo -ne "\033]0;${USER}@${HOSTNAME}:[\t] ${PWD}\007"'
    ;;
*)
    ;;
esac

Note: above (NOT WORKING, not change prompt format (inserted timing to prompt)) should be replace by log ssh with specific user and edit ~/.bashrc like above guide details 

### change default editor of systemd
edit ~/.bashrc or /etc/bash.bashrc
export SYSTEMD_EDITOR=vim
alias nl=lnav
alias jl=journalctl
alias sc=systemctl

### setup vimrc
```
vim /etc/vim/vimrc
```
```
colorscheme koehler
```

fix ctrl+q (visual block mode in vim)
vim /etc/bashrc
```
stty start undef
```
ref: https://stackoverflow.com/questions/21806168/vim-use-ctrl-q-for-visual-block-mode-in-vim-gnome


### setup sshd root login with public key
```
#Port 22
Port 25555
#PubkeyAuthentication no
PubkeyAuthentication yes
#PasswordAuthentication no
PasswordAuthentication yes
#PermitRootLogin yes
PermitRootLogin prohibit-password
```

first step before above should config ssh key authorized by some below config:
```
PasswordAuthentication yes
PermitRootLogin yes
```
after finished, comment those lines and uncomment "reversed" lines

- Note: when config strange ssh port, should pay attention to firewall of vps provider (ex: aws lightsail, vultr no firewall rule by default), if connect ssh with strange port connect timeout then probably firewall issue


### create admin user to backup root issue cases cannot not login
adduser tadmin
New pw:
1tfnauTAd&890626

usermod -aG sudo tadmin

verify sudo permission of tadmin (if needed):
su - tadmin
sudo whoami

rootPwd:
gi!bX^UsKyWyvS6&[ip_ld6]
(ip_ld6: 6 last digit of ip)

### tmux setup initial config
some common tmux cmd example:
tmux a # tmux attach last session
tmux a -t 0 (reattach first tmux session)
c-b [] (go to vi mode to scroll terminal screen using vi key if cannot scroll mouse in terminal console of current OS)
Q to exit vi mode
c-b d: detact current tmux session
c-b (/): move to previous/next session
c-b s: show all sessions
c-b :kill-session -a -t 0

More tip and cheatsheet at:
https://tmuxcheatsheet.com/

Trick to copy vim terminal on terminal win 10:
- hold shift then drag mouse to make text selection then click right mouse button to finish copy to clipboard
- copy system clipboard to ssh terminal in tmux session using shift + insert to paste clipboard content

config tmux to allow mouse scroll and copy mode in vi mode:
vim ~/.tmux.conf
```
set -g history-limit 10000
set -g mouse on
set -g mode-keys vi
set -g status-keys vi
```
Note: should create config tmux before creating new session or when create session first, create config will not apply to existed session (so have to run command mode to apply those config again)

### tmux setup save/restore session auto even after reboot
after setup basic above
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

vim ~/.tmux.conf
```
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

set -g @continuum-restore 'on'

run '~/.tmux/plugins/tpm/tpm'
```

tmux source-file ~/.tmux.conf
in tmux session:
prefix + I (capital i) to install all plugins
-> tmux will auto save session in every 15 minutes

troubleshooting:
if centos 7, tmux max only 1.8 version, should workaround by install followed by this article link:
https://gist.github.com/pokev25/4b9516d32f4021d945a140df09bf1fde

### setup python
add-apt-repository ppa:deadsnakes/ppa
apt update
apt install -y python3.11
ln -s /usr/bin/python3.11 /usr/bin/python

when need to remove, use following (SHOULD NOT REMOVE EXISTED PYTHON VERSION FOR OS WORK CORRECTLY)
apt remove python3-apt
apt autoremove

reinstall python
apt install --reinstall python3.11-apt
ln -s /usr/bin/python3.11 /usr/bin/python

check python location:
which python
whereis python

update default bin path cmd:
update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1
ln -s /usr/bin/python3.11 /usr/bin/python

### install python extensions
should run as normal user with sudo or logged in at root, then DON'T NEED sudo anymore at every cmd
NOTE: install package with sudo at normal user (have sudo rights) or logged in at root user then install
IS THE SAME

curl -sS https://bootstrap.pypa.io/get-pip.py | python
apt install -y python3.11-venv
[Note]: install python3.x-venv to update ensurepip if missing too

install pipx at global by modify environment path variable: (edit in /etc/bash.bashrc)
export PIPX_HOME=/opt/pipx
export PIPX_BIN_DIR=/usr/local/bin
export PIPX_MAN_DIR=/usr/local/share/man
OR use only at shell one time with pipx command after like following:
PIPX_HOME=/opt/pipx PIPX_BIN_DIR=/usr/local/bin PIPX_MAN_DIR=/usr/local/share/man pipx install PACKAGE


apt install -y python3.11-distutils

mkdir /venv
chmod 777 -R /venv
python -m venv /venv/my

source /venv/my/bin/activate

python -m pip install poetry
mkdir /my
chmod 777 -R /my
poetry config cache-dir "/venv" # should not use this
poetry config cache-dir "/my/poetry/.cache"

# DONT DO BELOW
#add env var of poetry by edit /etc/bash.bashrc
#export VIRTUAL_ENV=/venv
##

use pycharm connect ssh to remote vmware, config project python interpreter usin
SYSTEM INTERPRETER (point to python execute path) OR Virtualenv Environment (point to python execute path too OR will meet permission error if point to venv folder path or venv bin folder path)


should install poetry with pipx (pipx install with custom path change for all users used, change default location by environment path config)
REASON: because third party tools also use this poetry too, so pipx should be installed at global path for ALL USERS, install pipx or poetry with pipx will use cmd at ~/.bin, all users cannot access to this
python -m pip install pipx
pipx install poetry


python -m pipx ensurepath

restart shell then run:
pipx completions
pipx install argcomplete

pipx install poetry

### setup node
new way:
curl -sL https://deb.nodesource.com/setup_20.x | bash

old way output to file
curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
bash nodesource_setup.sh

apt-get install nodejs -y

### setup mongodb
```
curl -fksSL https://www.mongodb.org/static/pgp/server-7.0.asc| gpg --dearmor -o /etc/apt/trusted.gpg.d/mongodb-7.gpg
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org
systemctl enable --now mongod
mkdir -p /data/db
chmod 0755 /data/db
chown -R mongodb:mongodb /data/db
chown mongodb:mongodb /tmp/mongodb-27017.sock
```

check id of mongodb to make sure it has been created if needed
```
grep mongodb /etc/passwd
```

comment following lines in /etc/mongod.conf
```
#storage:
#  dbPath: /var/lib/mongodb
```

add following lines to the end of file /etc/mongod.conf
```
storage:
  dbPath: /data/db

security:
  authorization: enabled
```

if config more bind ip address, config like following:

net:
  port: 27017
  bindIp: "127.0.0.1,192.168.175.1"

instead old:

net:
  port: 27017
  bindIp: 127.0.0.1

```
systemctl restart mongod
```

Check mongod log if failed to start/restart
```
journalctl -b -u mongod
```

create user and config his permissions
mongosh
```
use admin
db.createUser(
{
user: "tadmin",
pwd: passwordPrompt(), // or cleartext password
roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
}
)
db1tfTuAn&tfwdMg

```

test mongodb user authen
```
mongosh -u tadmin -p --authenticationDatabase admin
```

### setup mariadb 10.5
```
apt-key adv --fetch-keys 'https://mariadb.org/mariadb_release_signing_key.asc'
add-apt-repository 'deb [arch=amd64] http://mariadb.mirror.globo.tech/repo/10.6/ubuntu focal main'
apt update
apt install mariadb-{server,client}
mysql_secure_installation
```
option when setup mariadb
```
Enter current password for root (enter for none):<enter>
db1tfTuAn&tfwdMg&R0t
Switch to unix_socket authentication [Y/n] y
Change the root password? [Y/n] y
Remove anonymous users? [Y/n] y
Disallow root login remotely? [Y/n] y
Remove test database and access to it? [Y/n] y
Reload privilege tables now? [Y/n] y
```
```
systemctl status mysql
```

create new database "telegram_manager"
restore db structure by importing regarding .sql file

### install git
1. Install git if missing
```
apt install git -y
```
2. Set default git account to global config
```
git config --global user.name "Tuan ITF Dev"
git config --global user.email "tuanitfdev@gmail.com"
```
3. Generate ssh key pairs if not exists
```
ssh-keygen -t ed25519 -C "tuanitfdev@gmail.com"
```
3. Add public key to git repo server

### install chromium
apt install chromium-browser
// install chrome for playwright
npx playwright install chrome

### setup redis (latest version)
#### install binary
apt update
apt install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
apt update
apt install redis

#### config redis
vim /etc/redis/redis.conf
- find and comment following lines:
bind 127.0.0.1 -::1
supervised auto

- Add following lines below at the end:
```
## custom here ##
bind 127.0.0.1 -::1
supervised systemd
```

Enable autostart service redis and restart service to apply new config:
systemctl enable redis-server.service

systemctl restart redis.service

### SSH Tunneling
On your local machine use SSH tunneling to map the remote port PORT into a local PORT with this command: ssh -nNT -L <LOCAL PORT>:127.0.0.1:<REMOTE PORT> <USERNAME>@<HOST>. For example:
ssh -nNT -L 9999:127.0.0.1:80 ubuntu@my-aws-server

ssh -nNT -L 9999:127.0.0.1:445 auto-photo-test-vps
ssh -nNT -L 9999:127.0.0.1:3000 auto-photo-test-vps

Note:
smb port: 339 or 445
// -nNT — do not create a shell


### setup samba
smb user:
tsmb
213456@Smb

root
213456@Smb


apt install -y samba
systemctl enable smbd
systemctl enable nmbd
systemctl start smbd
systemctl start nmbd

// if need set smb pass for user 'tsmb'
useradd tsmb -s /sbin/nologin

smbpasswd -a root
mkdir -p /srv/smb
chown root /srv/smb
chmod 777 /srv/smb

### config smb.conf
vim /etc/samba/smb.conf
```
[global]
unix extensions = no

[smb]
path = /srv/smb
read only = no
browsable = yes
follow symlinks = yes
wide links = yes
force create mode = 0777
force directory mode = 0777
```

systemctl restart smbd

// create symlink from source path to smb path (-s is source path)
ln -s /var/www/auto-photo /srv/smb/auto-photo

// share smb over ssh tunneling
https://rmust.me/how-to-smb-over-ssh

allow windows to connect smb on linux via ssh tunneling and custom port different from 445
https://github.com/dbshch/smb-ssh-tunnel
https://superuser.com/questions/702948/how-to-mount-a-samba-share-on-non-standard-port

#### setup loopback interface to use smb another port different from default
download below src and extract
https://github.com/dbshch/smb-ssh-tunnel
At folder src, run:
// .\smb.ps1 [DESTINATION_IP] [DESTINATION_PORT] [NIC_IP] [NIC_NAME]
.\smb.ps1 127.0.0.1 2001 10.0.0.1 LoopBack01
.\smb.ps1 127.0.0.1 2002 10.0.1.1 LoopBack02
.\smb.ps1 127.0.0.1 2003 10.0.2.1 LoopBack03

Then can use ssh tunneling to setup corresponding port above to use it normally

### mount smb share on windows for ubuntu to access
apt install cifs-utils
mkdir /mnt/winshare/
mount -t cifs //192.168.175.1/sc /mnt/winshare/sc -o username=tuan

mount -t cifs //192.168.175.1/ /mnt/winshare/ -o username=tuan
umount /mnt/winshare


#### misc
check process id using specific port
lsof -i :9229

netstat -tulpn | grep :401*