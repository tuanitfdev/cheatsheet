### Note
This tutorial is for Ubuntu & Squid3. Use AWS, Google cloud, Digital Ocean or any services with Ubuntu to follow this tutorial.

## Check squid version on apt repo
apt-cache policy squid

## Setup authen proxy server on ubuntu
### Install squid & update
```
sudo apt-get update
sudo apt-get install squid
sudo apt-get install apache2-utils
```

### Setup the password store
Choose a username/password. Example:
```
username: proxytuan
password: xyPr0selF
```
Type in console:
```
sudo touch /etc/squid/passwords
sudo chmod 777 /etc/squid/passwords
sudo htpasswd -c /etc/squid/passwords [USERNAME]
```

Replace [USERNAME] with your username, in this example: ```abc```.

You will be prompted for entering the password. Enter and confirm it. This example password: ```123```.


#### [Optional] Test the password store

```
/usr/lib/squid3/basic_ncsa_auth /etc/squid/passwords
```

After executing this line the console will look like its hung, there is a prompt without any text in it. Enter ```USERNAME PASSWORD``` (replacing these with your specific username and password) and hit return. You should receive the response "OK".

If not, review the error message, your username/password might be incorrect. Its also possible basic_ncsa_auth is located on a different path (e.g. lib64).

### Config squid proxy

Backup default config file:
```
sudo mv /etc/squid/squid.conf /etc/squid/squid.conf.org
```

Make a new configuration files
```
sudo vim /etc/squid/squid.conf
```

Enter this in the config file
```
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwords
auth_param basic realm Squid proxy-caching web server
auth_param basic credentialsttl 24 hours
auth_param basic casesensitive off
acl authenticated proxy_auth REQUIRED
http_access allow authenticated
http_access deny all
dns_v4_first on
forwarded_for delete
via off
http_port 8888
```

### Append config to forward traffic to another proxy
```
#coredump_dir /var/spool/squid3
refresh_pattern ^ftp:       1440    20% 10080
refresh_pattern ^gopher:    1440    0%  1440
refresh_pattern -i (/cgi-bin/|\?) 0 0%  0
refresh_pattern (Release|Packages(.gz)*)$      0       20%     2880
refresh_pattern .       0   20% 4320

cache_peer [other-proxy-ip] parent [other-proxy-port] 0 no-query default login=[proxy-username]:[proxy-pass]
never_direct allow all
```

* ```auth_param basic credentialsttl 24 hours```: after 24 hours, user/pass will be asked again.
* ```auth_param basic casesensitive off```: case sensitive for user is off.
* ```dns_v4_first on```: use only IPv4 to speed up the proxy.
* ```forwarded_for delete```: remove the forwarded_for http header which would expose your source to the destination
* ```via off```: remove more headers to avoid exposing the source.
* ```http_port 8888```: port 8888 is used for proxy. You can choose any port.

Save the file in vi with [esc]:wq

### Start the squid service
Start squid: ```sudo systemctl start squid```

To check service status: ```sudo systemctl status squid```

### Restart the squid service and try proxy
Restart squid service
```sudo service squid restart``` or ```sudo systemctl restart squid.service```.

Use your proxy with your ```ip:port```. Example: ```111.111.222.333:8888``` and login with your user/pass.

### Test proxy with curl cmd
```
curl -v -x "http://user:abc@[proxy-ip]:[proxy-port]" "https://www.google.com/"
```

### Caution
You might need to create inbound firewall rule first before using the proxy.

For Google cloud: [Firewall](https://console.cloud.google.com/networking/firewalls/). Create an Ingress rule, Target Apply to all, IP range of ```0.0.0.0/0```, allow ```TCP:8888, UDP:8888``` for all traffic.


## Setup no authen proxy server on ubuntu

cp /etc/squid/squid.conf /etc/squid/squid.conf.bk

### Config squid allow http, https
vim /etc/squid/squid.conf
```sh
# all custom config here
http_port 7777
acl all src all
acl SSL_ports port 443
acl Safe_ports port 80
acl Safe_ports port 443
acl CONNECT method CONNECT


#http_access allow CONNECT SSL_ports

# Allow access from a local network (e.g., 192.168.1.0/24)
# acl localnet src 192.168.1.0/24

# http_access allow localnet
# http_access deny all
http_access allow all
shutdown_lifetime 10 seconds
```

ufw allow 7777/tcp

systemctl start squid
systemctl enable squid
systemctl status squid
