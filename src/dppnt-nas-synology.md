cai app rr manager
3622xs+


Serial No (Sn): 2230SQRVWPCPW

MAC1: 9009D01800AB

MAC2: 9009D01800AC

==
To delete all network authentication:
net use * /d

view the current network connection:
net use

==
SynoCli Monitor Tools

Info: Add /opt/bin & /opt/sbin to $PATH variable
Info: Add "/opt/etc/init.d/rc.unslung start" to startup script for Entware services to start

export PATH="$PATH:/opt/bin:/opt/sbin"

synosystemctl restart nginx
synosystemctl restart synoscgi

ss -tuln | grep 41320
lsof -i :41320

list all firewall rules details
iptables -L -v -n