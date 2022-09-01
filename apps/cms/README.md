# Deployment

So you want to deploy the container? There are different setups you could use.

### Useful commands

1. `docker compose convert` - Shows docker-compose file in terminal with the resolved environment variables.
2. `docker compose -f <your-filename-here> up` - Starts the selected docker-compose stack.

### Local/Basic server (mostly for development)

```bash
docker compose -f ./deploy/local/docker-compose.yml up
```

### Behind a traefik reverse proxy

You need to have an `--env-file` flag here, so that docker can convert your environment variables for the host variable in the traefik labels -> see also [docker-compose doesn't use env_file](https://github.com/docker/compose/issues/4001)

```bash
docker compose -f ./deploy/traefik-proxy/docker-compose.yml --env-file ./.env up
```

### fly.io or render.com serverless infrastructure
