// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  staging: false,
  auth0: {
    clientId: 'lRtGycu4dFbEzXXkKaCEAMOf9l7gBZ3h',
    domain: 'comdo-crm.eu.auth0.com',
    audience: 'https://comdo-crm.eu.auth0.com/userinfo',
    redirectUrl: 'http://192.168.1.89:4200/auth/callback'
  }
};
