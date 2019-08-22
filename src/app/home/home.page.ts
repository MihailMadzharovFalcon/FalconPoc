import { Component } from '@angular/core';
import { AuthConfiguration, authenticateWithFalcon } from '@falconio/core-auth/dist/core-auth.min.js';
import { KeycloakService } from '../keycloak.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private keycloack: KeycloakService) {}

  ionViewDidEnter() {}

  authenticate() {
    const authConfig: AuthConfiguration = {
      authServerBaseUrl: 'https://accounts-staging.falcon.io',
      clientId: 'falcon'
    };

    authenticateWithFalcon(authConfig).then(console.log);

    // this.keycloack.init().then(a => {
    //   console.log(a);
    // });
  }
}
