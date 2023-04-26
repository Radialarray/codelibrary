# Codelibrary

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
   2. Typescript
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

---

### Then copy the `.env` files and change the values:

#### CMS (Kirby): Copy `.env.example` to `.env`

`BACKEND_URL` -> the complete url to your cms (e.g. <https://cms.dev>)
`FRONTEND_URL` -> the url to your frontend application.

#### Web (Next): Copy `.env.local.example` to `.env.local`

`API_IMAGE_HOST` -> Used from nextjs to get your images (e.g. <cms.dev>). Don't add _https_
`API_HOST` -> The link to the api endpoint. (e.g. <cms.dev/api/query>)
`API_USERNAME` & `API_PASSWORD` -> A valid kirby username with password.

## Development

### Backend

Run `docker-compose up` and work with the files in the `apps/cms/` folder. You can open the backend on [backend.localhost](backend.localhost).

### Frontend

Run `npm run dev` and open the devserver on [localhost:3000](localhost:3000).

## Deployment

### Backend

The backend is a standard kirby instance, which could be hosted on a server with php support. Or one could use the docker-compose setup + the custom dockerimage and deploy it in a container environment.

### Frontend

The frontend is a NodeJS webapp. Right now there is some stuff set up for hosting on [vercel](vercel.com) and as a docker container.

### NPM

Using this package manager for faster install times and cached packages.

How to use? `npm run <YOUR_COMMAND>`.

## Features

- [x] TailwindCSS
  - [x] Global styles
- [x] PostCSS
- [x] React & NextJS
- [ ] Git branches for
  - [ ] Dev
  - [ ] Staging (Main?)
  - [ ] Production
- [ ] Github Actions Autodeploy
- [x] Static hosting
- [x] KirbyCMS
  - [x] As headless CMS
  - [x] Visual Block editor
- [x] Commitizen & commitlint commit enforcement
- [x] Environment variables via .env config
- [x] Code formatting via Prettier
  - For enforced coding style
- [x] JS linting via ESlint
- [x] Githooks via Husky
  - [x] Pre-commit
    - [x] Prettier
    - [x] Commitizen commit style enforcement
- [ ] Automatic Sitemap generation
- [ ] Visual link preview
- [ ] Example content in repository
  - [ ] Production environment exchanges the API endpoints
- [ ] Gzip Compression
- [x] Global search with command-k

## Future

- [ ] Markdown Block (already implemented, but outcommented)
- [ ] Codeblock with interactive playground for JS code (already implemented, but outcommented)
