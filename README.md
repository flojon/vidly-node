# Vidly
My implementation of vidly from Programming with Mosh node.js course.
See https://codewithmosh.teachable.com/p/the-complete-node-js-course

## Requirements
* Node v. 8 - tested with version 8.11.1
* Yarn - tested with v 1.6.0
* MongoDB - tested with 3.6.4

## Installation
To install all dependencies run:

```
yarn install
```

## Configuration
Copy ```config/default.json``` to ```config/development.json``` and edit it.
Set ```jwtPrivateKey``` to a secret string used for encrypting the JWT-token.
Set ```db.url``` to your MongoDB connection string. For example:

```
mongodb://localhost:27017/vidley
```

## Running
To start the node server run

```
node app.js
```

By the default to server will listen on port 3000.
