import { Component } from '@angular/core';
import { AuthConfiguration, authenticateWithFalcon, keycloakInit } from '@falconio/core-auth/dist/core-auth.min.js';
import { KeycloakService } from '../keycloak.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private keycloack: KeycloakService) {}
  public token: any;
  ionViewDidEnter() {}

  authenticate() {
    const authConfig: AuthConfiguration = {
      authServerBaseUrl: 'https://accounts-staging.falcon.io',
      clientId: 'falcon'
    };
    keycloakInit(authConfig).then(token => {
      console.log(token);
      this.token = token;
    });
    authenticateWithFalcon(authConfig).then(token => {});
  }
}
