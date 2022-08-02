## Codelibrary

1. Backend: Kirby
2. Frontend: NextJS
3. Devtools
   1. Postman for API testing
   2. VSCode Setup
4. Devtools CLI
   1. NodeJS + NPM
   2. Docker + Docker-compose
5. DevChain
   1. TailwindCSS + Postcss
   2. Turbo Monorepo
   3. Commitlint & Commitizen
   4. Prettier
   5. Changelog

## Repo Setup

1. CMS (Backend based on Kirby in Headless Mode)
2. Web (Frontend based on React with NextJS)

This project is stored as a monorepo. In the apps folder are two different folders for the backend application and the frontend application.

## Getting Started

1. Install Docker.
2. Install NodeJS.
3. Clone this repository.
4. Run `npm i`.
5. Go to `apps/cms/` and run `composer install`.
6. Run `docker-compose build`.
7. Go to `apps/web/` and run `npm i`.

## Development

### Backend

Run `docker-compose up` and work with the files in the `apps/cms/` folder. You can open the backend on [backend.localhost](backend.localhost).

### Frontend

Run `npm run dev` and open the devserver on [localhost:3000](localhost:3000).

## Features

- [x] TailwindCSS
  - [ ] Global styles
- [x] PostCSS
- [x] React & NextJS
- [ ] Git branches for
  - [ ] Dev
  - [ ] Staging (Main?)
  - [ ] Production
- [ ] Github Actions Autodeploy
- [ ] Static hosting
- [ ] KirbyCMS
  - [ ] As headless CMS
  - [ ] Visual Block editor
    - [ ] Different blocks for entry types
- [x] Commitizen & commitlint commit enforcement
- [x] Environment variables via .env config
- [x] Code formatting via Prettier
  - For enforced coding style
- [x] JS linting via ESlint
- [x] Githooks via Husky
  - [ ] Pre-commit
    - [x] Prettier
    - [x] Commitizen commit style enforcement
- [ ] Automatic Sitemap generation
- [ ] Visual link preview
- [ ] Example content in repository
  - [ ] Production environment exchanges the API endpoints
- [ ] Gzip Compression

## Backlog (Maybe)

- [ ] Semantic Releases
- [ ] Motion One for animations
- [ ] Realtime comments via Yjs CRDT (is this possible?)
- [ ] Testing → Jest or something else
- [ ] Global search with command-k

## Additional tools and build setup

- [ ] Remote Production Server
- [ ] Automatic image size optimization
  - [ ] Maybe something like _imgproxy_
