#!/usr/bin/env node

const writeFile = require('write');
const path = require('path');
const cmdArgs = require('command-line-args');

const environmentFile = path.join(__dirname, '..', 'src', '.environments', 'environment.prod.ts');

const argsDefinitions = [
    { name: 'api', type: String },
    { name: 'a0clientid', type: String },
    { name: 'a0domain', type: String },
    { name: 'a0audience', type: String },
    { name: 'a0redirect', type: String }
];

const options = cmdArgs(argsDefinitions);

console.log(options);

var environmentOptions = {
    production: true,
    api: {
        endPoint: null
    },
    auth0: {
        clientId: null,
        domain: null,
        audience: null,
        redirectUrl: null
    }
}

if(options.api) {
    environmentOptions.api.endPoint = options.api;
}

if(options.a0clientid && options.a0domain && options.a0audience && options.a0redirect) {
    environmentOptions.auth0 = {
        clientId: options.a0clientid,
        domain: options.a0domain,
        audience: options.a0audience,
        redirectUrl: options.a0redirect
    };
}

writeFile(environmentFile, `export const environment = {
    production: true,
    api: {
        endpoint: '${environmentOptions.api.endPoint}'
    },
    auth0: {
        clientId: '${environmentOptions.auth0.clientId}',
        domain: '${environmentOptions.auth0.domain}',
        audience: '${environmentOptions.auth0.audience}',
        redirectUrl: '${environmentOptions.auth0.redirectUrl}'
    }
};
`);