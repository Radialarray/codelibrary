# Deployment

So you want to deploy the container? There are different setups you could use.

## Useful commands

1. `docker compose convert` - Shows docker-compose file in terminal with the resolved environment variables.
2. `docker compose -f <your-filename-here> up` - Starts the selected docker-compose stack.

### Local/Basic server (mostly for development)

```bash
docker compose build
docker compose up
```
