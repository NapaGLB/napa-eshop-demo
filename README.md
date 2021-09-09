# napa-eshop-demo

## Install sc
`yarn postinstall`

## Compile sc
`yarn sc-compile`

## Run node server local
`yarn sc-node`

## Deploy sc on local network
`yarn sc-deploy`

## Deploy sc on rinkeby network
`yarn sc-deploy-rinkeby`

## Start server
`yarn start:server-dev`

## Start front end
`yarn start:web-dev`

#### Docker notes
1. Run docker for backend on production
```
 docker-compose up -d
```
2. Run docker on local
```
 docker-compose -f docker-compose.dev.yml up -d
```