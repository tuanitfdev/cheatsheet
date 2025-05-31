### setup samba
smb user:
tsmb
213456@Smb

root
213456@Smb
qu@nTriMan9


apt install -y samba
systemctl enable smbd
systemctl enable nmbd
systemctl start smbd
systemctl start nmbd

useradd tsmb -s /sbin/nologin
smbpasswd -a root
mkdir -p /srv/smb
chown root /srv/smb
chmod 777 /srv/smb 

--
smbpasswd -a tsmb
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