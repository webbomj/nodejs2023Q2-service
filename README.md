# Home Library Service - Docker And PostgreSQL

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker

## Downloading

```
git clone https://github.com/webbomj/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker-compose up --build       
```

## Testing

After docker-compose up --build you can open new terminal and  use command:

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Docker Hub app image
On site hub.docker.com you can search webbomj/library-task1 

## Vulnerabilities

After docker-compose up --build you can open new terminal and  use command:

```
npm run docker:scout
```