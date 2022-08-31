# If you got problems with composer not installing packages in docker image, add a fixed dns server to your docker engine:

[bobcares.com/blog/docker-image-dns-lookup-error](https://bobcares.com/blog/docker-image-dns-lookup-error/)

Permanent fix for docker image DNS lookup error

If you prefer a more permanent fix, our Support Engineers have that covered as well.

    First, we will change the DNS settings of the Docker daemon by creating the daemon configuration file at /etc/docker/daemon.json.
    Then, configure the daemon configuration file with a set of two DNS, namely, the network DNS server and the Google DNS server. The latter works as a backup in case the network DNS server is not available.

    /etc/docker/daemon.json:
    {
        "dns": ["10.0.0.2", "8.8.8.8"]
    }

    After that, restart the docker service with the following command:

    sudo service docker restart
