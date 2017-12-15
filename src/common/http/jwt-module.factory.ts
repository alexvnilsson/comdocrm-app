import { environment } from 'environments/environment';

export function jwtModuleFactory() {
  return {
    config: {
      tokenGetter: () => {
        return localStorage.getItem('id_token');
      }
    }
  }
}
