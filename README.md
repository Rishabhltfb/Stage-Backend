<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Stage Project

This repository is a Node.js application built with NestJS, a powerful framework for building scalable and efficient server-side applications. It utilizes various technologies to ensure performance, reliability, and ease of deployment.

## Stage Project

- Backend: NestJS and Nodejs
- Database: MongoDB
- Caching: Redis
- Containerization: Docker
- Orchestration: Docker Compose
- Deployment: AWS Elastic Beanstalk & S3 Bucket
- Testing: Jest
- CI/CD: GitHub Actions

## Description

Enhancing an OTT platform to include a new feature called "My List," which allows users to save their favourite movies and TV shows to a personalised list. This feature requires backend
services for managing the user's list, including adding, removing, and listing saved items.

## Environment Variables:

```bash
PORT: The port on which the application will listen (default: 3005)
STAGE: The application environment (e.g., dev, staging, prod)
MONGO_DB_URI: The connection string for your cloud MongoDB database
API_SECRET: A secret key used for authentication or authorization purposes of private apis
REDIS_USERNAME: Username for your Redis server (optional, only needed for secured deployments)
REDIS_DB: Redis database index to use (default: 0)
REDIS_PORT: The port on which your Redis server is running (default: 6379)
REDIS_HOST: The hostname or IP address of your Redis server (use localhost for local development and redis for docker)
REDIS_TTL: The default expiration time for cached data in Redis (in ms)
REDIS_PASSWORD: Password for your Redis server (optional, only needed for secured deployments)
```

## Running the Application

# Using Docker Compose:

1. Ensure you have Docker and Docker Compose installed.

```bash
# run server using docker compose after building
$ docker compose up --build

```

# Locally (Without Docker):

1. Installation

```bash
$ npm install
```

2. Running commands

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug ( with javascript debug terminal )

# production mode
$ npm run start:prod
```

## Test

Jest is used as the testing framework for this project. Integration tests are located in the test directory. You can run the tests locally using:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# e2e tests with watch
$ npm run test:e2e:watch

# test coverage
$ npm run test:cov
```

## CI/CD Workflow

This project uses github actions for automantic deployment to AWS when code is pushed to the main branch. Github repository includes AWS secrets.

## Deployment

This project is configured for deployment on AWS Elastic Beanstalk. The specific deployment steps will involve creating an Elastic Beanstalk application, configuring environment variables, and uploading your application code. Refer to the AWS documentation for detailed instructions.

## License

Nest is [MIT licensed](LICENSE).
