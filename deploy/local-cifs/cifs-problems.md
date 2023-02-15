docker volume create \
--driver local \
--opt type=cifs \
--opt device=//iot-share.hfg-gmuend.de/Share_CodeLibrary \
--opt o=addr=iot-share.hfg-gmuend.de,username=codelibrary,password='"324k&!"kjdfl§"%',file_mode=0777,dir_mode=0777,vers=2.0 \
--name codelibrary

docker volume create \
 --driver local \
 --opt type=cifs \
 --opt o=addr=iot-share.hfg-gmuend.de,rw \
 --opt device=//iot-share.hfg-gmuend.de/Share_CodeLibrary \
 --opt o=uid=0,username=codelibrary,password='"324k&!"kjdfl§"%',nounix,file_mode=0770,dir_mode=0770 \
 --name codelibrary

docker volume create \
 --driver local \
 --opt type=cifs \
 --opt device=//172.17.172.21/Share_CodeLibrary \
 --opt 'o=addr=172.17.172.21,username=codelibrary,password=j3o4ij()kjnklsd!' \
 --name 'codelibrary'

docker run -t -i --rm --dns 172.17.1.11 --dns 172.17.1.12 --dns 1.1.1.1 --dns 172.16.1.11 --network=host ubuntu bash

docker run -t -i --rm --dns 172.17.1.11 --dns 172.17.1.12 --dns 172.16.1.11 --network=my-bridge-network ubuntu bash

docker run -t -i --rm --network=my-bridge-network ubuntu bash

docker run -t -i --rm ubuntu bash
docker run -t -i --rm --network=my-bridge-network ubuntu bash

docker run -t -i --rm --cap-add=SYS_ADMIN --cap-add=DAC_READ_SEARCH ubuntu bash
docker run -it --rm --privileged ubuntu bash

docker run -it --rm ubuntu bash
docker run -it --privileged --dns 172.17.1.11 --dns 172.17.1.12 --dns 8.8.8.8 ubuntu bash

apt update
apt install -y iputils-ping iproute2 traceroute dnsutils curl cifs-utils

ping 172.17.172.21

ping 172.17.16.5

ip a

mkdir /mnt/local_share
mount --verbose -t cifs //172.17.172.21/Share_CodeLibrary /mnt/local_share -o username=codelibrary,password="12345678"

192.168.65.0/24

docker volume rm codelibrary

nslookup iot-share.hfg-gmuend.de
ping iot-share.hfg-gmuend.de
dig @172.17.1.12 iot-share.hfg-gmuend.de
traceroute iot-share.hfg-gmuend.de
traceroute 172.17.1.12
curl -v iot-share.hfg-gmuend.de

nslookup 172.17.172.21
ping 172.17.172.21
dig @172.17.1.12 172.17.172.21
traceroute 172.17.172.21
curl -v 172.17.172.21

docker network create -d bridge \
 --driver=bridge \
 --subnet=169.28.0.0/16 \
 --ip-range=169.28.5.0/24 \
 --gateway=169.28.5.254 \
 my-bridge-network

docker network create \
 --driver=bridge \
 my-bridge-network

docker network ls

{
"bip": "12.12.0.1/24",
"builder": {
"gc": {
"defaultKeepStorage": "20GB",
"enabled": true
}
},
"experimental": false,
"features": {
"buildkit": true
}
}
