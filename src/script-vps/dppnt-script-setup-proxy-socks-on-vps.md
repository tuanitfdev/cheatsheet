## Provision Cmd
### Setup squid
```
apt update
apt install squid -y
apt install apache2-utils -y
systemctl stop squid
touch /etc/squid/passwords
chmod 777 /etc/squid/passwords
htpasswd -c /etc/squid/passwords tuanitf
1tfTn&Pxy
```

```
mv /etc/squid/squid.conf /etc/squid/squid.conf.org

cat > /etc/squid/squid.conf
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwords
auth_param basic realm Squid proxy-caching web server
auth_param basic credentialsttl 24 hours
acl authenticated proxy_auth REQUIRED
http_access allow authenticated
http_access deny all
http_port 31288
```

### Append config to forward traffic to another proxy
```
#coredump_dir /var/spool/squid3
refresh_pattern ^ftp:       1440    20% 10080
refresh_pattern ^gopher:    1440    0%  1440
refresh_pattern -i (/cgi-bin/|\?) 0 0%  0
refresh_pattern (Release|Packages(.gz)*)$      0       20%     2880
refresh_pattern .       0   20% 4320

cache_peer 207.148.123.245 parent 31288 0 no-query default login=tuanitf:1tfTn&Pxy
never_direct allow all
```

### Open port on firewall if needed
```
ufw allow 31288
```

```
systemctl restart squid
systemctl status squid
```

### Test proxy with curl cmd
```
curl -v -x "http://tuanitf:1tfTn&Pxy@103.109.37.168:31288" "https://www.google.com/"
```

### Setup dante
```
apt install dante-server
apt install net-tools
systemctl stop danted.service
```

### Setup user authen dante if needed
```
useradd -r -s /bin/false tuanitfs
passwd 1tfTn&Sks
```

```
mv /etc/danted.conf /etc/danted.conf.org

cat > /etc/danted.conf
logoutput: syslog
user.privileged: root
user.unprivileged: nobody

# The listening network interface or address.
internal: 0.0.0.0 port=41080

# The proxying network interface or address.
external: eth0

# socks-rules determine what is proxied through the external interface.
#socksmethod: username
socksmethod: none

# client-rules determine who can connect to the internal interface.
clientmethod: none

#client pass {
#    from: 0.0.0.0/0 to: 0.0.0.0/0
#}

client pass {
    from: 115.77.147.13/0 to: 0.0.0.0/0
}

socks pass {
    from: 0.0.0.0/0 to: 0.0.0.0/0
}
```

### Append config to forward traffic to another proxy
```
#forwarding route to SOCKS server (which supports both SOCKS version 4 and 5)
route {                                                                        
    from: 0.0.0.0/0 to: 0.0.0.0/0 via: 207.148.123.245 port = 41080            
    proxyprotocol: socks_v4 socks_v5
	command: connect
	protocol: tcp #udp not supported
    method: none
}
```

### Open port on firewall if needed
```
ufw allow 41080
```

```
systemctl restart danted
systemctl status danted
```

### Test socks with curl cmd
### No Authen
```
curl -v -x "socks5://103.109.37.168:41080" "https://www.google.com/"
```
### Has Authen
```
curl -v -x "socks5://tuanitfs:1tfTn&Sks@45.77.255.36:1080" "https://www.google.com/"
```
