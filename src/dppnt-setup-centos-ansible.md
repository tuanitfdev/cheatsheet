### setup bashrc
vim ~/.bashrc

### setup bash completion on root account
yum install -y bash-completion
source /etc/profile.d/bash_completion.sh
logout
(login ssh)

### install ansible
yum update
yum install -y epel-release
yum install -y python3
yum install -y ansible

### setup samba
smb user:
tsmb
213456@Smb

yum install -y samba
systemctl start smb.service
systemctl start nmb.service
systemctl enable smb.service
systemctl enable nmb.service

useradd tsmb -s /sbin/nologin
smbpasswd -a tsmb
mkdir -p /srv/smb
chown tsmb /srv/smb
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

systemctl restart smb nmb

### turn off firewall, selinux
systemctl stop firewalld
vim /etc/sysconfig/selinux
SELINUX=enforcing -> SELINUX=disabled
reboot

