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

## Tech Stack:

- Backend: NestJS and Nodejs
- Database: MongoDB
- Caching: Redis
- Containerization: Docker
- Orchestration: Docker Compose
- Deployment: AWS Elastic Beanstalk & S3 Bucket
- Testing: Jest
- CI/CD: GitHub Actions

## Project Description

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

All of these environment variables and keys will be provided separately via the project maintainer. Please reach out to `rishabhsharma.rs0403@gmail.com` for the same.

## Strategy and Assumptions

# Assumptions:

1. A dummy user has been created and authentication is in place. All API calls directly use this user's unique ID [included in the `app.constant.ts` file].

2. A few private endpoints with a secret header exist in `core.controller.ts` for seeding core data like users, movies, and TV shows using dummy data present in `dummy.data.ts`.

# Solution for High Scalability and Performance:

This application prioritizes scalability and performance for the `/api/v1/my-list` endpoint, which retrieves a user's list of movies & tv shows. Here's how we achieve this:

1. Database Indexes:
   Indexes are created on relevant fields in the database (e.g., user ID, createdAt Date) to accelerate queries and improve fetch times.

2. Pagination:
   The API supports pagination to retrieve data in smaller chunks. This prevents overwhelming the database with large requests, optimizes the query, and reduces response times.

3. Redis Caching:
   The `/api/v1/my-list` endpoint leverages Redis caching to store frequently accessed data. This reduces the load on the database for repeated requests and enhances performance.

4. Cache Invalidation:
   When the `/api/v1/my-list/add-item` and `/api/v1/my-list/remove-item` endpoints are called, the corresponding cache entry for the user's list is invalidated. This ensures the cached data remains consistent with the actual database state.

## Miscellaneous

**Performance Considerations:**

The performance of the `/api/v1/my-list` endpoint, particularly its response time, is influenced by various factors beyond the application's code itself. Here are some key considerations:

- **Environment:** The surrounding infrastructure plays a significant role. Running the application on a local development machine (e.g., MacBook Air) will naturally yield different performance metrics compared to a production environment with high-end servers.

- **Deployment Platform:** The type of platform used for deployment (e.g., cloud provider, on-premises servers) can impact performance due to varying hardware capabilities and resource allocation strategies.

- **Network Delays:** The latency of the network connection between the client and the server directly affects response times. Network congestion or distance can increase delays.

- **Platform Resources:** The amount of available CPU, memory, and storage on the deployment platform can influence the application's ability to handle requests efficiently.

- **MongoDB Cloud Instance:** The configuration and specifications of your MongoDB cloud instance (e.g., instance type, storage options) can impact database query performance, which in turn affects the `/api/v1/my-list` endpoint.

- **Data Size:** The size of the data fetched plays a crucial role in the response time as it directly depends on the network bandwidth and more data in terms of document size will increase the response time significantly.

**Observed Performance:**

While it's difficult to provide a definitive response time guarantee due to the factors mentioned above, here's an observation based on a specific environment:

- Running on a MacBook Air, the average response time for the `/api/v1/my-list` endpoint falls within the `2-20ms` range.

**Optimization Potential:**

With a high-end infrastructure setup and exceptional network bandwidth, it's possible to achieve response times consistently below 10ms. However, it's essential to consider the cost-benefit trade-off for such optimizations.

**Additional Notes:**

- This section provides a general overview of performance considerations. Actual performance measurements might vary depending on your specific environment and configuration.
- Continuously monitoring and profiling your application under real-world conditions is crucial for identifying performance bottlenecks and making informed optimization decisions.

I recommend testing and evaluating the application's performance in your target deployment environment to establish a more accurate baseline for response times.

## Stress Testing

**Local Server Test**
<img width="1437" alt="stress-test-local-7ms" src="https://github.com/Rishabhltfb/Stage-Backend/assets/40674238/cb6622b5-52a7-4ac5-8259-aa1376dba868">

**Hosted Server Test**
<img width="1437" alt="stress-test-hosted-44ms" src="https://github.com/Rishabhltfb/Stage-Backend/assets/40674238/8fdf05f8-0be3-4386-89e8-febeef93f474">

To assess performance under realistic conditions, the `/api/v1/my-list` (fetch my list) API was subjected to load testing. This load testing is performed on both local and hosted server. The test simulated 100 concurrent virtual users sending a total of `~4600 requests` within a minute in both the cases. The overall average response time was a promising `7ms` in local and `44ms` in hosted server. However, it's important to note a potential outlier: the first request to MongoDB exhibited a longer response time of `950ms`. This is due to factors like cold cache or database initialization overhead and the minimum response time for a request was `2ms`.

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
