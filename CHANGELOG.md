## 2.0.0 (2023-04-04)

### Feat

- **web**: update dependencies
- **web**: add library page
- **web**: category page
- **web**: heading styles
- **web**: layout changes and a lot of error handling
- **web**: homepage layout
- **web**: style home page
- **web**: breadcrumb error handling
- **web**: add burger menu mobile
- **cms**: add move-pages-plugin
- **web**: responsive design and fix type errors
- **web**: add metadata sidebar and fix errors
- **web**: update layout and add functionality to code block
- **web**: scroll position sidebar navigation
- **web**: update packages
- **web**: wohooo, components working
- **cms**: update composer
- **cms**: callout block plugin
- **cms**: callout block plugin
- **cms**: fieldmethod for layout image url generation
- **web**: show chapters on bottom
- **cms**: environment variable changes urls
- **web**: interfaces cleanup, change styling of search input
- **web**: working search overlay
- **web**: breadcrumb layout, codefield copy button
- add layout styling to blocks
- **web**: fix image links, breadcrumb
- **cms**: add meta info to layout pages
- **web**: add next/link to anchor tags in text
- **web**: slowly remove ramda as dependency
- **web**: add generic response page for every slug
- **web**: update all components to next13 and new api refactor
- **web**: add meta info to layout and pages
- **web**: update all packages to new versions
- **web**: upgrade packages
- **web**: update nextjs
- **web**: update packages
- **docker**: change docker config
- **cms**: kirby-navigation plugin update and add to composer.json
- **cms**: update docker setup and update kirby + plugins
- **web**: change typescript types
- **cms**: change host url
- **web**: update components
- **web**: update to nextjs 13
- **web**: add state management via valtio proxy store to searchoverlay
- **web**: add sidebar
- **web**: add icons to search overlay
- **web**: breadcrumb navigation
- **web**: update search overlay
- **cms**: update possible layout configurations
- **web**: api layout support, search overlay, kirby configurable navigation bar
- **cms**: docker setup update and kirby update
- **searchoverlay**: close overlay on click outside
- **web**: searchoverlay
- **web**: doing the work, adding css to components
- **cms**: add dockerfile build config
- **web**: add tailwind typography plugin, change globals.css

### Fix

- **web**: docker build
- **web**: type cheats
- **web**: better error page
- **web**: mobile responsive fixes
- **web**: footer links now relative
- **web**: responsive searchoverlay
- **web**: style category page
- **web**: api username example wrong
- **web**: responsive mobile menu
- **web**: breadcrumb error handling
- **web**: expect async components to throw error in typescript for now
- **web**: chapter better error handling on null and extra component
- **web**: searchoverlay closed on link click
- **cms**: update blueprints and fix kql image path function with image metadata included
- **cms**: ignore cms in eslint linting on commits
- **cms**: caddyfile env variable url was wrong
- **web**: breadcrumb wrong links, missing icons
- **api**: returns image urls now, changed setup for component props then
- **cms**: wrong folder volume mounts in docker-compose
- ts error fix
- **web**: components update to new nextjs, slowly removing ramda
- **web**: add tailwind to app directory
- **web**: remove unnecessary key, add use client to sidebar
- **web**: fix missing key on breadcrumb list
- **web**: update next router
- **web**: update api connection
- **web**: change api
- change docker-compose volume config
- fix driver auth in external volume
- **cms**: remove fly nonsense
- **cms**: remove fly.io nonsense
- **cms**: add base assets kirby
- **web**: fix type errors missmatch between incoming kql api response and gallery block component
- **web**: add missing key

### Refactor

- **web**: remove unused burgermenu component
- **web**: remove addimages functionality because not used anymore
- **web**: remove old pages, add correct favicon
- stash nextjs12 to 13 files for later
- **web**: change naming from article to layout for layout component
- **web**: change component naming, cleaning up some component and reusing image component in gallery component
- **web**: extract all components in extra files, refactor imports
- **web**: extract all components in extra files, refactor imports

## 1.0.0 (2022-08-24)

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

### Fix

- **web**: fixing tailwind config, move dev files to src folder
- **web**: update turbo config, update readme to reflect techstack updates
- fixing types and deleting old test components
- update setup for kirby installation behind traefik reverse proxy deployment
- add environment examples to gitignore
- fix environment variable name
- change config of docker-fpm php for uploads

### Refactor

- change environment url variable to host variable without prefix
- change main content selector in blueprint to "main"
- change everything to composable interfaces
- change naming of main content in kirby article to -> content
- remove plugins and assets
