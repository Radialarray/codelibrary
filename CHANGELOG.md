## 1.0.0 (2022-08-24)

### Fix

- **web**: fixing tailwind config, move dev files to src folder
- **web**: update turbo config, update readme to reflect techstack updates
- fixing types and deleting old test components
- update setup for kirby installation behind traefik reverse proxy deployment
- add environment examples to gitignore
- fix environment variable name
- change config of docker-fpm php for uploads

### Feat

- **cms**: add plugins to git, add menu builder plugin to kirby
- add block types, add block renderer which renders different kql response blocks from kirby
- add images to content response
- first parser for kirby kql responses is working
- working on implementing blocks component for kql kirby api responses
- preparing previews via nextjs and vercel preview api
- add custom docker-compose setup with better env variables for host-url
- switch from traefik + nginx to caddy server
- add first api implementation with parser
- add tailwindcss and postcss
- add layout and blocks blueprints to kirby
- add lint-staged so that all staged files get linting and prettier treatment
- add redirect from frontend.localhost to http://localhost:3000

### Refactor

- change environment url variable to host variable without prefix
- change main content selector in blueprint to "main"
- change everything to composable interfaces
- change naming of main content in kirby article to -> content
- remove plugins and assets
