import { environment } from '.env/environment';

export function jwtModuleFactory() {
  return {
    config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      whitelistedDomains: environment.auth0.whitelist
    }
  }
}

export { JwtModule } from '@auth0/angular-jwt';