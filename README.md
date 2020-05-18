# Restful Ecommerce

![Docker Image CI](https://github.com/devdbrandy/restful-ecommerce/workflows/Docker%20Image%20CI/badge.svg?branch=master)
![Node.js CI](https://github.com/devdbrandy/restful-ecommerce/workflows/Node.js%20CI/badge.svg?branch=master)

## Overview

A simple minimalistic ecommerce REST API built with Node.js and Express.js, showcasing three major functionalities:

1. Authentication
2. Products listing
3. Order placements
4. Access restrictions

> Demo Users
>
> | Email               | Password | Access       |
> | ------------------- | -------- | ------------ |
> | `admin@example.com` | `secret` | Admin Access |
> | `user@example.com`  | `secret` | User Access  |

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/cfdf0e762edcf3abe91b)

---

Database Schema Design
![Database Schema Design](/screenshots/db-schema-design.png)

---

<!-- TOC depthFrom:2 -->

- [Overview](#overview)
- [1. :rocket: Getting Started](#1-rocket-getting-started)
  - [1.1 Prerequisites](#11-prerequisites)
  - [1.2. Run locally](#12-run-locally)
  - [1.3. Test Locally](#13-test-locally)
  - [1.4. Running Test](#14-running-test)
- [2. :lock: Authentication](#2-lock-authentication)
- [3. :bookmark: API Versioning](#3-bookmark-api-versioning)
- [3. :green_heart: HTTP Response Codes](#3-green_heart-http-response-codes)
- [4. :pencil: License](#4-pencil-license)

<!-- /TOC -->

## 1. :rocket: Getting Started

### 1.1 Prerequisites

To get started, ensure that you have the following installed on your local machine:

- [NodeJS](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1.2. Run locally

- Clone repository or clone your own fork

  ```bash
  git clone https://github.com/devdbrandy/restful-ecommerce.git
  ```

- Make a duplicate of `.env.example` and rename to `.env`, then configure your credentials.
  NB: After creating `.env` file, ensure that you set `APP_PKEY` to any secret phrase you want.
- Install dependencies by running `npm i` or `npm install` on your terminal.
- Run migration: `npm run db:migrate`
- (Optional) Seed dummy data `npm run db:seed`
- Two npm scripts are availiable to spin up the app server:
  - `npm run start` spin up the server without watching for any file changes (Requires `npm run build`)
  - `npm run serve` watches for any file changes and reloads the server

### 1.3. Test Locally

To test or consume api locally, you can make use of [_Postman_](https://www.getpostman.com) or [_Insomnia_](https://insomnia.rest/download/)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/cfdf0e762edcf3abe91b)

### 1.4. Running Test

Test specs are implemented using [_jest_](https://jestjs.io).

Two npm scripts are available to run the test suite:

1. `npm t` or `npm test` - Performs a single full test suite run, including jest code coverage reporting. Summary coverage reports are written to stdout, and detailed HTML reports are available in `/coverage/lcov-report/index.html`
2. `npm run test:watch` - This watches for any file changes and runs the full test suite.

## 2. :lock: Authentication

Access to restricted API endpoints requires an access token. To obtain your access token, make a request along with any dummy `username` and `password` credentials to `/login`.

**Sample Response:**

```http
POST http://localhost:3000/login
HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "token": "...",
  }
}
```

## 3. :bookmark: API Versioning

The second part of the URI specifies the API version you wish to access in the format `v{version_number}`.
For example, version 1 of the API (most current) is accessible via:

```http
  http://localhost:3000/api/v1
```

## 3. :green_heart: HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `403` `Forbidden` The credentials provided do not have permissions to access the requested resource
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

## 4. :pencil: License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
