export const environment = {
    production: true,
    auth0: {
      clientId: 'lRtGycu4dFbEzXXkKaCEAMOf9l7gBZ3h',
      domain: 'comdo-crm.eu.auth0.com',
      audience: 'https://comdo-crm.eu.auth0.com/userinfo',
      redirectUrl: 'http://192.168.1.89:4200/auth/callback',
      whitelist: [
        '192.168.1.89:4200'
      ]
    }
};
