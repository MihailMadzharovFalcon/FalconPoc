import { Injectable } from '@angular/core';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  constructor() {}
  private keycloakAuth: any;
  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      const config = {
        url: 'https://accounts-staging.falcon.io/auth',
        clientId: 'falcon',
        realm: 'falcon'
      };

      this.keycloakAuth = new Keycloak(config);
      this.keycloakAuth
        .init()
        .success(() => {
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  getToken(): string {
    return this.keycloakAuth.token;
  }
}
