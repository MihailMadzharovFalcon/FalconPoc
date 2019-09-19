import { Component } from '@angular/core';
import {
  AuthConfiguration,
  authenticateWithFalcon,
  keycloakInit
} from '@falconio/core-auth/dist/core-auth.min.js';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public token: any;
  ionViewDidEnter() {}
  constructor(private platform: Platform) {
    console.log(platform.is('cordova'));
  }
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
