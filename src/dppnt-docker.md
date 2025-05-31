Shell access whilst the container is running:
```
docker exec -it nginx /bin/bash
```

To monitor the logs of the container in realtime:
```
docker logs -f nginx
```

Container version number:
```
docker inspect -f '{{ index .Config.Labels "build_version" }}' nginx
```

Image version number:
```
docker inspect -f '{{ index .Config.Labels "build_version" }}' lscr.io/linuxserver/nginx:latest
```

Update images:
  - All Images:
  ```
    docker-compose pull
  ```
  - Single image:
  ```
    docker-compose pull nginx
  ```

Update containers:
  - All containers:
  ```
    docker-compose up -d
  ```
  - Single container:
    docker-compose up -d nginx

Remove the old dangling images:
```
docker image prune
```

Stop the running container:
```
docker stop nginx
```

Delete the container:
```
docker rm nginx
```

Pool overlaps with other one on this address space when starting my_project docker setup
docker network ls
find network duplicated to remove by:
docker network rm my_network


find port that already listen or not:
netstat -tulpn | grep :401*


s6-svc -r /var/run/s6/services/nginx

docker compose / docker-compose (some platform have differents)
docker-compose -f <compose.yml> up # pull image, create container and network
docker-compose -f <compose.yml> down # remove container and network
docker-compose -f <compose.yml> stop # stop container
docker-compose -f <compose.yml> rm # remove container